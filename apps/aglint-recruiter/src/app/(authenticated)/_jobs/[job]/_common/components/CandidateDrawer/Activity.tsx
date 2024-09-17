import { Button } from '@components/ui/button';
import dayjs from 'dayjs';
import { ChevronDown, ChevronUp, Circle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import SlotContent from '@/components/Activities/SlotWidgets';
import { useApplication } from '@/context/ApplicationContext';

import { EmptyState } from './Common/EmptyState';

export const Activity = () => {
  const { push } = useRouter();
  const {
    activity: { data, status },
  } = useApplication();
  const [showAll, setShowAll] = useState(false);

  if (status === 'pending')
    return (
      <div className='flex items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin text-gray-500' />
      </div>
    );
  if (status === 'error')
    return <div className='text-red-500'>Something went wrong</div>;
  if (!data || data.length === 0) return <EmptyState tab='Activity' />;

  const displayedActivities = showAll ? data : data.slice(0, 10);
  const count = displayedActivities.length;

  return (
    <div className='space-y-4'>
      {displayedActivities.map((activity, i) => (
        <div key={activity.id} className='relative pb-4 last:pb-0'>
          {i !== count - 1 && (
            <span
              className='absolute left-2 top-4 -ml-px h-full w-0.5 bg-gray-200'
              aria-hidden='true'
            ></span>
          )}
          <div className='relative flex space-x-3'>
            <div>
              <span className='flex h-4 w-4 items-center justify-center'>
                <Circle
                  className='mt-1.5 h-4 w-4 fill-gray-400 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </div>
            <div className='flex min-w-0 flex-1 justify-between space-x-2'>
              <div>
                <p className='text-sm font-medium text-gray-900'>
                  {activity.title || '---'}
                </p>
                <p className='mt-0.5 text-xs text-gray-500'>
                  {activity.description}
                </p>
                {activity.metadata && <SlotContent act={activity} />}
              </div>
              <div className='whitespace-nowrap text-right text-xs text-gray-500'>
                <time dateTime={activity.created_at}>
                  {dayjs(activity.created_at).fromNow()}
                </time>
              </div>
            </div>
          </div>
          {activity.task_id && (
            <div className='ml-11 mt-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => push(`/tasks?task_id=${activity.task_id}`)}
              >
                View Task
              </Button>
            </div>
          )}
        </div>
      ))}
      {data.length > 5 && (
        <Button
          variant='ghost'
          size='sm'
          className='mt-2 w-full'
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <>
              Show Less <ChevronUp className='ml-2 h-4 w-4' />
            </>
          ) : (
            <>
              Show More <ChevronDown className='ml-2 h-4 w-4' />
            </>
          )}
        </Button>
      )}
    </div>
  );
};
