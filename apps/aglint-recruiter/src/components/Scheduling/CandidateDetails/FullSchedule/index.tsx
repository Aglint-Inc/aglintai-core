import { Stack } from '@mui/material';

import { EditOptionModule } from '@/devlink3/EditOptionModule';
import { InterviewBreakCard } from '@/devlink3/InterviewBreakCard';
import { NewInterviewPlan } from '@/devlink3/NewInterviewPlan';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import toast from '@/src/utils/toast';

import CancelScheduleDialog from '../../ScheduleDetails/CancelScheduleDialog';
import RescheduleDialog from '../../ScheduleDetails/RescheduleDialog';
import { useGetScheduleApplication } from '../hooks';
import SelfSchedulingDrawer from '../SchedulingDrawer';
import {
  SchedulingApplication,
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
    .filter((ses) => selectedSessionIds.includes(ses.id))
    .some((ses) => ses.session_type === 'debrief');

  const isNormalSession = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.id))
    .some((ses) => ses.session_type !== 'debrief');

  const selectSession = ({
    session,
  }: {
    session: SchedulingApplication['initialSessions'][number];
  }) => {
    if (session?.users?.length > 0) {
      if (selectedSessionIds.includes(session.id)) {
        setSelectedSessionIds(
          selectedSessionIds.filter((id) => id !== session.id),
        );
      } else {
        setSelectedSessionIds([...selectedSessionIds, session.id]);
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
                session_id: selectedSession?.id,
                session_name: selectedSession?.name,
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
            session_id={selectedSession?.id}
            session_name={selectedSession?.name}
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
                        isNormalSession && session.session_type === 'debrief'
                          ? 0.5
                          : isDebrief &&
                              (session.session_type !== 'debrief' ||
                                !selectedSessionIds.includes(session.id))
                            ? 0.5
                            : 1,
                      pointerEvents:
                        isNormalSession && session.session_type === 'debrief'
                          ? 'none'
                          : isDebrief &&
                              (session.session_type !== 'debrief' ||
                                !selectedSessionIds.includes(session.id))
                            ? 'none'
                            : 'auto',
                    }}
                  >
                    <Stack
                      sx={{
                        cursor:
                          session.interview_meeting?.status === 'completed' ||
                          session.interview_meeting?.status === 'confirmed' ||
                          session.interview_meeting?.status === 'waiting'
                            ? 'pointer'
                            : 'auto',
                      }}
                    >
                      <ScheduleIndividualCard
                        isCheckboxVisible={true}
                        session={session}
                        onClickCheckBox={selectSession}
                        selectedSessionIds={selectedSessionIds}
                        isOnclickCard={true}
                        isThreeDotVisible={true}
                      />
                    </Stack>
                    {session.break_duration > 0 && (
                      <Stack pt={'var(--space-2)'}>
                        <InterviewBreakCard
                          textDuration={getBreakLabel(session.break_duration)}
                          isThreeDotVisible={true}
                          isEditDeleteVisible={false}
                          slotEditOptionModule={
                            <EditOptionModule
                              isResendInviteVisible={false}
                              isEditVisible={true}
                              isViewScheduleVisible={false}
                              isCancelScheduleVisible={false}
                              isRescheduleVisible={false}
                              onClickEdit={{
                                onClick: () => {
                                  setEditSession(session);
                                  setIsEditBreakOpen(true);
                                },
                              }}
                            />
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
