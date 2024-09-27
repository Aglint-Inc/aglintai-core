import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

import { UIBadge } from '@/components/Common/UIBadge';
import ROUTES from '@/utils/routing/routes';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { useApplicationRequests } from '../../hooks/useApplicationRequests';

function Requests() {
  const { data: requests, isLoading } = useApplicationRequests();

  return (
    <div className='flex flex-col gap-4'>
      {!isLoading &&
        requests?.map((req) => (
          <Link
            key={req.id}
            href={ROUTES['/requests/[request]']({
              request: req.id,
            })}
            className=''
          >
            <div className='mb-2 flex flex-col items-start gap-1'>
            
              <p className='text-md font-normal hover:underline duration-300'>{req.title}</p>
              
            </div>
            <div className='flex items-center gap-3'>
            <UIBadge
                size='sm'
                className=' justify-center text-center px-1 min-h-[22px] '
                textBadge={capitalizeFirstLetter(req.status)}
                color={
                  req.status === 'to_do'
                    ? 'purple'
                    : req.status === 'in_progress'
                      ? 'info'
                      : req.status === 'blocked'
                        ? 'error'
                        : req.status === 'completed'
                          ? 'success'
                          : 'neutral'
                }
              />
              <div className='flex items-center space-x-2'>
                <Avatar className='h-5 w-5 rounded-sm'>
                  <AvatarImage
                    src={req?.assignee_details?.profile_image ?? ''}
                    alt={getFullName(
                      req?.assignee_details?.first_name ?? '',
                      req?.assignee_details?.last_name ?? '',
                    )}
                  />
                  <AvatarFallback className='h-5 w-5 rounded-sm'>
                    {getFullName(
                      req?.assignee_details?.first_name ?? '',
                      req?.assignee_details?.last_name ?? '',
                    ).charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className='text-sm'>
                  {getFullName(
                    req?.assignee_details?.first_name ?? '',
                    req?.assignee_details?.last_name ?? '',
                  )}
                </span>
              </div>
            </div>
          </Link>
        ))}

      {!requests?.length && (
        <div className='flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4'>
          <Calendar className='mb-2 h-8 w-8 text-gray-400' />
          <p className='text-sm text-gray-500'>No requests found</p>
        </div>
      )}
    </div>
  );
}

export default Requests;
