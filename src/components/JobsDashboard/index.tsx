import { InputAdornment, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { JobsDashboard } from '@/devlink';
import { JobDB } from '@/src/types/data.types';

import CreateNewJob from './CreateNewJob';
import JobPostFormProvider from './CreateNewJob/JobPostFormProvider';
import JobsList from './JobsList';
import { JobType, Status } from './types';
import {
  fetchApplications,
  fetchJobs,
  filterJobsByStatus,
  searchJobs,
} from './utils';
import Loader from '../Common/Loader';
import UITextField from '../Common/UITextField';

const DashboardComp = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>([]);
  const [applications, setApplications] = useState<JobDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedJobs = await fetchJobs();
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

  return (
    <Stack height={'100%'} width={'100%'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <JobsDashboard
            draftCount={filterJobsByStatus(jobs, 'draft').length}
            closedCount={filterJobsByStatus(jobs, 'closed').length}
            interviewingCount={filterJobsByStatus(jobs, 'interviewing').length}
            sourcingCount={filterJobsByStatus(jobs, 'sourcing').length}
            slotAllJobs={
              <JobsList jobs={filteredJobs} applications={applications} />
            }
            slotDraftJobs={
              <JobsList
                jobs={filteredJobs.filter((job) => job.status === 'draft')}
                applications={applications}
              />
            }
            slotClosedJobs={
              <JobsList
                jobs={filteredJobs.filter((job) => job.status === 'closed')}
                applications={applications}
              />
            }
            slotInterviewingJobs={
              <JobsList
                jobs={filteredJobs.filter(
                  (job) => job.status === 'interviewing',
                )}
                applications={applications}
              />
            }
            slotSourcingJobs={
              <JobsList
                jobs={filteredJobs.filter((job) => job.status === 'sourcing')}
                applications={applications}
              />
            }
            slotSearchJobs={
              <UITextField
                placeholder='Search'
                onChange={(e) => {
                  setFilteredJobs(searchJobs(jobs, e.target.value));
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {/* <Icon /> */}
                    </InputAdornment>
                  ),
                }}
              />
            }
            onClickCreateNewJob={{
              onClick: () => {
                setDrawerOpen(true);
              },
            }}
          />
          <JobPostFormProvider>
            <CreateNewJob open={drawerOpen} setDrawerOpen={setDrawerOpen} />
          </JobPostFormProvider>
        </>
      )}
    </Stack>
  );
};

export default DashboardComp;
