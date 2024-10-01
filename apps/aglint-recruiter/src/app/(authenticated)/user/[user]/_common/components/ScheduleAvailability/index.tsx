import { type SchedulingSettingType } from '@aglint/shared-types';
import { SquarePen } from 'lucide-react';
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UISectionCard from '@/components/Common/UISectionCard';

import { useInterviewer } from '../../hooks/useInterviewer';
import { EditAvailabiityDialog } from './Dialog/EditAvailabiityDialog';
import { ScheduleAvailabilityUI } from './ui/ScheduleAvailabilityUI';

export type InterviewLoadItemType = {
  title: string;
  type: string;
  count: string | number;
};

export type ScheduleKeywordType = {
  title: string;
  description: string;
  keywords: string[];
};

export default function ScheduleAvailability() {
  const {
    data: { scheduling_settings, interview_week_today },
  } = useInterviewer();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const {
    total_hours_this_week,
    total_interviews_this_week,
    total_hours_today,
    total_interviews_today,
  } = interview_week_today;

  const {
    interviewLoad: { weeklyLimit, dailyLimit },
    schedulingKeyWords,
  } = scheduling_settings;

  const interviewLoads: InterviewLoadItemType[] = [
    {
      title: 'Week',
      type: weeklyLimit.type === 'Interviews' ? 'Interview' : 'Hour',
      count:
        weeklyLimit.type === 'Interviews'
          ? total_interviews_this_week + ' / ' + weeklyLimit.value || 0
          : total_hours_this_week + ' / ' + weeklyLimit.value || 0,
    },
    {
      title: 'Today',
      type: dailyLimit.type === 'Interviews' ? 'Interview' : 'Hour',
      count:
        dailyLimit.type === 'Interviews'
          ? total_interviews_today + ' / ' + dailyLimit.value || 0
          : total_hours_today + ' / ' + dailyLimit.value || 0,
    },
  ];

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

  const workingHours = scheduling_settings.workingHours.filter(
    (day) => day.isWorkDay,
  ) as SchedulingSettingType['workingHours'];

  return (
    <>
      {/* edit availability dialog */}
      <EditAvailabiityDialog
        setIsEditOpen={setIsEditOpen}
        isEditOpen={isEditOpen}
      />
      <UISectionCard
        type='compact'
        title='Availability'
        action={
          <UIButton
            size='sm'
            variant='secondary'
            onClick={() => setIsEditOpen(true)}
            leftIcon={<SquarePen />}
          >
            Edit
          </UIButton>
        }
      >
        <ScheduleAvailabilityUI
          interviewLoads={interviewLoads}
          timeZone={scheduling_settings?.timeZone?.label || ' - '}
          workingHours={workingHours}
          scheduleKeywords={scheduleKeywords}
        />
      </UISectionCard>
    </>
  );
}
