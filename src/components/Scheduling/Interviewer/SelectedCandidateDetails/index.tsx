import dayjs from 'dayjs';

import { ScheduleDetails } from '@/devlink';
import { InterviewPanelMember } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import CandidateDetailsJob from './CandidateDetailsJob';
import { useInterviewerStore } from '../store';
import IconScheduleType from '../../AllSchedules/ListCard/Icon';
import { getScheduleType } from '../../AllSchedules/utils';

function SelectedCandidateDetails() {
  const selectedSchedule = useInterviewerStore(
    (state) => state.selectedSchedule,
  );
  const members = useInterviewerStore((state) => state.members);

  return (
    <ScheduleDetails
      isCompletedVisible={selectedSchedule.schedule.status === 'completed'}
      isUpcomingVisible={selectedSchedule.schedule.status === 'confirmed'}
      textDate={dayjs(selectedSchedule.schedule.schedule_time?.endTime).format(
        'DD',
      )}
      textDay={dayjs(selectedSchedule.schedule.schedule_time?.endTime).format(
        'dddd',
      )}
      textMonth={dayjs(selectedSchedule.schedule.schedule_time?.endTime).format(
        'MMM',
      )}
      slotPlatformLogo={
        <IconScheduleType type={selectedSchedule.schedule.schedule_type} />
      }
      isMeetingVisible={
        (selectedSchedule.schedule.meeting_json as any)?.hangoutLink
      }
      onClickCopyMeetingLink={{
        onClick: () => {
          navigator.clipboard.writeText(
            (selectedSchedule.schedule.meeting_json as any)?.hangoutLink,
          );
          toast.success('Link copied to clipboard');
        },
      }}
      textMeetingLink={
        (selectedSchedule.schedule.meeting_json as any)?.hangoutLink
      }
      onClickJoinGoogleMeet={{
        onClick: () => {
          window.open(
            (selectedSchedule.schedule.meeting_json as any)?.hangoutLink,
          );
        },
      }}
      textPlatformName={getScheduleType(
        selectedSchedule.schedule.schedule_type,
      )}
      textPanelName={selectedSchedule.panel.name}
      textDuration={selectedSchedule.schedule.duration + ' minutes'}
      slotCandidateDetails={<CandidateDetailsJob />}
      slotPanelList={selectedSchedule.schedule.panel_users.map(
        (user: { user_id: string; must: string }) => {
          const member = members.find(
            (member) => member.user_id === user.user_id,
          );

          return (
            <InterviewPanelMember
              key={user.user_id}
              textMemberName={getFullName(member?.first_name, '')}
              slotMemberAvatar={
                <MuiAvatar
                  level={getFullName(member?.first_name, '')}
                  src={member?.profile_image}
                  variant={'circular'}
                  width={'100%'}
                  height={'100%'}
                  fontSize={'12px'}
                />
              }
            />
          );
        },
      )}
    />
  );
}

export default SelectedCandidateDetails;
