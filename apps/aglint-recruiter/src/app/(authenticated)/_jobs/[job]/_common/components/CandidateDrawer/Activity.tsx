import { Skeleton } from '@components/ui/skeleton';
import dayjs from 'dayjs';
import { FileText } from 'lucide-react';
import { useRouter } from 'next/router';

import SlotContent from '@/components/Activities/SlotWidgets';
import { useApplication } from '@/context/ApplicationContext';

import { EmptyState } from './Common/EmptyState';
import { Loader } from './Common/Loader';

export const Activity = () => {
  const { push } = useRouter();
  const {
    activity: { data, status },
  } = useApplication();

  if (status === 'pending')
    return (
      <Loader count={10}>
        <div className='flex items-center space-x-4 p-4 border rounded-lg shadow-sm'>
          <div className='w-12 h-12 rounded-full bg-gray-200 animate-pulse' />
          <div className='space-y-2 flex-1'>
            <div className='h-4 bg-gray-200 rounded animate-pulse' />
            <div className='h-4 bg-gray-200 rounded animate-pulse w-5/6' />
          </div>
          <Skeleton className='h-10 w-full' />
        </div>
      </Loader>
    );
  if (status === 'error') return <>Something went wrong</>;
  if (data.length === 0) return <EmptyState tab='Activity' />;
  const count = (data ?? []).length;
  return (
    <>
      {(data ?? []).map((activity, i) => (
        <div key={activity.id} className='relative pb-8 last:pb-0'>
          {i !== count - 1 && (
            <span
              className='absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200'
              aria-hidden='true'
            ></span>
          )}
          <div className='relative flex space-x-3'>
            <div>
              <span className='h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white'>
                <FileText className='h-5 w-5 text-white' aria-hidden='true' />
              </span>
            </div>
            <div className='flex min-w-0 flex-1 justify-between space-x-4 pt-1.5'>
              <div>
                <p className='text-sm font-medium text-gray-900'>
                  {activity.title || '---'}
                </p>
                <p className='mt-0.5 text-sm text-gray-500'>
                  {activity.description}
                </p>
                {activity.metadata && <SlotContent act={activity} />}
              </div>
              <div className='whitespace-nowrap text-right text-sm text-gray-500'>
                <time dateTime={activity.created_at}>
                  {dayjs(activity.created_at).fromNow()}
                </time>
              </div>
            </div>
          </div>
          {activity.task_id && (
            <div className='mt-3 ml-11'>
              <button
                onClick={() => push(`/tasks?task_id=${activity.task_id}`)}
                className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              >
                View Task
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};
