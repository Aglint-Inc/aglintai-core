import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSurface } from '@/devlink/ButtonSurface';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ConfirmScheduleList } from '@/devlink3/ConfirmScheduleList';
import { ConfirmScheduleListCard } from '@/devlink3/ConfirmScheduleListCard';
import { RescheduleCard } from '@/devlink3/RescheduleCard';
import { ScheduleButton } from '@/devlink3/ScheduleButton';
import CandidateDefaultIcon from '@/src/components/Common/Icons/CandidateDefaultIcon';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import ROUTES from '@/src/utils/routing/routes';

import IconScheduleType from '../../Candidates/ListCard/Icon';
import { getScheduleType } from '../../Candidates/utils';
import IconCancelSchedule from '../../ScheduleDetails/Icons/IconCancelSchedule';
import IconReschedule from '../../ScheduleDetails/Icons/IconReschedule';
import { formatTimeWithTimeZone } from '../../utils';
import {
  setDateRange,
  setIsScheduleNowOpen,
  setStepScheduling,
} from '../SelfSchedulingDrawer/store';
import {
  setMultipleCancelOpen,
  setRescheduleSessionIds,
  setSelectedApplicationLog,
  useSchedulingApplicationStore,
} from '../store';
import IconSessionType from './IconSessionType';

function SlotContent({ act }: { act: DatabaseTable['application_logs'] }) {
  const router = useRouter();
  const { selectedApplication } = useSchedulingApplicationStore((state) => ({
    selectedApplication: state.selectedApplication,
  }));

  if (act.metadata.type === 'booking_confirmation') {
    const sessions = act.metadata.sessions;
    const filter_id = act.metadata.filter_id;
    const availability_request_id = act.metadata.availability_request_id;

    return (
      <Stack spacing={2} width={'100%'}>
        <Stack spacing={1} width={'100%'}>
          {sessions.map((session) => {
            return (
              <ConfirmScheduleList
                key={session.id}
                textDate={dayjs(session.interview_meeting.start_time).format(
                  'DD MMMM YYYY',
                )}
                slotConfirmScheduleList={
                  <ConfirmScheduleListCard
                    textDuration={getBreakLabel(session.session_duration)}
                    textPanelName={session.name}
                    textMeetingPlatformName={getScheduleType(
                      session.schedule_type,
                    )}
                    textTime={formatTimeWithTimeZone({
                      start_time: session.interview_meeting.start_time,
                      end_time: session.interview_meeting.end_time,
                      timeZone: userTzDayjs.tz.guess(),
                    })}
                    slotIconPanel={
                      <IconSessionType type={session.session_type} />
                    }
                    slotMeetingIcon={
                      <IconScheduleType type={session.schedule_type} />
                    }
                  />
                }
              />
            );
          })}
        </Stack>

        {(filter_id || availability_request_id) &&
          act?.metadata?.action === 'waiting' && (
            <Stack direction={'row'} spacing={2}>
              <Stack width={'50%'}>
                <ButtonSoft
                  color={'neutral'}
                  size={1}
                  textButton={'Reschedule'}
                  slotIcon={
                    <Stack>
                      <GlobalIcon iconName={'refresh'} />
                    </Stack>
                  }
                  isLeftIcon={true}
                  onClickButton={{
                    onClick: () => {
                      const session_ids = sessions.map((session) => session.id);
                      setRescheduleSessionIds(session_ids);
                      setStepScheduling('reschedule');
                      setSelectedApplicationLog(act);
                      setIsScheduleNowOpen(true);
                    },
                  }}
                />
              </Stack>

              <Stack width={'50%'}>
                <ButtonSoft
                  size={1}
                  color={'error'}
                  textButton={'Cancel'}
                  onClickButton={{
                    style: { background: '#FFF0F1' },
                    onClick: () => {
                      setSelectedApplicationLog(act);
                      setMultipleCancelOpen(true);
                    },
                  }}
                  slotIcon={
                    <Stack>
                      <GlobalIcon iconName={'event_busy'} />
                    </Stack>
                  }
                  isLeftIcon={true}
                />
              </Stack>
            </Stack>
          )}
      </Stack>
    );
  } else if (act.metadata.type === 'candidate_response_self_schedule') {
    const rescheduleDetails = {
      response_type: act.metadata.response_type,
      reason: act.metadata.reason,
      other_details: act.metadata.other_details,
      filter_id: act.metadata.filter_id,
      session_ids: act.metadata.session_ids,
    };

    return (
      <Stack spacing={2} width={'100%'}>
        <RescheduleCard
          textColorProps={{
            style: {
              color:
                rescheduleDetails.response_type === 'reschedule'
                  ? '#703815'
                  : '#681219',
            },
          }}
          isButtonVisible={false}
          textName={selectedApplication?.candidates?.first_name}
          textReschedule={
            rescheduleDetails.response_type === 'reschedule'
              ? 'requested a reschedule'
              : 'cancelled this schedule'
          }
          slotProfileImage={<CandidateDefaultIcon size={20} />}
          isChangeInterviewerVisible={false}
          textReason={rescheduleDetails.reason}
          isRescheduleBtnVisible={false}
        />

        {rescheduleDetails?.filter_id &&
          act?.metadata?.action === 'waiting' && (
            <Stack direction={'row'} spacing={2}>
              {rescheduleDetails.response_type === 'reschedule' && (
                <ScheduleButton
                  textLabel={'Reschedule'}
                  slotIcon={<IconReschedule />}
                  onClickProps={{
                    onClick: () => {
                      setStepScheduling('reschedule');
                      setSelectedApplicationLog(act);
                      setRescheduleSessionIds(rescheduleDetails.session_ids);
                      setIsScheduleNowOpen(true);
                      setDateRange({
                        start_date:
                          rescheduleDetails.other_details.dateRange.start,
                        end_date: rescheduleDetails.other_details.dateRange.end,
                      });
                    },
                  }}
                />
              )}
              {rescheduleDetails.response_type === 'cancel' && (
                <ScheduleButton
                  textLabel={'Cancel Schedule'}
                  slotIcon={<IconCancelSchedule />}
                  textColorProps={{
                    style: {
                      color: '#D93F4C',
                    },
                  }}
                  onClickProps={{
                    style: { background: '#FFF0F1' },
                    onClick: () => {
                      setSelectedApplicationLog(act);
                      setMultipleCancelOpen(true);
                    },
                  }}
                />
              )}
            </Stack>
          )}
      </Stack>
    );
  } else if (act.metadata.type === 'interviewer_decline') {
    const meeting_id = act.metadata.meeting_id;
    return (
      <Stack direction={'row'}>
        <ButtonSurface
          size={1}
          textButton={'View details'}
          onClickButton={{
            onClick: () => {
              router.push(
                ROUTES['/scheduling/view']() +
                  `?meeting_id=${meeting_id}&tab=candidate_details`,
              );
            },
          }}
        />
      </Stack>
    );
  } else {
    return null;
  }
}

export default SlotContent;
