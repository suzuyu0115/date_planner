import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    const prompt = `
      # 指示
      あなたは経験豊富なデートプランナーです。以下の制約と条件に厳密に従い、現実的で実行可能な最高のデートプランを提案してください。
      重要: 出力は必ず有効なJSON形式でなければなりません。

      # 制約
      - 日本語で出力してください。
      - 指定された場所の範囲内でプランを立ててください。不必要な移動は避けてください。
      - 実在し、現在営業中の施設やスポットのみを提案してください。
      - デートスポットは3〜4箇所程度に抑え、無理のないプランにしてください。
      - 予算内で収まるよう、各スポットでの支出を具体的に示してください。
      - 移動時間と滞在時間を現実的に見積もってください。
      - 時間は開始時刻のみを "HH:MM" 形式で記載してください。
      - 概要とアドバイスは、より詳細かつ具体的に記述してください。最低100文字以上書いてください。
      - 出力は必ず"出力フォーマット"に従い、有効なJSON形式で提供してください。

      # 条件
      ## 場所
      ${formData.location}

      ## デートの種類
      ${formData.dateType}

      ## 予算
      ${formData.budget}

      ## 好みや要望
      ${formData.preferences}

      # 出力フォーマット
      {
        "title": "プラン内容に応じた適切なタイトル",
        "overview": "デートプランの全体的な説明を詳細に（100文字以上）",
        "spots": [
          {
            "name": "スポット名",
            "time": "開始時刻（HH:MM形式）",
            "budget": "ここでの支出",
            "details": "スポットの説明と、ここでの具体的な行動や楽しみ方",
            "mapUrl": "Google Maps URL"
          }
        ],
        "advice": "デート全体に関するアドバイスや注意点、天候や混雑状況など考慮すべき要素（100文字以上）",
        "totalBudget": "各スポットでの支出の合計と、予算内に収まっているかの確認"
      }

      注意: 上記のJSONフォーマットを厳密に守り、有効なJSONのみを出力してください。コードブロックや追加の説明は不要です。
    `;


    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    });

    let responseContent = completion.choices[0].message.content;

    // JSONの開始と終了を探して抽出
    const jsonStart = responseContent.indexOf('{');
    const jsonEnd = responseContent.lastIndexOf('}') + 1;
    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error('Valid JSON not found in the response');
    }
    responseContent = responseContent.slice(jsonStart, jsonEnd);

    let generatedPlan = JSON.parse(responseContent);

    // Google Maps URLの形式を検証し、必要に応じて修正
    generatedPlan.spots = generatedPlan.spots.map(spot => ({
      ...spot,
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name)}`
    }));

    return NextResponse.json({ plan: JSON.stringify(generatedPlan) });
  } catch (error) {
    console.error('Error generating plan:', error);
    return NextResponse.json({ error: 'プランの作成に失敗しました。もう一度お試しください。' }, { status: 500 });
  }
}
