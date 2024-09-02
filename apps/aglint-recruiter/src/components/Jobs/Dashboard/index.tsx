import { MoreHorizontal, PlusCircle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { JobsDashboard } from '@/devlink/JobsDashboard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import ROUTES from '@/src/utils/routing/routes';

import Loader from '../../Common/Loader';
import OptimisticWrapper from '../../NewAssessment/Common/wrapper/loadingWapper';
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
    <div className='h-full w-full'>
      {!initialLoad ? (
        <Loader />
      ) : (
        <>
          {data?.length === 0 ? (
            ifAllowed(
              <EmptyJobDashboard
                handleClickAddJob={() => router.push(ROUTES['/jobs/create']())}
                heading={'Jobs'}
              />,
              ['manage_job'],
            )
          ) : (
            <div className='h-full flex flex-row'>
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
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardComp;

export function AddJob() {
  const router = useRouter();

  return (
    <div className='flex flex-row gap-1'>
      <Sync />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>
            <MoreHorizontal className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-56'>
          <DropdownMenuItem
            onSelect={() => router.push(ROUTES['/jobs/create']())}
          >
            <PlusCircle className='mr-2 h-4 w-4' />
            <span>Create Job</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const Sync = () => {
  const { recruiter } = useAuthDetails();
  const { handleJobsSync } = useJobs();
  const [load, setLoad] = useState(false);

  if (!recruiter?.recruiter_preferences?.greenhouse) return null;

  const handleSync = async () => {
    if (load) return;
    setLoad(true);
    await handleJobsSync();
    setLoad(false);
  };

  return (
    <OptimisticWrapper loading={load}>
      <Button variant='secondary' onClick={handleSync} className='w-auto'>
        <RefreshCw className='w-4 h-4 mr-2' strokeWidth={1.5} />
        Sync
      </Button>
    </OptimisticWrapper>
  );
};
