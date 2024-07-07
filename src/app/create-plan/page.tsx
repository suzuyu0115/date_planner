'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreatePlan() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    location: '',
    dateType: 'half-day',
    budget: '',
    preferences: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to generate plan');

      const { plan } = await response.json();

      router.push(`/result?plan=${encodeURIComponent(plan)}`);
    } catch (error) {
      console.error('Error generating plan:', error);
    }
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
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-pink-600 mb-4 sm:mb-6">
          デートプランを作成
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">場所</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="例: 東京都心、京都、横浜など"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">デートの種類</span>
            </label>
            <select
              name="dateType"
              value={formData.dateType}
              onChange={handleInputChange}
              className="select select-bordered w-full"
              required
            >
              <option value="half-day">半日デート</option>
              <option value="full-day">一日デート</option>
              <option value="evening">夜デート</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">予算</span>
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">選択してください</option>
              <option value="low">〜5,000円</option>
              <option value="medium">5,000円〜10,000円</option>
              <option value="high">10,000円〜</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">好みや要望</span>
            </label>
            <textarea
              name="preferences"
              value={formData.preferences}
              onChange={handleInputChange}
              className="textarea textarea-bordered h-24"
              placeholder="例: 自然が好き、美味しい食事がしたい、アクティブなデートがいい、など"
            ></textarea>
          </div>

          <div className="mt-6">
            <button type="submit" className="btn btn-primary w-full">
              プランを作成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
