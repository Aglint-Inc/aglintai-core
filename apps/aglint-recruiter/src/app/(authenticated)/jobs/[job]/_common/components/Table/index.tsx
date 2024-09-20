/* eslint-disable security/detect-object-injection */
import { memo, useMemo } from 'react';

import { useApplications, useApplicationsStore, useJob } from '@/job/hooks';

import { Loader } from '../../../[application]/_common/components/Scoring/Analysis/Common/Loader';
import { EmptyList } from './Common/EmptyList';
import List from './List';
import { TableHeader } from './TableHeader';

export const Table = memo(() => {
  const {
    job: { section_count },
  } = useJob();
  const status = useApplicationsStore((state) => state.status);
  const { query } = useApplications();

  if ((section_count[status] ?? 0) === 0) return <EmptyList />;
  if (query.status === 'error') return <>Error</>;
  if (query.status === 'pending') return <Skeleton />;

  return <List key={status} loader={<Skeleton />} header={<TableHeader />} />;
});
Table.displayName = 'Table';

const Skeleton = memo(() => {
  const cascadeVisibilites = useApplicationsStore((state) =>
    state.cascadeVisibilites(),
  );
  const skeleton = useMemo(
    () => (
      <div className='flex items-center space-x-4 p-4 pl-[30px]'>
        <div className='h-8 w-8 animate-pulse rounded bg-gray-200' />
        <div className='flex-1 space-y-2'>
          <div className='h-8 animate-pulse rounded bg-gray-200' />
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
  return <Loader count={5}>{skeleton}</Loader>;
});
Skeleton.displayName = 'Skeleton';
