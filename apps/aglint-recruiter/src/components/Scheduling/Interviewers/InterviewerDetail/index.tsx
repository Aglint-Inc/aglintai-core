import { useRouter } from 'next/router';

import { UIPageLayout } from '@/components/Common/UIPageLayout';

import BodyComp from './BodyComp';
import Breadcrumb from './Breadcrumb';
import { useImrQuery } from './hooks';

export type TabInterviewerDetail =
  | 'overview'
  | 'interviewtypes'
  | 'calendar'
  | 'availibility'
  | 'keywords'
  | 'qualified'
  | 'training'
  | 'aglintaiinstruction';

function Interviewer() {
  const router = useRouter();

  const user_id = router.query.user_id as string;

  const { data: interviewerDetails, isLoading } = useImrQuery({ user_id });

  return (
    <>
      <UIPageLayout
        slotTopbarLeft={
          !isLoading && <Breadcrumb interviewerDetails={interviewerDetails} />
        }
        slotBody={<BodyComp />}
      />
    </>
  );
}

export default Interviewer;
