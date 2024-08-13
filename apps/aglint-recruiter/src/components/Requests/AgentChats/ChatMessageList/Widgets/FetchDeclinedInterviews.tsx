import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';

import { Text } from '@/devlink/Text';
import { getScheduleType } from '@/src/components/Scheduling/Candidates/utils';
import { formatTimeWithTimeZone } from '@/src/components/Scheduling/utils';
import ROUTES from '@/src/utils/routing/routes';

import ScheduleList, { ScheduleListProps } from '../../Components/SheduleList';
import { ChatType } from '../hooks/fetch';

function FetchDeclinedInterviews({ chat }: { chat: ChatType }) {
  const meta = chat.metadata;
  const selPayload =
    meta?.findLast(
      (ele) => ele.function_name === 'fetch_candidate_declined_interviews',
    )?.payload || [];

  const uiSchedules: ScheduleListProps[] = selPayload?.map((session) => {
    return {
      title: session.interview_session.name,
      type: getScheduleType(session.interview_session.schedule_type),
      date: dayjsLocal(
        session.interview_session.interview_meeting.start_time,
      ).format('DD MMM YYYY'),
      link:
        ROUTES['/scheduling/view']() +
        `?meeting_id=${session.interview_session.interview_meeting.id}&tab=candidate_details`,
      time: formatTimeWithTimeZone({
        start_time: session.interview_session.interview_meeting.start_time,
        end_time: session.interview_session.interview_meeting.end_time,
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

export default FetchDeclinedInterviews;
