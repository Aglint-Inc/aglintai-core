import { type SchedulingSettingType } from '@aglint/shared-types';
import { cloneDeep, debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { LoadMax } from 'src/app/(authenticated)/user/[user]/_common/components/ScheduleAvailability/Dialog/EditAvailabiityDialog';

import InterviewLimitInput from '@/authenticated/components/InterviewLoad';
import { useTenant } from '@/company/hooks';
import UISectionCard from '@/components/Common/UISectionCard';
import { api } from '@/trpc/client';

import KeywordSection from '../../../../_common/components/KeywordSection';
import DebriefDefaults from './DebriefDefaults';

let schedulingSettingObj = {};
let changeValue = null;

type interviewLoadType = {
  type: 'Hours' | 'Interviews';
  value: number;
  max: number;
};

function SchedulingSettings() {
  const { recruiter } = useTenant();

  const [workingHours, setWorkingHours] = useState([]);
  const [debriefDefaults, setDebriefDefaults] = useState<
    SchedulingSettingType['debrief_defaults']
  >({
    hiring_manager: false,
    recruiter: false,
    recruiting_coordinator: false,
    sourcer: false,
    previous_interviewers: false,
  });
  const [freeKeyWords, setFreeKeywords] = useState([]);
  const [softConflictsKeyWords, setSoftConflictsKeyWords] = useState([]);
  const [outOfOffice, setOutOfOffice] = useState<string[]>([]);
  const [recruitingBlocks, setRecruitingBlocks] = useState<string[]>([]);

  const [dailyLmit, setDailyLimit] = useState<interviewLoadType>({
    type: null,
    value: 20,
    max: LoadMax.dailyHours,
  });
  const [weeklyLmit, setWeeklyLimit] = useState<interviewLoadType>({
    type: null,
    value: 10,
    max: LoadMax.weeklyHours,
  });

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
  const handleType = (type: 'Hours' | 'Interviews', mode: 'day' | 'week') => {
    if (mode === 'day') {
      setDailyLimit((pre) => ({
        ...pre,
        type,
      }));
      handleDailyValue(dailyLmit.value);
    }
    if (mode === 'week') {
      setWeeklyLimit((pre) => ({
        ...pre,
        type,
      }));
      handleWeeklyValue(weeklyLmit.value);
    }
  };

  ///////////// DayOff Popup //////////////

  function initialLoad() {
    if (recruiter.scheduling_settings) {
      const schedulingSettingData = cloneDeep(
        recruiter.scheduling_settings,
      ) as SchedulingSettingType;

      const workingHoursCopy = cloneDeep(schedulingSettingData.workingHours);

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

      setDebriefDefaults(
        schedulingSettingData?.debrief_defaults ?? {
          hiring_manager: false,
          recruiter: false,
          recruiting_coordinator: false,
          sourcer: false,
          previous_interviewers: false,
        },
      );
    }
  }

  const { mutate } = api.tenant.updateTenant.useMutation();

  const debouncedUpsertRequestNotes = useCallback(
    debounce(async (settings) => {
      mutate({
        scheduling_settings: settings,
      });
    }, 500),
    [],
  );

  useEffect(() => {
    if (workingHours.length) {
      schedulingSettingObj = {
        ...recruiter.scheduling_settings,
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
        workingHours: workingHours,
        schedulingKeyWords: {
          free: freeKeyWords,
          SoftConflicts: softConflictsKeyWords,
          outOfOffice: outOfOffice,
          recruitingBlocks: recruitingBlocks,
        },
        debrief_defaults: debriefDefaults,
      } as SchedulingSettingType;

      if (changeValue === 'updating') {
        debouncedUpsertRequestNotes(schedulingSettingObj);
      }

      changeValue = 'updating';
    }
  }, [
    dailyLmit,
    weeklyLmit,
    workingHours,
    freeKeyWords,
    softConflictsKeyWords,
    outOfOffice,
    recruitingBlocks,
    debriefDefaults,
  ]);

  useEffect(() => {
    initialLoad();

    return () => {
      changeValue = null;
    };
  }, [recruiter?.scheduling_settings]);

  const keywords = [
    {
      title: 'Free',
      description:
        'When these keywords appear in a calendar event title, overlapping interviews will not be considered scheduling conflicts.',
      value: freeKeyWords,
      handleChange: setFreeKeywords,
    },
    {
      title: ' Soft Conflicts',
      description:
        ' When these keywords are found in a calendar event title, overlapping interviews will be marked as soft conflicts and will require your confirmation to schedule.',
      value: softConflictsKeyWords,
      handleChange: setSoftConflictsKeyWords,
    },
    {
      title: 'Out of Office',
      description:
        'When any of these specified keywords appear in a calendar event  title, the day will be considered an Out of Office day, and interviews will not be scheduled.',
      value: outOfOffice,
      handleChange: setOutOfOffice,
    },
    {
      title: 'Recruiting Blocks',
      description:
        ' If these keywords are found in a calendar event title, these blocks will be given first preference for scheduling interviews.',
      value: recruitingBlocks,
      handleChange: setRecruitingBlocks,
    },
  ];
  return (
    <div>
      <div className='flex flex-col'>
        <div className='mb-6'>
          <h2 className='mb-1 text-xl font-semibold'>Scheduling Information</h2>
          <p className='text-gray-600'>
            Update the settings here changes will be saved automatically.
          </p>
        </div>
        <div className='flex flex-col gap-5'>
          {dailyLmit.type && weeklyLmit.type && (
            <UISectionCard
              title=' Interview Load'
              description='Setup maximum interviews per day and week.'
            >
              <div className='space-y-2'>
                <InterviewLimitInput
                  value={dailyLmit.value}
                  max={dailyLmit.max}
                  type={dailyLmit.type}
                  onValueChange={handleDailyValue}
                  onTypeChange={handleType}
                  mode='day'
                />
                <InterviewLimitInput
                  value={weeklyLmit.value}
                  max={weeklyLmit.max}
                  type={weeklyLmit.type}
                  onValueChange={handleWeeklyValue}
                  onTypeChange={handleType}
                  mode='week'
                />
              </div>
            </UISectionCard>
          )}
          <UISectionCard
            title='Debrief Defaults'
            description='Setup a default company wide setting for scheduling debrief sessions.'
          >
            <DebriefDefaults
              value={debriefDefaults}
              setValue={setDebriefDefaults}
            />
          </UISectionCard>

          {keywords.map((keyword) => {
            return (
              <>
                <UISectionCard
                  key={keyword.title}
                  title={keyword.title}
                  description={keyword.description}
                >
                  <KeywordSection
                    keywords={keyword.value}
                    setKeywords={keyword.handleChange}
                  />
                </UISectionCard>
              </>
            );
          })}
        </div>{' '}
      </div>
    </div>
  );
}

export default SchedulingSettings;
