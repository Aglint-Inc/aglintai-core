import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import Loader from '@/src/components/Common/Loader';
import { useJob } from '@/src/context/JobContext';
import { useJobs } from '@/src/context/JobsContext';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeSentence } from '@/src/utils/text/textUtils';

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
