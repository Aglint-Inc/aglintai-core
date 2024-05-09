import { Dialog, Popover, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { AddNewJob, CreateJob, NavJobSubLink } from '@/devlink';
import { AshbyModalComp } from '@/src/components/JobsDashboard/AddJobWithIntegrations/Ashby';
import { GreenhouseModal } from '@/src/components/JobsDashboard/AddJobWithIntegrations/GreenhouseModal';
import { LeverModalComp } from '@/src/components/JobsDashboard/AddJobWithIntegrations/LeverModal';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useIntegration } from '@/src/context/IntegrationProvider/IntegrationProvider';
import {
  STATE_ASHBY_DIALOG,
  STATE_GREENHOUSE_DIALOG,
  STATE_LEVER_DIALOG,
} from '@/src/context/IntegrationProvider/utils';
import { useJobs } from '@/src/context/JobsContext';
import { pageRoutes } from '@/src/utils/pageRouting';

function JobSubNavbar() {
  const router = useRouter();
  const { jobs } = useJobs();

  return (
    <Stack
      paddingTop={'12px !important'}
      spacing={'22px'}
      p={'12px 10px'}
      width={200}
      borderRight={'1px solid'}
      borderColor={'grey.200'}
    >
      <AddJob />
      <NavJobSubLink
        onClickJobAll={{
          onClick: () => router.push(`${pageRoutes.JOBS}?status=all`),
        }}
        onClickJobActive={{
          onClick: () => router.push(`${pageRoutes.JOBS}?status=published`),
        }}
        onClickJobInactive={{
          onClick: () => router.push(`${pageRoutes.JOBS}?status=draft`),
        }}
        onClickJobClosed={{
          onClick: () => router.push(`${pageRoutes.JOBS}?status=closed`),
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
  const { recruiter } = useAuthDetails();
  const { setIntegration, integration, handleClose } = useIntegration();

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
              borderRadius: '10px',
              overflow: 'visible !important',
              background: 'transparent',
            },
          },
        }}
      >
        <CreateJob
          isGreenhouseConnected={recruiter.greenhouse_key ? true : false}
          isAshbyConnected={recruiter.ashby_key ? true : false}
          isLeverConnected={recruiter.lever_key ? true : false}
          isAshbyVisible={
            !(
              recruiter.ashby_key ||
              recruiter.greenhouse_key ||
              recruiter.lever_key
            ) || recruiter.ashby_key
              ? true
              : false
          }
          isGreenhouseVisible={
            !(
              recruiter.ashby_key ||
              recruiter.greenhouse_key ||
              recruiter.lever_key
            ) || recruiter.greenhouse_key
              ? true
              : false
          }
          isLeverVisible={
            !(
              recruiter.ashby_key ||
              recruiter.greenhouse_key ||
              recruiter.lever_key
            ) || recruiter.lever_key
              ? true
              : false
          }
          onClickAshby={{
            onClick: () => {
              if (!recruiter.ashby_key) {
                setIntegration((prev) => ({
                  ...prev,
                  ashby: {
                    open: true,
                    step: STATE_ASHBY_DIALOG.API,
                  },
                }));
              } else {
                setIntegration((prev) => ({
                  ...prev,
                  ashby: {
                    open: true,
                    step: STATE_ASHBY_DIALOG.LISTJOBS,
                  },
                }));
              }
            },
          }}
          onClickGreenhouse={{
            onClick: () => {
              if (!recruiter.greenhouse_key) {
                setIntegration((prev) => ({
                  ...prev,
                  greenhouse: {
                    open: true,
                    step: STATE_GREENHOUSE_DIALOG.API,
                  },
                }));
              } else {
                setIntegration((prev) => ({
                  ...prev,
                  greenhouse: {
                    open: true,
                    step: STATE_GREENHOUSE_DIALOG.LISTJOBS,
                  },
                }));
              }
            },
          }}
          onClickCreateNewJob={{
            onClick: () => {
              router.push(pageRoutes.CREATEJOB);
            },
          }}
          onClickLeverImport={{
            onClick: () => {
              if (!recruiter.lever_key) {
                setIntegration((prev) => ({
                  ...prev,
                  lever: { open: true, step: STATE_LEVER_DIALOG.API },
                }));
              } else {
                setIntegration((prev) => ({
                  ...prev,
                  lever: { open: true, step: STATE_LEVER_DIALOG.LISTJOBS },
                }));
              }
            },
          }}
        />
      </Popover>

      <Dialog
        open={integration.lever.open}
        onClose={handleClose}
        maxWidth={'lg'}
      >
        <LeverModalComp />
      </Dialog>
      <Dialog
        open={integration.greenhouse.open}
        onClose={handleClose}
        maxWidth={'lg'}
      >
        <GreenhouseModal />
      </Dialog>
      <Dialog
        open={integration.ashby.open}
        onClose={handleClose}
        maxWidth={'lg'}
      >
        <AshbyModalComp />
      </Dialog>
      <AddNewJob
        onClickAdd={{
          onClick: handleClick,
        }}
      />
    </>
  );
}
