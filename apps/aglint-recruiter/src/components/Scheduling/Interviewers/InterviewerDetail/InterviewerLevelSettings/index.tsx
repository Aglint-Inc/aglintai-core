import {
  type holidayType,
  type schedulingSettingType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { Checkbox } from '@components/ui/checkbox';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { DayOff } from '@devlink2/DayOff';
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
import { BookKey, Calendar as CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import Chip from '@/components/Common/AddChip/Chip';
import { LoadMax } from '@/components/CompanyDetailComp/Holidays';
import MuiNumberfield from '@/components/CompanyDetailComp/OldSettingsSchedule/Components/MuiNumberfield';
import SelectTime from '@/components/CompanyDetailComp/OldSettingsSchedule/Components/SelectTime';
import FilterInput from '@/components/Scheduling/Common/MovedFromCD/FilterInput';
import timeZones from '@/utils/timeZone';
import toast from '@/utils/toast';

import { ScheduleSettings } from '../_common/ScheduleSettings';
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
                      <div className='flex items-center justify-between p-4 border rounded-lg shadow-sm'>
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
                          <Label
                            htmlFor={`checkbox-${day.day}`}
                            className='text-sm font-medium'
                          >
                            {capitalize(day.day)}
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <SelectTime
                            value={dayjsLocal()
                              .set(
                                'hour',
                                parseInt(day.timeRange.startTime.split(':')[0]),
                              )
                              .set(
                                'minute',
                                parseInt(day.timeRange.startTime.split(':')[1]),
                              )}
                            onSelect={selectStartTime}
                            i={i}
                          />
                          <span className='text-sm text-gray-500'>to</span>
                          <SelectTime
                            value={dayjsLocal()
                              .set(
                                'hour',
                                parseInt(day.timeRange.endTime.split(':')[0]),
                              )
                              .set(
                                'minute',
                                parseInt(day.timeRange.endTime.split(':')[1]),
                              )}
                            onSelect={selectEndTime}
                            i={i}
                          />
                        </div>
                      </div>
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
        <div>
          <div className='flex flex-col gap-5 w-[700px]'>
            <div>
              <div className='flex items-center mb-1'>
                <BookKey className='mr-2 h-6 w-6 text-gray-500' />
                <h3 className='text-lg font-semibold'>Keywords</h3>
              </div>
              <p>
                Use keywords to mark events on interviewers’ calendars that can
                be overridden for interview scheduling.
              </p>
            </div>
            {[
              'Free',
              'Soft Conflicts',
              'Out of Office',
              'Recruiting Blocks',
            ].map((title, index) => {
              const keywords = {
                Free: freeKeyWords,
                'Soft Conflicts': softConflictsKeyWords,
                'Out of Office': outOfOffice,
                'Recruiting Blocks': recruitingBlocks,
              }[title];
              const handleAdd = {
                Free: setFreeKeywords,
                'Soft Conflicts': setSoftConflictsKeyWords,
                'Out of Office': setOutOfOffice,
                'Recruiting Blocks': setRecruitingBlocks,
              }[title];
              const path = {
                Free: 'freeKeywords',
                'Soft Conflicts': 'softConflictsKeywords',
                'Out of Office': 'outOfOfficeKeywords',
                'Recruiting Blocks': 'recruitingBlocksKeywords',
              }[title];
              const textWarning = {
                Free: 'If these keywords are detected in a calendar event title, interviews booked over or overlapping these events will not be counted as a scheduling conflict.',
                'Soft Conflicts':
                  'If these keywords are detected in a calendar event title, any interviews that overlap with these events will be seen as a soft conflict and will be scheduled only on your confirmation',
                'Out of Office':
                  'When any of these specified keywords appear in a calendar event title, the day will be considered an Out of Office day, and interviews will not be scheduled.',
                'Recruiting Blocks':
                  'If these keywords are found in a calendar event title, these blocks will be given first preference for scheduling interviews.',
              }[title];
              return (
                <Card key={index} className='mb-4'>
                  <CardHeader className='pt-4'>
                    <h4 className='text-lg font-semibold'>{title}</h4>
                    <p className='text-sm'>{textWarning}</p>
                  </CardHeader>
                  <CardContent>
                    <div className='flex flex-wrap gap-2'>
                      {keywords.length === 0 ? (
                        <Alert severity='info' icon={false}>
                          <Typography>
                            No {title.toLowerCase()} keywords added.
                          </Typography>
                        </Alert>
                      ) : (
                        <>
                          {keywords.map((item) => {
                            if (
                              companyKeywords &&
                              companyKeywords[title.replace(' ', '')] &&
                              companyKeywords[title.replace(' ', '')].includes(
                                item,
                              )
                            ) {
                              return <Chip key={item} name={item} disable />;
                            } else {
                              return (
                                <Chip
                                  key={item}
                                  name={item}
                                  onRemove={() => {
                                    handleAdd((prev) =>
                                      prev.filter((ele) => ele !== item),
                                    );
                                  }}
                                />
                              );
                            }
                          })}
                        </>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className='w-full'>
                      <FilterInput
                        handleAdd={(s) => {
                          const keyword = String(s).split(',');
                          keyword.map((itemX) => {
                            const item = itemX.trim();
                            if (item?.length) {
                              if (keywords && keywords.includes(item)) {
                                toast.warning(`"${item}" keyword exists.`);
                                return null;
                              } else {
                                handleAdd((pre) => [item, ...pre]);
                              }
                            }
                          });
                        }}
                        path={path}
                        type='string'
                      />
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </Stack>
  );
}

export default InterviewerLevelSettings;
