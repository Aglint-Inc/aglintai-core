import { Stack } from '@mui/material';
import Popover from '@mui/material/Popover';
import { useRouter } from 'next/router';
import { useEffect, useState, useTransition } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { CreateJob } from '@/devlink/CreateJob';
import { JobsDashboard } from '@/devlink/JobsDashboard';
import { AshbyModalComp } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/Ashby';
import { GreenhouseModal } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/GreenhouseModal';
import LeverModalComp from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/LeverModal';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useIntegration } from '@/src/context/IntegrationProvider/IntegrationProvider';
import {
  STATE_ASHBY_DIALOG,
  STATE_GREENHOUSE_DIALOG,
  STATE_LEVER_DIALOG,
} from '@/src/context/IntegrationProvider/utils';
import { useJobs } from '@/src/context/JobsContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useAllIntegrations } from '@/src/queries/intergrations';
import { Job } from '@/src/queries/jobs/types';
import ROUTES from '@/src/utils/routing/routes';

import Loader from '../../Common/Loader';
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
    manageJob,
    initialLoad,
  } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(data);
  const [searchText, setSearchText] = useState<string>('');
  const [, startTransition] = useTransition();
  const { recruiter } = useAuthDetails();
  const { ifAllowed } = useRolesAndPermissions();

  useEffect(() => {
    if (router.isReady) {
      if (!router.query.status) {
        router.push(`?status=published`, undefined, {
          shallow: true,
        });
      } else if (!manageJob && router.query.status !== 'published')
        router.push(`?status=published`, undefined, {
          shallow: true,
        });
      if (data) {
        initialFilterJobs();
      }
    }
  }, [recruiter, router, data, manageJob]);

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

  const handlerFilter = (value: typeof searchText) => {
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

  // const handleTextClear = () => {
  //   setSearchText('');
  //   startTransition(() => {
  //     if (router.query.status == 'all') {
  //       setFilteredJobs(data);
  //     } else if (router.query.status == 'published') {
  //       setFilteredJobs(data.filter((job) => job.status == 'published'));
  //     } else if (router.query.status == 'closed') {
  //       setFilteredJobs(data.filter((job) => job.status == 'closed'));
  //     } else if (router.query.status == 'draft') {
  //       setFilteredJobs(data.filter((job) => job.status == 'draft'));
  //     }
  //   });
  // };

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
                ['manage_job'],
              )}
            </>
          ) : (
            <Stack height={'100%'} direction={'row'}>
              <JobsDashboard
                slotFilters={
                  <FilterJobDashboard
                    filterOptions={filterOptions}
                    filterValues={filterValues}
                    setFilterValues={setFilterValues}
                    setSort={setSort}
                    sortOptions={sortOptions}
                    sortValue={sortValue}
                    searchText={searchText}
                    handlerFilter={handlerFilter}
                  />
                }
                slotAllJobs={<JobsList jobs={jobs} />}
                slotSearchInputJob={<AddJob />}
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

export function AddJob() {
  const router = useRouter();
  const { setIntegration } = useIntegration();
  const { data: int, isLoading } = useAllIntegrations();
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
              overflow: 'visible !important',
              boxShadow: 'none',
            },
          },
        }}
      >
        {!isLoading && (
          <CreateJob
            isAshbyVisible={!!int.ashby_key}
            isGreenhouseVisible={!!int.greenhouse_key}
            isLeverVisible={!!int.lever_key}
            isEmpty={!(int.ashby_key || int.greenhouse_key || int.lever_key)}
            onClickLinktoIntegration={{
              onClick: () => {
                router.push(ROUTES['/integrations']());
              },
            }}
            onClickAshby={{
              onClick: () => {
                setIntegration((prev) => ({
                  ...prev,
                  ashby: {
                    open: true,
                    step: STATE_ASHBY_DIALOG.LISTJOBS,
                  },
                }));
                setAnchorEl(null);
              },
            }}
            onClickGreenhouse={{
              onClick: () => {
                setIntegration((prev) => ({
                  ...prev,
                  greenhouse: {
                    open: true,
                    step: STATE_GREENHOUSE_DIALOG.LISTJOBS,
                  },
                }));
                setAnchorEl(null);
              },
            }}
            onClickCreateNewJob={{
              onClick: () => {
                setAnchorEl(null);
                router.push(ROUTES['/jobs/create']());
              },
            }}
            onClickLeverImport={{
              onClick: () => {
                setIntegration((prev) => ({
                  ...prev,
                  lever: { open: true, step: STATE_LEVER_DIALOG.LISTJOBS },
                }));
                setAnchorEl(null);
              },
            }}
          />
        )}
      </Popover>

      <LeverModalComp />
      <GreenhouseModal />
      <AshbyModalComp />
      <ButtonSoft
        size={2}
        color={'neutral'}
        textButton={'Add job'}
        isRightIcon
        iconName={'keyboard_arrow_down'}
        onClickButton={{ onClick: handleClick }}
      />
    </>
  );
}
