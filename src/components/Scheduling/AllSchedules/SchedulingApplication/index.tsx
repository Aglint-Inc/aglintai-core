import { Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Breadcrum, InterviewPlanEmpty, PageLayout } from '@/devlink2';
import {
  CandidateSchedule,
  DarkPill,
  JobCards,
  ScheduleNowButton,
} from '@/devlink3';
import Loader from '@/src/components/Common/Loader';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

import ScheduleProgress from '../../Common/ScheduleProgress';
import CandidateInfo from '../../SchedulingView/CandidateDetails';
import FeedbackWindow from '../../SchedulingView/Feedback';
import DeleteScheduleDialog from './Common/CancelScheduleDialog';
import RescheduleDialog from './Common/RescheduleDialog';
import FullSchedule from './FullSchedule';
import {
  scheduleWithAgent,
  useGetScheduleApplication,
  useGetScheduleOptions,
} from './hooks';
import {
  resetSchedulingApplicationState,
  setDateRange,
  setFetchingSchedule,
  setinitialSessions,
  setSelectedSessionIds,
  setTab,
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
  } = useSchedulingApplicationStore((state) => ({
    fetchingSchedule: state.fetchingSchedule,
    initialSessions: state.initialSessions,
    selectedSessionIds: state.selectedSessionIds,
    selectedApplication: state.selectedApplication,
    scheduleName: state.scheduleName,
    tab: state.tab,
    dateRange: state.dateRange,
  }));

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  useEffect(() => {
    if (router.isReady && router.query.application_id) {
      setFetchingSchedule(true);
      fetchInterviewDataByApplication();
    }
    return () => {
      resetSchedulingApplicationState();
    };
  }, [router]);

  const { findScheduleOptions } = useGetScheduleOptions();

  const scheduleAgent = async (type: 'phone_agent' | 'email_agent') => {
    const res = await scheduleWithAgent({
      application_id: selectedApplication.id,
      dateRange: dateRange,
      recruiter_id: recruiter.id,
      recruiter_user_name: recruiterUser.first_name,
      session_ids: selectedSessionIds,
      sub_task_id: null,
      type: type,
      candidate_name: selectedApplication.candidates.first_name,
      company_name: recruiter.name,
    });

    if (res) {
      toast.success(
        type === 'email_agent'
          ? 'Email Agent Initiated'
          : 'Phone Call scheduled',
      );
      setinitialSessions(
        initialSessions.map((session) => ({
          ...session,
          interview_meeting: selectedSessionIds.includes(session.id)
            ? { status: 'waiting', interview_schedule_id: null }
            : null,
        })),
      );
    } else {
      toast.error(
        'Failed to schedule with agent. Please try again later or contact support.',
      );
    }
    setSelectedSessionIds([]);
  };

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
                      onClickScheduleManually={{
                        onClick: async () => {
                          if (dateRange.start_date && dateRange.end_date) {
                            await findScheduleOptions({
                              dateRange: dateRange,
                              session_ids: selectedSessionIds,
                              rec_id: recruiter.id,
                            });
                          }
                        },
                      }}
                      onClickEmailAgent={{
                        onClick: async () => {
                          scheduleAgent('email_agent');
                        },
                      }}
                      onClickPhoneAgent={{
                        onClick: async () => {
                          scheduleAgent('phone_agent');
                        },
                      }}
                    />
                  </>
                }
                isScheduleNowVisible={selectedSessionIds.length > 0}
                slotCandidateCard={
                  <Stack
                    onClick={() => {
                      router.push(
                        `${pageRoutes.JOBS}/${selectedApplication.job_id}`,
                      );
                    }}
                  >
                    <JobCards
                      textLocation={selectedApplication.public_jobs.location}
                      textRole={selectedApplication.public_jobs.job_title}
                    />
                  </Stack>
                }
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
                      }))}
                      multiSession={true}
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
