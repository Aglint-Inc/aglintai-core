import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Calendar } from 'lucide-react';

import { UIBadge } from '@/components/Common/UIBadge';
import { useApplication } from '@/context/ApplicationContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

function Requests() {
  const router = useRouterPro();
  const {
    requests: { data: requests, isLoading },
  } = useApplication();

  return (
    <div className='space-y-4'>
      {!isLoading &&
        requests?.map((req) => (
          <div
            key={req.id}
            className='cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-lg'
            onClick={() => {
              router.push(
                ROUTES['/requests/[id]']({
                  id: req.id,
                }),
              );
            }}
          >
            <div className='mb-2 flex items-center justify-between'>
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
        <div className='flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4'>
          <Calendar className='mb-2 h-8 w-8 text-gray-400' />
          <p className='text-sm text-gray-500'>No requests found</p>
        </div>
      )}
    </div>
  );
}

export default Requests;
