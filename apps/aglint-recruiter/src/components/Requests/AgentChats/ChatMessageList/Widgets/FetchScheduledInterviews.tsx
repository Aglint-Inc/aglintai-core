import { CallBackAll } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';

import { Text } from '@/devlink/Text';
import { getScheduleType } from '@/src/components/Scheduling/Candidates/utils';
import { formatTimeWithTimeZone } from '@/src/components/Scheduling/utils';
import { useUserChat } from '@/src/queries/userchat';
import ROUTES from '@/src/utils/routing/routes';

import ScheduleList, { ScheduleListProps } from '../../Components/SheduleList';

function FetchScheduledInterviews({
  chat,
}: {
  chat: ReturnType<typeof useUserChat>['data'][0];
}) {
  const meta = chat.metadata as CallBackAll[];
  const selPayload = meta?.findLast(
    (ele) => ele.function_name === 'fetch_scheduled_interviews',
  ).payload;

  const uiSchedules: ScheduleListProps[] = selPayload?.map((session) => {
    return {
      title: session.session_name,
      type: getScheduleType(session.schedule_type),
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
