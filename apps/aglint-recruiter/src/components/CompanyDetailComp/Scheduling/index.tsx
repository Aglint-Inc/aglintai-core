import { Autocomplete, Stack, TextField } from '@mui/material';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { cloneDeep, debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);

import { type schedulingSettingType } from '@aglint/shared-types';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import timeZone from '@/utils/timeZone';

import { LoadMax } from '../Holidays';
import DebriefDefaults from './DebriefDefaults';
import InterviewLimitInput from './InterviewLoad';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import KeywordSection from './KeywordSection';

let schedulingSettingObj = {};
let changeValue = null;

type interviewLoadType = {
  type: 'Hours' | 'Interviews';
  value: number;
  max: number;
};

function SchedulingSettings({ updateSettings }) {
  const { recruiter } = useAuthDetails();

  const [workingHours, setWorkingHours] = useState([]);
  const [debriefDefaults, setDebriefDefaults] = useState<
    schedulingSettingType['debrief_defaults']
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
  const handleDailyType = (type: 'Hours' | 'Interviews') => {
    setDailyLimit((pre) => ({
      ...pre,
      type,
    }));
    handleDailyValue(dailyLmit.value);
  };

  const handleWeeklyType = (type: 'Hours' | 'Interviews') => {
    setWeeklyLimit((pre) => ({
      ...pre,
      type,
    }));
    handleWeeklyValue(weeklyLmit.value);
  };

  ///////////// DayOff Popup //////////////

  function initialLoad() {
    if (recruiter.scheduling_settings) {
      const schedulingSettingData = cloneDeep(
        recruiter.scheduling_settings,
      ) as schedulingSettingType;

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

  const debouncedUpsertRequestNotes = useCallback(
    debounce(async (settings) => {
      await updateSettings(settings);
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
      } as schedulingSettingType;

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

  return (
    <div className='flex flex-col w-[660px] mx-auto space-y-4'>
      {dailyLmit.type && weeklyLmit.type && (
        <Card>
          <CardHeader>
            <CardTitle className='text-md font-semibold'>
              Interview Load
            </CardTitle>
            <CardDescription>
              Setup maximum interviews per day and week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <InterviewLimitInput
                value={dailyLmit.value}
                max={dailyLmit.max}
                type={dailyLmit.type}
                onValueChange={handleDailyValue}
                onTypeChange={handleDailyType}
              />
              <InterviewLimitInput
                value={weeklyLmit.value}
                max={weeklyLmit.max}
                type={weeklyLmit.type}
                onValueChange={handleWeeklyValue}
                onTypeChange={handleWeeklyType}
              />
            </div>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle className='text-md font-semibold'>
            Debrief Defaults
          </CardTitle>
          <CardDescription>
            Setup a default company wide setting for scheduling debrief
            sessions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DebriefDefaults
            value={debriefDefaults}
            setValue={setDebriefDefaults}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='text-md font-semibold'>Free</CardTitle>
          <CardDescription>
            When these keywords appear in a calendar event title, overlapping
            interviews will not be considered scheduling conflicts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <KeywordSection
            keywords={freeKeyWords}
            setKeywords={setFreeKeywords}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='text-md font-semibold'>
            Soft Conflicts
          </CardTitle>
          <CardDescription>
            When these keywords are found in a calendar event title, overlapping
            interviews will be marked as soft conflicts and will require your
            confirmation to schedule.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <KeywordSection
            keywords={softConflictsKeyWords}
            setKeywords={setSoftConflictsKeyWords}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='text-md font-semibold'>Out of Office</CardTitle>
          <CardDescription>
            When any of these specified keywords appear in a calendar event
            title, the day will be considered an Out of Office day, and
            interviews will not be scheduled.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <KeywordSection keywords={outOfOffice} setKeywords={setOutOfOffice} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='text-md font-semibold'>
            Recruiting Blocks
          </CardTitle>
          <CardDescription>
            If these keywords are found in a calendar event title, these blocks
            will be given first preference for scheduling interviews.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <KeywordSection
            keywords={recruitingBlocks}
            setKeywords={setRecruitingBlocks}
          />
        </CardContent>
      </Card>
    </div>
  );
}
{
  /* <div className='bg-white w-[400px] min-w-[400px] p-4 border-l border-neutral-6 h-[calc(100vh-48px)] flex flex-col gap-4 overflow-y-auto'>
          <div className='flex flex-col gap-4'>
            {isTipVisible && (
              <div>
                <GlobalInfo
                  color={'purple'}
                  iconName='lightbulb'
                  textTitle={'Pro Tip'}
                  textDescription={
                    'Tailor the evaluation criteria to match the specific needs of the role you are hiring for by adjusting the weightages.'
                  }
                  showCloseButton
                  onClickClose={{
                    onClick: () => {
                      handleCloseInfo();
                    },
                  }}
                />
              </div>
            )}
            <HelperDropdown
              textName='Interview Load Tips'
              slotBody={<InterviewLoadHelper />}
            />
            <HelperDropdown
              textName='Debrief Tips'
              slotBody={<DebreifHelperText />}
            />
            <HelperDropdown
              textName='Keyword Tips'
              slotBody={<KeywordsHelper />}
            />
          </div>
        </div> */
}
export default SchedulingSettings;

type TZ = (typeof timeZone)[number];

export type TimezoneObj = {
  [key in keyof TZ]: TZ[key];
};
type TimezoneSelectorProps = {
  value: TimezoneObj;
  // eslint-disable-next-line no-unused-vars
  setValue: (value: TimezoneObj) => void;
  disabled: boolean;
};
export const TimezoneSelector = ({
  disabled,
  setValue,
  value,
}: TimezoneSelectorProps) => {
  return (
    <Stack spacing={'var(--space-2)'} width={420}>
      <Autocomplete
        disabled={disabled}
        disableClearable
        options={timeZone}
        value={value}
        onChange={(_event, value) => {
          if (value) {
            setValue(value);
          }
        }}
        autoComplete={false}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <p>{option.label}</p>
            </li>
          );
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              // fullWidth
              label=''
              placeholder='Ex. America/Los_Angeles (GMT-08:00)'
            />
          );
        }}
      />
    </Stack>
  );
};
