import { Stack } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useEffect, useRef } from 'react';

import { useApplications } from '@/src/context/ApplicationsContext';

import DNDCard from './Card/DNDCard';
import { EmptyList } from './Common/EmptyList';

const List = ({
  applications,
  header,
  loader,
  count,
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
    estimateSize: () => 41,
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
    <Stack
      ref={parentRef}
      style={{
        height: 'calc(100vh - 134px)',
        width: 'calc(100vw - 64px)',
        overflowY: 'auto',
      }}
    >
      {header}
      <Stack
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > allRows.length - 1;
          const application = allRows[virtualRow.index];
          return (
            <Stack
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                zIndex: count - virtualRow.index,
              }}
            >
              <>
                {isLoaderRow ? (
                  hasNextPage ? (
                    loader
                  ) : (
                    <></>
                  )
                ) : (
                  <DNDCard application={application} />
                )}
              </>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default List;
