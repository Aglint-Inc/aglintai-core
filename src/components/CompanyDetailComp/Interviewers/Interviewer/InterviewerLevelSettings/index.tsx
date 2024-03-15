import {
  Autocomplete,
  Chip,
  IconButton,
  Popover,
  Stack,
  Typography
} from '@mui/material';
import timeZones from '@utils/timeZone.json';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { capitalize, cloneDeep } from 'lodash';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
dayjs.extend(utc);
dayjs.extend(timezone);
import {
  DayOff,
  KeywordCard,
  Keywords,
  RcCheckbox,
  ScheduleSettings,
  TimeRangeInput,
  WorkingHourDay
} from '@/devlink2';
import { DarkPill, UserLevelSettings } from '@/devlink3';
import FilterInput from '@/src/components/CandidateDatabase/Search/FilterInput';
import Icon from '@/src/components/Common/Icons/Icon';
import UITextField from '@/src/components/Common/UITextField';
import DateSelect from '@/src/components/Scheduling/Settings/Components/DateSelector';
import MuiSelect from '@/src/components/Scheduling/Settings/Components/MuiSelect';
import SelectTime from '@/src/components/Scheduling/Settings/Components/SelectTime';
import ToggleBtn from '@/src/components/Scheduling/Settings/Components/ToggleBtn';
import {
  DailyLimitType,
  holidayType,
  schedulingSettingType,
  WeeklyLimitType
} from '@/src/components/Scheduling/Settings/types';
import { hoursList } from '@/src/components/Scheduling/Settings/utils';
import toast from '@/src/utils/toast';

let schedulingSettingObj = {};
let changeValue = null;
function InterviewerLevelSettings({
  setOpenDrawer,
  updateSettings,
  initialData,
  isOverflow = false
}) {
  const dateRef = useRef<HTMLInputElement>(null);
  const [selectedDailyLimit, setSelectedDailyLimit] = useState<DailyLimitType>({
    type: 'Interviews',
    value: 2
  });
  const [selectedWeeklyLimit, setSelectedWeeklyLimit] =
    useState<DailyLimitType>({
      type: 'Hours',
      value: 16
    });

  const [workingHours, setWorkingHours] = useState([]);
  const [daysOff, setDaysOff] = useState<holidayType[]>([]);
  const [freeKeyWords, setFreeKeywords] = useState([]);
  const [softConflictsKeyWords, setSoftConflictsKeyWords] = useState([]);

  const [selectedTimeZone, setSelectedTimeZone] = useState(null);
  const [isTimeZone, setIsTimeZone] = useState(true);

  const handleSelectWeeklyType = (value: any) => {
    setSelectedWeeklyLimit((pre) => {
      pre.type = value.target.value as string;
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
      pre.type = value.target.value as string;
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
        initialData
      ) as schedulingSettingType;

      const workingHoursCopy = cloneDeep(schedulingSettingData.workingHours);
      // eslint-disable-next-line no-console
      //   console.log('local timeZones', dayjs.tz.guess());

      setSelectedTimeZone({ ...schedulingSettingData.timeZone });
      setSelectedDailyLimit({
        ...schedulingSettingData.interviewLoad.dailyLimit
      });
      setSelectedWeeklyLimit({
        ...schedulingSettingData.interviewLoad.weeklyLimit
      });
      setWorkingHours(workingHoursCopy);
      setDaysOff([...schedulingSettingData.totalDaysOff]);
      setFreeKeywords(schedulingSettingData?.schedulingKeyWords?.free || []);
      setSoftConflictsKeyWords(
        schedulingSettingData?.schedulingKeyWords?.SoftConflicts || []
      );
    }
  }

  useEffect(() => {
    if (daysOff.length && workingHours.length) {
      schedulingSettingObj = {
        interviewLoad: {
          dailyLimit: selectedDailyLimit,
          weeklyLimit: selectedWeeklyLimit
        },
        timeZone: selectedTimeZone,
        workingHours: workingHours,
        totalDaysOff: daysOff,
        schedulingKeyWords: {
          free: freeKeyWords,
          SoftConflicts: softConflictsKeyWords
        }
      } as schedulingSettingType;

      if (changeValue === 'updating') {
        updateSettings(schedulingSettingObj);
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
    softConflictsKeyWords
  ]);

  useEffect(() => {
    initialLoad();

    return () => {
      changeValue = null;
    };
  }, []);

  const [isAvailability, setIsAvailability] = useState(true);
  return (
    <Stack overflow={isOverflow ? 'auto' : 'visible'}>
      <UserLevelSettings
        onClickClose={{
          onClick: () => {
            setOpenDrawer(false);
          }
        }}
        slotDarkPill={
          <>
            <DarkPill
              onClickPill={{
                onClick: () => {
                  setIsAvailability(true);
                }
              }}
              isActive={isAvailability}
              textPill={'Availability'}
            />
            <DarkPill
              onClickPill={{
                onClick: () => {
                  setIsAvailability(false);
                }
              }}
              isActive={!isAvailability}
              textPill={'Keywords'}
            />
          </>
        }
        slotTabContent={
          isAvailability ? (
            <ScheduleSettings
              // onClickUpdateChanges={{
              //   onClick: updateSettings,
              // }}
              // onClickDiscard={{
              //   onClick: () => {
              //     setReload(true);
              //     discard();
              //   },
              // }}
              isTimeZoneToggleVisible={false}
              // slotTimeZoneToggle={
              //   <ToggleBtn isActive={isTimeZone} handleCheck={handleCheck} />
              // }
              slotTimeZoneInput={
                <Stack spacing={'10px'} width={420}>
                  <Stack alignItems={'center'} direction={'row'}>
                    <ToggleBtn
                      handleCheck={(e) => {
                        setIsTimeZone(e);
                      }}
                      isActive={isTimeZone}
                    />
                    <Typography fontSize={'14px'} variant='caption'>
                      Get timezone automatically
                    </Typography>
                  </Stack>
                  <Autocomplete
                    disableClearable
                    options={timeZones}
                    value={
                      isTimeZone
                        ? timeZones.filter((item) =>
                            item.label.includes(dayjs.tz.guess())
                          )[0] || selectedTimeZone
                        : selectedTimeZone
                    }
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
                          <Typography variant='body2' color={'#000'}>
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
                            autoComplete: 'new-password'
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
                                  }
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
                                          day.timeRange.startTime.split(':')[0]
                                        )
                                      )
                                      .set(
                                        'minute',
                                        parseInt(
                                          day.timeRange.startTime.split(':')[1]
                                        )
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
                                          day.timeRange.endTime.split(':')[0]
                                        )
                                      )
                                      .set(
                                        'minute',
                                        parseInt(
                                          day.timeRange.endTime.split(':')[1]
                                        )
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
                onClick: openAddCompany
              }}
              isCompanyDaysOffVisible={false}
              slotDayOff={
                <>
                  {daysOff.map((item, i) => {
                    return (
                      <DayOff
                        onClickRemove={{
                          onClick: () => removeDayOff(item.date)
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
                      horizontal: 'left'
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
                              toast.warning(`"${item}" keyword exist!`);
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
                    slotSuggestPill={freeKeyWords.map((item) => {
                      return (
                        <>
                          <Chip
                            clickable
                            onDelete={() => {
                              setFreeKeywords((pre) => {
                                return pre.filter((ele) => ele !== item);
                              });
                            }}
                            sx={{
                              p: '5px'
                            }}
                            deleteIcon={
                              <IconButton>
                                <Icon
                                  width='14'
                                  height='14'
                                  color='grey'
                                  variant='CloseThinIcon'
                                />
                              </IconButton>
                            }
                            label={item}
                          />
                        </>
                      );
                    })}
                  />
                  <KeywordCard
                    textTitle={'Soft conflicts'}
                    textWarning={
                      'If these keywords are detected in a calendar event title, any interviews that overlap with these events will be seen as a soft conflict and will be scheduled only on your confirmation'
                    }
                    slotInput={
                      <FilterInput
                        handleAdd={(s) => {
                          const keyword = String(s).split(',');
                          keyword.map((item) => {
                            if (freeKeyWords.includes(item)) {
                              toast.warning(`"${item}" keyword exist!`);
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
                    slotSuggestPill={softConflictsKeyWords.map((item) => {
                      return (
                        <>
                          <Chip
                            clickable
                            onDelete={() => {
                              setSoftConflictsKeyWords((pre) => {
                                return pre.filter((ele) => ele !== item);
                              });
                            }}
                            sx={{
                              p: '5px'
                            }}
                            deleteIcon={
                              <IconButton>
                                <Icon
                                  width='14'
                                  height='14'
                                  color='grey'
                                  variant='CloseThinIcon'
                                />
                              </IconButton>
                            }
                            label={item}
                          />
                        </>
                      );
                    })}
                  />
                </>
              }
            />
          )
        }
      />
    </Stack>
  );
}

export default InterviewerLevelSettings;
