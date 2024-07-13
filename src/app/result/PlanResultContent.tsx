'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface PlanSpot {
  name: string;
  time: string;
  budget: string;
  details: string;
  mapUrl: string;
}

interface DatePlan {
  title: string;
  overview: string;
  spots: PlanSpot[];
  advice: string;
  totalBudget: string;
}

export default function PlanResultContent() {
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<DatePlan | null>(null);

  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam) {
      try {
        const decodedPlan = JSON.parse(decodeURIComponent(planParam));
        setPlan(decodedPlan);
      } catch (error) {
        console.error('Error decoding plan:', error);
        setPlan(null);
      }
    }
  }, [searchParams]);

  if (!plan) {
    return null;
  }

  // const sharePlan = () => {
  //   const text = `${plan.title}\n${plan.overview}\n#デートプラン`;
  //   const url = window.location.href;
  //   window.open(
  //     `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  //     '_blank'
  //   );
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <Link
            href="/"
            className="inline-block mb-6 text-pink-500 hover:text-pink-600 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 inline-block mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            トップページに戻る
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-pink-600 mb-6">
            {plan.title}
          </h1>

          <div className="bg-pink-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2 text-pink-700">概要</h2>
            <p className="text-gray-700">{plan.overview}</p>
          </div>

          <div className="mb-6 space-y-4">
            {plan.spots.map((spot, index) => (
              <div key={index}>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="text-lg font-semibold text-pink-600 mb-2">
                    {spot.time}
                  </div>
                  <h3 className="text-xl font-bold text-pink-700 mb-2">
                    {spot.name}
                  </h3>
                  <p className="text-gray-600 mb-2">予算: {spot.budget}</p>
                  <p className="text-gray-700 mb-4">{spot.details}</p>
                  <a
                    href={spot.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300"
                  >
                    地図で見る
                  </a>
                </div>
                {index < plan.spots.length - 1 && (
                  <div className="flex justify-center my-4">
                    <svg
                      className="w-8 h-8 text-pink-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-pink-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2 text-pink-700">
              アドバイス
            </h2>
            <ReactMarkdown className="text-gray-700">
              {plan.advice}
            </ReactMarkdown>
          </div>

          <div className="bg-pink-600 text-white p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">総予算</h2>
            <p>{plan.totalBudget}</p>
          </div>

          {/* <div className="text-center">
            <button
              onClick={sharePlan}
              className="bg-white text-pink-500 font-bold py-2 px-6 rounded-full text-lg hover:bg-pink-100 transition duration-300 shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-twitter-x inline-block mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
              </svg>
              プランをシェア
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
