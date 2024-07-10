import { getFullName } from '@aglint/shared-utils';
import { Stack } from '@mui/material';

import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { InterviewBreakCard } from '@/devlink3/InterviewBreakCard';
import { NewInterviewPlan } from '@/devlink3/NewInterviewPlan';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import toast from '@/src/utils/toast';

import CancelScheduleDialog from '../../ScheduleDetails/CancelScheduleDialog';
import RescheduleDialog from '../../ScheduleDetails/RescheduleDialog';
import { useGetScheduleApplication } from '../hooks';
import SelfSchedulingDrawer from '../SchedulingDrawer';
import {
  setEditSession,
  setIndividualCancelOpen,
  setIndividualRescheduleOpen,
  setIsEditBreakOpen,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from '../store';
import BreakDrawerEdit from './BreakDrawer';
import SideDrawerEdit from './EditDrawer';
import RequestAvailabilityPopUps from './RequestAvailabilityPopUps';
import { AvailabilityProvider } from './RequestAvailabilityPopUps/RequestAvailabilityContext';
import ScheduleIndividualCard from './ScheduleIndividual';
import TaskPopups from './TaskPopups';

function FullSchedule({ refetch }: { refetch: () => void }) {
  const {
    availabilities,
    initialSessions,
    selectedSessionIds,
    fetchingSchedule,
    selectedApplication,
    isIndividualCancelOpen,
    selectedSession,
    isIndividualRescheduleOpen,
  } = useSchedulingApplicationStore((state) => ({
    initialSessions: state.initialSessions,
    selectedSessionIds: state.selectedSessionIds,
    availabilities: state.availabilities,
    fetchingSchedule: state.fetchingSchedule,
    selectedApplication: state.selectedApplication,
    isIndividualCancelOpen: state.isIndividualCancelOpen,
    selectedSession: state.selectedSession,
    isIndividualRescheduleOpen: state.isIndividualRescheduleOpen,
  }));

  const isDebrief = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.interview_session.id))
    .some((ses) => ses.interview_session.session_type === 'debrief');

  const isNormalSession = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.interview_session.id))
    .some((ses) => ses.interview_session.session_type !== 'debrief');

  const selectSession = ({ session_id }: { session_id: string }) => {
    const session = initialSessions.find(
      (ses) => ses.interview_session.id === session_id,
    );

    if (session?.users?.length > 0) {
      if (selectedSessionIds.includes(session.interview_session.id)) {
        setSelectedSessionIds(
          selectedSessionIds.filter(
            (id) => id !== session.interview_session.id,
          ),
        );
      } else {
        setSelectedSessionIds([
          ...selectedSessionIds,
          session.interview_session.id,
        ]);
      }
    } else {
      toast.warning(
        'There are no available interviewers. Please add some before scheduling.',
      );
    }
  };

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  return (
    <>
      <SideDrawerEdit />
      <BreakDrawerEdit />
      {selectedSession && (
        <>
          <CancelScheduleDialog
            refetch={() => {
              fetchInterviewDataByApplication();
              refetch();
            }}
            metaDetails={[
              {
                application_id: selectedApplication.id,
                meeting_id: selectedSession?.interview_meeting.id,
                session_id: selectedSession?.interview_session.id,
                session_name: selectedSession?.interview_session.name,
              },
            ]}
            isDeclineOpen={isIndividualCancelOpen}
            setIsDeclineOpen={setIndividualCancelOpen}
            closeDialog={() => {}}
            application_log_id={null}
          />

          <RescheduleDialog
            refetch={() => {
              fetchInterviewDataByApplication();
              refetch();
            }}
            isRescheduleOpen={isIndividualRescheduleOpen}
            setIsRescheduleOpen={setIndividualRescheduleOpen}
            application_id={selectedApplication.id}
            meeting_id={selectedSession?.interview_meeting.id}
            session_id={selectedSession?.interview_session.id}
            session_name={selectedSession?.interview_session.name}
            meeting_flow={selectedSession?.interview_meeting.meeting_flow}
          />
        </>
      )}

      <SelfSchedulingDrawer refetch={refetch} />
      <NewInterviewPlan
        slotNewInterviewPlanCard={
          !fetchingSchedule && (
            <>
              {availabilities?.length > 0 && (
                <AvailabilityProvider>
                  <RequestAvailabilityPopUps />
                </AvailabilityProvider>
              )}
              <TaskPopups />
              {initialSessions.map((session, ind) => {
                return (
                  <Stack
                    key={ind}
                    style={{
                      opacity:
                        isNormalSession &&
                        session.interview_session.session_type === 'debrief'
                          ? 0.5
                          : isDebrief &&
                              (session.interview_session.session_type !==
                                'debrief' ||
                                !selectedSessionIds.includes(
                                  session.interview_session.id,
                                ))
                            ? 0.5
                            : 1,
                      pointerEvents:
                        isNormalSession &&
                        session.interview_session.session_type === 'debrief'
                          ? 'none'
                          : isDebrief &&
                              (session.interview_session.session_type !==
                                'debrief' ||
                                !selectedSessionIds.includes(
                                  session.interview_session.id,
                                ))
                            ? 'none'
                            : 'auto',
                    }}
                  >
                    <ScheduleIndividualCard
                      isCheckboxVisible={true}
                      isCollapseButtonsVisible={true}
                      interview_session={{
                        break_duration:
                          session.interview_session.break_duration,
                        id: session.interview_session.id,
                        name: session.interview_session.name,
                        schedule_type: session.interview_session.schedule_type,
                        session_duration:
                          session.interview_session.session_duration,
                        session_type: session.interview_session.session_type,
                      }}
                      interview_meeting={
                        session.interview_meeting
                          ? {
                              end_time: session.interview_meeting?.end_time,
                              id: session.interview_meeting?.id,
                              start_time: session.interview_meeting?.start_time,
                              status: session.interview_meeting?.status,
                              meeting_flow:
                                session.interview_meeting?.meeting_flow,
                            }
                          : null
                      }
                      onClickCheckBox={selectSession}
                      selectedSessionIds={selectedSessionIds}
                      candidate={{
                        fullname: getFullName(
                          selectedApplication.candidates.first_name,
                          selectedApplication.candidates.last_name,
                        ),
                        timezone: selectedApplication.candidates.timezone,
                        currentJobTitle:
                          selectedApplication.candidates.current_job_title,
                      }}
                      jobTitle={selectedApplication.public_jobs.job_title}
                      users={session.users}
                      isCollapseNeeded={true}
                      isEditIconVisible={true}
                      isViewDetailVisible={true}
                      gridStyle={'1.1fr 1.7fr 0.6fr'}
                      cancelReasons={session.cancel_reasons || []}
                      currentSession={session}
                    />
                    {session.interview_session.break_duration > 0 && (
                      <Stack pt={'var(--space-2)'}>
                        <InterviewBreakCard
                          textDuration={getBreakLabel(
                            session.interview_session.break_duration,
                          )}
                          slotEditButton={
                            <>
                              <IconButtonSoft
                                iconName={'edit'}
                                size={1}
                                color={'neutral'}
                                onClickButton={{
                                  onClick: () => {
                                    setEditSession(session);
                                    setIsEditBreakOpen(true);
                                  },
                                }}
                              />
                            </>
                          }
                        />
                      </Stack>
                    )}
                  </Stack>
                );
              })}
            </>
          )
        }
      />
    </>
  );
}

export default FullSchedule;
