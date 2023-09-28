import { InputAdornment, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { JobDashboardEmpty, JobsDashboard } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { JobDB } from '@/src/types/data.types';

import CreateNewJob from './CreateNewJob';
import JobPostFormProvider from './CreateNewJob/JobPostFormProvider';
import JobsList from './JobsList';
import { JobType, Status } from './types';
import { fetchApplications, fetchJobs, searchJobs, sendEmail } from './utils';
import Icon from '../Common/Icons/Icon';
import Loader from '../Common/Loader';
import UITextField from '../Common/UITextField';

const DashboardComp = () => {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>([]);
  const [applications, setApplications] = useState<JobDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedJobs = await fetchJobs(recruiter.id);
      setJobs(
        fetchedJobs.map((job) => {
          return { ...job, status: job.status as unknown as Status };
        }),
      );
      setFilteredJobs(
        fetchedJobs.map((job) => {
          return { ...job, status: job.status as unknown as Status };
        }),
      );
      const jobIds = fetchedJobs.map((job) => {
        return job.id;
      });
      const fetchedApplications = await fetchApplications(jobIds);
      setApplications(fetchedApplications);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (router.isReady && router.query.flow == 'create') {
      setDrawerOpen(true);
    }
  }, [router]);

 

  return (
    <Stack height={'100%'} width={'100%'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {jobs.length == 0 ? (
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
                <JobsList jobs={filteredJobs} applications={applications} />
              }
              // slotDraftJobs={
              //   <JobsList
              //     jobs={filteredJobs.filter((job) => job.status === 'draft')}
              //     applications={applications}
              //   />
              // }
              // slotClosedJobs={
              //   <JobsList
              //     jobs={filteredJobs.filter((job) => job.status === 'closed')}
              //     applications={applications}
              //   />
              // }
              // slotInterviewingJobs={
              //   <JobsList
              //     jobs={filteredJobs.filter(
              //       (job) => job.status === 'interviewing',
              //     )}
              //     applications={applications}
              //   />
              // }
              slotSearchInputJob={
                <Stack maxWidth={'260px'} width={'100%'}>
                  <UITextField
                    fullWidth
                    placeholder='Search'
                    onChange={(e) => {
                      setFilteredJobs(searchJobs(jobs, e.target.value));
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
              textJobsHeader={''}
              onClickCreateNewJob={{
                onClick: () => {
                  setDrawerOpen(true);
                },
              }}
            />
          )}

          <JobPostFormProvider setJobs={setJobs}>
            <CreateNewJob
              open={drawerOpen}
              setDrawerOpen={setDrawerOpen}
              setJobs={setJobs}
            />
          </JobPostFormProvider>
        </>
      )}
    </Stack>
  );
};

export default DashboardComp;
