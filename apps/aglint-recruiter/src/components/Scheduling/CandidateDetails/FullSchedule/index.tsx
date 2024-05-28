import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { Checkbox } from '@/devlink/Checkbox';
import { StatusBadge } from '@/devlink2/StatusBadge';
import { EditOptionModule } from '@/devlink3/EditOptionModule';
import { InterviewBreakCard } from '@/devlink3/InterviewBreakCard';
import { NewInterviewPlan } from '@/devlink3/NewInterviewPlan';
import { NewInterviewPlanCard } from '@/devlink3/NewInterviewPlanCard';
import { getBreakLabel } from '@/src/components/JobNewInterviewPlan/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { userTzDayjs } from '@/src/services/CandidateSchedule/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import IconScheduleType from '../../Candidates/ListCard/Icon';
import { setIsCancelOpen, setIsRescheduleOpen } from '../../Candidates/store';
import { getScheduleBgcolor, getScheduleType } from '../../Candidates/utils';
import { convertTimeZoneToAbbreviation } from '../../utils';
import CancelScheduleDialog from '../Common/CancelScheduleDialog';
import RescheduleDialog from '../Common/RescheduleDialog';
import SelfSchedulingDrawer from '../SelfSchedulingDrawer';
import {
  SchedulingApplication,
  setEditSession,
  setIsEditBreakOpen,
  setIsEditOpen,
  setSelectedSession,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from '../store';
import { onClickResendInvite } from '../utils';
import BreakDrawerEdit from './BreakDrawer';
import SideDrawerEdit from './EditDrawer';

function FullSchedule() {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const initialSessions = useSchedulingApplicationStore(
    (state) => state.initialSessions,
  );

  const selectedSessionIds = useSchedulingApplicationStore(
    (state) => state.selectedSessionIds,
  );
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication,
  );

  const isDebrief = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.id))
    .some((ses) => ses.session_type === 'debrief');

  const isNormalSession = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.id))
    .some((ses) => ses.session_type !== 'debrief');

  const selectSession = ({
    session,
  }: {
    session: SchedulingApplication['initialSessions'][0];
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

  return (
    <>
      <SideDrawerEdit />
      <BreakDrawerEdit />
      <CancelScheduleDialog />
      <RescheduleDialog />
      <SelfSchedulingDrawer />
      <NewInterviewPlan
        slotNewInterviewPlanCard={initialSessions?.map((session, ind) => {
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
                    session.interview_meeting?.status === 'confirmed'
                      ? 'pointer'
                      : 'auto',
                }}
              >
                <NewInterviewPlanCard
                  isCheckboxVisible={true}
                  onClickCard={{
                    onClick: (e) => {
                      e.stopPropagation();
                      if (
                        session.interview_meeting?.status === 'completed' ||
                        session.interview_meeting?.status === 'confirmed'
                      ) {
                        router.push(
                          `/scheduling/view?meeting_id=${session.interview_meeting.id}&tab=candidate_details`,
                        );
                      } else if (
                        session.interview_meeting?.status === 'not_scheduled' ||
                        !session.interview_meeting
                      ) {
                        selectSession({ session });
                      }
                    },
                  }}
                  isDateVisible={
                    session.interview_meeting?.status !== 'cancelled' &&
                    Boolean(session.interview_meeting?.start_time)
                  }
                  isThreeDotVisible={
                    session.interview_meeting?.status !== 'completed'
                  }
                  propsBgColorStatus={{
                    style: {
                      background: getScheduleBgcolor(
                        session.interview_meeting?.status,
                      ),
                    },
                  }}
                  slotStatus={
                    session.interview_meeting?.status ? (
                      <StatusBadge
                        isCancelledVisible={
                          session.interview_meeting.status === 'cancelled'
                        }
                        isConfirmedVisible={
                          session.interview_meeting.status === 'confirmed'
                        }
                        isWaitingVisible={
                          session.interview_meeting.status === 'waiting'
                        }
                        isCompletedVisible={
                          session.interview_meeting.status === 'completed'
                        }
                        isNotScheduledVisible={
                          session.interview_meeting.status ===
                            'not_scheduled' || false
                        }
                      />
                    ) : (
                      <StatusBadge
                        isNotScheduledVisible={true}
                        isCancelledVisible={false}
                        isConfirmedVisible={false}
                        isWaitingVisible={false}
                        isCompletedVisible={false}
                      />
                    )
                  }
                  isDebriefIconVisible={session.session_type === 'debrief'}
                  isPanelIconVisible={session.session_type === 'panel'}
                  isOnetoOneIconVisible={session.session_type === 'individual'}
                  isDurationVisible={true}
                  isLocationVisible={Boolean(session.location)}
                  isNotScheduledIconVisible={
                    !session.interview_meeting?.start_time
                  }
                  slotCheckbox={
                    !session.interview_meeting ||
                    session.interview_meeting.status === 'not_scheduled' ||
                    session.interview_meeting.status === 'cancelled' ||
                    session.interview_meeting.status === 'reschedule' ? (
                      <Checkbox
                        isChecked={selectedSessionIds.includes(session.id)}
                        onClickCheck={{
                          onClick: (e) => {
                            e.stopPropagation();
                            selectSession({ session });
                          },
                        }}
                      />
                    ) : (
                      <Stack width={'18px'}></Stack>
                    )
                  }
                  isSelected={selectedSessionIds.includes(session.id)}
                  isTimeVisible={
                    (session.interview_meeting?.status == 'confirmed' ||
                      session.interview_meeting?.status == 'completed') &&
                    Boolean(session.interview_meeting?.start_time)
                  }
                  slotPlatformIcon={
                    <IconScheduleType type={session.schedule_type} />
                  }
                  textDuration={`${session.session_duration} Minutes`}
                  textLocation={session.location || '--'}
                  textMeetingPlatform={getScheduleType(session.schedule_type)}
                  textMeetingTitle={session.name || '--'}
                  textDate={
                    (session.interview_meeting?.status == 'confirmed' ||
                      session.interview_meeting?.status == 'completed') &&
                    (session.interview_meeting?.start_time
                      ? dayjs(session.interview_meeting?.start_time).format(
                          'ddd, MMM DD, YYYY',
                        )
                      : '')
                  }
                  textTime={
                    session.interview_meeting?.start_time
                      ? `${dayjs(session.interview_meeting?.start_time).format(
                          'hh:mm A',
                        )} - ${dayjs(
                          session.interview_meeting?.end_time,
                        ).format(
                          'hh:mm A',
                        )} ${convertTimeZoneToAbbreviation(userTzDayjs.tz.guess())}`
                      : '--'
                  }
                  slotEditOptionModule={
                    <EditOptionModule
                      isResendInviteVisible={
                        session.interview_meeting?.status === 'waiting'
                      }
                      onClickResendInvite={{
                        onClick: () => {
                          onClickResendInvite({
                            session_name: session.name,
                            session_id: session.id,
                            application_id: selectedApplication.id,
                            candidate_name: getFullName(
                              selectedApplication.candidates.first_name,
                              selectedApplication.candidates.first_name,
                            ),
                            rec_user_id: recruiterUser.user_id,
                          });
                        },
                      }}
                      isEditVisible={
                        !session.interview_meeting ||
                        session.interview_meeting?.status === 'not_scheduled' ||
                        session.interview_meeting?.status === 'cancelled'
                      }
                      isViewScheduleVisible={false}
                      isCancelScheduleVisible={
                        session.interview_meeting?.status === 'confirmed' ||
                        session.interview_meeting?.status === 'waiting'
                      }
                      isRescheduleVisible={
                        session.interview_meeting?.status === 'confirmed' ||
                        session.interview_meeting?.status === 'waiting'
                      }
                      onClickCancelSchedule={{
                        onClick: () => {
                          setSelectedSession(session);
                          setIsCancelOpen(true);
                        },
                      }}
                      onClickReschedule={{
                        onClick: () => {
                          setSelectedSession(session);
                          setIsRescheduleOpen(true);
                        },
                      }}
                      onClickEdit={{
                        onClick: () => {
                          setEditSession(session);
                          setIsEditOpen(true);
                        },
                      }}
                    />
                  }
                />
              </Stack>
              {session.break_duration > 0 && (
                <Stack pt={'10px'}>
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
      />
    </>
  );
}

export default FullSchedule;
