import { Stack } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';

import { AssessmentListCardLoader } from '@/devlink2/AssessmentListCardLoader';
import { useApplications } from '@/src/context/ApplicationsContext';

import ApplicationCard from './card';

const ApplicantsList = ({
  applications,
}: {
  applications: ReturnType<typeof useApplications>['assessmentApplications'];
}) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = applications;

  const allRows = data ? data.pages.flatMap((d) => d) : [];

  const parentRef = useRef();

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
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

  return (
    <Stack
      ref={parentRef}
      style={{
        height: `calc(100vh - 168px)`,
        width: `100%`,
        overflow: 'auto',
      }}
    >
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
              }}
            >
              <>
                {isLoaderRow ? (
                  hasNextPage ? (
                    <AssessmentListCardLoader /> //'Loading more...'
                  ) : (
                    <></> //'Nothing more to load'
                  )
                ) : (
                  <ApplicationCard application={application} />
                )}
              </>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ApplicantsList;
