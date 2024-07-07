import { NextRequest, NextResponse } from 'next/server';
import anthropic from '@/lib/claude';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    const prompt = `
    # 指示
    あなたは一流のデートプランナーです。
    下記の"制約"と"条件"を遵守した上で、考えうる限りで最高のデートプランを提案してください。

    # 制約
    - 日本語で出力してください。
    - 出力は"出力フォーマット"に従ってください。
    - デートプランには、必要に応じてカフェやレストランなどのお店も適切に選定し、提案するようにしてください。
    - デートスポットでのアクションは可能な限り詳細に明記してください。
    - デートスポットは必要に応じて柔軟に増やしてください。

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
    【プラン内容に応じた適切なデートタイトルを設定】

    [時間]
    [デートスポット1]
    [デートスポット1でのアクションについて記載]
    [デートスポット1の公式サイトの埋め込みなど]
    [デートスポット1のGoogleマップ]

    [時間]
    [デートスポット2]
    [デートスポット2でのアクションについて記載]
    [デートスポット2の公式サイトの埋め込みなど]
    [デートスポット2のGoogleマップ]

    〜プランナーからのコメント〜
    [デートでのアドバイスや注意事項などを可能な限り詳細に記載]
    `;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 2000,
      messages: [
        { role: "human", content: prompt }
      ]
    });

    const generatedPlan = response.content[0].text;

    const planId = Date.now().toString();

    return NextResponse.json({ planId, plan: generatedPlan });
  } catch (error) {
    console.error('Error generating plan:', error);
    return NextResponse.json({ error: 'プランの作成に失敗しました' }, { status: 500 });
  }
}
