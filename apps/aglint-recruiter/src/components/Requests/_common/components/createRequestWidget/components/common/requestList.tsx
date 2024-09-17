import { CommandItem, CommandList } from '@components/ui/command';
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { TRPCHookResult } from '@trpc/react-query/dist/shared';
import { CommandEmpty } from 'cmdk';
import { memo, type ReactNode, useEffect, useRef } from 'react';

import { CONTAINER_HEIGHT } from '../../constants';
import { RequestLayout } from './requestLayout';

type Props = {
  icon: ReactNode;
  onSelect: (_x: { id: string; label: string }) => void;
} & UseInfiniteQueryResult<InfiniteData<any>, TRPCClientErrorLike<any>> &
  TRPCHookResult;
const Component = (props: Props) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = props;
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
      className={`w-full h-[${CONTAINER_HEIGHT}px] overflow-y-auto overflow-x-hidden`}
    >
      <CommandEmpty>
        <RequestLayout>No suggestions available.</RequestLayout>
      </CommandEmpty>
      <div className={`relative w-full h-[${rowVirtualizer.getTotalSize()}px]`}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > allRows.length - 1;
          const data = allRows[virtualRow.index];
          if (!data) return <></>;
          const { id, label } = data;
          return (
            <CommandItem
              key={virtualRow.index}
              value={`${id} ${label}`}
              onSelect={() => props.onSelect({ id, label })}
              className={`absolute left-0 top-0 w-full h-[${virtualRow.size}px]`}
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
                  {props.icon}
                  <span>{label}</span>
                </>
              )}
            </CommandItem>
          );
        })}
      </div>
    </CommandList>
  );
};

export const RequestList = memo(Component) as typeof Component;
