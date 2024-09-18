import { ScrollArea } from '@components/ui/scroll-area';
import React, { useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useApplications, useApplicationsStore, useJob } from '@/job/hooks';

import { Loader } from '../CandidateDrawer/Common/Loader';
import DNDCard from '../Table/CardNew/DNDCard';
import { EmptyList } from '../Table/Common/EmptyList';

const ApplicationsTable: React.FC = () => {
  const {
    job: { section_count },
  } = useJob();
  const section = useApplicationsStore((state) => state.status);
  const { queryData, applications } = useApplications();

  const { hasNextPage, isFetchingNextPage, fetchNextPage, status } = queryData;

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderApplication = useCallback(
    (application: (typeof applications)[number]) => (
      <DNDCard key={application.id} application={application} />
    ),
    [],
  );

  if ((section_count[section] ?? 0) === 0) return <EmptyList />;
  if (status === 'error') return <div>Error loading applications</div>;
  if (status === 'pending') return <Loader count={8} />;

  return (
    <DndProvider backend={HTML5Backend}>
      <ScrollArea className='h-[calc(100vh-200px)]'>
        <div className='space-y-2 p-4'>
          {applications.map(renderApplication)}
          {isFetchingNextPage && <Loader count={1} />}
        </div>
      </ScrollArea>
    </DndProvider>
  );
};

export default ApplicationsTable;
