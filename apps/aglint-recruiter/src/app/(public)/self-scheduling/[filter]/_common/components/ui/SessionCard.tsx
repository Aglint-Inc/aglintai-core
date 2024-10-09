import { type DatabaseTable } from '@aglint/shared-types';
import { getBreakLabel } from '@aglint/shared-utils';

import { SessionIcon } from '@/common/ScheduleProgressPillComp';
import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import { getScheduleType } from '@/utils/scheduling/colors_and_enums';

import { SessionInfo } from '../ui/SessionInfo';

export const SessionCard = ({
  name,
  duration,
  schedule_type,
  session_type,
}: {
  name: string;
  duration: number;
  schedule_type: DatabaseTable['interview_session']['schedule_type'];
  session_type: DatabaseTable['interview_session']['session_type'];
}) => {
  return (
    <SessionInfo
      textSessionName={name}
      textSessionDuration={getBreakLabel(duration)}
      textMeetingType={getScheduleType(schedule_type)}
      slotMeetingTypeIcon={<IconScheduleType size={16} type={schedule_type} />}
      slotInterviewtypeIcon={<SessionIcon session_type={session_type} />}
    />
  );
};
