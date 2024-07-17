import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState, useTransition } from 'react';

import { JobsDashboard } from '@/devlink/JobsDashboard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { Job } from '@/src/queries/jobs/types';
import ROUTES from '@/src/utils/routing/routes';

import SubNavBar from '../../AppLayout/SubNavbar';
import Loader from '../../Common/Loader';
import SearchField from '../../Common/SearchField/SearchField';
import EmptyJobDashboard from './AddJobWithIntegrations/EmptyJobDashboard';
import FilterJobDashboard, { useJobFilterAndSort } from './Filters';
import JobsList from './JobsList';
import { searchJobs, sortJobs } from './utils';

export const initalFilterValue = {
  status: [],
  location: [],
  type: [],
  hiringManager: [],
  recruiter: [],
  source: [],
  department: [],
  workplace: [],
  coOrdinator: [],
};

const DashboardComp = () => {
  const router = useRouter();
  const {
    jobs: { data },
    initialLoad,
  } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(data);
  const [searchText, setSearchText] = useState<string>();
  const [, startTransition] = useTransition();
  const { recruiter } = useAuthDetails();
  const { ifAllowed } = useRolesAndPermissions();

  useEffect(() => {
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

  const {
    jobs,
    filterOptions,
    filterValues,
    setFilterValues,
    setSort,
    sortOptions,
    sortValue,
  } = useJobFilterAndSort(filteredJobs);

  const handlerFilter = (e) => {
    const value = e.target.value;
    setSearchText(value);
    startTransition(() => {
      if (router.query.status == 'all') {
        setFilteredJobs([...searchJobs(data, value)]);
      } else if (router.query.status == 'published') {
        const filter = data.filter((job) => job.status == 'published');
        setFilteredJobs([...searchJobs(filter, value)]);
      } else if (router.query.status == 'closed') {
        const filter = data.filter((job) => job.status == 'closed');
        setFilteredJobs([...searchJobs(filter, value)]);
      } else if (router.query.status == 'draft') {
        const filter = data.filter((job) => job.status == 'draft');
        setFilteredJobs([...searchJobs(filter, value)]);
      }
    });
  };

  const handleTextClear = () => {
    setSearchText('');
    startTransition(() => {
      if (router.query.status == 'all') {
        setFilteredJobs(data);
      } else if (router.query.status == 'published') {
        setFilteredJobs(data.filter((job) => job.status == 'published'));
      } else if (router.query.status == 'closed') {
        setFilteredJobs(data.filter((job) => job.status == 'closed'));
      } else if (router.query.status == 'draft') {
        setFilteredJobs(data.filter((job) => job.status == 'draft'));
      }
    });
  };

  return (
    <Stack height={'100%'} width={'100%'}>
      {!initialLoad ? (
        <Loader />
      ) : (
        <>
          {data?.length == 0 ? (
            <>
              {ifAllowed(
                <EmptyJobDashboard
                  handleClickAddJob={() => {
                    router.push(ROUTES['/jobs/create']());
                  }}
                  heading={'Jobs'}
                />,
                ['job_create'],
              )}
            </>
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
                    <SearchField
                      value={searchText}
                      onChange={handlerFilter}
                      onClear={handleTextClear}
                      placeholder='Search'
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
