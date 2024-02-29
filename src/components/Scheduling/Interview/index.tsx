import { Dialog, Stack } from '@mui/material';
import axios from 'axios';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  AllInterview,
  AllInterviewEmpty,
  Breadcrum,
  CandidatesListPagination,
  PageLayout,
} from '@/devlink2';
import { ConfirmationPopup, DeletePopup } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';
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
import ListCardInterviewSchedule from './ListCard';
import SidePanel from './SidePanel';
import {
  ApplicationList,
  setApplicationList,
  setFetching,
  setIsCancelOpen,
  setIsCreateScheduleOpen,
  setIsRescheduleOpen,
  setPagination,
  setSelectedApplication,
  useInterviewStore,
} from './store';
import { getPaginationDB } from './utils';
import { useSchedulingStore } from '../Panels/store';

function InterviewComp() {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const [pageLoad, setPageLoad] = useState(true);
  const {
    applicationList,
    filter,
    initialLoading,
    pagination,
    filterVisible,
    fetching,
    selectedApplication,
    isCancelOpen,
    isRescheduleOpen,
  } = useInterviewStore();
  const interviewPanels = useSchedulingStore((state) => state.interviewPanels);

  // separate useeffect for filter except text search because no need to debounce
  useEffect(() => {
    if (!initialLoading && router.isReady && !pageLoad) {
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
        setSelectedApplication(null);
        router.push(pageRoutes.SCHEDULINGINTERVIEW, undefined, {
          shallow: true,
        });
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
    if (!initialLoading && router.isReady && !pageLoad) {
      fetchInterviewData({ page: pagination.page });
    }
  }, [pagination.page]);

  useEffect(() => {
    const debouncedTextSearchFetch = debounce(() => {
      setSelectedApplication(null);
      router.push(pageRoutes.SCHEDULINGINTERVIEW, undefined, { shallow: true });
      fetchInterviewData({ page: 1 });
    }, 1000);

    if (!initialLoading && router.isReady && !pageLoad) {
      debouncedTextSearchFetch();
    }
    return () => {
      debouncedTextSearchFetch.cancel();
    };
  }, [filter.textSearch]);

  //to avoid other useeffects on initial load
  useEffect(() => {
    if (pageLoad) {
      setPageLoad(false);
    }
  }, []);

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

  useEffect(() => {
    if (router.isReady && router.query.application_id && !initialLoading) {
      const application = applicationList.find(
        (app) => app.applications.id === router.query.application_id,
      );
      setSelectedApplication(application);
      viaJobHandler(application);
    }
  }, [router, applicationList]);

  const viaJobHandler = async (application) => {
    const job_id = localStorage.getItem('sch_job_id');
    if (job_id) {
      const { data: pageNumber, error } = await supabase.rpc(
        'fetch_interview_data_page_number',
        {
          rec_id: recruiter.id,
          application_id: router.query.application_id as string,
        },
      );
      if (!error && pageNumber !== 1) {
        setPagination({ page: pageNumber });
      }
      if (!application?.schedule) {
        setIsCreateScheduleOpen(true);
      }
      localStorage.removeItem('sch_job_id');
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

  const visibleFilters = Object.entries(filterVisible)
    // eslint-disable-next-line no-unused-vars
    .filter(([_, order]) => order !== 0) // Filter out filters with order 0 (not visible)
    .sort((a, b) => a[1] - b[1]);

  const onClickCard = (app: ApplicationList) => {
    router.push(`?application_id=${app.applications.id}`, undefined, {
      shallow: true,
    });
  };

  const onClickCancel = async () => {
    try {
      if (selectedApplication.schedule.id) {
        await supabase
          .from('interview_schedule')
          .update({ is_active: false })
          .eq('id', selectedApplication.schedule.id);
        setIsCancelOpen(false);
        setSelectedApplication({ ...selectedApplication, schedule: null });
        applicationList.filter(
          (app) => app.applications.id === selectedApplication.applications.id,
        )[0].schedule = null;
        setApplicationList([...applicationList]);
        if ((selectedApplication.schedule.meeting_json as any)?.id) {
          const res = await axios.post(
            '/api/scheduling/update-calender-event-status',
            {
              organizer_id: selectedApplication.schedule.created_by,
              event_id: (selectedApplication.schedule.meeting_json as any).id,
            },
          );
          if (res.status !== 200) {
            throw new Error('Error in response');
          }
        }
      }
    } catch {
      //
    }
  };

  const onClickReschedule = async () => {
    await onClickCancel();
    setIsRescheduleOpen(false);
    setIsCreateScheduleOpen(true);
  };

  return (
    <>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            background: 'transparent',
            border: 'none',
            borderRadius: '10px',
          },
        }}
        open={isCancelOpen}
        onClose={() => {
          setIsCancelOpen(false);
        }}
      >
        <DeletePopup
          textTitle={'Cancel Schedule'}
          textDescription={
            'Are you sure you want to delete this schedule? This action cannot be undone.'
          }
          isIcon={false}
          onClickCancel={{
            onClick: () => {
              setIsCancelOpen(false);
            },
          }}
          onClickDelete={{
            onClick: () => {
              onClickCancel();
            },
          }}
          buttonText={'Cancel Schedule'}
        />
      </Dialog>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            background: 'transparent',
            border: 'none',
            borderRadius: '10px',
          },
        }}
        open={isRescheduleOpen}
        onClose={() => {
          setIsRescheduleOpen(false);
        }}
      >
        <ConfirmationPopup
          textPopupTitle={'Confirm Reschedule'}
          textPopupDescription={
            'Old schedule will be deleted and new schedule will be created. Are you sure you want to reschedule?'
          }
          isIcon={false}
          onClickCancel={{
            onClick: () => {
              setIsRescheduleOpen(false);
            },
          }}
          onClickAction={{
            onClick: onClickReschedule,
          }}
          textPopupButton={'Confirm'}
        />
      </Dialog>
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
            isSchedulerTable={true}
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
            slotAddFilter={<AddFilterComp />}
            slotFilterButton={
              <>
                <FilterSearchField />
                {visibleFilters.map(([filterKey]) => {
                  switch (filterKey) {
                    case 'relatedJobs':
                      return <FilterJob key={filterKey} />;
                    case 'interviewPanels':
                      return <FilterInterviewPanel key={filterKey} />;
                    case 'dateRange':
                      return <DateRangeFilterComp key={filterKey} />;
                    case 'scheduleType':
                      return <FilterScheduleType key={filterKey} />;
                    case 'status':
                      return <FilterStatus key={filterKey} />;
                    default:
                      return null;
                  }
                })}
              </>
            }
            slotDate={<DateFilter />}
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
                      const panel_name = interviewPanels.filter(
                        (panel) => panel.id === app.schedule?.panel_id,
                      )[0]?.name;
                      return (
                        <ListCardInterviewSchedule
                          isSelected={
                            app.applications.id ===
                            selectedApplication?.applications.id
                          }
                          key={app.applications.id}
                          app={app}
                          onClickCard={onClickCard}
                          panel_name={panel_name}
                        />
                      );
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
