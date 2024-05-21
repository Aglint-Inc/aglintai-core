import { useRouter } from 'next/router';

import Seo from '@/src/components/Common/Seo';
import SchedulingViewComp from '@/src/components/Scheduling/ScheduleDetails';

function SchedulingViewPage() {
  const {
    query: { tab },
  } = useRouter();
  return (
    <>
      {tab === 'candidate_details' && (
        <Seo title='Candidate Details - Scheduling | Aglint AI' />
      )}
      {tab === 'job_details' && (
        <Seo title='Job Details - Scheduling | Aglint AI' />
      )}
      {tab === 'instructions' && (
        <Seo title='Instructions - Scheduling | Aglint AI' />
      )}
      {/* <Seo
        title={`View - Scheduling | Aglint AI`}
        description='AI for People Products'
      /> */}
      <SchedulingViewComp />
    </>
  );
}

export default SchedulingViewPage;
