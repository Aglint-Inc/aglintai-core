import { InputAdornment, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { JobsDashboard } from '@/devlink/JobsDashboard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { Job } from '@/src/queries/jobs/types';
import ROUTES from '@/src/utils/routing/routes';

import SubNavBar from '../../AppLayout/SubNavbar';
import Loader from '../../Common/Loader';
import UITextField from '../../Common/UITextField';
import { stepObj } from '../../SignUpComp/SlideSignup/utils';
import EmptyJobDashboard from './AddJobWithIntegrations/EmptyJobDashboard';
import FilterJobDashboard, { useJobFilterAndSort } from './Filters';
import JobsList from './JobsList';
import { searchJobs, sortJobs } from './utils';

const DashboardComp = () => {
  const router = useRouter();
  const {
    jobs: { data },
    initialLoad,
  } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(data);
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
        if (data) {
          initialFilterJobs();
        }
      }
    }
  }, [recruiter, router, data]);

  const initialFilterJobs = () => {
    if (router.query.status == 'all') {
      setFilteredJobs(sortJobs(data));
    } else if (router.query.status == 'published') {
      const filter = data.filter((job) => job.status == 'published');
      setFilteredJobs(filter);
    } else if (router.query.status == 'closed') {
      const filter = data.filter((job) => job.status == 'closed');
      setFilteredJobs(filter);
    } else if (router.query.status == 'draft') {
      const filter = data.filter((job) => job.status == 'draft');
      setFilteredJobs(filter);
    } else {
      setFilteredJobs(data);
    }
  };

  const handlerFilter = (e) => {
    if (router.query.status == 'all') {
      setFilteredJobs([...searchJobs(data, e.target.value)]);
    } else if (router.query.status == 'published') {
      const filter = data.filter((job) => job.status == 'published');
      setFilteredJobs([...searchJobs(filter, e.target.value)]);
    } else if (router.query.status == 'closed') {
      const filter = data.filter((job) => job.status == 'closed');
      setFilteredJobs([...searchJobs(filter, e.target.value)]);
    } else if (router.query.status == 'draft') {
      const filter = data.filter((job) => job.status == 'draft');
      setFilteredJobs([...searchJobs(filter, e.target.value)]);
    }
  };

  const {
    jobs,
    filterOptions,
    filterValues,
    setFilterValues,
    setSort,
    sortOptions,
    sortValue,
  } = useJobFilterAndSort(filteredJobs);

  return (
    <Stack height={'100%'} width={'100%'}>
      {!initialLoad ? (
        <Loader />
      ) : (
        <>
          {data?.length == 0 ? (
            <EmptyJobDashboard
              handleClickAddJob={() => {
                router.push(ROUTES['/jobs/create']());
              }}
              heading={'Jobs'}
            />
          ) : (
            <Stack height={'100%'} direction={'row'}>
              <SubNavBar />
              <JobsDashboard
                slotFilters={
                  <FilterJobDashboard
                    filterOptions={filterOptions}
                    filterValues={filterValues}
                    setFilterValues={setFilterValues}
                    setSort={setSort}
                    sortOptions={sortOptions}
                    sortValue={sortValue}
                  />
                }
                slotAllJobs={<JobsList jobs={jobs} />}
                slotSearchInputJob={
                  <Stack>
                    <UITextField
                      width='250px'
                      height={32}
                      placeholder='Search'
                      onChange={(e) => {
                        handlerFilter(e);
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <GlobalIcon iconName='search' size='5' />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Stack>
                }
                textJobsHeader={
                  router.query.status == 'published'
                    ? 'Published Jobs'
                    : router.query.status == 'draft'
                      ? 'Draft Jobs'
                      : router.query.status == 'closed'
                        ? 'Closed Jobs'
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
