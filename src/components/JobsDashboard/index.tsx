import { Dialog, InputAdornment, Popover, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CreateJob, JobsDashboard } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { JobTypeDashboard } from '@/src/context/JobsContext/types';

import EmptyJobDashboard, {
  STATE_LEVER_DIALOG,
} from './AddJobWithIntegrations/EmptyJobDashboard';
import { LeverModalComp } from './AddJobWithIntegrations/LeverModal';
import JobsList from './JobsList';
import { searchJobs } from './utils';
import Icon from '../Common/Icons/Icon';
import Loader from '../Common/Loader';
import UITextField from '../Common/UITextField';

const DashboardComp = () => {
  const { recruiter } = useAuthDetails();
  const router = useRouter();
  const { jobsData, initialLoad } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState<JobTypeDashboard[]>(
    jobsData.jobs?.filter((job) => !job.is_campus),
  );
  const [isLeverOpen, setIsLeverOpen] = useState(false);
  const [state, setState] = useState(STATE_LEVER_DIALOG.INITIAL);

  useEffect(() => {
    if (router.isReady) {
      if (!router.query.status) {
        router.push(`?status=active`, undefined, {
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
      setFilteredJobs(jobsData.jobs.filter((job) => !job.is_campus));
    } else if (router.query.status == 'active') {
      const filter = jobsData.jobs.filter(
        (job) =>
          !job.is_campus &&
          (job.active_status.interviewing.isActive ||
            job.active_status.sourcing.isActive) &&
          !job.active_status.closed.isActive,
      );
      setFilteredJobs(filter);
    } else if (router.query.status == 'close') {
      const filter = jobsData.jobs.filter((job) => {
        return !job.is_campus && job.active_status.closed.isActive;
      });
      setFilteredJobs(filter);
    } else if (router.query.status == 'inactive') {
      const filter = jobsData.jobs.filter(
        (job) =>
          !job.is_campus &&
          !(
            job.active_status.interviewing.isActive ||
            job.active_status.sourcing.isActive
          ) &&
          !job.active_status.closed.isActive,
      );
      setFilteredJobs(filter);
    } else {
      setFilteredJobs(jobsData.jobs.filter((job) => !job.is_campus));
    }
  };

  const handlerFilter = (e) => {
    if (router.query.status == 'all') {
      setFilteredJobs([
        ...searchJobs(
          jobsData.jobs.filter((job) => !job.is_campus),
          e.target.value,
        ),
      ]);
    } else if (router.query.status == 'active') {
      const filter = jobsData.jobs.filter(
        (job) =>
          !job.is_campus &&
          (job.active_status.interviewing.isActive ||
            job.active_status.sourcing.isActive) &&
          !job.active_status.closed.isActive,
      );
      setFilteredJobs([...searchJobs(filter, e.target.value)]);
    } else if (router.query.status == 'close') {
      const filter = jobsData.jobs.filter(
        (job) => !job.is_campus && job.active_status.closed.isActive,
      );
      setFilteredJobs([...searchJobs(filter, e.target.value)]);
    } else if (router.query.status == 'inactive') {
      const filter = jobsData.jobs.filter(
        (job) =>
          !job.is_campus &&
          !(
            job.active_status.interviewing.isActive ||
            job.active_status.sourcing.isActive
          ) &&
          !job.active_status.closed.isActive,
      );
      setFilteredJobs([...searchJobs(filter, e.target.value)]);
    }
  };

  const handleCloseLever = () => {
    setIsLeverOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Stack height={'100%'} width={'100%'}>
      <Popover
        id='add-job'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
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
          onClickCreateNewJob={{
            onClick: () => {
              router.push('/jobs/new?flow=manual');
            },
          }}
          onClickLeverImport={{
            onClick: () => {
              if (!recruiter.lever_key) {
                setState(STATE_LEVER_DIALOG.API);
                setIsLeverOpen(true);
              } else {
                setState(STATE_LEVER_DIALOG.LISTJOBS);
                setIsLeverOpen(true);
              }
            },
          }}
        />
      </Popover>
      <Dialog open={isLeverOpen} onClose={handleClose} maxWidth={'lg'}>
        <LeverModalComp
          state={state}
          handleClose={handleCloseLever}
          setState={setState}
          setIsLeverOpen={setIsLeverOpen}
        />
      </Dialog>
      {!initialLoad ? (
        <Loader />
      ) : (
        <>
          {jobsData?.jobs?.filter((job) => !job.is_campus)?.length == 0 ? (
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
