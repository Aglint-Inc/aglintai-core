import { Stack } from '@mui/material';

import { CandidatesListPagination } from '@/devlink2/CandidatesListPagination';

import { setPagination, useFilterCandidateStore } from '../filter-store';
import { ApplicationList } from '../utils';

interface SlotPaginationProps {
  isPending: boolean;
  isFetching: boolean;
  applicationList: ApplicationList[];
  isLoading: boolean;
}

function SlotPagination({
  isPending,
  isFetching,
  applicationList,
  isLoading,
}: SlotPaginationProps) {
  const pagination = useFilterCandidateStore((state) => state.pagination);

  const ITEM_PAGE_LIMIT = 50;

  return (
    <>
      {!isPending && (
        <Stack
          sx={{
            opacity: isLoading ? 0.5 : 1,
            pointerEvents: isLoading ? 'none' : 'auto',
            zIndex: 3,
          }}
        >
          <CandidatesListPagination
            totalCandidatesCount={pagination.total}
            currentCandidatesCount={
              isFetching && applicationList.length == 0
                ? '--'
                : applicationList.length
            }
            totalPageCount={Math.ceil(pagination.total / ITEM_PAGE_LIMIT)}
            onclickNext={{
              onClick: () => {
                if (
                  pagination.page <
                  Math.ceil(pagination.total / ITEM_PAGE_LIMIT)
                )
                  setPagination({ page: pagination.page + 1 });
              },
            }}
            onclickPrevious={{
              onClick: () => {
                if (pagination.page > 1)
                  setPagination({ page: pagination.page - 1 });
              },
            }}
            slotPageNumber={pagination.page}
          />
        </Stack>
      )}
    </>
  );
}

export default SlotPagination;
