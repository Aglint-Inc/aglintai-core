import { ScrollArea } from '@components/ui/scroll-area';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useEffect, useRef } from 'react';

import { type useApplications } from '@/job/hooks';

import DNDCard from './CardNew/DNDCard';
import { EmptyList } from './Common/EmptyList';

const List = ({
  applications,
  header,
  loader,
}: {
  applications: ReturnType<typeof useApplications>['sectionApplication'];
  header: React.JSX.Element;
  loader: React.JSX.Element;
  count: number;
}) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = applications;

  const allRows = data ? data.pages.flatMap((d) => d) : [];

  const parentRef = useRef();

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 68,
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  if ((allRows ?? []).length === 0) return <EmptyList />;

  return (
    <div>
      {header}
      <div ref={parentRef} className='h-[calc(100vh-350px)]'>
        <ScrollArea className='h-full w-full'>
          <div
            className='relative w-full'
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > allRows.length - 1;
              const application = allRows[virtualRow.index];
              return (
                <div
                  key={virtualRow.index}
                  className='absolute left-0 top-0 w-full'
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                    // zIndex: count - virtualRow.index,
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
