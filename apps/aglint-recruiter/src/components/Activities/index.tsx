import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import dayjs from 'dayjs';
import { ActivityIcon, FileText } from 'lucide-react';
import { useRouter } from 'next/router';

import { type useAllActivities } from '@/queries/activities';

import SlotContent from './SlotWidgets';

function RightPanel({
  allActivities,
}: {
  allActivities: ReturnType<typeof useAllActivities>;
}) {
  const router = useRouter();
  const { data: activities, isLoading, isFetched } = allActivities;

  if (!isFetched || isLoading) {
    return (
      <div className='h-[calc(100vh-60px)] space-y-4'>
        {[...Array(5)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className='h-4 w-[250px]' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-4 w-[200px]' />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className='flex h-64 flex-col items-center justify-center text-center'>
        <ActivityIcon className='mb-2 h-12 w-12 text-muted-foreground' />
        <p className='text-sm text-muted-foreground'>No activities found.</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {activities.map((act, ind) => (
        <Card key={act.id}>
          <CardHeader>
            <CardTitle className='text-lg font-semibold'>
              {act.title || ''}
            </CardTitle>
            <p className='text-sm text-muted-foreground'>
              {dayjs(act.created_at).fromNow()}
            </p>
          </CardHeader>
          <CardContent>
            <div className='flex items-start space-x-4'>
              <FileText size={24} className='text-muted-foreground' />
              <div className='flex-grow'>
                <p className='text-sm'>
                  {act?.metadata?.type === 'candidate_response_self_schedule'
                    ? act.metadata.response_type === 'reschedule'
                      ? 'Requested a reschedule'
                      : 'Cancelled this schedule'
                    : act.description}
                </p>
                {Boolean(act.metadata) && <SlotContent act={act} />}
                {Boolean(act.task_id) && (
                  <Button
                    variant='link'
                    className='h-auto p-0'
                    onClick={() => router.push(`/tasks?task_id=${act.task_id}`)}
                  >
                    View Task
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
          {ind !== activities.length - 1 && <hr className='my-2' />}
        </Card>
      ))}
    </div>
  );
}

export default RightPanel;
