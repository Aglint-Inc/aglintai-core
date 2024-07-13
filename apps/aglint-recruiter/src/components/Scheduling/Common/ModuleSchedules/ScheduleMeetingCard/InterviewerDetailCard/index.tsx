import dayjs from 'dayjs';

import { MembersList } from '@/devlink3/MembersList';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { convertTimeZoneToAbbreviation } from '@/src/components/Scheduling/utils';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';

function InterviewerDetailsCard({
  profile_image,
  first_name,
  last_name,
  start_time,
  end_time,
  tzCode,
  training_type,
  position,
}: {
  profile_image: string;
  first_name: string;
  last_name: string;
  start_time: string;
  end_time: string;
  tzCode: string;
  training_type: 'shadow' | 'reverse_shadow' | 'qualified';
  position: string;
}) {
  const timeFrom = dayjs(start_time).tz(tzCode);
  const timeTo = dayjs(end_time).tz(tzCode);

  return (
    <MembersList
      slotImage={
        <MuiAvatar
          src={profile_image}
          level={getFullName(first_name, last_name)}
          variant='rounded-medium'
        />
      }
      textName={getFullName(first_name, last_name)}
      isDesignationVisible={true}
      textDesignation={position}
      textTime={
        start_time
          ? `${timeFrom.format('hh:mm A')} - ${timeTo.format('hh:mm A')} ${convertTimeZoneToAbbreviation(userTzDayjs.tz.guess())}`
          : null
      }
      isShadow={training_type === 'shadow'}
      isReverseShadow={training_type === 'reverse_shadow'}
      isButtonVisible={false}
      isDetailVisible={true}
    />
  );
}

export default InterviewerDetailsCard;
