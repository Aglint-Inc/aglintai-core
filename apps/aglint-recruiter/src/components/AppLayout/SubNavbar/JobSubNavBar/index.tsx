import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';

import { NavJobSubLink } from '@/devlink/NavJobSubLink';
import { AddJob } from '@/src/components/Jobs/Dashboard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import ROUTES from '@/src/utils/routing/routes';

function JobSubNavbar() {
  const router = useRouter();
  const { jobs } = useJobs();
  const { userPermissions } = useAuthDetails();
  return (
    <Stack
      paddingTop={'12px !important'}
      spacing={'22px'}
      p={'12px 10px'}
      width={200}
      borderRight={'1px solid'}
      borderColor='var(--neutral-6)'
    >
      {userPermissions?.permissions['manage_job'] && <AddJob />}
      <NavJobSubLink
        onClickJobAll={{
          onClick: () => router.push(`${ROUTES['/jobs']()}?status=all`),
        }}
        onClickJobActive={{
          onClick: () => router.push(`${ROUTES['/jobs']()}?status=published`),
        }}
        onClickJobInactive={{
          onClick: () => router.push(`${ROUTES['/jobs']()}?status=draft`),
        }}
        onClickJobClosed={{
          onClick: () => router.push(`${ROUTES['/jobs']()}?status=closed`),
        }}
        isJobAll={router.query.status === 'all'}
        activeCount={
          jobs.data.filter((job) => job.status == 'published').length || 0
        }
        allCount={jobs.data.length || 0}
        inActiveCount={
          jobs.data.filter((job) => job.status == 'draft').length || 0
        }
        closedCount={
          jobs.data.filter((job) => job.status == 'closed').length || 0
        }
        isJobActive={router.query.status === 'published'}
        isJobInactive={router.query.status === 'draft'}
        isJobClosed={router.query.status === 'closed'}
      />
    </Stack>
  );
}

export default JobSubNavbar;
