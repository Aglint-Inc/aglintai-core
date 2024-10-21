import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { UIBadge } from '@components/ui-badge';
import { type ApplicantRequest } from '@requests/types';
import Link from 'next/link';

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
      className='rounded-md bg-muted/50 p-3 hover:bg-muted/70 hover:no-underline'
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
            variant={
              request.status === 'to_do'
                ? 'purple'
                : request.status === 'in_progress'
                  ? 'info'
                  : request.status === 'blocked'
                    ? 'destructive'
                    : request.status === 'completed'
                      ? 'success'
                      : 'neutral'
            }
          />
          <div className='flex items-center gap-1'>
            <Avatar className='h-6 w-6 overflow-hidden rounded-sm'>
              <AvatarImage
                src={request?.assignee_details?.profile_image ?? ''}
                alt={getFullName(
                  request?.assignee_details?.first_name ?? '',
                  request?.assignee_details?.last_name ?? '',
                )}
              />
              <AvatarFallback>
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
