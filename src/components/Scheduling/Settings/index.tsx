import { Autocomplete, Popover, Stack, Typography } from '@mui/material';
import timeZones from '@utils/timeZone.json';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { capitalize, cloneDeep } from 'lodash';
import { MouseEvent, useEffect, useRef, useState } from 'react';
dayjs.extend(utc);
dayjs.extend(timezone);

import {
  DayOff,
  RcCheckbox,
  ScheduleSettings,
  TimeRangeInput,
  WorkingHourDay,
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { SocialsType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';

import DateSelect from './Components/DateSelector';
import MuiSelect from './Components/MuiSelect';
import SelectTime from './Components/SelectTime';
import {
  DailyLimitType,
  schedulingSettingType,
  WeeklyLimitType,
} from './types';
import { hoursList } from './utils';
import UITextField from '../../Common/UITextField';

function SchedulingSettings() {
  const { recruiter, setRecruiter } = useAuthDetails();

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
  const [reload, setReload] = useState(false);

  const [workingHours, setWorkingHours] = useState([]);
  const [daysOff, setDaysOff] = useState([]);

  const [selectedTimeZone, setSelectedTimeZone] = useState(null);

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
      data[Number(i)].timeRange.startTime =
        `${dayjs(value).hour()}:${dayjs(value).minute()}`;
      return [...data];
    });
  };

  const selectEndTime = (value: any, i: number) => {
    setWorkingHours((pre) => {
      const data = pre;
      data[Number(i)].timeRange.endTime =
        `${dayjs(value).hour()}:${dayjs(value).minute()}`;
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
    setDaysOff((pre) => [...pre, selectedDate]);
    handleClose();
    dateRef.current.value = String(new Date(e.$d));
  }

  function removeDayOff(value: string) {
    setDaysOff((pre) => {
      const filtered = pre.filter((item) => item !== value);
      return [...filtered];
    });
  }

  // console.table({ selectedWeeklyLimit, selectedDailyLimit });
  // console.table(
  //   workingHours.map((item) => {
  //     return {
  //       day: item.day,
  //       isDayOff: item.isDayOff,
  //       start: item.timeRange.startTime,
  //       end: item.timeRange.endTime,
  //     };
  //   }),
  // );

  function discard() {
    if (recruiter) {
      const schedulingSettingData = cloneDeep(
        recruiter?.scheduling_settings,
      ) as schedulingSettingType;

      const workingHoursCopy = cloneDeep(schedulingSettingData.workingHours);
      // eslint-disable-next-line no-console
      console.log('local timeZones', dayjs.tz.guess());

      setSelectedTimeZone({ ...schedulingSettingData.timeZone });
      setSelectedDailyLimit({
        ...schedulingSettingData.interviewLoad.dailyLimit,
      });
      setSelectedWeeklyLimit({
        ...schedulingSettingData.interviewLoad.weeklyLimit,
      });
      setWorkingHours(workingHoursCopy);
      setDaysOff([...schedulingSettingData.totalDaysOff]);
    }
  }

  useEffect(() => {
    setReload(false);
  }, [workingHours]);

  useEffect(() => {
    discard();
  }, [recruiter]);

  async function updateSettings() {
    const data = {
      interviewLoad: {
        dailyLimit: selectedDailyLimit,
        weeklyLimit: selectedWeeklyLimit,
      },
      timeZone: selectedTimeZone,
      workingHours: workingHours,
      totalDaysOff: daysOff,
    } as schedulingSettingType;
    const { data: updatedRecruiter, error } = await supabase
      .from('recruiter')
      .update({ scheduling_settings: data })
      .eq('id', recruiter.id)
      .select()
      .single();
    if (!error) {
      setRecruiter(
        {
          ...updatedRecruiter,
          socials: updatedRecruiter?.socials as unknown as SocialsType,
        }!,
      );
    }
  }
  return (
    <>
      <ScheduleSettings
        onClickUpdateChanges={{
          onClick: updateSettings,
        }}
        onClickDiscard={{
          onClick: () => {
            setReload(true);
            discard();
          },
        }}
        isTimeZoneToggleVisible={false}
        // slotTimeZoneToggle={
        //   <ToggleBtn isActive={isTimeZone} handleCheck={handleCheck} />
        // }
        slotTimeZoneInput={
          <Stack width={320}>
            <Autocomplete
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
                      autoComplete: 'new-password',
                    }}
                  />
                );
              }}
            />
          </Stack>
        }
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
                                data[Number(i)].isDayOff =
                                  !data[Number(i)].isDayOff;

                                return [...data];
                              });
                            },
                          }}
                          isChecked={day.isDayOff}
                          text={capitalize(day.day)}
                        />
                      }
                      slotTimeRageInput={
                        !reload && (
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
                        )
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
        slotDayOff={
          <>
            {daysOff.map((item, i) => {
              return (
                <DayOff
                  onClickRemove={{
                    onClick: () => removeDayOff(item),
                  }}
                  key={i}
                  textDate={item}
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
              <DateSelect dateRef={dateRef} getDate={getDate} />
            </Popover>
          </>
        }
      />
    </>
  );
}

export default SchedulingSettings;
