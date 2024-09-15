import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/router';

import { UIBadge } from '@/components/Common/UIBadge';
import { useApplication } from '@/context/ApplicationContext';
import ROUTES from '@/utils/routing/routes';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

function Requests() {
  const router = useRouter();
  const {
    requests: { data: requests, isLoading },
  } = useApplication();

  return (
    <div className='space-y-4'>
      {!isLoading &&
        requests?.map((req) => (
          <div
            key={req.id}
            className='p-3 cursor-pointer'
            onClick={() => {
              router.push(
                ROUTES['/requests/[id]']({
                  id: req.id,
                }),
              );
            }}
          >
            <div className='flex justify-between items-center mb-2'>
              <p className='text-sm font-medium'>{req.title}</p>
              <UIBadge
                size='sm'
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
            </div>
            <div className='flex items-center space-x-2'>
              <p className='text-xs text-muted-foreground'>Assigned to</p>
              <div className='flex items-center space-x-2'>
                <Avatar className='h-5 w-5'>
                  <AvatarImage
                    src={req.assignee_details.profile_image}
                    alt={getFullName(
                      req.assignee_details.first_name,
                      req.assignee_details.last_name,
                    )}
                  />
                  <AvatarFallback>
                    {getFullName(
                      req.assignee_details.first_name,
                      req.assignee_details.last_name,
                    ).charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className='text-xs'>
                  {getFullName(
                    req.assignee_details.first_name,
                    req.assignee_details.last_name,
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}

      {!requests?.length && (
        <div className='flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg'>
          <Calendar className='h-8 w-8 text-gray-400 mb-2' />
          <p className='text-sm text-gray-500'>No requests found</p>
        </div>
      )}
    </div>
  );
}

export default Requests;
