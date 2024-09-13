import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { RequestHistoryCard } from '@devlink3/RequestHistoryCard';
import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/router';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { UIBadge } from '@/components/Common/UIBadge';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import Loader from '../../Common/Loader';

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
            <GlobalEmpty
              iconSlot={<Calendar className='text-gray-500' />}
              text={'No requests found'}
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
                    <div className='flex items-center space-x-2'>
                      <Avatar className='h-5 w-5 rounded'>
                        <AvatarImage
                          src={request.assignee_details.profile_image}
                          alt={getFullName(
                            request.assignee_details.first_name,
                            request.assignee_details.last_name,
                          )}
                        />
                        <AvatarFallback>
                          {getFullName(
                            request.assignee_details.first_name,
                            request.assignee_details.last_name,
                          ).charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className='text-sm font-medium'>
                        {getFullName(
                          request.assignee_details.first_name,
                          request.assignee_details.last_name,
                        )}
                      </span>
                    </div>
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
