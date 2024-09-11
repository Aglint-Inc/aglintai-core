import { CommandList } from '@components/ui/command';
import { CommandItem } from '@components/ui/command';
import { useVirtualizer } from '@tanstack/react-virtual';
import { CommandEmpty } from 'cmdk';
import { Briefcase } from 'lucide-react';
import { type PropsWithChildren, Suspense, useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useCreateRequestActions, useCreateRequestJobs } from '../../hooks';

const containerHeight = 200;

export const List = () => {
  return (
    <ErrorBoundary
      fallback={<Placeholder>Error while loading jobs</Placeholder>}
    >
      <Suspense fallback={<Placeholder>Loading job...</Placeholder>}>
        <Content />
      </Suspense>
    </ErrorBoundary>
  );
};

const Content = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useCreateRequestJobs();
  const { addJobSelection } = useCreateRequestActions();
  const allRows = data.pages.flatMap((d) => d.items);
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 32,
    overscan: 2,
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
    <CommandList
      ref={parentRef}
      className={`w-full h-[${containerHeight}px] overflow-y-auto overflow-x-hidden`}
    >
      <CommandEmpty>
        <Placeholder>No suggestions available.</Placeholder>
      </CommandEmpty>
      <div className={`relative w-full h-[${rowVirtualizer.getTotalSize()}px]`}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > allRows.length - 1;
          const job = allRows[virtualRow.index];
          if (!job) return <></>;
          const { id, job_title } = job;
          return (
            <CommandItem
              key={virtualRow.index}
              value={`${id} ${job.job_title}`}
              onSelect={() => addJobSelection({ id, job_title })}
              className={`absolute top-0 left-0 w-full h-[${virtualRow.size}px]`}
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {isLoaderRow ? (
                hasNextPage ? (
                  'Loading more...'
                ) : (
                  'Nothing more to load'
                )
              ) : (
                <>
                  <Briefcase className='mr-2 h-4 w-4' />
                  <span>{job_title}</span>
                </>
              )}
            </CommandItem>
          );
        })}
      </div>
    </CommandList>
  );
};

const Placeholder = (props: PropsWithChildren) => {
  return (
    <div
      className={`flex w-full h-[${containerHeight}px] items-center justify-center`}
    >
      {props.children}
    </div>
  );
};
