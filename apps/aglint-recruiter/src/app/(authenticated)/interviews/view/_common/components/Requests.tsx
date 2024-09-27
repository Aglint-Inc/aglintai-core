import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from 'lucide-react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { Loader } from '@/components/Common/Loader';
import { UIBadge } from '@/components/Common/UIBadge';
import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

function Requests({ session_id }) {
  const router = useRouterPro();
  const { data: requests, isLoading } = useSessionRequests({ id: session_id });

  return (
    <div className='rounded-md border border-gray-200 bg-white p-4 shadow-sm'>
      <h3 className='mb-3 text-sm font-medium text-muted-foreground'>Request History</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='space-y-2'>
          {(requests ?? []).length === 0 && (
            <GlobalEmpty
              iconSlot={<Calendar className='text-gray-500' />}
              text={'No requests found'}
              height='200px'
            />
          )}
          {requests?.map((request) => (
            <Card
              key={request.id}
              className='cursor-pointer border-none shadow-none hover:bg-gray-100 p-4 bg-gray-50 duration-300'
              onClick={() => {
                router.push(
                  ROUTES['/requests/[request]']({
                    request: request.id,
                  }),
                );
              }}
            >
              <CardHeader className='mb-2 p-0'>
                <CardTitle className='line-clamp-1 text-sm font-medium'>
                  {request.title}
                </CardTitle>
              </CardHeader>
              <CardContent className='p-0'>
                <div className='flex items-center gap-4'>
                
                  <div className='flex items-center space-x-2'>
                    <Avatar className='h-5 w-5 rounded-sm'>
                      <AvatarImage
                        src={
                          request?.assignee_details?.profile_image ??
                          '/avatar.png'
                        }
                        alt={getFullName(
                          request?.assignee_details?.first_name ?? '',
                          request?.assignee_details?.last_name ?? '',
                        )}
                      />
                      <AvatarFallback className='text-xs h-5 w-5 rounded-sm'>
                        {getFullName(
                          request?.assignee_details?.first_name ?? '',
                          request?.assignee_details?.last_name ?? '',
                        ).charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className='text-xs text-gray-600'>
                      {getFullName(
                        request?.assignee_details?.first_name ?? '',
                        request?.assignee_details?.last_name ?? '',
                      )}
                    </span>
                  </div>
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

                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
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
