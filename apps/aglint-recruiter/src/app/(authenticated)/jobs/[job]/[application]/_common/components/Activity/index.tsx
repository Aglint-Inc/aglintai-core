'use client';

import { type DatabaseTable } from '@aglint/shared-types';
import { Section, SectionTitle } from '@components/layouts/sections-header';
import { Button } from '@components/ui/button';
import dayjs from 'dayjs';
import { ChevronDown, ChevronUp, Circle, Clock } from 'lucide-react';
import { useState } from 'react';

import SlotContent from '@/components/Activities/SlotWidgets';
import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { useRouterPro } from '@/hooks/useRouterPro';

import { useApplicationActivity } from '../../hooks/useApplicationActivity';

export const Activity = () => {
  const { push } = useRouterPro();
  const { data } = useApplicationActivity();
  const [showAll, setShowAll] = useState(false);

  if (!data || data.length === 0)
    return (
      <div className='flex w-full items-center justify-center'>
        <GlobalEmpty
          icon={<Clock strokeWidth={1} className='h-10 w-10' />}
          header={'No activities found'}
        />
      </div>
    );

  const displayedActivities = showAll ? data : data.slice(0, 10);
  const count = displayedActivities.length;

  return (
    <Section>
      <SectionTitle>Activity</SectionTitle>
      <div className='w-full space-y-4'>
        {displayedActivities.map((activity, i) => (
          <div key={activity.id} className='relative w-full last:pb-0'>
            {i !== count - 1 && (
              <span
                className='absolute left-[9px] top-4 -ml-px h-full w-[1px] rounded-full bg-gray-200'
                aria-hidden='true'
              ></span>
            )}
            <div className='relative flex w-full space-x-3'>
              <div>
                <span className='flex h-4 w-4 items-center justify-center'>
                  <Circle
                    className='mt-1.5 h-2 w-2 fill-gray-400 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
              </div>
              <div className='flex w-full min-w-0 flex-1 justify-between gap-1'>
                <div className='w-full'>
                  <p className='text-md font-normal text-gray-900'>
                    {activity.title || '---'}
                  </p>
                  {activity.description && (
                    <p className='mt-0.5 text-sm'>{activity.description}</p>
                  )}
                  {activity.metadata && (
                    <SlotContent
                      act={{
                        application_id: activity.application_id,
                        metadata:
                          activity.metadata as DatabaseTable['application_logs']['metadata'],
                        created_at: activity.created_at,
                        id: activity.id,
                        created_by: activity.created_by,
                        description: activity.description,
                        title: activity.title,
                        logged_by: activity.logged_by,
                        task_id: activity.task_id,
                        module: activity.module,
                      }}
                    />
                  )}
                  <div className='pt-1 text-left text-sm text-muted-foreground'>
                    <time dateTime={activity.created_at}>
                      {dayjs(activity.created_at).fromNow()}
                    </time>
                  </div>
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
            variant='secondary'
            size='md'
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
    </Section>
  );
};
