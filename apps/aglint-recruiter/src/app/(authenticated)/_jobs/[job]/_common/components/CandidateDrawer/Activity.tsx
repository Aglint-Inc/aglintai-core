import { Skeleton } from '@components/ui/skeleton';
import { ActivitiesCard } from '@devlink3/ActivitiesCard';
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
        <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm">
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
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
        <ActivitiesCard
          key={activity.id}
          textTitle={activity.title || '---'}
          textTime={dayjs(activity.created_at).fromNow()}
          isLineVisible={!(i == count - 1)}
          isViewTaskVisible={!!activity.task_id}
          textDesc={activity.description}
          onClickViewTask={{
            onClick: () => push(`/tasks?task_id=${activity.task_id}`),
          }}
          isActionVisible={false}
          isContentVisible={!!activity.metadata}
          slotContent={<SlotContent act={activity} />}
          slotImage={<FileText />}
        />
      ))}
    </>
  );
};
