import {
  DailyLimitType,
  holidayType,
  schedulingSettingType,
  WeeklyLimitType,
} from '@aglint/shared-types';
import {
  Alert,
  Autocomplete,
  Chip,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { capitalize, cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { DayOff } from '@/devlink2/DayOff';
import { KeywordCard } from '@/devlink2/KeywordCard';
import { Keywords } from '@/devlink2/Keywords';
import { RcCheckbox } from '@/devlink2/RcCheckbox';
import { ScheduleSettings } from '@/devlink2/ScheduleSettings';
import { TimeRangeInput } from '@/devlink2/TimeRangeInput';
import { WorkingHourDay } from '@/devlink2/WorkingHourDay';
import FilterInput from '@/src/components/CandidateDatabase/Search/FilterInput';
import UITextField from '@/src/components/Common/UITextField';
import DateSelect from '@/src/components/Scheduling/Settings/Components/DateSelector';
import MuiSelect from '@/src/components/Scheduling/Settings/Components/MuiSelect';
import SelectTime from '@/src/components/Scheduling/Settings/Components/SelectTime';
import { hoursList } from '@/src/components/Scheduling/Settings/utils';
import timeZones from '@/src/utils/timeZone';
import toast from '@/src/utils/toast';

import { useImrQuery } from '../hooks';
dayjs.extend(utc);
dayjs.extend(timezone);

let schedulingSettingObj = {};
let changeValue = null;
function InterviewerLevelSettings({
  updateSettings,
  initialData,
  isAvailability,
}) {
  const dateRef = useRef<HTMLInputElement>(null);

  const [selectedDailyLimit, setSelectedDailyLimit] = useState<DailyLimitType>({
    type: 'Interviews',
    value: 2,
  });

  const [selectedWeeklyLimit, setSelectedWeeklyLimit] =
    useState<DailyLimitType>({
      type: 'Hours',
      value: 16,
    });

  const [workingHours, setWorkingHours] = useState([]);
  const [daysOff, setDaysOff] = useState<holidayType[]>([]);
  const [freeKeyWords, setFreeKeywords] = useState([]);
  const [softConflictsKeyWords, setSoftConflictsKeyWords] = useState([]);
  const [outOfOffice, setOutOfOffice] = useState<string[]>([]);
  const [recruitingBlocks, setRecruitingBlocks] = useState<string[]>([]);

  const [selectedTimeZone, setSelectedTimeZone] = useState(null);
  const [isTimeZone, setIsTimeZone] = useState(true);

  const handleSelectWeeklyType = (value: any) => {
    setSelectedWeeklyLimit((pre) => {
      pre.type = value.target.value as any;
      return { ...pre } as WeeklyLimitType;
    });
  };
  const handleSelectWeeklyValue = (value: any) => {
    setSelectedWeeklyLimit((pre) => {
      pre.value = value.target.value as number;
      return { ...pre } as WeeklyLimitType;
    });
  };
  const handleSelectDailyType = (value: any) => {
    setSelectedDailyLimit((pre) => {
      pre.type = value.target.value as any;
      return { ...pre } as DailyLimitType;
    });
  };

  const handleSelectDailyValue = (value: any) => {
    setSelectedDailyLimit((pre) => {
      pre.value = value.target.value as number;
      return { ...pre } as DailyLimitType;
    });
  };

  const selectStartTime = (value: any, i: number) => {
    setWorkingHours((pre) => {
      const data = pre;
      data[Number(i)].timeRange.startTime = `${dayjs(value).format('HH:mm')}`;
      return [...data];
    });
  };

  const selectEndTime = (value: any, i: number) => {
    setWorkingHours((pre) => {
      const data = pre;
      data[Number(i)].timeRange.endTime = `${dayjs(value).format('HH:mm')}`;
      return [...data];
    });
  };

  ///////////// DayOff Popup //////////////
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openAddCompany = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function getDate(e: any) {
    const selectedDate = dayjs(e).format('DD MMM YYYY');
    setDaysOff((pre) => [...pre, { date: selectedDate } as holidayType]);
    handleClose();
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
      //   console.log('local timeZones', dayjs.tz.guess());

      setSelectedTimeZone({ ...schedulingSettingData.timeZone });
      setIsTimeZone(schedulingSettingData.isAutomaticTimezone);
      setSelectedDailyLimit({
        ...schedulingSettingData.interviewLoad.dailyLimit,
      });
      setSelectedWeeklyLimit({
        ...schedulingSettingData.interviewLoad.weeklyLimit,
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
          dailyLimit: selectedDailyLimit,
          weeklyLimit: selectedWeeklyLimit,
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
    selectedDailyLimit,
    selectedWeeklyLimit,
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
              {/* <Stack
                alignItems={'center'}
                direction={'row'}
                marginLeft={'-10px !important'}
              >
                <ToggleBtn
                  handleCheck={(e) => {
                    setIsTimeZone(e);
                    if (e) {
                      setSelectedTimeZone(
                        timeZones.filter((item) =>
                          item.label.includes(dayjs.tz.guess()),
                        )[0],
                      );
                    }
                  }}
                  isActive={isTimeZone}
                />
                <Typography fontSize={'14px'} variant='caption'>
                  Get timezone automatically
                </Typography>
              </Stack> */}

              <Autocomplete
                disabled={isTimeZone}
                disableClearable
                options={timeZones}
                value={selectedTimeZone}
                onChange={(event, value) => {
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
                    <UITextField
                      rest={{ ...params }}
                      labelSize='medium'
                      // fullWidth
                      label=''
                      placeholder='Ex. Healthcare'
                      InputProps={{
                        ...params.InputProps,
                        autoComplete: 'new-password',
                      }}
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
              <MuiSelect
                dataset={hoursList}
                handleSelect={handleSelectDailyValue}
                value={selectedDailyLimit.value}
              />
              <MuiSelect
                width='150px'
                dataset={['Interviews', 'Hours']}
                handleSelect={handleSelectDailyType}
                value={selectedDailyLimit.type}
              />
            </>
          }
          slotWeeklyLimit={
            <>
              <MuiSelect
                dataset={hoursList}
                handleSelect={handleSelectWeeklyValue}
                value={selectedWeeklyLimit.value}
              />
              <MuiSelect
                width='150px'
                dataset={['Interviews', 'Hours']}
                handleSelect={handleSelectWeeklyType}
                value={selectedWeeklyLimit.type}
              />
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
                          <RcCheckbox
                            onclickCheck={{
                              onClick: () => {
                                setWorkingHours((pre) => {
                                  const data = pre;
                                  data[Number(i)].isWorkDay =
                                    !data[Number(i)].isWorkDay;

                                  return [...data];
                                });
                              },
                            }}
                            isChecked={day.isWorkDay}
                            text={capitalize(day.day)}
                          />
                        }
                        slotTimeRageInput={
                          <TimeRangeInput
                            slotStartTimeInput={
                              <SelectTime
                                value={dayjs()
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
                                value={dayjs()
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
            onClick: openAddCompany,
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
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <DateSelect
                  selectedDates={daysOff}
                  dateRef={dateRef}
                  getDate={getDate}
                />
              </Popover>
            </>
          }
        />
      ) : (
        <Keywords
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
                      {freeKeyWords.map((item) => (
                        <Chip
                          key={item} // Add a unique key prop for each item
                          clickable
                          onDelete={() => {
                            setFreeKeywords((prev) =>
                              prev.filter((ele) => ele !== item),
                            );
                          }}
                          deleteIcon={
                            <Stack>
                              <GlobalIcon iconName='close' size='4' />
                            </Stack>
                          }
                          label={item}
                        />
                      ))}
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
                      {softConflictsKeyWords.map((item) => (
                        <Chip
                          key={item} // Add a unique key prop for each item
                          clickable
                          onDelete={() => {
                            setSoftConflictsKeyWords((prev) =>
                              prev.filter((ele) => ele !== item),
                            );
                          }}
                          deleteIcon={
                            <Stack>
                              <GlobalIcon iconName='close' size='4' />{' '}
                            </Stack>
                          }
                          label={item}
                        />
                      ))}
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
                    path='outOfOfficekeywords'
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
                      {outOfOffice.map((item) => (
                        <Chip
                          key={item} // Add a unique key prop for each item
                          clickable
                          onDelete={() => {
                            setOutOfOffice((prev) =>
                              prev.filter((ele) => ele !== item),
                            );
                          }}
                          deleteIcon={
                            <Stack>
                              <GlobalIcon iconName='close' size='4' />
                            </Stack>
                          }
                          label={item}
                        />
                      ))}
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
                      {recruitingBlocks.map((item) => (
                        <Chip
                          key={item} // Add a unique key prop for each item
                          clickable
                          onDelete={() => {
                            setRecruitingBlocks((prev) =>
                              prev.filter((ele) => ele !== item),
                            );
                          }}
                          deleteIcon={
                            <Stack>
                              <GlobalIcon iconName='close' size='4' />
                            </Stack>
                          }
                          label={item}
                        />
                      ))}
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
