import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { Checkbox } from '@/devlink';
import { StatusBadge } from '@/devlink2';
import {
  EditOptionModule,
  InterviewBreakCard,
  NewInterviewPlan,
  NewInterviewPlanCard,
} from '@/devlink3';
import { getBreakLabel } from '@/src/components/JobNewInterviewPlan/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import IconScheduleType from '../../ListCard/Icon';
import { addScheduleActivity } from '../../queries/utils';
import { setIsCancelOpen, setIsRescheduleOpen } from '../../store';
import { getScheduleType, mailHandler } from '../../utils';
import CancelScheduleDialog from '../Common/CancelScheduleDialog';
import RescheduleDialog from '../Common/RescheduleDialog';
import GetScheduleOptionsDialog from '../GetScheduleOptions';
import {
  SchedulingApplication,
  setEditSession,
  setIsEditBreakOpen,
  setIsEditOpen,
  setSelectedSession,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from '../store';
import BreakDrawerEdit from './BreakDrawer';
import SideDrawerEdit from './EditDrawer';

function FullSchedule() {
  const router = useRouter();
  const { recruiter, recruiterUser } = useAuthDetails();
  const initialSessions = useSchedulingApplicationStore(
    (state) => state.initialSessions,
  );

  const selectedSchedule = useSchedulingApplicationStore(
    (state) => state.selectedSchedule,
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

  const onClickResendInvite = async (session_id) => {
    try {
      const { data: checkFilterJson, error: errMeetFilterJson } = await supabase
        .from('interview_filter_json')
        .select('*')
        .contains('session_ids', [session_id]);

      if (errMeetFilterJson) throw new Error(errMeetFilterJson.message);

      if (checkFilterJson.length > 0 && selectedSchedule.id) {
        const res = await mailHandler({
          candidate_name: getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          ),
          filter_id: checkFilterJson[0].id,
          mail: selectedApplication.candidates.email,
          position: selectedApplication.public_jobs.job_title,
          rec_id: recruiter.id,
          schedule_id: selectedSchedule.id,
          schedule_name: `Interview for ${selectedApplication.public_jobs.job_title} - ${selectedApplication.candidates.first_name}`,
          supabase,
          rec_mail: recruiterUser.email,
        });

        if (res) {
          addScheduleActivity({
            title: `Interview link resent`,
            application_id: selectedApplication.id,
            logger: recruiterUser.user_id,
            type: 'schedule',
            supabase,
            created_by: recruiterUser.user_id,
          });
          toast.success('Invite Resent');
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const selectSession = ({
    session,
  }: {
    session: SchedulingApplication['initialSessions'][0];
  }) => {
    if (selectedSessionIds.includes(session.id)) {
      setSelectedSessionIds(
        selectedSessionIds.filter((id) => id !== session.id),
      );
    } else {
      setSelectedSessionIds([...selectedSessionIds, session.id]);
    }
  };

  return (
    <>
      <SideDrawerEdit />
      <BreakDrawerEdit />
      <CancelScheduleDialog />
      <RescheduleDialog />
      <GetScheduleOptionsDialog />
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
                onClick={() => {
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
                }}
              >
                <NewInterviewPlanCard
                  isThreeDotVisible={
                    session.interview_meeting?.status !== 'completed'
                  }
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
                          session.interview_meeting.status === 'not_scheduled'
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
                          onClick: () => {
                            selectSession({ session });
                          },
                        }}
                      />
                    ) : (
                      <Stack width={'18px'}></Stack>
                    )
                  }
                  isSelected={selectedSessionIds.includes(session.id)}
                  isTimeVisible={Boolean(session.interview_meeting?.start_time)}
                  slotPlatformIcon={
                    <IconScheduleType type={session.schedule_type} />
                  }
                  textDuration={`${session.session_duration} Minutes`}
                  textLocation={session.location || '--'}
                  textMeetingPlatform={getScheduleType(session.schedule_type)}
                  textMeetingTitle={session.name || '--'}
                  textDate={dayjs(session.interview_meeting?.start_time).format(
                    'DD',
                  )}
                  textDay={dayjs(session.interview_meeting?.start_time).format(
                    'dddd',
                  )}
                  textMonth={dayjs(
                    session.interview_meeting?.start_time,
                  ).format('MMM')}
                  textTime={
                    session.interview_meeting?.start_time
                      ? `${dayjs(session.interview_meeting?.start_time).format(
                          'hh:mm A',
                        )} - ${dayjs(
                          session.interview_meeting?.end_time,
                        ).format('hh:mm A')}`
                      : '--'
                  }
                  slotEditOptionModule={
                    <EditOptionModule
                      isResendInviteVisible={
                        session.interview_meeting?.status === 'waiting'
                      }
                      onClickResendInvite={{
                        onClick: () => {
                          onClickResendInvite(session.id);
                        },
                      }}
                      isEditVisible={
                        !session.interview_meeting ||
                        session.interview_meeting?.status === 'not_scheduled'
                      }
                      isViewScheduleVisible={false}
                      isCancelScheduleVisible={
                        session.interview_meeting?.status === 'confirmed' ||
                        session.interview_meeting?.status === 'waiting'
                      }
                      isRescheduleVisible={
                        session.interview_meeting?.status === 'confirmed' ||
                        session.interview_meeting?.status === 'waiting' ||
                        session.interview_meeting?.status === 'cancelled'
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
                <Stack pl={'34px'} pt={'10px'}>
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
