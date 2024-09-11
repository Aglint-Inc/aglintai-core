import { useRouter } from 'next/router';

import { Application } from '@/context/ApplicationContext';

import { UIPageLayout } from '../Common/UIPageLayout';
import BreadCrumb from './_common/components/BreadCrumb';
import SlotBody from './_common/components/SlotBody';

function ApplicationDetailComp() {
  const router = useRouter();
  const application_id = router.query.application_id as string;
  const job_id = router.query.job as string;

  return (
    <>
      <Application application_id={application_id} job_id={job_id}>
        <UIPageLayout
          slotTopbarLeft={<BreadCrumb />}
          slotBody={<SlotBody />}
          slotTopbarRight={<></>}
        />
      </Application>
    </>
  );
}

export default ApplicationDetailComp;
