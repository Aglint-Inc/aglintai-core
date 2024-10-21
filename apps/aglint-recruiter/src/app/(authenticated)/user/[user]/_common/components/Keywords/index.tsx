import { EmptyState } from '@components/empty-state';
import Typography from '@components/typography';
import { Button } from '@components/ui/button';
import { Calendar, Pen } from 'lucide-react';
import { useState } from 'react';

import UISectionCard from '@/common/UISectionCard';

import { useInterviewer } from '../../hooks/useInterviewer';
import { useScheduleSettingsUpdate } from '../../hooks/useScheduleSettingsUpdate';
import { EditKeywords } from './Edit/EditKeywords';

export type ScheduleKeywordType = {
  title: string;
  description: string;
  keywords: string[];
};

export const Keywords = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { data } = useInterviewer();
  const { scheduling_settings } = data;
  const { schedulingKeyWords } = scheduling_settings;
  const { isUpdating, handleUpdate } = useScheduleSettingsUpdate('Keywords');

  const scheduleKeywords: ScheduleKeywordType[] = [
    {
      title: 'Free',
      description:
        'When these keywords appear in a calendar event title, overlapping interviews will not be considered scheduling conflicts.',
      keywords: schedulingKeyWords.free,
    },
    {
      title: 'Soft Conflicts',
      description:
        'When these keywords are found in a calendar event title overlapping will be as soft conflicts and will require your confirmation to schedule.',
      keywords: schedulingKeyWords.SoftConflicts,
    },
    {
      title: 'Out of Office',
      description:
        'When any of these specified keywords appear in a calendar event title, the day will be considered an Out of Office day and interviews will not be scheduled.',
      keywords: schedulingKeyWords.outOfOffice,
    },
    {
      title: 'Recruiting Blocks',
      description:
        'If these keywords are found in a calendar event title, these blocks will be given first preference for scheduling interviews.',
      keywords: schedulingKeyWords.recruitingBlocks,
    },
  ];

  return (
    <UISectionCard
      title='Scheduling Keywords'
      description=' Scheduling Keywords help candidates find your interviews
              availability.'
      isHoverEffect={!isEdit}
      action={
        <Button
          variant='outline'
          size='sm'
          className='hover:bg-background/50'
          onClick={() => {
            if (!isUpdating) setIsEdit(true);
          }}
        >
          <Pen className='mr-2 h-3 w-3' /> Edit
          <span className='sr-only'>Edit Break Time</span>
        </Button>
      }
    >
      {isEdit ? (
        <EditKeywords setIsEditOpen={setIsEdit} handleUpdate={handleUpdate} />
      ) : (
        scheduleKeywords.map((keyword) => {
          return (
            <div key={keyword.title}>
              <KeywordViewSection
                key={keyword.title}
                title={keyword.title}
                description={keyword.description}
                keywords={keyword.keywords}
              />
            </div>
          );
        })
      )}
    </UISectionCard>
  );
};

const KeywordViewSection = ({
  title,
  description,
  keywords,
}: {
  title: string;
  description: string;
  keywords: string[];
}) => {
  return (
    <div className='mb-12 flex flex-col'>
      <Typography variant='p' type='small' className='mb-1 text-sm font-medium'>
        {title}
      </Typography>
      <Typography
        variant='p'
        type='small'
        className='mb-2 text-muted-foreground'
      >
        {description}
      </Typography>
      <div className='flex flex-wrap gap-2'>
        {keywords?.length > 0 ? (
          keywords.map((keyword, i) => {
            return (
              <div key={i} className='w-fit rounded-sm bg-muted px-4 py-1'>
                <Typography type='small' variant='p'>
                  {keyword}
                </Typography>
              </div>
            );
          })
        ) : (
          <EmptyState
            variant='inline'
            icon={Calendar}
            description={'No ' + title + ' keywords added yet.'}
          />
        )}
      </div>
    </div>
  );
};
