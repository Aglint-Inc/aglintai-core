import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Breadcrum } from '@/devlink2/Breadcrum';
import { InterviewPlanEmpty } from '@/devlink2/InterviewPlanEmpty';
import { PageLayout } from '@/devlink2/PageLayout';
import { CandidateSchedule } from '@/devlink3/CandidateSchedule';
import Loader from '@/src/components/Common/Loader';
import ROUTES from '@/src/utils/routing/routes';

import CandidateInfo from '../Common/CandidateInfo';
import ScheduleProgress from '../Common/ScheduleProgress';
import FeedbackWindow from '../ScheduleDetails/Feedback';
import CandidateFeedback from './CandidateFeedback';
import DeleteScheduleDialog from './Common/CancelScheduleDialog';
import RescheduleDialog from './Common/RescheduleDialog';
import FullSchedule from './FullSchedule';
import { useAllActivities, useGetScheduleApplication } from './hooks';
import { RequestAvailabilityProvider } from './RequestAvailability/RequestAvailabilityContext';
import RightPanel from './RightPanel';
import StatusUpdateDropdownBreadcrum from './StatusUpdateDropdownBreadcrum';
import {
  resetSchedulingApplicationState,
  setFetchingSchedule,
  setSelectedSessionIds,
  TabSchedulingType,
  useSchedulingApplicationStore,
} from './store';
import TabsSchedulingApplication from './Tabs';
import TopBarButtons from './TopBarButtons';

function SchedulingApplication() {
  const router = useRouter();
  const {
    fetchingSchedule,
    initialSessions,
    selectedSessionIds,
    selectedApplication,
    scheduleName,
  } = useSchedulingApplicationStore((state) => ({
    fetchingSchedule: state.fetchingSchedule,
    initialSessions: state.initialSessions,
    selectedSessionIds: state.selectedSessionIds,
    selectedApplication: state.selectedApplication,
    scheduleName: state.scheduleName,
  }));

  const tab = router.query.tab as TabSchedulingType;

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  const allActivities = useAllActivities({
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
  }, [router.query.application_id]);

  return (
    <>
      {/* <RequestAvailabilityDrawer /> */}

      <DeleteScheduleDialog refetch={allActivities.refetch} />
      <RescheduleDialog refetch={allActivities.refetch} />

      <PageLayout
        onClickBack={{
          onClick: () => {
            router.push(ROUTES['/scheduling']() + '?tab=candidates');
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
                textSelectedNumber={`${selectedSessionIds.length} selected`}
                slotScheduleButton={<TopBarButtons />}
                slotDarkPill={<TabsSchedulingApplication />}
                onClickClose={{
                  onClick: () => {
                    setSelectedSessionIds([]);
                  },
                }}
                isScheduleNowVisible={selectedSessionIds.length > 0}
                slotCandidateCard={<RightPanel allActivities={allActivities} />}
                slotFullScheduleCard={
                  tab === 'candidate_detail' ? (
                    <Stack p={'var(--space-4)'}>
                      <Stack
                        sx={{
                          border: '1px solid var(--neutral-6)',
                          borderRadius: 'var(--radius-4)',
                          background: 'var(--white)',
                        }}
                      >
                        <CandidateInfo
                          applications={selectedApplication}
                          candidate={selectedApplication.candidates}
                          file={selectedApplication.candidate_files}
                        />
                      </Stack>
                    </Stack>
                  ) : tab === 'interview_plan' || !tab ? (
                    <RequestAvailabilityProvider>
                      <FullSchedule refetch={allActivities.refetch} />
                    </RequestAvailabilityProvider>
                  ) : tab === 'feedback' ? (
                    <Stack p={'var(--space-4)'}>
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
                          email: selectedApplication.candidates.email,
                          name: `${selectedApplication.candidates.first_name || ''} ${selectedApplication?.candidates.last_name || ''}`.trim(),
                          job_id: selectedApplication.job_id,
                        }}
                      />
                    </Stack>
                  ) : tab === 'candidate_feedback' ? (
                    <CandidateFeedback
                      feedback={selectedApplication.feedback}
                      id={selectedApplication.id}
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
                session_duration: item.session_duration,
                session_name: item.name,
                schedule_type: item.schedule_type,
                session_type: item.session_type,
                status: item.interview_meeting?.status || 'not_scheduled',
                date: item.interview_meeting?.start_time
                  ? {
                      start_time: item.interview_meeting?.start_time,
                      end_time: item.interview_meeting?.end_time,
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
