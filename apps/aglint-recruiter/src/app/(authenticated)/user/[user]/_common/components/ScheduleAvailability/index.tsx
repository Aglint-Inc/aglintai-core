import { type SchedulingSettingType } from '@aglint/shared-types';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

import { SectionCard } from '@/authenticated/components/SectionCard';
import { UIButton } from '@/components/Common/UIButton';

import { type InterviewerDetailType } from '../../hooks/useInterviewer';
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

export default function ScheduleAvailability({
  schedulingSettings,
  interviewTodayWeek,
}: {
  schedulingSettings: NonNullable<InterviewerDetailType['scheduling_settings']>;
  interviewTodayWeek: NonNullable<
    InterviewerDetailType['interview_week_today']
  >;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const {
    total_hours_this_week,
    total_interviews_this_week,
    total_hours_today,
    total_interviews_today,
  } = interviewTodayWeek;

  const interviewLoads: InterviewLoadItemType[] = [
    {
      title: 'Week',
      type:
        schedulingSettings?.interviewLoad?.weeklyLimit.type === 'Interviews'
          ? 'Interview'
          : 'Hour',
      count:
        schedulingSettings?.interviewLoad?.weeklyLimit.type === 'Interviews'
          ? total_interviews_this_week +
              ' / ' +
              schedulingSettings?.interviewLoad?.weeklyLimit.value || 0
          : total_hours_this_week +
              ' / ' +
              schedulingSettings?.interviewLoad?.weeklyLimit.value || 0,
    },
    {
      title: 'Today',
      type:
        schedulingSettings?.interviewLoad?.dailyLimit.type === 'Interviews'
          ? 'Interview'
          : 'Hour',
      count:
        schedulingSettings?.interviewLoad?.dailyLimit.type === 'Interviews'
          ? total_interviews_today +
              ' / ' +
              schedulingSettings?.interviewLoad?.dailyLimit.value || 0
          : total_hours_today +
              ' / ' +
              schedulingSettings?.interviewLoad?.dailyLimit.value || 0,
    },
  ];

  const scheduleKeywords: ScheduleKeywordType[] = [
    {
      title: 'Free',
      description:
        'When these keywords appear in a calendar event title, overlapping interviews will not be considered scheduling conflicts.',
      keywords: schedulingSettings.schedulingKeyWords.free,
    },
    {
      title: 'Soft Conflicts',
      description:
        'When these keywords are found in a calendar event title overlapping will be as soft conflicts and will require your confirmation to schedule.',
      keywords: schedulingSettings.schedulingKeyWords.SoftConflicts,
    },
    {
      title: 'Out of Office',
      description:
        'When any of these specified keywords appear in a calendar event title, the day will be considered an Out of Office day and interviews will not be scheduled.',
      keywords: schedulingSettings.schedulingKeyWords.outOfOffice,
    },
    {
      title: 'Recruiting Blocks',
      description:
        'If these keywords are found in a calendar event title, these blocks will be given first preference for scheduling interviews.',
      keywords: schedulingSettings.schedulingKeyWords.recruitingBlocks,
    },
  ];

  const workingHours = schedulingSettings.workingHours.filter(
    (day) => day.isWorkDay,
  ) as SchedulingSettingType['workingHours'];

  return (
    <>
      {/* edit availability dialog */}
      <EditAvailabiityDialog
        schedulingSettings={schedulingSettings}
        setIsEditOpen={setIsEditOpen}
        isEditOpen={isEditOpen}
      />
      <SectionCard
        title='Availability'
        topAction={
          <UIButton
            size='sm'
            variant='secondary'
            onClick={() => setIsEditOpen(true)}
            icon={<Pencil />}
          />
        }
      >
        <ScheduleAvailabilityUI
          interviewLoads={interviewLoads}
          timeZone={schedulingSettings?.timeZone?.label || ' - '}
          workingHours={workingHours}
          scheduleKeywords={scheduleKeywords}
        />
      </SectionCard>
    </>
  );
}
