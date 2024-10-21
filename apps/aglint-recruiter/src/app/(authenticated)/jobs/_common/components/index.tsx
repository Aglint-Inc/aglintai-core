import {
  PageActions,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import OptimisticWrapper from '@components/loadingWapper';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { ScrollArea } from '@components/ui/scroll-area';
import { MoreHorizontal, PlusCircle, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { useIntegrations } from '@/authenticated/hooks';
import { useTenant } from '@/company/hooks';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import {
  useIntegrationActions,
  useIntegrationStore,
  useJobsContext,
} from '@/jobs/hooks';
import ROUTES from '@/utils/routing/routes';

import { STATE_LEVER_DIALOG } from '../constants';
import type { Job } from '../types';
import { EmptyJob } from './AddJobWithIntegrations/EmptyJob';
import LeverModalComp from './AddJobWithIntegrations/LeverModal';
import FilterJobDashboard, { type useJobFilterAndSort } from './Filters';
import JobsList from './JobsList';

export const Body = ({ jobs }: { jobs: Job[] }) => {
  const { ifAllowed } = useRolesAndPermissions();

  return (
    <>
      <LeverModalComp />

      <div data-testid='jobs-list-body' className='h-[70vh] w-full'>
        {jobs.length === 0 ? (
          ifAllowed(<EmptyJob />, ['manage_job'])
        ) : (
          <ScrollArea>
            <JobsList jobs={jobs} />
          </ScrollArea>
        )}
      </div>
    </>
  );
};

export const Header = () => {
  const { manageJob } = useJobsContext();
  return (
    <PageHeader>
      <PageHeaderText>
        <PageTitle>Jobs</PageTitle>
      </PageHeaderText>
      <PageActions>{manageJob && <AddJob />}</PageActions>
    </PageHeader>
  );
};

export function AddJob() {
  const router = useRouterPro();
  const integration = useIntegrationStore((state) => state.integrations);
  const { setIntegrations } = useIntegrationActions();
  const { data: integrations } = useIntegrations();

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
            className='cursor-pointer'
          >
            <PlusCircle className='mr-2 h-4 w-4' />
            <span>Create Job</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              if (!integrations?.lever_key) {
                setIntegrations({
                  ...integration,
                  lever: { open: true, step: STATE_LEVER_DIALOG.API },
                });
              } else {
                setIntegrations({
                  ...integration,
                  lever: { open: true, step: STATE_LEVER_DIALOG.LISTJOBS },
                });
              }
            }}
            className='cursor-pointer'
          >
            <Image
              src={'/images/ats/lever-job-badge.svg'}
              alt='Lever Job Badge'
              className='mr-2 h-4 w-4'
              width={10}
              height={10}
            />
            <span>Add Lever Job</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const Filter = ({
  filterOptions,
  filterValues,
  setFilterValues,
  setSort,
  sortOptions,
  sortValue,
  searchText,
  setSearchText,
}: ReturnType<typeof useJobFilterAndSort>) => {
  return (
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
  );
};

const Sync = () => {
  const { recruiter } = useTenant();
  const { handleJobsSync } = useJobsContext();
  const [load, setLoad] = useState(false);

  if (recruiter.recruiter_preferences.ats === 'Aglint') return null;

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
        className='flex w-auto items-center'
      >
        <RefreshCw className='mr-2 h-4 w-4' strokeWidth={1.5} />
        <span className='flex-grow'>Sync</span>
      </Button>
    </OptimisticWrapper>
  );
};
