import { InputAdornment, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { JobDashboardEmpty, JobsDashboard } from '@/devlink';
import { useJobs } from '@/src/context/JobsContext';

import CreateNewJob from './CreateNewJob';
import JobPostFormProvider from './CreateNewJob/JobPostFormProvider';
import JobsList from './JobsList';
import { searchJobs, sendEmail } from './utils';
import Icon from '../Common/Icons/Icon';
import Loader from '../Common/Loader';
import UITextField from '../Common/UITextField';

const DashboardComp = () => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { jobsData, initialLoad } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState(jobsData.jobs);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.flow == 'create') {
        setDrawerOpen(true);
      }
      if (jobsData?.jobs) {
        if (router.query.status == 'all') {
          setFilteredJobs(jobsData.jobs);
        } else if (router.query.status == 'active') {
          const filter = jobsData.jobs.filter(
            (job) => job.status == 'sourcing' || job.status == 'interviewing',
          );
          setFilteredJobs(filter);
        } else if (router.query.status == 'close') {
          const filter = jobsData.jobs.filter((job) => job.status == 'closed');
          setFilteredJobs(filter);
        } else if (router.query.status == 'inactive') {
          const filter = jobsData.jobs.filter(
            (job) => job.status == 'inactive',
          );
          setFilteredJobs(filter);
        } else {
          setFilteredJobs(jobsData.jobs);
        }
      }
    }
  }, [router, jobsData]);

  const handlerFilter = (e) => {
    if (router.query.status == 'all') {
      setFilteredJobs([...searchJobs(jobsData.jobs, e.target.value)]);
    } else if (router.query.status == 'active') {
      const filter = jobsData.jobs.filter(
        (job) => job.status == 'sourcing' || job.status == 'interviewing',
      );
      setFilteredJobs([...searchJobs(filter, e.target.value)]);
    } else if (router.query.status == 'close') {
      const filter = jobsData.jobs.filter((job) => job.status == 'closed');
      setFilteredJobs([...searchJobs(filter, e.target.value)]);
    } else if (router.query.status == 'inactive') {
      const filter = jobsData.jobs.filter((job) => job.status == 'inactive');
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
            <JobDashboardEmpty
              onClickAddJob={{
                onClick: () => {
                  setDrawerOpen(true);
                },
              }}
              onClickRequestIntegration={{ onClick: sendEmail }}
            />
          ) : (
            <JobsDashboard
              slotAllJobs={
                <JobsList
                  jobs={filteredJobs}
                  applications={jobsData.applications}
                />
              }
              slotSearchInputJob={
                <Stack maxWidth={'260px'} width={'100%'}>
                  <UITextField
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
              isJobCountTagVisible={filteredJobs.length > 0}
              jobCount={filteredJobs.length}
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
                  setDrawerOpen(true);
                },
              }}
            />
          )}

          <JobPostFormProvider>
            <CreateNewJob
              open={drawerOpen}
              setDrawerOpen={setDrawerOpen}
              // setJobs={setJobs}
            />
          </JobPostFormProvider>
        </>
      )}
    </Stack>
  );
};

export default DashboardComp;
