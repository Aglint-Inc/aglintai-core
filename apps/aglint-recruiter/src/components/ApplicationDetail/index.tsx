import { useRouter } from 'next/router';

import { Application } from '@/context/ApplicationContext';

import BreadCrumb from './_common/components/BreadCrumb';
import SlotBody from './_common/components/SlotBody';

function ApplicationDetailComp() {
  const router = useRouter();
  const application_id = router.query.application_id as string;
  const job_id = router.query.job as string;

  return (
    <>
      <Application application_id={application_id} job_id={job_id}>
        <div className='min-h-screen'>
          <div className='container mx-auto'>
            <div className='flex justify-between items-center mb-6'>
              <div>
                <h1 className='text-2xl font-bold mb-2'>Application Details</h1>
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
