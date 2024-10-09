import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { type ApplicantRequest } from '@requests/types';
import Link from 'next/link';

import { UIBadge } from '@/components/Common/UIBadge';
import ROUTES from '@/utils/routing/routes';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

function RequestCard({ request }: { request: ApplicantRequest }) {
  return (
    <Link
      key={request.id}
      href={ROUTES['/requests/[request]']({
        request: request.id,
      })}
      target='_blank'
      className='hover:no-underline p-3 bg-primary-foreground rounded-md hover:bg-gray-100'
    >
      <div className='mb-2 flex justify-between gap-1'>
        <p className='text-sm font-medium'>{request.title}</p>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
        <UIBadge
            size='default'
            className='min-w-[70px] justify-center text-center'
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
          <div className='flex items-center gap-1'>
            <Avatar className='h-6 w-6 rounded-sm overflow-hidden'>
              <AvatarImage
              className=''
                src={request?.assignee_details?.profile_image ?? ''}
                alt={getFullName(
                  request?.assignee_details?.first_name ?? '',
                  request?.assignee_details?.last_name ?? '',
                )}
              />
              <AvatarFallback className=''>
                {getFullName(
                  request?.assignee_details?.first_name ?? '',
                  request?.assignee_details?.last_name ?? '',
                ).charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className='text-xs'>
              {getFullName(
                request?.assignee_details?.first_name ?? '',
                request?.assignee_details?.last_name ?? '',
              )}
            </span>
          </div>
        </div>
        <div className='flex items-end gap-2'>
          <span className='text-xs'>
            {dayjsLocal(request?.created_at).fromNow()}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default RequestCard;
