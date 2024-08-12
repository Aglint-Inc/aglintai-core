import { getFullName } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import Link from 'next/link';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { Text } from '@/devlink/Text';
import { UserNameCard } from '@/devlink3/UserNameCard';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ChatType, useUserChat } from '@/src/queries/userchat';

function HiringTeam({
  chat,
}: {
  chat: ChatType;
}) {
  const meta = chat.metadata;
  const job = meta.findLast(
    (m) => m.function_name === 'fetch_hiring_team',
  )?.payload;

  const hiringTeam = [
    {
      role: 'Recruiter',
      name: getFullName(job.rec?.first_name, job.rec?.last_name),
      image: job.rec?.profile_image,
      user_id: job.rec?.user_id,
    },
    {
      role: 'Hiring Manager',
      name: getFullName(job.hir_man?.first_name, job.hir_man?.last_name),
      image: job.hir_man?.profile_image,
      user_id: job.hir_man?.user_id,
    },
    ...(job.recruiting_coordinator
      ? [
          {
            role: 'Recruiting Coordinator',
            name: getFullName(
              job.recruiting_coordinator?.first_name,
              job.recruiting_coordinator?.last_name,
            ),
            image: job.recruiting_coordinator?.profile_image,
            user_id: job.recruiting_coordinator?.user_id,
          },
        ]
      : []),
  ];

  return (
    <Stack spacing={'var(--space-2)'} pt={'var(--space-2)'}>
      <Stack>
        <Text
          color={'neutral'}
          content={
            job?.job_title
              ? `Here is the hiring team for ${job?.job_title}`
              : 'Here is the hiring team'
          }
        />
      </Stack>

      {hiringTeam?.map((item) => {
        return (
          <>
            <UserNameCard
              slotAvatar={
                <MuiAvatar
                  level={item.name}
                  src={item.image}
                  variant={'rounded'}
                  width='100%'
                  height='100%'
                  fontSize='20px'
                />
              }
              textName={
                <Link href={`/user/profile/${item.user_id}`}>{item.name}</Link>
              }
              textRole={item.role}
            />
          </>
        );
      })}

      {job?.id && (
        <Link href={`/jobs/${job?.id}/hiring-team`}>
          <Stack direction={'row'}>
            <ButtonSoft
              size={1}
              color={'neutral'}
              textButton={'View Hiring Team'}
            />
          </Stack>
        </Link>
      )}
    </Stack>
  );
}

export default HiringTeam;
