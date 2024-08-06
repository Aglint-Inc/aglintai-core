import { MetadataForFunction } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { Text } from '@/devlink/Text';
import { getScheduleType } from '@/src/components/Scheduling/Candidates/utils';
import { formatTimeWithTimeZone } from '@/src/components/Scheduling/utils';
import { useUserChat } from '@/src/queries/userchat';
import ROUTES from '@/src/utils/routing/routes';

function FetchScheduledInterviews({
  chat,
}: {
  chat: ReturnType<typeof useUserChat>['data'][0];
}) {
  const router = useRouter();
  const sessions =
    chat.metadata as MetadataForFunction<'fetch_scheduled_interviews'>;

  return (
    <Stack spacing={'var(--space-2)'} width={'100%'}>
      {sessions?.map((ses) => {
        return (
          <Stack
            key={ses.id}
            padding={'var(--space-2)'}
            border={'1px solid'}
            borderRadius={'4px'}
            borderColor={'var(--neutral-7)'}
            width={'100%'}
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              router.push(
                ROUTES['/scheduling/view']() +
                  `?meeting_id=${ses.id}&tab=candidate_details`,
              );
            }}
          >
            <Stack
              direction={'column'}
              spacing={'var(--space-1)'}
              width={'100%'}
            >
              <Text content={ses.session_name} />
              <Text
                size={1}
                content={getScheduleType(ses.schedule_type)}
                color={'neutral'}
              />
              <Text
                size={1}
                content={formatTimeWithTimeZone({
                  start_time: ses.start_time,
                  end_time: ses.end_time,
                })}
              />
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}

export default FetchScheduledInterviews;
