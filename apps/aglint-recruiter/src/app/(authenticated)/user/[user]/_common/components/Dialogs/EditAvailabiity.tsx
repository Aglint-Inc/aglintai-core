import { type schedulingSettingType } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { toast } from '@components/hooks/use-toast';
import { Label } from '@components/ui/label';
import { ScrollArea } from '@components/ui/scroll-area';
import cloneDeep from 'lodash/cloneDeep';
import { useParams } from 'next/navigation';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import InterviewLimitInput from '@/company/components/Scheduling/InterviewLoad';
import KeywordSection from '@/company/components/Scheduling/KeywordSection';
import DayWithTime from '@/company/components/WorkingHours/WorkTime/DayWithTime';
import TimezonePicker from '@/components/Common/TimezonePicker';
import { UIButton } from '@/components/Common/UIButton';
import UITypography from '@/components/Common/UITypography';
import { supabase } from '@/utils/supabase/client';
import { type timeZone as timeZones } from '@/utils/timeZone';

import { useInterviewer } from '../../hooks/useInterviewer';
export const LoadMax = {
  dailyHours: 8,
  dailyInterviews: 10,
  weeklyHours: 40,
  weeklyInterviews: 50,
};
type interviewLoadType = {
  type: 'Hours' | 'Interviews';
  value: number;
  max: number;
};

type TimeZoneType = (typeof timeZones)[number];

export const EditAvailabiity = ({
  schedulingSettings,
  setIsEditOpen,
}: {
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  schedulingSettings: ReturnType<
    typeof useInterviewer
  >['data']['scheduling_settings'];
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [workingHours, setWorkingHours] = useState([]);
  const [timeZone, setTimeZone] = useState<TimeZoneType>(null);
  const [freeKeyWords, setFreeKeywords] = useState([]);
  const [softConflictsKeyWords, setSoftConflictsKeyWords] = useState([]);
  const [outOfOffice, setOutOfOffice] = useState<string[]>([]);
  const [recruitingBlocks, setRecruitingBlocks] = useState<string[]>([]);
  const [dailyLmit, setDailyLimit] = useState<interviewLoadType>({
    type: 'Hours',
    value: 20,
    max: LoadMax.dailyHours,
  });
  const [weeklyLmit, setWeeklyLimit] = useState<interviewLoadType>({
    type: 'Hours',
    value: 10,
    max: LoadMax.weeklyHours,
  });
  const { refetch } = useInterviewer();
  const user_id = useParams().user as string;
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
    handleDailyValue(dailyLmit.value);
    handleWeeklyValue(weeklyLmit.value);
  };

  ///////////// DayOff Popup //////////////

  function initialLoad() {
    if (schedulingSettings) {
      const schedulingSettingData = cloneDeep(
        schedulingSettings,
      ) as schedulingSettingType;

      const workingHoursCopy = cloneDeep(schedulingSettingData.workingHours);
      const timeZoneCopy = cloneDeep(
        schedulingSettingData.timeZone,
      ) as TimeZoneType;

      setDailyLimit({
        type: schedulingSettingData.interviewLoad.dailyLimit.type,
        value: schedulingSettingData.interviewLoad.dailyLimit.value,
        max:
          schedulingSettingData.interviewLoad.dailyLimit.type === 'Hours'
            ? LoadMax.dailyHours
            : LoadMax.dailyInterviews,
      });

      setWeeklyLimit({
        type: schedulingSettingData.interviewLoad.weeklyLimit.type,
        value: schedulingSettingData.interviewLoad.weeklyLimit.value,
        max:
          schedulingSettingData.interviewLoad.dailyLimit.type === 'Hours'
            ? LoadMax.weeklyHours
            : LoadMax.weeklyInterviews,
      });

      setTimeZone(timeZoneCopy);
      setWorkingHours(workingHoursCopy);
      setFreeKeywords(schedulingSettingData?.schedulingKeyWords?.free || []);
      setSoftConflictsKeyWords(
        schedulingSettingData?.schedulingKeyWords?.SoftConflicts || [],
      );
      setOutOfOffice(
        schedulingSettingData?.schedulingKeyWords?.outOfOffice || [],
      );
      setRecruitingBlocks(
        schedulingSettingData?.schedulingKeyWords?.recruitingBlocks || [],
      );
    }
  }

  const updateHandle = async () => {
    try {
      setIsSaving(true);
      const schedulingSettingObj = {
        ...schedulingSettings,
        interviewLoad: {
          dailyLimit: {
            type: dailyLmit.type,
            value: dailyLmit.value,
          },
          weeklyLimit: {
            type: weeklyLmit.type,
            value: weeklyLmit.value,
          },
        },
        timeZone: timeZone,
        workingHours: workingHours,
        schedulingKeyWords: {
          free: freeKeyWords,
          SoftConflicts: softConflictsKeyWords,
          outOfOffice: outOfOffice,
          recruitingBlocks: recruitingBlocks,
        },
      } as schedulingSettingType;
      await supabase
        .from('recruiter_user')
        .update({
          scheduling_settings: schedulingSettingObj,
        })
        .eq('user_id', user_id)
        .throwOnError();

      await refetch();
      toast({ title: 'Availability update Successfully' });
      setIsEditOpen(false);
    } catch (e) {
      //   console.log(e);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    initialLoad();
  }, []);

  return (
    <>
      <ScrollArea className='h-[500px] w-full'>
        <div className='mb-4 flex flex-col gap-4'>
          <Label htmlFor='zipcode' className='text-left'>
            Time Zone
          </Label>
          <TimezonePicker
            width='280'
            value={timeZone?.tzCode}
            onChange={(value) => setTimeZone(value)}
          />
        </div>
        <div className='mb-4 flex flex-col gap-4'>
          <Label>Interview Load</Label>
          <InterviewLimitInput
            value={dailyLmit.value}
            max={dailyLmit.max}
            type={dailyLmit.type}
            onValueChange={handleDailyValue}
            onTypeChange={handleType}
          />
          <InterviewLimitInput
            value={weeklyLmit.value}
            max={weeklyLmit.max}
            type={weeklyLmit.type}
            onValueChange={handleWeeklyValue}
            onTypeChange={handleType}
          />
        </div>
        <div className='mb-4 flex flex-col gap-4'>
          <Label>Edit Working Hours</Label>
          {workingHours.map((day, i) => {
            const startTime = dayjsLocal()
              .set(
                'hour',
                parseInt(day.timeRange.startTime?.split(':')[0] || '0'),
              )
              .set(
                'minute',
                parseInt(day.timeRange.startTime?.split(':')[1] || '0'),
              )
              .toISOString();

            const endTime = dayjsLocal()
              .set(
                'hour',
                parseInt(day.timeRange.endTime?.split(':')[0] || '0'),
              )
              .set(
                'minute',
                parseInt(day.timeRange.endTime?.split(':')[1] || '0'),
              )
              .toISOString();

            return (
              <DayWithTime
                key={i}
                day={day}
                i={i}
                startTime={startTime}
                endTime={endTime}
                selectStartTime={(value, i) => {
                  setWorkingHours((pre) => {
                    const data = [...pre];
                    data[i].timeRange.startTime =
                      dayjsLocal(value).format('HH:mm');
                    return data;
                  });
                }}
                selectEndTime={(value, i) => {
                  setWorkingHours((pre) => {
                    const data = [...pre];
                    data[i].timeRange.endTime =
                      dayjsLocal(value).format('HH:mm');
                    return data;
                  });
                }}
                setWorkingHours={setWorkingHours}
              />
            );
          })}
        </div>
        <div>
          <div className='mb-4 flex flex-col gap-4'>
            <UITypography
              variant='p'
              type='small'
              className='mb-1 text-lg font-semibold'
            >
              Free
            </UITypography>
            <UITypography variant='p' type='small' className='mb-4'>
              When these keywords appear in a calendar event title, overlapping
              interviews will not be considered scheduling conflicts.
            </UITypography>
            <KeywordSection
              keywords={freeKeyWords}
              setKeywords={setFreeKeywords}
            />
          </div>
          <div className='mb-4 flex flex-col gap-4'>
            <UITypography
              variant='p'
              type='small'
              className='mb-1 text-lg font-semibold'
            >
              Soft Conflicts
            </UITypography>
            <UITypography variant='p' type='small' className='mb-4'>
              When these keywords are found in a calendar event title,
              overlapping interviews will be marked as soft conflicts and will
              require your confirmation to schedule.
            </UITypography>
            <KeywordSection
              keywords={softConflictsKeyWords}
              setKeywords={setSoftConflictsKeyWords}
            />
          </div>
          <div className='mb-4 flex flex-col gap-4'>
            <UITypography
              variant='p'
              type='small'
              className='mb-1 text-lg font-semibold'
            >
              Out of Office
            </UITypography>
            <UITypography variant='p' type='small' className='mb-4'>
              When any of these specified keywords appear in a calendar event
              title, the day will be considered an Out of Office day, and
              interviews will not be scheduled.
            </UITypography>
            <KeywordSection
              keywords={outOfOffice}
              setKeywords={setOutOfOffice}
            />
          </div>
          <div className='mb-4 flex flex-col gap-4'>
            <UITypography
              variant='p'
              type='small'
              className='mb-1 text-lg font-semibold'
            >
              Recruiting Blocks
            </UITypography>
            <UITypography variant='p' type='small' className='mb-4'>
              If these keywords are found in a calendar event title, these
              blocks will be given first preference for scheduling interviews.
            </UITypography>
            <KeywordSection
              keywords={recruitingBlocks}
              setKeywords={setRecruitingBlocks}
            />
          </div>
        </div>
      </ScrollArea>
      <div className='flex w-full justify-end gap-4'>
        <UIButton
          variant='secondary'
          onClick={() => {
            if (!isSaving) setIsEditOpen(false);
          }}
        >
          Cancel
        </UIButton>
        <UIButton
          isLoading={isSaving}
          disabled={isSaving}
          onClick={updateHandle}
        >
          Update
        </UIButton>
      </div>
    </>
  );
};
