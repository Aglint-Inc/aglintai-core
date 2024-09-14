import React, { useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useApplications } from '@/job/hooks';
import { type Application } from '@/types/applications.types';
import { EmptyList } from '../Table/Common/EmptyList';
import { Loader } from '../CandidateDrawer/Common/Loader';
import { ScrollArea } from '@components/ui/scroll-area';
import DNDCard from '../Table/CardNew/DNDCard';

const ApplicationsTable: React.FC = () => {
  const {
    job: { section_count },
    section,
    sectionApplication,
  } = useApplications();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, status } =
    sectionApplication;

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderApplication = useCallback(
    (application: Application) => (
      <DNDCard key={application.id} application={application} />
    ),
    [],
  );

  if ((section_count[section] ?? 0) === 0) return <EmptyList />;
  if (status === 'error') return <div>Error loading applications</div>;
  if (status === 'pending') return <Loader count={8} />;

  const allApplications = data ? data.pages.flatMap((d) => d) : [];

  return (
    <DndProvider backend={HTML5Backend}>
      <ScrollArea className='h-[calc(100vh-200px)]'>
        <div className='space-y-2 p-4'>
          {allApplications.map(renderApplication)}
          {isFetchingNextPage && <Loader count={1} />}
        </div>
      </ScrollArea>
    </DndProvider>
  );
};

export default ApplicationsTable;
