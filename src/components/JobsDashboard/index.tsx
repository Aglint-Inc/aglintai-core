import { InputAdornment, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { JobsDashboard } from '@/devlink';
import { useJobs } from '@/src/context/JobsContext';
import { JobType } from '@/src/types/data.types';

import EmptyJobDashboard from './EmptyJobDashboard';
import JobsList from './JobsList';
import { searchJobs } from './utils';
import Icon from '../Common/Icons/Icon';
import Loader from '../Common/Loader';
import UITextField from '../Common/UITextField';

const DashboardComp = () => {
  const router = useRouter();
  const { jobsData, initialLoad } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>(
    jobsData.jobs?.filter((job) => !job.is_campus),
  );

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

  return (
    <Stack height={'100%'} width={'100%'}>
      {!initialLoad ? (
        <Loader />
      ) : (
        <>
          {jobsData?.jobs?.length == 0 ? (
            <EmptyJobDashboard
              heading={'Jobs'}
              handleClickAddJob={() => {
                router.push(`/jobs/new?flow=manual`);
              }}
            />
          ) : (
            <JobsDashboard
              slotAllJobs={
                <JobsList
                  jobs={filteredJobs}
                  applications={jobsData?.applications}
                />
              }
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
              onClickCreateNewJob={{
                onClick: () => {
                  router.push('/jobs/new');
                },
              }}
            />
          )}
        </>
      )}
    </Stack>
  );
};

export default DashboardComp;
