import { Popover, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { AddNewJob } from '@/devlink/AddNewJob';
import { CreateJob } from '@/devlink/CreateJob';
import { NavJobSubLink } from '@/devlink/NavJobSubLink';
import { AshbyModalComp } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/Ashby';
import { GreenhouseModal } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/GreenhouseModal';
import LeverModalComp from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/LeverModal';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useIntegration } from '@/src/context/IntegrationProvider/IntegrationProvider';
import {
  STATE_ASHBY_DIALOG,
  STATE_GREENHOUSE_DIALOG,
  STATE_LEVER_DIALOG,
} from '@/src/context/IntegrationProvider/utils';
import { useJobs } from '@/src/context/JobsContext';
import { useAllIntegrations } from '@/src/queries/intergrations';
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

function AddJob() {
  const router = useRouter();
  const { setIntegration } = useIntegration();
  const { data: int, isLoading } = useAllIntegrations();
  const [anchorEl, setAnchorEl] = useState(null);

  //popover Add Job
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Popover
        id='add-job'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{ vertical: -14, horizontal: 0 }}
        slotProps={{
          paper: {
            style: {
              border: 'none',
              overflow: 'visible !important',
              boxShadow: 'none',
            },
          },
        }}
      >
        {!isLoading && (
          <CreateJob
            isAshbyVisible={!!int.ashby_key}
            isGreenhouseVisible={!!int.greenhouse_key}
            isLeverVisible={!!int.lever_key}
            isEmpty={!(int.ashby_key || int.greenhouse_key || int.lever_key)}
            onClickLinktoIntegration={{
              onClick: () => {
                router.push(ROUTES['/integrations']());
              },
            }}
            onClickAshby={{
              onClick: () => {
                setIntegration((prev) => ({
                  ...prev,
                  ashby: {
                    open: true,
                    step: STATE_ASHBY_DIALOG.LISTJOBS,
                  },
                }));
                setAnchorEl(null);
              },
            }}
            onClickGreenhouse={{
              onClick: () => {
                setIntegration((prev) => ({
                  ...prev,
                  greenhouse: {
                    open: true,
                    step: STATE_GREENHOUSE_DIALOG.LISTJOBS,
                  },
                }));
                setAnchorEl(null);
              },
            }}
            onClickCreateNewJob={{
              onClick: () => {
                setAnchorEl(null);
                router.push(ROUTES['/jobs/create']());
              },
            }}
            onClickLeverImport={{
              onClick: () => {
                setIntegration((prev) => ({
                  ...prev,
                  lever: { open: true, step: STATE_LEVER_DIALOG.LISTJOBS },
                }));
                setAnchorEl(null);
              },
            }}
          />
        )}
      </Popover>

      <LeverModalComp />
      <GreenhouseModal />
      <AshbyModalComp />
      <AddNewJob
        onClickAdd={{
          onClick: handleClick,
        }}
      />
    </>
  );
}
