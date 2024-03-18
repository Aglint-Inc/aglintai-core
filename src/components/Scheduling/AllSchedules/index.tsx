import { Stack } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { AllInterview, CandidatesListPagination } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import AllList from './AllList';
import AllFilters from './Filters';
import DateFilter from './Filters/DateFilter';
import AddFilterComp from './Filters/FilterMenu';
import {
  ApplicationList,
  setPagination,
  useInterviewSchedulingStore,
} from './store';
import { getPaginationDB } from './utils';

function AllSchedules() {
  const { recruiter } = useAuthDetails();
  const filter = useInterviewSchedulingStore((state) => state.filter);
  const pagination = useInterviewSchedulingStore((state) => state.pagination);
  const fetching = useInterviewSchedulingStore((state) => state.fetching);

  const {
    isPending,
    isError,
    data: applicationList,
    isFetching,
  } = useQuery({
    queryKey: ['schedules', pagination.page, filter],
    queryFn: () => fetchInterviewData({ page: pagination.page }),
    placeholderData: keepPreviousData,
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const fetchInterviewData = async ({ page = 1 }: { page: number }) => {
    setPagination({ page });
    getPagination();
    const { data: appNew, error } = await supabase.rpc('fetch_interview_data', {
      rec_id: recruiter.id,
      status_filter: filter.status.length > 0 ? filter.status : null,
      text_search_filter: filter.textSearch,
      sch_type: filter.scheduleType.length > 0 ? filter.scheduleType : null,
      sort_by: filter.sortBy,
      job_id_filter: filter.job_ids.length > 0 ? filter.job_ids : null,
      page_number: page,
      date_range_filter: filter.dateRange ? filter.dateRange : null,
    });
    if (error) {
      throw new Error(error.message);
    }
    return appNew as ApplicationList[];
  };

  const getPagination = async () => {
    try {
      const totalCount = await getPaginationDB({
        recruiter: { id: recruiter.id },
        filter: {
          status: filter.status,
          textSearch: filter.textSearch,
          scheduleType: filter.scheduleType,
          sortBy: filter.sortBy,
          job_ids: filter.job_ids,
          panel_ids: filter.panel_ids,
        },
      });
      setPagination({ total: totalCount });
    } catch (error) {
      toast.error('Error fetching interview data');
    }
  };

  return (
    <>
      <AllInterview
        isSchedulerTable={true}
        slotPagination={
          !isPending && (
            <Stack
              sx={{
                opacity: fetching ? 0.5 : 1,
                pointerEvents: fetching ? 'none' : 'auto',
                zIndex: 3,
              }}
            >
              <CandidatesListPagination
                totalCandidatesCount={pagination.total}
                currentCandidatesCount={applicationList.length}
                totalPageCount={Math.ceil(pagination.total / 10)}
                onclickNext={{
                  onClick: () => {
                    if (pagination.page < Math.ceil(pagination.total / 10))
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
          )
        }
        slotAddFilter={<AddFilterComp />}
        slotFilterButton={<AllFilters />}
        slotDate={<DateFilter />}
        slotAllInterviewCard={
          <AllList
            isPending={isPending}
            applicationList={applicationList}
            isError={isError}
            isFetching={isFetching}
          />
        }
      />
    </>
  );
}

export default AllSchedules;
