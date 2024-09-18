'use client';
import { Application } from '@/context/ApplicationContext';
import { useRouterPro } from '@/hooks/useRouterPro';

import SlotBody from './AllTabs';

function ApplicationDetailComp() {
  const router = useRouterPro();
  const job_id = router.params.job as string;
  const application_id = router.params.application as string;

  return (
    <>
      <Application application_id={application_id} job_id={job_id}>
        <SlotBody />
      </Application>
    </>
  );
}

export default ApplicationDetailComp;
