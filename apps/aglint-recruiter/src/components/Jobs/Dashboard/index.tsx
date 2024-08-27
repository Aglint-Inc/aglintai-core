import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSolid } from '@/devlink/ButtonSolid';
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
  // const { setIntegration } = useIntegration();
  // const { data: int, isLoading } = useAllIntegrations();
  // const [anchorEl, setAnchorEl] = useState(null);

  //popover Add Job
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClosePop = () => {
  //   setAnchorEl(null);
  // };
  return (
    <>
      {/* <Popover
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
      </Popover> */}

      {/* <LeverModalComp />
      <GreenhouseModal />
      <AshbyModalComp /> */}
      {recruiter?.recruiter_preferences?.greenhouse ? (
        <ButtonGhost
          isLeftIcon
          iconName={'sync'}
          color={'accent'}
          textButton={'Sync jobs'}
        />
      ) : (
        <ButtonSolid
          size={2}
          color={'accent'}
          textButton={'Add job'}
          onClickButton={{
            onClick: () => router.push(ROUTES['/jobs/create']()),
          }}
        />
      )}
    </>
  );
}
