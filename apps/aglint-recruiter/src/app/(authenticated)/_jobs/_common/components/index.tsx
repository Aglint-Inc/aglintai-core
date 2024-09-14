import OptimisticWrapper from '@components/loadingWapper';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Loader from '@/components/Common/Loader';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useJobs } from '@/jobs/hooks';
import ROUTES from '@/utils/routing/routes';

import EmptyJobDashboard from './AddJobWithIntegrations/EmptyJobDashboard';
import FilterJobDashboard, { useJobFilterAndSort } from './Filters';
import JobsList from './JobsList';

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
  } = useJobFilterAndSort(data ?? []);

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
            <div className='min-h-screen bg-gray-100'>
              <div className='container mx-auto p-4'>
                <h1 className='text-2xl font-bold mb-4'>Jobs</h1>
                <div className='flex flex-col gap-4 mb-4'>
                  <div className='flex justify-between items-center'>
                    <div className='flex-grow'>
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
                    </div>
                    <div className='ml-4'>{manageJob && <AddJob />}</div>
                  </div>
                  <div className='overflow-x-auto bg-white rounded-lg shadow'>
                    <JobsList jobs={jobs} />
                  </div>
                </div>
              </div>
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
    <div className='flex flex-row items-center gap-1'>
      <Sync />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='sm' variant='outline'>
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
      <Button
        size='sm'
        variant='secondary'
        onClick={handleSync}
        className='w-auto flex items-center'
      >
        <RefreshCw className='w-4 h-4 mr-2' strokeWidth={1.5} />
        <span className='flex-grow'>Sync</span>
      </Button>
    </OptimisticWrapper>
  );
};
