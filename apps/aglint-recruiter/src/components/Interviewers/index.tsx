import { useRouter } from 'next/router';

import { ShowCode } from '@/src/components/Common/ShowCode';

import InterviewLoad from './InterviewLoad';
import { interviewersTab } from './types';

function Interviewers() {
  const router = useRouter();
  const tab = router.query.tab as interviewersTab;
  return (
    <ShowCode>
      <ShowCode.When isTrue={tab === 'availability'}>
        Availability
      </ShowCode.When>
      <ShowCode.When isTrue={tab === 'interview_load'}>
        <InterviewLoad />
      </ShowCode.When>
      <ShowCode.When isTrue={tab === 'metrics'}>Metrics</ShowCode.When>
      <ShowCode.When isTrue={tab === 'training'}>Training</ShowCode.When>
    </ShowCode>
  );
}

export default Interviewers;
