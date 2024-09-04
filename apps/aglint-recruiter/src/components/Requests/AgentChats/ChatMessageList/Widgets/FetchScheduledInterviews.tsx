import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';

import { Text } from '@/devlink/Text';
import { formatTimeWithTimeZone } from '@/src/components/Scheduling/utils';
import ROUTES from '@/src/utils/routing/routes';
import { getScheduleType } from '@/src/utils/scheduling/colors_and_enums';

import ScheduleList, {
  type ScheduleListProps,
} from '../../Components/SheduleList';
import { type ChatType } from '../hooks/fetch';

function FetchScheduledInterviews({ chat }: { chat: ChatType }) {
  const meta = chat.metadata;
  const selPayload = meta?.findLast(
    (ele) => ele.function_name === 'fetch_scheduled_interviews',
  ).payload;

  const uiSchedules: ScheduleListProps[] = selPayload?.map((session) => {
    return {
      title: session.interview_session[0].name,
      type: getScheduleType(session.interview_session[0].schedule_type),
      date: dayjsLocal(session.start_time).format('DD MMM YYYY'),
      link:
        ROUTES['/scheduling/view']() +
        `?meeting_id=${session.id}&tab=candidate_details`,
      time: formatTimeWithTimeZone({
        start_time: session.start_time,
        end_time: session.end_time,
      }),
    };
  });

  return (
    <Stack spacing={'var(--space-2)'} width={'100%'}>
      {selPayload?.length > 0 ? (
        <ScheduleList schedules={uiSchedules} />
      ) : (
        <Text content={'No scheduled interviews'} />
      )}
    </Stack>
  );
}

export default FetchScheduledInterviews;
