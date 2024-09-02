import { Stack } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { ScheduleProgress } from '@/devlink/ScheduleProgress';
import { Skeleton } from '@/devlink2/Skeleton';
import { SkeletonAllInterviewCard } from '@/devlink2/SkeletonAllInterviewCard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import ROUTES from '@/src/utils/routing/routes';

import { useFilterCandidateStore } from '../filter-store';
import ListCardInterviewSchedule from '../ListCard';
import {
  type ApplicationList,
  useAllInterviewSchedules,
  useGetCount,
} from '../queries/hooks';
import InitialLoader from './InitialLoader';

function AllList() {
  const { recruiter } = useAuthDetails();
  const parentRef = useRef();
  const router = useRouter();
  const { filter } = useFilterCandidateStore();
  const onClickCard = (app: ApplicationList[0]) => {
    router.push(
      ROUTES['/scheduling/application/[application_id]']({
        application_id: app.applications.id,
      }),
      undefined,
      {
        shallow: true,
      },
    );
  };

  const { data: count, isLoading } = useGetCount({
    recruiter_id: recruiter.id,
  });

  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading: isLoadingCandidate,
    isError,
    isFetching,
  } = useAllInterviewSchedules({
    rec_id: recruiter.id,
    count,
    isLoading,
    filter,
  });

  const allRows = data ? data.pages.flatMap((d) => d) : [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52,
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
        height: 'calc(100vh - 134px)',
        width: 'calc(100vw - 58px)',
        overflowY: 'auto',
      }}
    >
      <InitialLoader
        isError={isError}
        isLoading={
          isLoadingCandidate ||
          isLoading ||
          (isFetching && allRows.length === 0)
        }
        rowLength={allRows.length}
      />

      <Stack
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow, index) => {
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
                    <SkeletonAllInterviewCard
                      slotInterviewProgress={
                        <Stack
                          borderRadius={'var(--radius-2)'}
                          overflow={'hidden'}
                        >
                          <ScheduleProgress
                            slotScheduleProgressPill={Array.from({
                              length:
                                index === 0 || !!(index && !(index % 2))
                                  ? 5
                                  : 2,
                            }).map((_, index) => (
                              <Stack
                                key={index}
                                width={'60px'}
                                height={'20px'}
                                position={'relative'}
                              >
                                <Skeleton />
                              </Stack>
                            ))}
                          />
                        </Stack>
                      }
                    />
                  ) : (
                    <></>
                  )
                ) : (
                  <ListCardInterviewSchedule
                    app={application}
                    onClickCard={onClickCard}
                  />
                )}
              </>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}

export default AllList;
