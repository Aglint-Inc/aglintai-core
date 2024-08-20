import { getFullName } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import { GlobalBadge } from '@/devlink/GlobalBadge';
import { Text } from '@/devlink/Text';
import { AvatarWithName } from '@/devlink3/AvatarWithName';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import MuiAvatar from '../../Common/MuiAvatar';
import { getRequestTitle } from '../../Requests/AgentChats/AgentInputBox';
import { useScheduleDetails } from './hooks';

function Requests({ session_id }) {
  const router = useRouter();
  const { data: requests } = useSessionRequests({ id: session_id });
  const { data } = useScheduleDetails();

  const schedule = data?.schedule_data;
  return (
    <Stack spacing={'var(--space-4)'}>
      <Text weight={'bold'} content={'Requests'} />
      <Stack spacing={'var(--space-2)'}>
        {requests?.map((request) => {
          return (
            <Stack
              key={request.id}
              sx={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid var(--neutral-5)',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'var(--neutral-2)',
                  border: '1px solid var(--accent-6)',
                },
              }}
              spacing={'var(--space-2)'}
              onClick={() => {
                router.push(
                  ROUTES['/requests/[id]']({
                    id: request.id,
                  }),
                );
              }}
            >
              <Text
                weight={'medium'}
                content={getRequestTitle({
                  title: request.title,
                  first_name: schedule.candidates.first_name,
                  last_name: schedule.candidates.last_name,
                })}
              />
              <Stack direction={'row'}>
                <GlobalBadge
                  size={1}
                  textBadge={capitalizeFirstLetter(request.status)}
                  color={
                    request.status === 'to_do'
                      ? 'purple'
                      : request.status === 'in_progress'
                        ? 'info'
                        : request.status === 'blocked'
                          ? 'error'
                          : request.status === 'completed'
                            ? 'success'
                            : 'neutral'
                  }
                />
              </Stack>

              <Stack direction={'row'} spacing={'var(--space-2)'}>
                <Text content={'Assigned to'} color={'neutral'} />
                <AvatarWithName
                  slotAvatar={
                    <MuiAvatar
                      src={request.assignee_details.profile_image}
                      level={getFullName(
                        request.assignee_details.first_name,
                        request.assignee_details.last_name,
                      )}
                      variant='rounded'
                      width={'20px'}
                      height={'20px'}
                    />
                  }
                  textName={getFullName(
                    request.assignee_details.first_name,
                    request.assignee_details.last_name,
                  )}
                />
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}

export default Requests;

export function useSessionRequests({ id }: { id: string }) {
  return useQuery({
    queryKey: [id, 'profile'],
    queryFn: () => sessionRequests(id),
    enabled: !!id,
  });
}
async function sessionRequests(id: string) {
  return (
    await supabase
      .from('request')
      .select(
        '*,assignee_details:recruiter_user!request_assignee_id_fkey(first_name, last_name, profile_image),request_relation(*),assigner_details:recruiter_user!request_assigner_id_fkey(first_name, last_name, profile_image)',
      )
      .eq('request_relation.session_id', id)
      .not('request_relation', 'is', null)
      .order('created_at', { ascending: false })
      .throwOnError()
  ).data;
}
