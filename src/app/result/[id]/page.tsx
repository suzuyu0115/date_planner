import { getPlan } from '@/utils/planStorage';
import PlanResultContent from '../PlanResultContent';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function ResultPage({ params }: { params: { id: string } }) {
  const planData = getPlan(params.id);

  if (!planData) {
    notFound();
  }

  return <PlanResultContent id={params.id} />;
}
