import type { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { ConfirmScheduleList } from '@devlink3/ConfirmScheduleList';
import { ConfirmScheduleListCard } from '@devlink3/ConfirmScheduleListCard';
import { Stack } from '@mui/material';

import { getBreakLabel } from '@/utils/getBreakLabel';

import { getScheduleType } from '../../../utils/scheduling/colors_and_enums';
import IconScheduleType from '../../Common/Icons/IconScheduleType';
import IconSessionType from '../../Common/Icons/IconSessionType';
import { formatTimeWithTimeZone } from '../../Scheduling/utils';

function BookingConfirmation({
  act,
}: {
  act: DatabaseTable['application_logs'];
}) {
  if (act.metadata.type === 'booking_confirmation') {
    const sessions = act.metadata.sessions;

    return (
      <Stack spacing={2} width={'100%'}>
        <Stack spacing={1} width={'100%'}>
          {sessions.map((session) => {
            return (
              <ConfirmScheduleList
                key={session.id}
                textDate={dayjsLocal(
                  session.interview_meeting.start_time,
                ).format('DD MMMM YYYY')}
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
                      timeZone: dayjsLocal.tz.guess(),
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
      </Stack>
    );
  }
}

export default BookingConfirmation;
