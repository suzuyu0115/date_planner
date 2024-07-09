import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    const prompt = `
      # 指示
      あなたは経験豊富なデートプランナーです。以下の制約と条件に厳密に従い、現実的で実行可能な最高のデートプランを提案してください。

      # 制約
      - 日本語で出力してください。
      - 指定された場所の範囲内でプランを立ててください。不必要な移動は避けてください。
      - 実在し、現在営業中の施設やスポットのみを提案してください。閉店や閉業している場所は絶対に含めないでください。
      - 必ずGoogle マップに登録されているスポットのみを選んでください。Google マップで検索して見つからない場所は提案しないでください。
      - 各スポットについて、その存在と現在の営業状況を確信できない場合は提案しないでください。
      - デートスポットは3〜4箇所程度に抑え、無理のないプランにしてください。
      - 予算内で収まるよう、各スポットでの支出を具体的に示してください。
      - 移動時間と滞在時間を現実的に見積もってください。
      - 指定された地域（${formData.location}）内のスポットのみを提案すること。
      - 出力は必ず"出力フォーマット"に従ってください。

      # 条件
      ## 場所
      ${formData.location}
      - ${formData.location}の範囲内でのみプランを立ててください。他の地域のスポットは絶対に含めないでください。

      ## デートの種類
      ${formData.dateType}

      ## 予算
      ${formData.budget}

      ## 好みや要望
      ${formData.preferences}

      # 出力フォーマット
      # デートプラン：[プラン内容に応じた適切なタイトル]

      ## 概要
      [デートプランの全体的な説明を2-3文で]

      ## タイムテーブル
      [時刻] [行動の簡潔な説明]
      [時刻] [行動の簡潔な説明]
      ...

      ## 詳細プラン
      ### 1. [スポット名]
      - 時間：[滞在時間]
      - 予算：[ここでの支出]
      - 詳細：[スポットの説明と、ここでの具体的な行動や楽しみ方]
      - 営業状況：Google マップで確認済みの営業中の場所です。
      - 地図：[Google Maps URL（https://www.google.com/maps/search/?api=1&query=場所の名前）]

      ### 2. [スポット名]
      ...

      ## アドバイス
      - [デート全体に関するアドバイスや注意点]
      - [天候や混雑状況など、考慮すべき要素]
      - [予備プランや代替案の提案]

      ## 総予算
      [各スポットでの支出の合計と、予算内に収まっているかの確認]

      注意: このプランは自動生成されたものです。スポットの存在や詳細は実際に訪れる前に再確認することをお勧めします。
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    });

    let generatedPlan = completion.choices[0].message.content;

    // Google Maps URLの形式を検証し、必要に応じて修正
    generatedPlan = generatedPlan.replace(
      /地図：(.*)/g,
      (match, url) => {
        if (!url.startsWith('https://www.google.com/maps')) {
          const encodedQuery = encodeURIComponent(url.trim());
          return `地図：https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
        }
        return match;
      }
    );

    return NextResponse.json({ plan: generatedPlan });
  } catch (error) {
    console.error('Error generating plan:', error);
    return NextResponse.json({ error: 'プランの作成に失敗しました' }, { status: 500 });
  }
}
