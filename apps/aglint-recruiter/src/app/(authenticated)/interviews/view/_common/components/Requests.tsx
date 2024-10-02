import { getFullName } from '@aglint/shared-utils';
import {
  Section,
  SectionHeader,
  SectionTitle,
} from '@components/layouts/sections-header';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { LayoutList } from 'lucide-react';
import Link from 'next/link';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { Loader } from '@/components/Common/Loader';
import { UIBadge } from '@/components/Common/UIBadge';
import { WithPermission } from '@/components/withPermission';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { useScheduleDetails } from '../hooks/useScheduleDetails';
import { Separator } from '@components/ui/separator';
import React from 'react';

function Component() {
  const { data } = useScheduleDetails();

  const schedule = data?.schedule_data;
  const session_id = schedule?.interview_session?.id;
  const { data: requests, isLoading } = useSessionRequests({ id: session_id });

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Request History</SectionTitle>
      </SectionHeader>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='space-y-2'>
          {(requests ?? []).length === 0 && (
            <GlobalEmpty
              header={'No requests found'}
              description='Requests are created when a interview process starts for candidates.'
              icon={
                <LayoutList
                  strokeWidth={2}
                  className='h-6 w-6 text-muted-foreground'
                />
              }
            />
          )}
          <ul>
            {requests?.map((request, index) => (
              <React.Fragment key={request.id}>
                <li className='p-3 text-lg hover:bg-gray-50'>
                  <Link
                    href={ROUTES['/requests/[request]']({
                      request: request.id,
                    })}
                  >
                    <p className='text-base font-medium'>{request.title}</p>
                    <div className='flex cursor-pointer items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <Avatar className='h-6 w-6'>
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
                          <AvatarFallback className='text-xs'>
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
                  </Link>
                </li>
                {index < requests.length - 1 && (
                  <li>
                    <Separator className='my-2' />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}

const Requests = () => {
  return (
    <WithPermission permission={['scheduling_actions']}>
      <Component />
    </WithPermission>
  );
};

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
