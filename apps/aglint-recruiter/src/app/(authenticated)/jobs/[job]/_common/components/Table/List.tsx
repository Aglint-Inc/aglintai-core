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
      <div
        ref={parentRef}
        style={{
          height: `calc(100vh - 300px)`,
          width: `100%`,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index > applications.length - 1;
            const application = applications[virtualRow.index];
            return (
              <div
                key={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
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
      </div>
    </div>
  );
};

export default List;
