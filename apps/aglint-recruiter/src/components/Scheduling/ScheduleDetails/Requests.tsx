import { getFullName } from '@aglint/shared-utils';
import { GlobalEmptyState } from '@devlink/GlobalEmptyState';
import { AvatarWithName } from '@devlink3/AvatarWithName';
import { RequestHistoryCard } from '@devlink3/RequestHistoryCard';
import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { UIBadge } from '@/components/Common/UIBadge';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';

function Requests({ session_id }) {
  const router = useRouter();
  const { data: requests, isLoading } = useSessionRequests({ id: session_id });

  return (
    <Stack spacing={'var(--space-2)'}>
      <p className='font-semibold text-muted-foreground'>Request History</p>
      {isLoading ? (
        <Loader />
      ) : (
        <Stack spacing={'var(--space-2)'}>
          {requests.length === 0 && (
            <GlobalEmptyState
              iconName={'calendar_month'}
              styleEmpty={{
                style: {
                  background: 'var(--neutral-2)',
                },
              }}
              textDesc={'No requests found'}
            />
          )}
          {requests?.map((request) => {
            return (
              <>
                <RequestHistoryCard
                  key={request.id}
                  onClickCard={{
                    onClick: () => {
                      router.push(
                        ROUTES['/requests/[id]']({
                          id: request.id,
                        }),
                      );
                    },
                  }}
                  textHistory={request.title}
                  slotAssignedTo={
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
                  }
                  slotStatus={
                    <Stack direction={'row'}>
                      <UIBadge
                        size={'sm'}
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
                  }
                />
                {/* <Stack
                  key={request.id}
                  sx={{
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid var(--neutral-5)',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'var(--neutral-2)',
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
                 

                  <Stack direction={'row'} spacing={'var(--space-2)'}>
                    
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
                </Stack> */}
              </>
            );
          })}
        </Stack>
      )}
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
