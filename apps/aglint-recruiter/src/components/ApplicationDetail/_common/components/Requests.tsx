import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Stack } from '@mui/material';
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

  // const {
  //   meta: { data: detail },
  // } = useApplication();

  return (
    <Stack
      padding={'var(--space-4)'}
      spacing={'var(--space-2)'}
      width={'850px'}
    >
      {!isLoading &&
        requests?.map((req) => {
          return (
            <Stack
              key={req.id}
              sx={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid var(--neutral-5)',
                cursor: 'pointer',
              }}
              onClick={() => {
                router.push(
                  ROUTES['/requests/[id]']({
                    id: req.id,
                  }),
                );
              }}
              spacing={'var(--space-2)'}
            >
              <Stack
                direction={'row'}
                key={req.id}
                justifyContent={'space-between'}
              >
                <p className='text-sm'>{req.title}</p>
                <UIBadge
                  size={'sm'}
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
              </Stack>
              <div className='flex items-center space-x-2'>
                <p className='text-sm text-muted-foreground'>Assigned to</p>
                <div className='flex items-center space-x-2'>
                  <Avatar className='h-5 w-5 rounded'>
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
                  <span className='text-sm font-medium'>
                    {getFullName(
                      req.assignee_details.first_name,
                      req.assignee_details.last_name,
                    )}
                  </span>
                </div>
              </div>
            </Stack>
          );
        })}

      {!requests?.length && (
        <>
          <div className='flex flex-col items-center justify-center p-4 bg-gray-100'>
            <div className='mb-2'>
              <Calendar className='h-9 w-9 text-gray-500' />
            </div>
            <p className='text-sm text-gray-500'>No requests found</p>
          </div>
        </>
      )}
    </Stack>
  );
}

export default Requests;
