import { Stack, Zoom } from '@mui/material';
import dayjs from 'dayjs';

import { MembersList } from '@/devlink3/MembersList';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { convertTimeZoneToAbbreviation } from '@/src/components/Scheduling/utils';
import AssigneeDetailsCard, { LightTooltip } from '@/src/components/Tasks/Components/AssigneeDetailsCard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { userTzDayjs } from '@/src/services/CandidateSchedule/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';

import { ScheduleListType } from '../..';

function InterviewerDetailsCard({
  user,
  meetingTiming,
}: {
  user: ScheduleListType[number]['users'][number];
  meetingTiming: {
    startDate: string;
    endDate: string;
  };
}) {
  const timeFrom = dayjs(meetingTiming.startDate).tz(
    user.scheduling_settings.timeZone.tzCode,
  );
  const timeTo = dayjs(meetingTiming.endDate).tz(
    user.scheduling_settings.timeZone.tzCode,
  );

  const { members } = useAuthDetails();
  const assigneeDetails =
    members && members.find((item) => item.user_id === user.id);

  return (
    <LightTooltip
      // disableHoverListener={disableHoverListener}
      TransitionComponent={Zoom}
      title={<AssigneeDetailsCard assigneeDetails={assigneeDetails} />}
    >
      <Stack>
        <MembersList
          isCorrectVisible={user.accepted_status === 'accepted'}
          slotImage={
            <MuiAvatar
              key={user.id}
              src={user.profile_image}
              level={getFullName(user.first_name, user.last_name)}
              variant='circular'
              height='40px'
              width='40px'
              fontSize='12px'
            />
          }
          textName={getFullName(user.first_name, user.last_name)}
          isDesignationVisible={true}
          textDesignation={user.position}
          textTime={`${timeFrom.format('hh:mm A')} - ${timeTo.format('hh:mm A')} ${convertTimeZoneToAbbreviation(userTzDayjs.tz.guess())}`}
          isShadow={user.training_type !== 'qualified'}
          isButtonVisible={false}
          isDetailVisible={true}
        />
      </Stack>
    </LightTooltip>
  );
}

export default InterviewerDetailsCard;
