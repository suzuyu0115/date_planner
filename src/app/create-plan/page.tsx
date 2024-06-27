import Link from 'next/link';

export default function CreatePlan() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-md">
        <Link href="/" className="text-pink-600 hover:text-pink-800 transition-colors duration-200 flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          トップページに戻る
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-pink-600 mb-4 sm:mb-6">デートプランを作成</h1>
        <form className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">希望の日付</span>
            </label>
            <input type="date" className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">予算</span>
            </label>
            <select className="select select-bordered w-full">
              <option disabled selected>予算を選択してください</option>
              <option>〜5,000円</option>
              <option>5,000円〜10,000円</option>
              <option>10,000円〜20,000円</option>
              <option>20,000円〜</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">好みのジャンル</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['ロマンチック', 'アクティブ', 'リラックス', 'アウトドア', 'カルチャー'].map((genre) => (
                <label key={genre} className="label cursor-pointer justify-start">
                  <input type="checkbox" className="checkbox checkbox-primary" />
                  <span className="label-text ml-2">{genre}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">特別な要望</span>
            </label>
            <textarea className="textarea textarea-bordered h-24" placeholder="例: アレルギーがある、記念日など"></textarea>
          </div>
          <Link href="/result" className="btn btn-primary w-full">
            作成する
          </Link>
        </form>
      </div>
    </div>
  );
}
