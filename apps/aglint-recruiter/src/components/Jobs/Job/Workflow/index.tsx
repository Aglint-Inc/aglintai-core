import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { Breadcrum } from '@/devlink2/Breadcrum';
import { ButtonSolid } from '@/devlink2/ButtonSolid';
import { PageLayout } from '@/devlink2/PageLayout';
import Loader from '@/src/components/Common/Loader';
import { useJob } from '@/src/context/JobContext';
import { useJobDashboard } from '@/src/context/JobDashboard';
import { useJobDashboardStore } from '@/src/context/JobDashboard/store';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeSentence } from '@/src/utils/text/textUtils';

import JobNotFound from '../Common/JobNotFound';
import JobWorkflow from './list';

const JobWorkflowDashboard = () => {
  const { jobLoad, job } = useJob();

  return jobLoad ? (
    job && job?.status !== 'closed' ? (
      <PageLayout
        slotTopbarLeft={<BreadCrumbs />}
        slotTopbarRight={<Actions />}
        slotBody={<JobWorkflow />}
      />
    ) : (
      <JobNotFound />
    )
  ) : (
    <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
      <Loader />
    </Stack>
  );
};

export default JobWorkflowDashboard;

const BreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useJob();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalizeSentence(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            push(ROUTES['/jobs']() + `?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' },
        }}
      />
      <Breadcrum
        isLink
        textName={capitalizeSentence(job?.job_title ?? 'Job')}
        onClickLink={{
          onClick: () => {
            push(ROUTES['/jobs/[id]']({ id: job?.id }));
          },
          style: { cursor: 'pointer' },
        }}
        showArrow
      />
      <Breadcrum textName={`Workflows`} showArrow />
    </>
  );
};

const Actions = () => {
  const { manageJob } = useJobDashboard();
  const { setPopup } = useJobDashboardStore(({ setPopup }) => ({
    setPopup,
  }));
  return (
    <>
      {manageJob && (
        <ButtonSolid
          textButton='Add Workflow'
          size={2}
          iconName='bolt'
          isLeftIcon
          onClickButton={{ onClick: () => setPopup({ open: true }) }}
        />
      )}
    </>
  );
};
