import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import Loader from '@/src/components/Common/Loader';
import { useJobs } from '@/src/context/JobsContext';
import { useCurrentJob } from '@/src/queries/job-assessment/keys';
import ROUTES from '@/src/utils/routing/routes';
import { capitalize } from '@/src/utils/text/textUtils';

import JobWorkflow from './list';

const JobWorkflowDashboard = () => {
  const { initialLoad } = useJobs();
  return (
    <Stack height={'100%'} width={'100%'}>
      {!initialLoad ? (
        <Loader />
      ) : (
        <PageLayout
          slotTopbarLeft={<BreadCrumbs />}
          slotTopbarRight={<></>}
          slotBody={<JobWorkflow />}
        />
      )}
    </Stack>
  );
};

export default JobWorkflowDashboard;

const BreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useCurrentJob();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalize(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            push(ROUTES['/jobs']() + `?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' },
        }}
      />
      <Breadcrum
        isLink
        textName={capitalize(job?.job_title ?? 'Job')}
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
