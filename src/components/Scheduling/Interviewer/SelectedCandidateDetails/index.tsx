import dayjs from 'dayjs';

import { ScheduleDetails } from '@/devlink';
import { InterviewPanelMember } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';

import CandidateDetailsJob from './CandidateDetailsJob';
import { useInterviewerStore } from '../store';
import IconScheduleType from '../../Interview/ListCard/Icon';
import { getScheduleType } from '../../Interview/utils';

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
      textPlatformName={getScheduleType(selectedSchedule.schedule.schedule_type)}
      textPanelName={selectedSchedule.panel.name}
      textDuration={selectedSchedule.schedule.duration / 60 + ' min'}
      slotCandidateDetails={<CandidateDetailsJob />}
      slotPanelList={selectedSchedule.schedule.panel_users.map(
        (user: { user_id: string; must: string }) => {
          const member = members.filter(
            (member) => member.user_id === user.user_id,
          )[0];
          return (
            <InterviewPanelMember
              key={user.user_id}
              textMemberName={getFullName(member.first_name, '')}
              slotMemberAvatar={
                <MuiAvatar
                  level={getFullName(member.first_name, '')}
                  src={member.profile_image}
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
