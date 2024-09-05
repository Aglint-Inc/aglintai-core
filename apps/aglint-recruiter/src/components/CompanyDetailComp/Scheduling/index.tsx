import {
  Alert,
  Autocomplete,
  Chip,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { capitalize, cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);

import { type schedulingSettingType } from '@aglint/shared-types';
import { Input } from '@components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { GlobalIcon } from '@devlink/GlobalIcon';
import { GlobalInfo } from '@devlink2/GlobalInfo';
import { InterviewLoad } from '@devlink2/InterviewLoad';
import { KeywordCard } from '@devlink2/KeywordCard';
import { Keywords } from '@devlink2/Keywords';
import { DebreifHelperText } from '@devlink3/DebreifHelperText';
import { HelperDropdown } from '@devlink3/HelperDropdown';
import { InterviewLoadHelper } from '@devlink3/InterviewLoadHelper';
import { KeywordsHelper } from '@devlink3/KeywordsHelper';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import timeZone from '@/utils/timeZone';
import toast from '@/utils/toast';

import FilterInput from '../../CandidateDatabase/Search/FilterInput';
import { LoadMax } from '../Holidays';
import DebriefDefaults from './DebriefDefaults';

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
    type: 'Hours',
    value: 20,
    max: LoadMax.dailyHours,
  });
  const [weeklyLmit, setWeeklyLimit] = useState<interviewLoadType>({
    type: 'Hours',
    value: 10,
    max: LoadMax.weeklyHours,
  });

  const [isTipVisible, setIsTipVisible] = useState(true);
  const handleCloseInfo = () => {
    setIsTipVisible(false);
  };

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
    setWeeklyLimit((pre) => ({ ...pre, type }));
    setDailyLimit((pre) => ({ ...pre, type }));
    handleWeeklyValue(weeklyLmit.value);
    handleDailyValue(dailyLmit.value);
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
        updateSettings(schedulingSettingObj);
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
  }, []);

  return (
    <div className='flex flex-col h-full overflow-auto'>
      <div className='flex flex-row w-full justify-between items-start overflow-hidden'>
        <div className='w-full overflow-auto h-[calc(100vh-48px)] p-2 space-y-4'>
          <InterviewLoad
            borderStyle={'false'}
            slotDailyLimit={
              <div className='flex flex-row items-center gap-4'>
                <Input
                  type='number'
                  value={dailyLmit.value}
                  onChange={(e) => handleDailyValue(+e.target.value)}
                  max={dailyLmit.max}
                  className='w-[70px]'
                />
                <Tabs
                  defaultValue={dailyLmit.type}
                  onValueChange={(value) =>
                    handleType(value as 'Hours' | 'Interviews')
                  }
                >
                  <TabsList>
                    {['Interviews', 'Hours'].map((ele) => (
                      <TabsTrigger key={ele} value={ele}>
                        {capitalize(ele.replaceAll('_', ' '))}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            }
            slotWeeklyLimit={
              <div className='flex flex-row items-center gap-4'>
                <Input
                  type='number'
                  value={weeklyLmit.value}
                  onChange={(e) => handleWeeklyValue(+e.target.value)}
                  max={weeklyLmit.max}
                  className='w-[70px]'
                />
                <Tabs
                  defaultValue={weeklyLmit.type}
                  onValueChange={(value) =>
                    handleType(value as 'Hours' | 'Interviews')
                  }
                >
                  <TabsList>
                    {['Interviews', 'Hours'].map((ele) => (
                      <TabsTrigger key={ele} value={ele}>
                        {capitalize(ele.replaceAll('_', ' '))}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            }
          />
          <DebriefDefaults
            value={debriefDefaults}
            setValue={setDebriefDefaults}
          />
          <Keywords
            borderStyle={'false'}
            size={'large'}
            slotKeywordsCard={
              <>
                <KeywordCard
                  textTitle={'Free'}
                  textWarning={
                    'When these keywords appear in a calendar event title, overlapping interviews will not be considered scheduling conflicts.'
                  }
                  slotInput={
                    <FilterInput
                      handleAdd={(s) => {
                        const keyword = String(s).split(',');
                        keyword.map((item) => {
                          if (freeKeyWords.includes(item)) {
                            toast.warning(`"${item}" keyword exists.`);
                            return null;
                          } else {
                            setFreeKeywords((pre) => [item, ...pre]);
                          }
                        });
                      }}
                      path='freeKeywords'
                      type='string'
                    />
                  }
                  slotSuggestPill={
                    freeKeyWords.length === 0 ? (
                      <Alert severity='info' icon={false}>
                        <Typography>No free keywords added.</Typography>
                      </Alert>
                    ) : (
                      freeKeyWords.map((item) => {
                        return (
                          <>
                            <Chip
                              clickable
                              onDelete={() => {
                                setFreeKeywords((pre) => {
                                  return pre.filter((ele) => ele !== item);
                                });
                              }}
                              deleteIcon={
                                <div>
                                  <GlobalIcon iconName='close' size='4' />
                                </div>
                              }
                              label={item}
                            />
                          </>
                        );
                      })
                    )
                  }
                />
                <KeywordCard
                  textTitle={'Soft Conflicts'}
                  textWarning={
                    'When these keywords are found in a calendar event title, overlapping interviews will be marked as soft conflicts and will require your confirmation to schedule.'
                  }
                  slotInput={
                    <FilterInput
                      handleAdd={(s) => {
                        const keyword = String(s).split(',');
                        keyword.map((item) => {
                          if (freeKeyWords.includes(item)) {
                            toast.warning(`"${item}" keyword exists.`);
                            return null;
                          } else {
                            setSoftConflictsKeyWords((pre) => [item, ...pre]);
                          }
                        });
                      }}
                      path='softConflictsKeywords'
                      type='string'
                    />
                  }
                  slotSuggestPill={
                    softConflictsKeyWords.length === 0 ? (
                      <Alert severity='info' icon={false}>
                        <Typography>No soft conflict keyword added.</Typography>
                      </Alert>
                    ) : (
                      softConflictsKeyWords.map((item) => {
                        return (
                          <>
                            <Chip
                              clickable
                              onDelete={() => {
                                setSoftConflictsKeyWords((pre) => {
                                  return pre.filter((ele) => ele !== item);
                                });
                              }}
                              deleteIcon={
                                <div>
                                  <GlobalIcon iconName='close' size='4' />
                                </div>
                              }
                              label={item}
                            />
                          </>
                        );
                      })
                    )
                  }
                />
                <KeywordCard
                  textTitle={'Out of Office'}
                  textWarning={
                    'When any of these specified keywords appear in a calendar event title, the day will be considered an Out of Office day, and interviews will not be scheduled.'
                  }
                  slotInput={
                    <FilterInput
                      handleAdd={(s) => {
                        const keyword = String(s).split(',');
                        keyword.map((itemX) => {
                          const item = itemX.trim();
                          if (item?.length) {
                            if (outOfOffice.includes(item)) {
                              toast.warning(`"${item}" keyword exists.`);
                              return null;
                            } else {
                              setOutOfOffice((pre) => [item, ...pre]);
                            }
                          }
                        });
                      }}
                      path='outOfOfficeKeywords'
                      type='string'
                    />
                  }
                  slotSuggestPill={
                    outOfOffice.length === 0 ? (
                      <Alert severity='info' icon={false}>
                        <Typography>
                          No out of office keywords added.
                        </Typography>
                      </Alert>
                    ) : (
                      outOfOffice.map((item) => {
                        return (
                          <>
                            <Chip
                              clickable
                              onDelete={() => {
                                setOutOfOffice((pre) => {
                                  return pre.filter((ele) => ele !== item);
                                });
                              }}
                              deleteIcon={
                                <div>
                                  <GlobalIcon iconName='close' size='4' />
                                </div>
                              }
                              label={item}
                            />
                          </>
                        );
                      })
                    )
                  }
                />
                <KeywordCard
                  textTitle={'Recruiting Blocks'}
                  textWarning={
                    'If these keywords are found in a calendar event title, these blocks will be given first preference for scheduling interviews.'
                  }
                  slotInput={
                    <FilterInput
                      handleAdd={(s) => {
                        const keyword = String(s).split(',');
                        keyword.map((itemX) => {
                          const item = itemX.trim();
                          if (item?.length) {
                            if (recruitingBlocks.includes(item)) {
                              toast.warning(`"${item}" keyword exists.`);
                              return null;
                            } else {
                              setRecruitingBlocks((pre) => [item, ...pre]);
                            }
                          }
                        });
                      }}
                      path='recruitingBlocksKeywords'
                      type='string'
                    />
                  }
                  slotSuggestPill={
                    recruitingBlocks.length === 0 ? (
                      <Alert severity='info' variant='outlined' icon={false}>
                        <Typography>No recruiting blocks added.</Typography>
                      </Alert>
                    ) : (
                      recruitingBlocks.map((item) => {
                        return (
                          <>
                            <Chip
                              clickable
                              onDelete={() => {
                                setRecruitingBlocks((pre) => {
                                  return pre.filter((ele) => ele !== item);
                                });
                              }}
                              deleteIcon={
                                <div>
                                  <GlobalIcon iconName='close' size='4' />
                                </div>
                              }
                              label={item}
                            />
                          </>
                        );
                      })
                    )
                  }
                />
              </>
            }
          />
        </div>
        <div className='bg-white w-[400px] min-w-[400px] p-4 border-l border-neutral-6 h-[calc(100vh-48px)] flex flex-col gap-4 overflow-y-auto'>
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
        </div>
      </div>
    </div>
  );
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
        onChange={(event, value) => {
          if (value) {
            setValue(value);
          }
        }}
        autoComplete={false}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <Typography variant='body1' color={'var(--neutral-12)'}>
                {option.label}
              </Typography>
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
