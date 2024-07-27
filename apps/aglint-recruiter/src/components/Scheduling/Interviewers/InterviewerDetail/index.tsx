import { useRouter } from 'next/router';

import { PageLayout } from '@/devlink2/PageLayout';

import BodyComp from './BodyComp';
import Breadcrumb from './Breadcrumb';
import { useImrQuery } from './hooks';

export type TabInterviewerDetail =
  | 'overview'
  | 'interviewtypes'
  | 'allschedules'
  | 'availibility'
  | 'keywords';

function Interviewer() {
  const router = useRouter();

  const user_id = router.query.member_id as string;

  const { data: interviewerDetails } = useImrQuery({ user_id });

  return (
    <>
      <PageLayout
        slotTopbarLeft={<Breadcrumb interviewerDetails={interviewerDetails} />}
        slotBody={<BodyComp />}
      />
    </>
  );
}

export default Interviewer;
