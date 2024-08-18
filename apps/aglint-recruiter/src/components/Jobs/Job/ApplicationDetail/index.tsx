import { useRouter } from 'next/router';

import { PageLayout } from '@/devlink2/PageLayout';

import BreadCrumb from './BreadCrumb';
import SlotBody from './SlotBody';

function ApplicationDetailComp() {
  const router = useRouter();

  const application_id = router.query.application_id as string;
  const job_id = router.query.id as string;

  return (
    <>
      <PageLayout
        slotTopbarLeft={
          <BreadCrumb application_id={application_id} job_id={job_id} />
        }
        slotBody={<SlotBody application_id={application_id} job_id={job_id} />}
      />
    </>
  );
}

export default ApplicationDetailComp;
