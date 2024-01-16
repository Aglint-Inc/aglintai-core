import { InputAdornment, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { JobsDashboard } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { JobTypeDashboard } from '@/src/context/JobsContext/types';

import EmptyJobDashboard from './AddJobWithIntegrations/EmptyJobDashboard';
import JobsList from './JobsList';
import { searchJobs } from './utils';
import SubNavBar from '../AppLayout/SubNavbar';
import Icon from '../Common/Icons/Icon';
import Loader from '../Common/Loader';
import UITextField from '../Common/UITextField';
import { stepObj } from '../SignUpComp/SlideSignup/utils';

const DashboardComp = () => {
  const router = useRouter();
  const { jobsData, initialLoad } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState<JobTypeDashboard[]>(
    jobsData.jobs?.filter((job: any) => !job.is_campus),
  );
  const { recruiter } = useAuthDetails();

  useEffect(() => {
    if (recruiter?.name === null) {
      router.push(`/signup?step=${stepObj.detailsOne}`, undefined, {
        shallow: true,
      });
    } else {
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
    }
  }, [recruiter, router, jobsData]);

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

  return (
    <Stack height={'100%'} width={'100%'}>
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
            <Stack height={'100%'} direction={'row'}>
              <SubNavBar />
              <JobsDashboard
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
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
};

export default DashboardComp;
