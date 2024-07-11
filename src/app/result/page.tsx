import { Suspense } from 'react';
import PlanResultContent from './PlanResultContent';

export const dynamic = 'force-dynamic';

export default function ResultPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PlanResultContent />
    </Suspense>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-white text-2xl">
      Loading...
    </div>
  );
}
