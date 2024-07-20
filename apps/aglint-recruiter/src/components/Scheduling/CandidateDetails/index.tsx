import { getFullName } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { InterviewPlanEmpty } from '@/devlink2/InterviewPlanEmpty';
import { PageLayout } from '@/devlink2/PageLayout';
import { CandidateSchedule } from '@/devlink3/CandidateSchedule';
import Loader from '@/src/components/Common/Loader';
import { useBreadcrumContext } from '@/src/context/BreadcrumContext/BreadcrumContext';
import ROUTES from '@/src/utils/routing/routes';

import CandidateInfo from '../Common/CandidateInfo';
import ScheduleProgress from '../Common/ScheduleProgress';
import FeedbackWindow from '../ScheduleDetails/Feedback';
import CandidateFeedback from './CandidateFeedback';
import FullSchedule from './FullSchedule';
import { useAllActivities, useGetScheduleApplication } from './hooks';
import { RequestAvailabilityProvider } from './RequestAvailability/RequestAvailabilityContext';
import RightPanel from './RightPanel';
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

  const { breadcrum, setBreadcrum } = useBreadcrumContext();
  useEffect(() => {
    if (selectedApplication?.id) {
      setBreadcrum([
        {
          name: 'Scheduling',
          route: ROUTES['/scheduling']() + `?tab=dashboard`,
        },
        {
          name: 'Candidates',
          route: ROUTES['/scheduling']() + `?tab=candidates`,
        },
        {
          name: getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          ),
        },
      ]);
    }
  }, [selectedApplication?.id]);

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
      <PageLayout
        slotTopbarLeft={<>{breadcrum}</>}
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
                    <Stack p={`var(--radius-4)`}>
                      <Stack
                        sx={{
                          borderRadius: 'var(--radius-4)',
                          background: 'var(--white)',
                        }}
                      >
                        <CandidateInfo
                          application_id={selectedApplication.id}
                          job_id={selectedApplication.job_id}
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
                          id: item.interview_session.id,
                          title: item.interview_session.name,
                          created_at: item.interview_session.created_at,
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
                session_duration: item.interview_session.session_duration,
                session_name: item.interview_session.name,
                schedule_type: item.interview_session.schedule_type,
                session_type: item.interview_session.session_type,
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
