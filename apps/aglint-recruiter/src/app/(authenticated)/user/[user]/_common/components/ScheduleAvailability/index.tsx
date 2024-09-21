import { Pencil } from 'lucide-react';
import { useState } from 'react';

import { SectionCard } from '@/authenticated/components/SectionCard';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';

import { type useInterviewer } from '../../hooks/useInterviewer';
import { EditAvailabiity } from '../Dialogs/EditAvailabiity';
import { ScheduleAvailabilityUI } from './ScheduleAvailabilityUI';
export default function ScheduleAvailability({
  schedulingSettings,
  interviewTodayWeek,
}: {
  schedulingSettings: ReturnType<
    typeof useInterviewer
  >['data']['scheduling_settings'];
  interviewTodayWeek: ReturnType<
    typeof useInterviewer
  >['data']['interview_week_today'];
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const {
    total_hours_this_week,
    total_interviews_this_week,
    total_hours_today,
    total_interviews_today,
  } = interviewTodayWeek;

  const interviewLoads = [
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

  const scheduleKeywords = [
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

  return (
    <>
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
          workingHours={schedulingSettings.workingHours.filter(
            (day) => day.isWorkDay,
          )}
          scheduleKeywords={scheduleKeywords}
        />
      </SectionCard>

      {/* edit availability dialog */}
      <UIDialog
        open={isEditOpen}
        title='Update Availability'
        size='xl'
        onClose={() => setIsEditOpen(false)}
        slotButtons={<></>}
      >
        <EditAvailabiity
          schedulingSettings={schedulingSettings}
          setIsEditOpen={setIsEditOpen}
        />
      </UIDialog>
    </>
  );
}
