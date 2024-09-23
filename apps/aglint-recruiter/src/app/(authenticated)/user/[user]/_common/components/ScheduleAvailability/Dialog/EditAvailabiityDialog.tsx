import {
  type InterviewLoadType,
  type schedulingSettingType,
} from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import { ScrollArea } from '@components/ui/scroll-area';
import cloneDeep from 'lodash/cloneDeep';
import { useParams } from 'next/navigation';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { supabase } from '@/utils/supabase/client';
import { type timeZone as timeZones } from '@/utils/timeZone';

import { useInterviewer } from '../../../hooks/useInterviewer';
import { EditAvailabilityForm } from './EditAvailabilityFormUI';

export const LoadMax = {
  dailyHours: 8,
  dailyInterviews: 10,
  weeklyHours: 40,
  weeklyInterviews: 50,
};

type TimeZoneType = (typeof timeZones)[number];

export const EditAvailabiityDialog = ({
  schedulingSettings,
  setIsEditOpen,
  isEditOpen,
}: {
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  isEditOpen: boolean;
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
  const [dailyLmit, setDailyLimit] = useState<InterviewLoadType['daily']>({
    type: 'Hours',
    value: 20,
    max: LoadMax.dailyHours,
  });
  const [weeklyLmit, setWeeklyLimit] = useState<InterviewLoadType['weekly']>({
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

  const keywords = [
    {
      title: 'Free',
      description:
        'When these keywords appear in a calendar event title, overlapping interviews will not be considered scheduling conflicts.',
      value: freeKeyWords,
      changeHandler: setFreeKeywords,
    },
    {
      title: 'Soft Conflicts',
      description:
        'When these keywords are found in a calendar event title, overlapping interviews will be marked as soft conflicts and will require your confirmation to schedule.',
      value: softConflictsKeyWords,
      changeHandler: setSoftConflictsKeyWords,
    },
    {
      title: 'Out of Office',
      description:
        'When any of these specified keywords appear in a calendar event title, the day will be considered an Out of Office day, and interviews will not be scheduled.',
      value: outOfOffice,
      changeHandler: setOutOfOffice,
    },
    {
      title: 'Recruiting Blocks',
      description:
        ' If these keywords are found in a calendar event title, these blocks will be first preference for scheduling interviews.',
      value: recruitingBlocks,
      changeHandler: setRecruitingBlocks,
    },
  ];

  return (
    <>
      <UIDialog
        open={isEditOpen}
        title='Update Availability'
        size='xl'
        onClose={() => setIsEditOpen(false)}
        slotButtons={
          <>
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
          </>
        }
      >
        <ScrollArea>
          <EditAvailabilityForm
            dailyLimit={dailyLmit}
            handleDailyValue={handleDailyValue}
            handleType={handleType}
            handleWeeklyValue={handleWeeklyValue}
            keywords={keywords}
            setTimeZone={setTimeZone}
            setWorkingHours={setWorkingHours}
            timeZone={timeZone}
            weeklyLmit={weeklyLmit}
            workingHours={workingHours}
          />
        </ScrollArea>
      </UIDialog>
    </>
  );
};
