/* eslint-disable security/detect-object-injection */
import { memo, useEffect, useMemo } from 'react';

import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useKeyPress } from '@/hooks/useKeyPress';
import { useApplications, useApplicationsStore, useJob } from '@/job/hooks';

import { Loader } from '../CandidateDrawer/Common/Loader';
import { EmptyList } from './Common/EmptyList';
import List from './List';
import { TableHeader } from './TableHeader';

export const Table = memo(() => {
  const {
    job: { section_count },
  } = useJob();
  const status = useApplicationsStore((state) => state.status);
  const {
    cascadeVisibilites,
    queryData,
    handleSelectPrevApplication,
    handleSelectNextApplication,
  } = useApplications();

  const { isScoringEnabled } = useRolesAndPermissions();

  const { pressed: up } = useKeyPress('ArrowUp');
  const { pressed: down } = useKeyPress('ArrowDown');

  useEffect(() => {
    if (up) handleSelectPrevApplication();
    else if (down) handleSelectNextApplication();
  }, [up, down]);

  const skeleton = useMemo(
    () => (
      <div className='flex items-center space-x-4 p-4 pl-[30px]'>
        <div className='h-5 w-5 animate-pulse rounded bg-gray-200' />
        <div className='flex-1 space-y-2'>
          <div className='h-4 animate-pulse rounded bg-gray-200' />
        </div>
        {cascadeVisibilites.interview && (
          <div className='h-8 w-20 animate-pulse rounded bg-gray-200' />
        )}
        {cascadeVisibilites.disqualified && (
          <div className='h-8 w-20 animate-pulse rounded bg-gray-200' />
        )}
      </div>
    ),
    [cascadeVisibilites],
  );

  if ((section_count[status] ?? 0) === 0) return <EmptyList />;
  if (queryData.status === 'error') return <>Error</>;
  if (queryData.status === 'pending')
    return <Loader count={8}>{skeleton}</Loader>;

  return (
    // <NewTable />
    <List
      key={status}
      queryData={queryData}
      count={section_count[status]}
      loader={<Loader count={5}>{skeleton}</Loader>}
      header={
        <div className='sticky top-0' style={{ zIndex: 1 }}>
          <TableHeader
            isAllChecked={false}
            onSelectAll={() => {
              /* Implement select all logic */
            }}
            isResumeMatchVisible={isScoringEnabled}
            isInterviewVisible={cascadeVisibilites.interview}
          />
        </div>
      }
    />
  );
});
Table.displayName = 'Table';
