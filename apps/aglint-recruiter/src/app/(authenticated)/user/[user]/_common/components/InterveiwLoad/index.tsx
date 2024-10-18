import {
  type InterviewLoadType,
  type SchedulingSettingType,
} from '@aglint/shared-types';
import { type CustomSchedulingSettingsUser } from '@aglint/shared-types/src/db/tables/recruiter_user.types';
import Typography from '@components/typography';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Pen } from 'lucide-react';
import { type Dispatch, type SetStateAction, useState } from 'react';

import InterviewLimitInput from '@/authenticated/components/InterviewLoad';
import { UIButton } from '@/common/UIButton';
import UISectionCard from '@/common/UISectionCard';

import { useInterviewer } from '../../hooks/useInterviewer';
import { useScheduleSettingsUpdate } from '../../hooks/useScheduleSettingsUpdate';
import { LoadMax } from '../ScheduleAvailability/Edit/EditAvailabiity';

export const InterviewLoads = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { data: interviewerDetails } = useInterviewer();

  const { weeklyLimit, dailyLimit } = interviewerDetails.scheduling_settings
    .interviewLoad as SchedulingSettingType['interviewLoad'];

  const {
    total_hours_this_week,
    total_interviews_this_week,
    total_hours_today,
    total_interviews_today,
  } = interviewerDetails.interview_week_today;

  const interviewLoads = [
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

  return (
    <UISectionCard
      title='Interview Load'
      isHoverEffect={!isPopoverOpen}
      action={
        <EditInterviewLoad
          isPopoverOpen={isPopoverOpen}
          setIsPopoverOpen={setIsPopoverOpen}
          interviewLoad={interviewerDetails.scheduling_settings.interviewLoad}
        />
      }
    >
      <div className='flex gap-3'>
        {interviewLoads.map((load) => {
          return <LoadCard key={load.title} load={load} />;
        })}
      </div>
    </UISectionCard>
  );
};

const EditInterviewLoad = ({
  isPopoverOpen,
  setIsPopoverOpen,
  interviewLoad,
}: {
  isPopoverOpen: boolean;
  setIsPopoverOpen: Dispatch<SetStateAction<boolean>>;
  interviewLoad: CustomSchedulingSettingsUser['interviewLoad'];
}) => {
  const [dailyLimit, setDailyLimit] = useState<InterviewLoadType['daily']>({
    type: interviewLoad.dailyLimit.type || 'Hours',
    value: interviewLoad.dailyLimit.value || 20,
    max: LoadMax.dailyHours,
  });
  const [weeklyLimit, setWeeklyLimit] = useState<InterviewLoadType['weekly']>({
    type: interviewLoad.weeklyLimit.type || 'Hours',
    value: interviewLoad.weeklyLimit.value || 10,
    max: LoadMax.weeklyHours,
  });

  const { isUpdating, handleUpdate } =
    useScheduleSettingsUpdate('Interview Load');

  const handleDailyValue = (value: number) => {
    setDailyLimit((pre) => ({
      ...pre,
      max: pre.type === 'Hours' ? LoadMax.dailyHours : LoadMax.dailyInterviews,
      value:
        pre.type === 'Hours'
          ? value > LoadMax.dailyHours
            ? LoadMax.dailyHours
            : value
          : value > LoadMax.dailyInterviews
            ? LoadMax.dailyInterviews
            : value,
    }));
  };

  const handleWeeklyValue = (value: number) => {
    setWeeklyLimit((pre) => ({
      ...pre,
      max:
        pre.type === 'Hours' ? LoadMax.weeklyHours : LoadMax.weeklyInterviews,
      value:
        pre.type === 'Hours'
          ? value > LoadMax.weeklyHours
            ? LoadMax.weeklyHours
            : value
          : value > LoadMax.weeklyInterviews
            ? LoadMax.weeklyInterviews
            : value,
    }));
  };

  const handleType = (type: 'Hours' | 'Interviews') => {
    setDailyLimit((pre) => ({
      ...pre,
      type,
    }));
    setWeeklyLimit((pre) => ({
      ...pre,
      type,
    }));
    handleDailyValue(dailyLimit.value);
    handleWeeklyValue(weeklyLimit.value);
  };

  const handleSubmit = async () => {
    try {
      const interviewLoad = {
        dailyLimit: {
          type: dailyLimit.type,
          value: dailyLimit.value,
        },
        weeklyLimit: {
          type: weeklyLimit.type,
          value: weeklyLimit.value,
        },
      };
      await handleUpdate({ interviewLoad });
      setIsPopoverOpen(false);
    } catch {
      //
    }
  };

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={() => {
        if (!isUpdating && isPopoverOpen) setIsPopoverOpen(false);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          onClick={() => {
            if (!isUpdating) setIsPopoverOpen(true);
          }}
        >
          <Pen className='mr-2 h-3 w-3' /> Edit
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-full border-border'
        align='start'
        side='left'
      >
        <>
          <div className='mb-4 flex flex-col gap-4'>
            <Label>Interview Load</Label>
            <InterviewLimitInput
              value={dailyLimit.value}
              max={dailyLimit.max}
              type={dailyLimit.type}
              onValueChange={handleDailyValue}
              onTypeChange={handleType}
              mode='day'
            />
            <InterviewLimitInput
              value={weeklyLimit.value}
              max={weeklyLimit.max}
              type={weeklyLimit.type}
              onValueChange={handleWeeklyValue}
              onTypeChange={handleType}
              mode='week'
            />
          </div>
          <UIButton
            variant='secondary'
            onClick={() => {
              if (!isUpdating) setIsPopoverOpen(false);
            }}
          >
            Cancel
          </UIButton>
          <UIButton
            isLoading={isUpdating}
            disabled={isUpdating}
            onClick={handleSubmit}
          >
            Update
          </UIButton>
        </>
      </PopoverContent>
    </Popover>
  );
};
const LoadCard = ({
  load,
}: {
  load: {
    title: string;
    type: string;
    count: string | number;
  };
}) => {
  return (
    <div className='h-fit min-w-[150px] rounded-sm bg-muted'>
      <Typography className='px-4 pt-2 text-sm'>{load.title}</Typography>
      <div className='flex flex-col gap-1 px-4 py-2'>
        <Typography className='text-xl font-medium'>{load.count}</Typography>
        <Typography className='text-sm text-muted-foreground'>
          {load.type}
        </Typography>
      </div>
    </div>
  );
};
