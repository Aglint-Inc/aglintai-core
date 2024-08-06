import { MetadataForFunction } from '@aglint/shared-types';
import { Stack } from '@mui/material';

import { Text } from '@/devlink/Text';
import InterviewerUserDetail from '@/src/components/Scheduling/Common/InterviewerUserDetail';
import { useUserChat } from '@/src/queries/userchat';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { AvatarWithName } from '@/devlink3/AvatarWithName';
import { getFullName } from '@aglint/shared-utils';

function FetchScheduledInterviews({
  chat,
}: {
  chat: ReturnType<typeof useUserChat>['data'][0];
}) {
  const sessions =
    chat.metadata as MetadataForFunction<'fetch_scheduled_interviews'>;

  return (
    <Stack>
      {sessions?.map((ses) => {
        return (
          <Stack key={ses.id} padding={'var(--padding-2)'}>
            <Stack direction={'column'} spacing={'var(--space-2)'}>
              <Text content={ses.session_name} size={3} weight={'medium'} />
              {ses.meeting_interviewers.map((user) => {
                return (
                  <>
                    <AvatarWithName
                      slotAvatar={
                        <MuiAvatar
                          level={getFullName(
                            ses.applications.candidates.first_name,
                            ses.applications.candidates.first_name,
                          )}
                          variant='rounded'
                          width='16px'
                          height='16px'
                        />
                      }
                      textName={getFullName(user.first_name, user.last_name)}
                      textRole={user.position}
                    />
                  </>
                );
              })}
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}

export default FetchScheduledInterviews;
