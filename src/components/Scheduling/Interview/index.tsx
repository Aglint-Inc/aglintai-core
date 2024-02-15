import { Stack } from '@mui/material';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import {
  AllInterview,
  AllInterviewEmpty,
  Breadcrum,
  CandidatesListPagination,
  PageLayout,
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import CreateDialog from './CreateDialog';
import AddFilterComp from './Filters/AddFilter';
import DateFilter from './Filters/DateFilter';
import DateRangeFilterComp from './Filters/DateRangeFilter';
import FilterInterviewPanel from './Filters/FilterInterviewPanel';
import FilterJob from './Filters/FilterJob';
import FilterScheduleType from './Filters/FilterScheduleType';
import FilterSearchField from './Filters/FilterSearchField';
import FilterStatus from './Filters/FilterStatus';
import ListCard from './ListCard';
import SidePanel from './SidePanel';
import {
  ApplicationList,
  setApplicationList,
  setFetching,
  setPagination,
  useInterviewStore,
} from './store';
import { getPaginationDB } from './utils';

function InterviewComp() {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const applicationList = useInterviewStore((state) => state.applicationList);
  const initialLoading = useInterviewStore((state) => state.initialLoading);
  const pagination = useInterviewStore((state) => state.pagination);
  const filter = useInterviewStore((state) => state.filter);
  const fetching = useInterviewStore((state) => state.fetching);
  const filterVisible = useInterviewStore((state) => state.filterVisible);

  // separate useeffect for filter except text search because no need to debounce
  useEffect(() => {
    if (!initialLoading) {
      if (
        filter.status ||
        filter.status == null ||
        filter.job_ids ||
        filter.panel_ids ||
        filter.dateRange == null ||
        filter.dateRange ||
        filter.sortBy ||
        filter.scheduleType
      ) {
        fetchInterviewData({ page: 1 });
      }
    }
  }, [
    filter.status,
    filter.job_ids,
    filter.panel_ids,
    filter.dateRange,
    filter.sortBy,
    filter.scheduleType,
  ]);
  // separate useeffect for filter except text search because no need to debounce

  useEffect(() => {
    if (!initialLoading) {
      fetchInterviewData({ page: pagination.page });
    }
  }, [pagination.page]);

  useEffect(() => {
    const debouncedTextSearchFetch = debounce(() => {
      fetchInterviewData({ page: 1 });
    }, 1000);

    if (!initialLoading) {
      debouncedTextSearchFetch();
    }
    return () => {
      debouncedTextSearchFetch.cancel();
    };
  }, [filter.textSearch]);

  const fetchInterviewData = async ({ page = 1 }: { page: number }) => {
    try {
      setPagination({ page });
      setFetching(true);
      getPagination();
      const { data: appNew, error } = await supabase.rpc(
        'fetch_interview_data',
        {
          rec_id: recruiter.id,
          status_filter: filter.status.length > 0 ? filter.status : null,
          text_search_filter: filter.textSearch,
          sch_type: filter.scheduleType.length > 0 ? filter.scheduleType : null,
          sort_by: filter.sortBy,
          job_id_filter: filter.job_ids.length > 0 ? filter.job_ids : null,
          panel_id_filter:
            filter.panel_ids.length > 0 ? filter.panel_ids : null,
          page_number: page,
          date_range_filter: filter.dateRange ? filter.dateRange : null,
        },
      );
      if (error) {
        throw new Error(error.message);
      }
      setApplicationList(appNew as ApplicationList[]);
    } catch (error) {
      toast.error('Error fetching interview data');
    } finally {
      setFetching(false);
    }
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
      <CreateDialog />
      <PageLayout
        slotTopbarLeft={
          <>
            <Breadcrum
              isLink
              onClickLink={{
                onClick: () => {
                  router.push(pageRoutes.SCHEDULING);
                },
              }}
            />
            <Breadcrum showArrow textName={'All Interviews'} />
          </>
        }
        slotBody={
          <AllInterview
            slotPagination={
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
            }
            slotSidebar={<SidePanel />}
            slotSchedule={<FilterScheduleType />}
            slotAddFilter={<AddFilterComp />}
            slotFilterButton={
              <>
                {filterVisible.relatedJobs && <FilterJob />}
                {filterVisible.interviewPanels && <FilterInterviewPanel />}
                {filterVisible.dateRange && <DateRangeFilterComp />}
              </>
            }
            slotDate={<DateFilter />}
            slotSearch={<FilterSearchField />}
            slotStatus={<FilterStatus />}
            slotAllInterviewCard={
              <Stack
                style={{
                  opacity: fetching ? 0.5 : 1,
                  pointerEvents: fetching ? 'none' : 'auto',
                }}
              >
                {!initialLoading && (
                  <>
                    {applicationList.length === 0 && <AllInterviewEmpty />}
                    {applicationList.map((app) => {
                      return <ListCard key={app.applications.id} app={app} />;
                    })}
                  </>
                )}
              </Stack>
            }
          />
        }
      />
    </>
  );
}

export default InterviewComp;
