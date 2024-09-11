import {
  type holidayType,
  type schedulingSettingType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import { Checkbox } from '@components/ui/checkbox';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { DayOff } from '@devlink2/DayOff';
import { KeywordCard } from '@devlink2/KeywordCard';
import { Keywords } from '@devlink2/Keywords';
import { ScheduleSettings } from '@devlink2/ScheduleSettings';
import { TimeRangeInput } from '@devlink2/TimeRangeInput';
import { WorkingHourDay } from '@devlink2/WorkingHourDay';
import { cn } from '@lib/utils';
import {
  Alert,
  Autocomplete,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { capitalize, cloneDeep } from 'lodash';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import Chip from '@/components/Common/AddChip/Chip';
import { LoadMax } from '@/components/CompanyDetailComp/Holidays';
import MuiNumberfield from '@/components/CompanyDetailComp/OldSettingsSchedule/Components/MuiNumberfield';
import SelectTime from '@/components/CompanyDetailComp/OldSettingsSchedule/Components/SelectTime';
import FilterInput from '@/components/Scheduling/Common/MovedFromCD/FilterInput';
import timeZones from '@/utils/timeZone';
import toast from '@/utils/toast';

import { useImrQuery } from '../hooks';
type interviewLoadType = {
  type: 'Hours' | 'Interviews';
  value: number;
  max: number;
};

let schedulingSettingObj = {};
let changeValue = null;
function InterviewerLevelSettings({
  updateSettings,
  initialData,
  isAvailability,
  companyKeywords,
}) {
  const dateRef = useRef<HTMLInputElement>(null);

  const [workingHours, setWorkingHours] = useState([]);
  const [daysOff, setDaysOff] = useState<holidayType[]>([]);
  const [freeKeyWords, setFreeKeywords] = useState([]);
  const [softConflictsKeyWords, setSoftConflictsKeyWords] = useState([]);
  const [outOfOffice, setOutOfOffice] = useState<string[]>([]);
  const [recruitingBlocks, setRecruitingBlocks] = useState<string[]>([]);

  const [selectedTimeZone, setSelectedTimeZone] = useState(null);
  const [isTimeZone, setIsTimeZone] = useState(true);
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

  // const [interviewLoad, setInterviewLoad] = useState<InterviewLoadType>({
  //   daily: {
  //     type: 'Hours',
  //     value: 20,
  //     max: LoadMax.dailyHours,
  //   },
  //   weekly: {
  //     type: 'Hours',
  //     value: 10,
  //     max: LoadMax.weeklyHours,
  //   },
  // });

  // function loadChangeHandle(value, module, type) {
  //   if (type === 'type') {
  //     setInterviewLoad(
  //       (prevState) =>
  //         ({
  //           ...prevState,
  //           [module]: {
  //             // eslint-disable-next-line security/detect-object-injection
  //             ...prevState[module],
  //             [type]: value,
  //             value:
  //               module === 'weekly'
  //                 ? value === 'Hours'
  //                   ? // eslint-disable-next-line security/detect-object-injection
  //                     prevState[module].value > LoadMax.weeklyHours
  //                     ? LoadMax.weeklyHours
  //                     : // eslint-disable-next-line security/detect-object-injection
  //                       prevState[module].value
  //                   : // eslint-disable-next-line security/detect-object-injection
  //                     prevState[module].value
  //                 : value === 'Interviews'
  //                   ? // eslint-disable-next-line security/detect-object-injection
  //                     prevState[module].value
  //                   : // eslint-disable-next-line security/detect-object-injection
  //                     prevState[module].value > LoadMax.dailyHours
  //                     ? LoadMax.dailyHours
  //                     : // eslint-disable-next-line security/detect-object-injection
  //                       prevState[module].value,
  //             max:
  //               module === 'weekly'
  //                 ? value === 'Hours'
  //                   ? LoadMax.weeklyHours
  //                   : LoadMax.weeklyInterviews
  //                 : value === 'Interviews'
  //                   ? LoadMax.dailyInterviews
  //                   : LoadMax.dailyHours,
  //           },
  //         }) as InterviewLoadType,
  //     );
  //   } else {
  //     setInterviewLoad((prevState) => ({
  //       ...prevState,
  //       [module]: {
  //         // eslint-disable-next-line security/detect-object-injection
  //         ...prevState[module],
  //         [type]: value,
  //       },
  //     }));
  //   }
  // }

  const selectStartTime = (value: any, i: number) => {
    setWorkingHours((pre) => {
      const data = pre;
      data[Number(i)].timeRange.startTime =
        `${dayjsLocal(value).format('HH:mm')}`;
      return [...data];
    });
  };

  const selectEndTime = (value: any, i: number) => {
    setWorkingHours((pre) => {
      const data = pre;
      data[Number(i)].timeRange.endTime =
        `${dayjsLocal(value).format('HH:mm')}`;
      return [...data];
    });
  };

  function getDate(e: any) {
    const selectedDate = dayjsLocal(e).format('DD MMM YYYY');
    setDaysOff((pre) => [...pre, { date: selectedDate } as holidayType]);
    dateRef.current.value = String(new Date(e.$d));
  }

  function removeDayOff(value: string) {
    setDaysOff((pre) => {
      const filtered = pre.filter((item) => item.date !== value);
      return [...filtered];
    });
  }

  function initialLoad() {
    if (initialData) {
      const schedulingSettingData = cloneDeep(
        initialData,
      ) as schedulingSettingType;

      const workingHoursCopy = cloneDeep(schedulingSettingData.workingHours);
      // eslint-disable-next-line no-console
      //   console.log('local timeZones', dayjsLocal.tz.guess());

      setSelectedTimeZone({ ...schedulingSettingData.timeZone });
      setIsTimeZone(schedulingSettingData.isAutomaticTimezone);

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

      // setInterviewLoad({
      //   daily: {
      //     type: schedulingSettingData.interviewLoad.dailyLimit.type,
      //     value: schedulingSettingData.interviewLoad.dailyLimit.value,
      //     max:
      //       schedulingSettingData.interviewLoad.dailyLimit.type === 'Hours'
      //         ? LoadMax.dailyHours
      //         : LoadMax.dailyInterviews,
      //   },
      //   weekly: {
      //     type: schedulingSettingData.interviewLoad.weeklyLimit.type,
      //     value: schedulingSettingData.interviewLoad.weeklyLimit.value,
      //     max:
      //       schedulingSettingData.interviewLoad.dailyLimit.type === 'Hours'
      //         ? LoadMax.weeklyHours
      //         : LoadMax.weeklyInterviews,
      //   },
      // });
      setWorkingHours(workingHoursCopy);
      setDaysOff([...schedulingSettingData.totalDaysOff]);
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

  useEffect(() => {
    if (daysOff.length && workingHours.length) {
      schedulingSettingObj = {
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
        timeZone: selectedTimeZone,
        workingHours: workingHours,
        totalDaysOff: daysOff,
        schedulingKeyWords: {
          free: freeKeyWords,
          SoftConflicts: softConflictsKeyWords,
          outOfOffice: outOfOffice,
          recruitingBlocks: recruitingBlocks,
        },
        isAutomaticTimezone: isTimeZone,
      } as schedulingSettingType;

      if (changeValue === 'updating') {
        updateSettings(schedulingSettingObj).then(() => {
          refetch();
        });
      }

      changeValue = 'updating';
    }
  }, [
    dailyLmit,
    weeklyLmit,
    daysOff,
    workingHours,
    selectedTimeZone,
    freeKeyWords,
    softConflictsKeyWords,
    outOfOffice,
    recruitingBlocks,
    isTimeZone,
  ]);

  useEffect(() => {
    initialLoad();

    return () => {
      changeValue = null;
    };
  }, []);
  const router = useRouter();
  const { refetch } = useImrQuery({ user_id: router.query.id as string });
  return (
    <Stack overflow={'hidden'}>
      {isAvailability ? (
        <ScheduleSettings
          isTimeZoneToggleVisible={false}
          slotTimeZoneInput={
            <Stack
              spacing={'var(--space-2)'}
              width={420}
              flexDirection={'column-reverse'}
              gap={'var(--space-2)'}
            >
              <Autocomplete
                disabled={isTimeZone}
                disableClearable
                options={timeZones}
                value={selectedTimeZone}
                onChange={(_event, value) => {
                  if (value) {
                    setSelectedTimeZone(value);
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
                      label=''
                      placeholder='Ex. Healthcare'
                    />
                  );
                }}
              />
            </Stack>
          }
          isKeywordVisible={false}
          isCompanyLevelVisible={false}
          slotKeywordCard={<></>}
          slotDailyLimit={
            <>
              <Stack spacing={3}>
                <MuiNumberfield
                  handleSelect={(value) => handleDailyValue(+value)}
                  value={dailyLmit.value}
                  max={dailyLmit.max}
                />
                <RadioGroup
                  defaultValue={dailyLmit.type}
                  onChange={(e) =>
                    handleType(
                      (e.target as HTMLInputElement).value as
                        | 'Interviews'
                        | 'Hours',
                    )
                  }
                  className='flex flex-row'
                >
                  {['Interviews', 'Hours'].map((ele) => (
                    <div key={ele} className='flex items-center space-x-2'>
                      <RadioGroupItem value={ele} id={`radio-${ele}`} />
                      <Label htmlFor={`radio-${ele}`}>
                        {capitalize(ele.replaceAll('_', ' '))}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </Stack>
            </>
          }
          slotWeeklyLimit={
            <>
              <Stack spacing={3}>
                <MuiNumberfield
                  handleSelect={(value) => handleWeeklyValue(+value)}
                  value={weeklyLmit.value}
                  max={weeklyLmit.max}
                />
                <RadioGroup
                  defaultValue={weeklyLmit.type}
                  onChange={(e) =>
                    handleType(
                      (e.target as HTMLInputElement).value as
                        | 'Interviews'
                        | 'Hours',
                    )
                  }
                  className='flex flex-row'
                >
                  {['Interviews', 'Hours'].map((ele) => (
                    <div key={ele} className='flex items-center space-x-2'>
                      <RadioGroupItem value={ele} id={`radio-weekly-${ele}`} />
                      <Label htmlFor={`radio-weekly-${ele}`}>
                        {capitalize(ele.replaceAll('_', ' '))}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </Stack>
            </>
          }
          slotWorkingHourDay={
            <>
              {!!workingHours.length &&
                workingHours.map((day, i) => {
                  return (
                    <>
                      <WorkingHourDay
                        slotRcCheckbox={
                          <div className='flex items-center space-x-2'>
                            <Checkbox
                              id={`checkbox-${day.day}`}
                              checked={day.isWorkDay}
                              onCheckedChange={() => {
                                setWorkingHours((pre) => {
                                  const data = [...pre];
                                  data[i].isWorkDay = !data[i].isWorkDay;
                                  return data;
                                });
                              }}
                            />
                            <Label htmlFor={`checkbox-${day.day}`}>
                              {capitalize(day.day)}
                            </Label>
                          </div>
                        }
                        slotTimeRageInput={
                          <TimeRangeInput
                            slotStartTimeInput={
                              <SelectTime
                                value={dayjsLocal()
                                  .set(
                                    'hour',
                                    parseInt(
                                      day.timeRange.startTime.split(':')[0],
                                    ),
                                  )
                                  .set(
                                    'minute',
                                    parseInt(
                                      day.timeRange.startTime.split(':')[1],
                                    ),
                                  )}
                                onSelect={selectStartTime}
                                i={i}
                              />
                            }
                            slotEndTimeInput={
                              <SelectTime
                                value={dayjsLocal()
                                  .set(
                                    'hour',
                                    parseInt(
                                      day.timeRange.endTime.split(':')[0],
                                    ),
                                  )
                                  .set(
                                    'minute',
                                    parseInt(
                                      day.timeRange.endTime.split(':')[1],
                                    ),
                                  )}
                                onSelect={selectEndTime}
                                i={i}
                              />
                            }
                          />
                        }
                      />
                    </>
                  );
                })}
            </>
          }
          onClickAddDate={{
            onClick: '',
          }}
          isCompanyDaysOffVisible={false}
          slotDayOff={
            <>
              {daysOff.map((item, i) => {
                return (
                  <DayOff
                    onClickRemove={{
                      onClick: () => removeDayOff(item.date),
                    }}
                    key={i}
                    textDate={item.date}
                  />
                );
              })}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className={cn(
                      'w-[280px] justify-start text-left font-normal',
                      daysOff.length === 0 && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {daysOff.length > 0 ? (
                      daysOff
                        .map((date) => format(new Date(date.date), 'PPP'))
                        .join(', ')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='multiple'
                    selected={daysOff.map((date) => new Date(date.date))}
                    onSelect={(dates) => getDate(dates)}
                  />
                </PopoverContent>
              </Popover>
            </>
          }
        />
      ) : (
        <Keywords
          size={'small'}
          slotKeywordsCard={
            <>
              <KeywordCard
                textTitle={'Free'}
                textWarning={
                  'If these keywords are detected in a calendar event title, interviews booked over or overlapping these events will not be counted as a scheduling conflict.'
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
                    <>
                      {freeKeyWords.map((item) => {
                        if (companyKeywords.free.includes(item)) {
                          return <Chip key={item} name={item} disable={true} />;
                        } else {
                          return (
                            <Chip
                              key={item}
                              name={item}
                              onRemove={() => {
                                setFreeKeywords((prev) =>
                                  prev.filter((ele) => ele !== item),
                                );
                              }}
                            />
                          );
                        }
                      })}
                    </>
                  )
                }
              />
              <KeywordCard
                textTitle={'Soft Conflicts'}
                textWarning={
                  'If these keywords are detected in a calendar event title, any interviews that overlap with these events will be seen as a soft conflict and will be scheduled only on your confirmation'
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
                    <>
                      {softConflictsKeyWords.map((item) => {
                        if (companyKeywords.SoftConflicts.includes(item)) {
                          return <Chip key={item} name={item} disable />;
                        } else {
                          return (
                            <Chip
                              key={item}
                              name={item}
                              onRemove={() => {
                                setSoftConflictsKeyWords((prev) =>
                                  prev.filter((ele) => ele !== item),
                                );
                              }}
                            />
                          );
                        }
                      })}
                    </>
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
                      <Typography>No out of office keywords added.</Typography>
                    </Alert>
                  ) : (
                    <>
                      {outOfOffice.map((item) => {
                        if (companyKeywords.outOfOffice.includes(item)) {
                          return <Chip key={item} name={item} disable />;
                        } else {
                          return (
                            <Chip
                              key={item}
                              name={item}
                              onRemove={() => {
                                setOutOfOffice((prev) =>
                                  prev.filter((ele) => ele !== item),
                                );
                              }}
                            />
                          );
                        }
                      })}
                    </>
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
                    <>
                      {recruitingBlocks.map((item) => {
                        if (companyKeywords.recruitingBlocks.includes(item)) {
                          return <Chip key={item} name={item} disable />;
                        } else {
                          return (
                            <Chip
                              key={item}
                              name={item}
                              onRemove={() => {
                                setRecruitingBlocks((prev) =>
                                  prev.filter((ele) => ele !== item),
                                );
                              }}
                            />
                          );
                        }
                      })}
                    </>
                  )
                }
              />
            </>
          }
        />
      )}
    </Stack>
  );
}

export default InterviewerLevelSettings;
