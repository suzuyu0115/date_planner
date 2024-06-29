'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CreatePlan() {
  const [dateType, setDateType] = useState('half-day');
  const [genres, setGenres] = useState<string[]>([]);

  const handleGenreChange = (genre: string) => {
    setGenres(prevGenres =>
      prevGenres.includes(genre)
        ? prevGenres.filter(g => g !== genre)
        : [...prevGenres, genre]
    );
  };

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
              <span className="label-text">タイトル</span>
            </label>
            <input type="text" placeholder="例: ロマンチックな夜景デート" className="input input-bordered w-full" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">場所</span>
            </label>
            <input type="text" placeholder="例: 東京都心" className="input input-bordered w-full" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">デートの種類</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={dateType}
              onChange={(e) => setDateType(e.target.value)}
            >
              <option value="half-day">半日デート</option>
              <option value="full-day">一日デート</option>
              <option value="multi-day">複数日デート</option>
              <option value="specific-time">時間指定</option>
            </select>
          </div>

          {dateType === 'half-day' && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">時間帯</span>
              </label>
              <select className="select select-bordered w-full">
                <option>午前</option>
                <option>午後</option>
                <option>夜</option>
              </select>
            </div>
          )}

          {dateType === 'multi-day' && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">期間</span>
              </label>
              <div className="flex items-center space-x-2">
                <input type="date" className="input input-bordered flex-1" placeholder="開始日" />
                <span className="text-gray-500">〜</span>
                <input type="date" className="input input-bordered flex-1" placeholder="終了日" />
              </div>
            </div>
          )}

          {dateType === 'specific-time' && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">時間</span>
              </label>
              <div className="flex items-center space-x-2">
                <input type="time" className="input input-bordered w-full" />
                <span className="text-gray-500">〜</span>
                <input type="time" className="input input-bordered w-full" />
              </div>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">ジャンル（複数選択可）</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['ロマンチック', 'アクティブ', 'リラックス', 'アウトドア', 'カルチャー', 'グルメ', 'その他'].map((genre) => (
                <label key={genre} className="label cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary mr-2"
                    checked={genres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                  />
                  <span className="label-text">{genre}</span>
                </label>
              ))}
            </div>
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
              <span className="label-text">その他（目的や要望など）</span>
            </label>
            <textarea className="textarea textarea-bordered h-32" placeholder="例: 記念日のサプライズを計画したい、自然を楽しみたいなど"></textarea>
          </div>

          <br />
          <div className="mt-8">
            <Link href="/plan-result" className="btn btn-primary w-full">
              プランを作成する
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
