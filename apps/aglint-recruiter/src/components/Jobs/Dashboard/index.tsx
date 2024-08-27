import { Popover, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { CreateJob } from '@/devlink/CreateJob';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { JobsDashboard } from '@/devlink/JobsDashboard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import ROUTES from '@/src/utils/routing/routes';

import Loader from '../../Common/Loader';
import EmptyJobDashboard from './AddJobWithIntegrations/EmptyJobDashboard';
import FilterJobDashboard, { useJobFilterAndSort } from './Filters';
import JobsList from './JobsList';

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
    manageJob,
    jobs: { data },
    initialLoad,
  } = useJobs();
  const { ifAllowed } = useRolesAndPermissions();

  const {
    jobs,
    filterOptions,
    filterValues,
    setFilterValues,
    setSort,
    sortOptions,
    sortValue,
    searchText,
    setSearchText,
  } = useJobFilterAndSort(data);

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
                    handlerFilter={setSearchText}
                  />
                }
                slotAllJobs={<JobsList jobs={jobs} />}
                slotSearchInputJob={manageJob && <AddJob />}
                textJobsHeader={'Jobs'}
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
  const { recruiter } = useAuthDetails();
  // const { data: int, isLoading } = useAllIntegrations();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClosePop = () => {
    setAnchorEl(null);
  };
  return (
    <Stack direction={'row'} gap={1}>
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
        {
          <CreateJob
            isAshbyVisible={false}
            isGreenhouseVisible={false}
            isLeverVisible={false}
            isEmpty={false}
            onClickCreateNewJob={{
              onClick: () => {
                setAnchorEl(null);
                router.push(ROUTES['/jobs/create']());
              },
            }}
            // onClickLinktoIntegration={{
            //   onClick: () => {
            //     router.push(ROUTES['/integrations']());
            //   },
            // }}
            // onClickAshby={{
            //   onClick: () => {
            //     setIntegration((prev) => ({
            //       ...prev,
            //       ashby: {
            //         open: true,
            //         step: STATE_ASHBY_DIALOG.LISTJOBS,
            //       },
            //     }));
            //     setAnchorEl(null);
            //   },
            // }}
            // onClickGreenhouse={{
            //   onClick: () => {
            //     setIntegration((prev) => ({
            //       ...prev,
            //       greenhouse: {
            //         open: true,
            //         step: STATE_GREENHOUSE_DIALOG.LISTJOBS,
            //       },
            //     }));
            //     setAnchorEl(null);
            //   },
            // }}

            // onClickLeverImport={{
            //   onClick: () => {
            //     setIntegration((prev) => ({
            //       ...prev,
            //       lever: { open: true, step: STATE_LEVER_DIALOG.LISTJOBS },
            //     }));
            //     setAnchorEl(null);
            //   },
            // }}
          />
        }
      </Popover>
      {recruiter?.recruiter_preferences?.greenhouse && (
        <ButtonGhost
          isLeftIcon
          size={2}
          iconName={'sync'}
          color={'accent'}
          textButton={'Sync jobs'}
        />
      )}
      <IconButtonGhost
        size={2}
        iconName={'more_vert'}
        color={'neutral'}
        onClickButton={{ onClick: (e) => setAnchorEl(e.currentTarget) }}
      />
      {/* <LeverModalComp />
      <GreenhouseModal />
      <AshbyModalComp /> */}
    </Stack>
  );
}
