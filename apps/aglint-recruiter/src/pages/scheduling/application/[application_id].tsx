import Seo from '@/src/components/Common/Seo';
import SchedulingApplication from '@/src/components/Scheduling/CandidateDetails';

export default function SchedulingApplicationPage() {
  return (
    <>
      <Seo
        title={`Application - Scheduling | Aglint AI`}
        description='AI for People Products'
      />
      <SchedulingApplication />
    </>
  );
}
