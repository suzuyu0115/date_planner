import Link from 'next/link';

export default function PlanResult() {
  // この部分は実際のAI出力結果に置き換えられます
  const aiGeneratedPlan = {
    title: "ロマンチックな東京タワーデート",
    description: "東京タワーを中心とした、思い出に残るロマンチックなデートプランをご提案します。",
    schedule: [
      { time: "17:00", activity: "東京タワー展望台で夕景鑑賞" },
      { time: "19:00", activity: "タワー直下のレストランで夜景を見ながらディナー" },
      { time: "21:00", activity: "イルミネーションが美しい芝公園を散策" },
    ],
    tips: "東京タワーのチケットは事前購入がおすすめです。夜は冷えることがあるので、上着をお忘れなく。",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-2xl">
        <Link href="/create-plan" className="text-pink-600 hover:text-pink-800 transition-colors duration-200 flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          プラン作成に戻る
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-pink-600 mb-4 sm:mb-6">あなたのデートプラン</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-purple-700 mb-2">{aiGeneratedPlan.title}</h2>
            <p className="text-gray-600">{aiGeneratedPlan.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-700 mb-2">スケジュール</h3>
            <ul className="space-y-2">
              {aiGeneratedPlan.schedule.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-16 font-medium text-pink-600">{item.time}</span>
                  <span>{item.activity}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-700 mb-2">アドバイス</h3>
            <p className="text-gray-600">{aiGeneratedPlan.tips}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/" className="btn btn-primary">
            新しいプランを作成
          </Link>
        </div>
      </div>
    </div>
  );
}
