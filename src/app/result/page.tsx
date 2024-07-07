'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function PlanResult() {
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam) {
      try {
        const decodedPlan = decodeURIComponent(planParam);
        setPlan(decodedPlan);
      } catch (error) {
        console.error('Error decoding plan:', error);
        setPlan('プランのデコードに失敗しました。');
      }
    }
  }, [searchParams]);

  if (!plan) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-2xl">
        <Link
          href="/create-plan"
          className="text-pink-600 hover:text-pink-800 transition-colors duration-200 flex items-center mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          プラン作成に戻る
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-pink-600 mb-4 sm:mb-6">
          あなたのデートプラン
        </h1>

        <div className="space-y-6 text-gray-800 bg-pink-50 p-4 rounded-lg shadow">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-2" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-semibold mb-2" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-medium mb-1" {...props} />,
              p: ({node, ...props}) => <p className="mb-2" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2" {...props} />,
              li: ({node, ...props}) => <li className="mb-1" {...props} />,
              a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
            }}
          >
            {plan}
          </ReactMarkdown>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/create-plan" className="btn btn-primary bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
            新しいプランを作成
          </Link>
        </div>
      </div>
    </div>
  );
}
