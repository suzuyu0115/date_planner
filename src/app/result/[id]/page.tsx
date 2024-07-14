import PlanResultContent from '../PlanResultContent';

export const dynamic = 'force-dynamic';

export default function ResultPage({ params }: { params: { id: string } }) {
  return <PlanResultContent id={params.id} />;
}
