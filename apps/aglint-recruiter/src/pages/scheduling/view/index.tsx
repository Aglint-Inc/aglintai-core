import { useRouter } from 'next/router';
import SchedulingViewComp from 'src/app/(authenticated)/_scheduling/view';

import Seo from '@/components/Common/Seo';

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

      <SchedulingViewComp />
    </>
  );
}

export default SchedulingViewPage;
