import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Breadcrum, InterviewPlanEmpty, PageLayout } from '@/devlink2';
import { CandidateSchedule } from '@/devlink3';
import Loader from '@/src/components/Common/Loader';

import ScheduleProgress from '../../Common/ScheduleProgress';
import CandidateInfo from '../../SchedulingView/CandidateDetails';
import FeedbackWindow from '../../SchedulingView/Feedback';
import DeleteScheduleDialog from './Common/CancelScheduleDialog';
import RescheduleDialog from './Common/RescheduleDialog';
import FullSchedule from './FullSchedule';
import { useGetScheduleApplication } from './hooks';
import RightPanel from './RightPanel';
import ScheduleNowTopbar from './ScheduleNowTopbar';
import StatusUpdateDropdownBreadcrum from './StatusUpdateDropdownBreadcrum';
import {
  resetSchedulingApplicationState,
  setFetchingSchedule,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from './store';
import TabsSchedulingApplication from './Tabs';

function SchedulingApplication() {
  const router = useRouter();
  const {
    fetchingSchedule,
    initialSessions,
    selectedSessionIds,
    selectedApplication,
    scheduleName,
    tab,
  } = useSchedulingApplicationStore((state) => ({
    fetchingSchedule: state.fetchingSchedule,
    initialSessions: state.initialSessions,
    selectedSessionIds: state.selectedSessionIds,
    selectedApplication: state.selectedApplication,
    scheduleName: state.scheduleName,
    tab: state.tab,
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
            {!fetchingSchedule && <StatusUpdateDropdownBreadcrum />}
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
                slotDarkPill={<TabsSchedulingApplication />}
                onClickClose={{
                  onClick: () => {
                    setSelectedSessionIds([]);
                  },
                }}
                slotScheduleNowButton={
                  <ScheduleNowTopbar isDebrief={isDebrief} />
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
                      candidate={{
                        email: selectedApplication?.candidates.email,
                        name: `${selectedApplication?.candidates.first_name || ''} ${selectedApplication?.candidates.last_name || ''}`.trim(),
                        job_id: selectedApplication?.job_id,
                      }}
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
