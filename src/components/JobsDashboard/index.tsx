import { Dialog, InputAdornment, Popover, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CreateJob, JobsDashboard } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useIntegration } from '@/src/context/IntegrationProvider/IntegrationProvider';
import {
  STATE_ASHBY_DIALOG,
  STATE_GREENHOUSE_DIALOG,
  STATE_LEVER_DIALOG,
} from '@/src/context/IntegrationProvider/utils';
import { useJobs } from '@/src/context/JobsContext';
import { JobTypeDashboard } from '@/src/context/JobsContext/types';

import { AshbyModalComp } from './AddJobWithIntegrations/Ashby';
import EmptyJobDashboard from './AddJobWithIntegrations/EmptyJobDashboard';
import { GreenhouseModal } from './AddJobWithIntegrations/GreenhouseModal';
import { LeverModalComp } from './AddJobWithIntegrations/LeverModal';
import JobsList from './JobsList';
import { searchJobs } from './utils';
import Icon from '../Common/Icons/Icon';
import Loader from '../Common/Loader';
import UITextField from '../Common/UITextField';

const DashboardComp = () => {
  const { recruiter } = useAuthDetails();
  const { setIntegration, integration, handleClose } = useIntegration();
  const router = useRouter();
  const { jobsData, initialLoad } = useJobs();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState<JobTypeDashboard[]>(
    jobsData.jobs?.filter((job: any) => !job.is_campus),
  );

  useEffect(() => {
    if (router.isReady) {
      if (!router.query.status) {
        router.push(`?status=published`, undefined, {
          shallow: true,
        });
      }
      if (jobsData?.jobs) {
        initialFilterJobs();
      }
    }
  }, [router, jobsData]);

  const initialFilterJobs = () => {
    if (router.query.status == 'all') {
      setFilteredJobs(jobsData.jobs);
    } else if (router.query.status == 'published') {
      const filter = jobsData.jobs.filter((job) => job.status == 'published');
      setFilteredJobs(filter);
    } else if (router.query.status == 'closed') {
      const filter = jobsData.jobs.filter((job) => job.status == 'closed');
      setFilteredJobs(filter);
    } else if (router.query.status == 'draft') {
      const filter = jobsData.jobs.filter((job) => job.status == 'draft');
      setFilteredJobs(filter);
    } else {
      setFilteredJobs(jobsData.jobs);
    }
  };

  const handlerFilter = (e) => {
    if (router.query.status == 'all') {
      setFilteredJobs([...searchJobs(jobsData.jobs, e.target.value)]);
    } else if (router.query.status == 'published') {
      const filter = jobsData.jobs.filter((job) => job.status == 'published');
      setFilteredJobs([...searchJobs(filter, e.target.value)]);
    } else if (router.query.status == 'closed') {
      const filter = jobsData.jobs.filter((job) => job.status == 'closed');
      setFilteredJobs([...searchJobs(filter, e.target.value)]);
    } else if (router.query.status == 'draft') {
      const filter = jobsData.jobs.filter((job) => job.status == 'draft');
      setFilteredJobs([...searchJobs(filter, e.target.value)]);
    }
  };

  //popover Add Job
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };
  //popover Add Job

  return (
    <Stack height={'100%'} width={'100%'}>
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
              borderRadius: 'none',
              boxShadow: '0px 4px 8px 0px #04444D26',
            },
          },
        }}
      >
        <CreateJob
          isAshbyVisible={true}
          isGreenhouseVisible={true}
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
              router.push('/jobs/new?flow=manual');
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
      {!initialLoad ? (
        <Loader />
      ) : (
        <>
          {jobsData?.jobs?.filter((job: any) => !job.is_campus)?.length == 0 ? (
            <EmptyJobDashboard
              handleClickAddJob={() => {
                router.push('/jobs/new?flow=manual');
              }}
              heading={'Jobs'}
            />
          ) : (
            <JobsDashboard
              onClickAddJob={{ onClick: handleClick }}
              slotAllJobs={<JobsList jobs={filteredJobs} />}
              slotSearchInputJob={
                <Stack maxWidth={'260px'} width={'100%'}>
                  <UITextField
                    height='42px'
                    fullWidth
                    placeholder='Search'
                    onChange={(e) => {
                      handlerFilter(e);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Icon variant='Search' width='14' height='14' />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              }
              isJobCountTagVisible={filteredJobs?.length > 0}
              jobCount={filteredJobs?.length}
              textJobsHeader={
                router.query.status == 'close'
                  ? 'Closed Jobs'
                  : router.query.status == 'inactive'
                  ? 'Inactive Jobs'
                  : router.query.status == 'active'
                  ? 'Active Jobs'
                  : 'All Jobs'
              }
            />
          )}
        </>
      )}
    </Stack>
  );
};

export default DashboardComp;
