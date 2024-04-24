import { Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Breadcrum, InterviewPlanEmpty, PageLayout } from '@/devlink2';
import { CandidateSchedule, DarkPill, ScheduleNowButton } from '@/devlink3';
import Loader from '@/src/components/Common/Loader';
import LoaderGrey from '@/src/components/Common/LoaderGrey';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsScheduleAgent } from '@/src/pages/api/scheduling/application/schedulewithagent';
import { BodyParams } from '@/src/pages/api/scheduling/v1/find_availability';
import { PlanCombinationRespType } from '@/src/types/scheduleTypes/types';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import ScheduleProgress from '../../Common/ScheduleProgress';
import CandidateInfo from '../../SchedulingView/CandidateDetails';
import FeedbackWindow from '../../SchedulingView/Feedback';
import DeleteScheduleDialog from './Common/CancelScheduleDialog';
import RescheduleDialog from './Common/RescheduleDialog';
import FullSchedule from './FullSchedule';
import { useAllActivities, useGetScheduleApplication } from './hooks';
import RightPanel from './RightPanel';
import {
  resetSchedulingApplicationState,
  setDateRange,
  setFetchingPlan,
  setFetchingSchedule,
  setIsScheduleNowOpen,
  setNoOptions,
  setSchedulingOptions,
  setSelectedSessionIds,
  setStep,
  setTab,
  setTotalSlots,
  useSchedulingApplicationStore,
} from './store';

function SchedulingApplication() {
  const router = useRouter();
  const currentDate = dayjs();
  const { recruiter, recruiterUser } = useAuthDetails();
  const {
    fetchingSchedule,
    initialSessions,
    selectedSessionIds,
    selectedApplication,
    scheduleName,
    tab,
    dateRange,
    fetchingPlan,
  } = useSchedulingApplicationStore((state) => ({
    fetchingSchedule: state.fetchingSchedule,
    initialSessions: state.initialSessions,
    selectedSessionIds: state.selectedSessionIds,
    selectedApplication: state.selectedApplication,
    scheduleName: state.scheduleName,
    tab: state.tab,
    dateRange: state.dateRange,
    fetchingPlan: state.fetchingPlan,
  }));

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();
  const { refetch } = useAllActivities({
    application_id: selectedApplication?.id,
  });

  useEffect(() => {
    if (router.isReady && router.query.application_id) {
      setFetchingSchedule(true);
      fetchInterviewDataByApplication();
    }
    return () => {
      resetSchedulingApplicationState();
    };
  }, [router]);

  const findScheduleOptions = async ({
    session_ids,
    rec_id,
    dateRange,
  }: {
    session_ids: string[];
    rec_id: string;
    dateRange: {
      start_date: string;
      end_date: string;
    };
  }) => {
    try {
      setNoOptions(false);
      setFetchingPlan(true);
      const res = await axios.post('/api/scheduling/v1/find_availability', {
        session_ids: session_ids,
        recruiter_id: rec_id,
        start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
        end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
        user_tz: dayjs.tz.guess(),
        is_debreif: isDebrief,
      } as BodyParams);

      if (res.status === 200) {
        const respTyped = res.data as {
          plan_combs: PlanCombinationRespType[];
          total: number;
        };
        if (respTyped.plan_combs.length === 0) {
          toast.error('No slots available');
        } else {
          setTotalSlots(respTyped.total);
          setSchedulingOptions(respTyped.plan_combs);
          setIsScheduleNowOpen(true);
        }
      } else {
        setStep(1);
        toast.error('Error fetching schedule options');
      }
    } catch (e) {
      toast.error(e.message);
      setStep(1);
      //
    } finally {
      setFetchingPlan(false);
    }
  };

  const onClickScheduleAgent = async (type: 'phone_agent' | 'email_agent') => {
    try {
      setFetchingPlan(true);
      const resAllOptions = await axios.post(
        '/api/scheduling/v1/find_availability',
        {
          session_ids: selectedSessionIds,
          recruiter_id: recruiter.id,
          start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
          end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
          user_tz: dayjs.tz.guess(),
          is_debreif: isDebrief,
        } as BodyParams,
      );

      if (resAllOptions.data.length === 0) {
        toast.warning('No Slots Found');
        return;
      }

      const res = await axios.post(
        '/api/scheduling/application/schedulewithagent',
        {
          application_id: selectedApplication.id,
          dateRange: dateRange,
          recruiter_id: recruiter.id,
          recruiter_user_name: getFullName(
            recruiterUser.first_name,
            recruiterUser.last_name,
          ),
          session_ids: selectedSessionIds,
          task_id: null,
          type: type,
          candidate_name: selectedApplication.candidates.first_name,
          company_name: recruiter.name,
          rec_user_email: recruiterUser.email,
          rec_user_phone: recruiterUser.phone,
          rec_user_id: recruiterUser.user_id,
          user_tz: dayjs.tz.guess(),
        } as ApiBodyParamsScheduleAgent,
      );

      if (res) {
        toast.success(
          type === 'email_agent'
            ? 'Email Agent Initiated'
            : 'Phone Call scheduled',
        );

        fetchInterviewDataByApplication();
      } else {
        toast.error(
          'Failed to schedule with agent. Please try again later or contact support.',
        );
      }
      setSelectedSessionIds([]);
    } catch (e) {
      //
    } finally {
      refetch();
      setFetchingPlan(false);
    }
  };

  const isDebrief = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.id))
    .some((ses) => ses.session_type === 'debrief');

  return (
    <>
      <DeleteScheduleDialog />
      <RescheduleDialog />
      <PageLayout
        onClickBack={{
          onClick: () => {
            window.history.back();
          },
        }}
        isBackButton={true}
        slotTopbarLeft={
          <>
            <Breadcrum textName={scheduleName} />
          </>
        }
        slotBody={
          <>
            {fetchingSchedule ? (
              <Loader />
            ) : initialSessions.length === 0 ? (
              <InterviewPlanEmpty
                onClickCreateInterviewPlan={{
                  onClick: () => {
                    router.push(
                      `/jobs/${selectedApplication.job_id}/interview-plan`,
                    );
                  },
                }}
              />
            ) : (
              <CandidateSchedule
                slotDarkPill={
                  <>
                    <DarkPill
                      textPill={'Interview Plan'}
                      isActive={tab === 'interview_plan'}
                      onClickPill={{
                        onClick: () => {
                          setTab('interview_plan');
                        },
                      }}
                    />
                    <DarkPill
                      textPill={'Candidate Detail'}
                      isActive={tab === 'candidate_detail'}
                      onClickPill={{
                        onClick: () => {
                          setTab('candidate_detail');
                        },
                      }}
                    />
                    <DarkPill
                      textPill={'Feedback'}
                      isActive={tab === 'feedback'}
                      onClickPill={{
                        onClick: () => {
                          setTab('feedback');
                        },
                      }}
                    />
                  </>
                }
                onClickClose={{
                  onClick: () => {
                    setSelectedSessionIds([]);
                  },
                }}
                slotScheduleNowButton={
                  <>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={dayjs(dateRange?.start_date)}
                        onChange={(newValue) => {
                          if (dayjs(newValue) < dayjs(dateRange?.end_date)) {
                            setDateRange({
                              start_date: dayjs(newValue)?.toISOString(),
                              end_date: dateRange?.end_date,
                            });
                          } else {
                            setDateRange({
                              start_date: dayjs(newValue).isValid()
                                ? dayjs(newValue)?.toISOString()
                                : null,
                              end_date: null,
                            });
                          }
                        }}
                        minDate={currentDate}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            variant: 'outlined',
                            margin: 'none',
                            InputProps: { disableUnderline: true },
                            placeholder: 'Start Date',
                          },
                        }}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={dayjs(dateRange?.end_date)}
                        minDate={dayjs(dateRange?.start_date)}
                        maxDate={dayjs(dateRange?.start_date).add(1, 'month')}
                        onChange={(newValue) => {
                          setDateRange({
                            start_date: dateRange?.start_date,
                            end_date: dayjs(newValue)?.toISOString(),
                          });
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            variant: 'outlined',
                            margin: 'none',
                            InputProps: { disableUnderline: true },
                            placeholder: 'End Date',
                          },
                        }}
                      />
                    </LocalizationProvider>
                    <ScheduleNowButton
                      isHoverScheduleVisible={!isDebrief}
                      isLoaderVisible={fetchingPlan}
                      slotLoaderIcon={
                        <Stack p={1.5}>
                          <LoaderGrey />
                        </Stack>
                      }
                      onClickScheduleManually={{
                        onClick: async () => {
                          if (
                            dateRange.start_date &&
                            dateRange.end_date &&
                            !fetchingPlan
                          ) {
                            await findScheduleOptions({
                              dateRange: dateRange,
                              session_ids: selectedSessionIds,
                              rec_id: recruiter.id,
                            });
                          }
                        },
                      }}
                      isScheduleManuallyVisible={true}
                      onClickEmailAgent={{
                        onClick: async () => {
                          if (!fetchingPlan)
                            onClickScheduleAgent('email_agent');
                        },
                      }}
                      onClickPhoneAgent={{
                        onClick: async () => {
                          if (!fetchingPlan)
                            onClickScheduleAgent('phone_agent');
                        },
                      }}
                    />
                  </>
                }
                isScheduleNowVisible={selectedSessionIds.length > 0}
                slotCandidateCard={<RightPanel />}
                slotFullScheduleCard={
                  tab === 'candidate_detail' ? (
                    <CandidateInfo
                      applications={selectedApplication}
                      candidate={selectedApplication.candidates}
                      file={selectedApplication.candidate_files}
                    />
                  ) : tab === 'interview_plan' ? (
                    <FullSchedule />
                  ) : tab === 'feedback' ? (
                    <FeedbackWindow
                      interview_sessions={initialSessions.map((item) => ({
                        id: item.id,
                        title: item.name,
                        created_at: item.created_at,
                        status: item.interview_meeting?.status,
                        time: {
                          start: item.interview_meeting?.start_time,
                          end: item.interview_meeting?.end_time,
                        },
                      }))}
                    />
                  ) : (
                    ''
                  )
                }
              />
            )}
          </>
        }
        slotTopbarRight={
          <Stack
            sx={{
              pointerEvents: 'none',
            }}
          >
            <ScheduleProgress
              sessions={initialSessions.map((item) => ({
                duration: item.session_duration,
                name: item.name,
                scheduleType: item.schedule_type,
                sessionType: item.session_type,
                status: item.interview_meeting?.status || 'not_scheduled',
                date: item.interview_meeting?.start_time
                  ? {
                      startTime: item.interview_meeting?.start_time,
                      endTime: item.interview_meeting?.end_time,
                    }
                  : null,
              }))}
            />
          </Stack>
        }
      />
    </>
  );
}

export default SchedulingApplication;
