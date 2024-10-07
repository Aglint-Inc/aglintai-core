import { ScrollArea } from '@components/ui/scroll-area';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useEffect, useRef } from 'react';

import { useApplications } from '@/job/hooks';

import DNDCard from './CardNew/DNDCard';
import { EmptyList } from './Common/EmptyList';

const List = ({
  header,
  loader,
}: {
  header: React.JSX.Element;
  loader: React.JSX.Element;
}) => {
  const {
    query: { hasNextPage, isFetchingNextPage, fetchNextPage },
    applications,
  } = useApplications();

  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? applications.length + 1 : applications.length,
    getScrollElement: () => parentRef.current!,
    estimateSize: () => 68,
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= applications.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    applications.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  if ((applications ?? []).length === 0) return <EmptyList />;

  return (
    <div>
      {header}
      <div ref={parentRef}>
        <ScrollArea className='h-[calc(100vh-260px)] w-full'>
          <div
            className='relative w-full'
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > applications.length - 1;
              const application = applications[virtualRow.index];
              return (
                <div
                  key={virtualRow.index}
                  className='absolute left-0 top-0 w-full'
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {isLoaderRow ? (
                    hasNextPage ? (
                      loader
                    ) : (
                      <></>
                    )
                  ) : (
                    <DNDCard application={application} />
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default List;
