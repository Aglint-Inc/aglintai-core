'use client';
import { Application } from '@/context/ApplicationContext';
import { useRouterPro } from '@/hooks/useRouterPro';

import SlotBody from './AllTabs';
import BreadCrumb from './BreadCrumb';

function ApplicationDetailComp() {
  const router = useRouterPro();
  const application_id = router.params.application as string;
  const job_id = router.params.job as string;

  return (
    <>
      <Application application_id={application_id} job_id={job_id}>
        <div className='min-h-screen'>
          <div className='container mx-auto'>
            <div className='mb-6 flex items-center justify-between'>
              <div>
                <h1 className='mb-2 text-2xl font-bold'>Application Details</h1>
                <BreadCrumb />
              </div>
            </div>
            <SlotBody />
          </div>
        </div>
      </Application>
    </>
  );
}

export default ApplicationDetailComp;
