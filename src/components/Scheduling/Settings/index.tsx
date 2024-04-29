import {
  Autocomplete,
  Chip,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import timeZones from '@utils/timeZone.json';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { capitalize, cloneDeep } from 'lodash';
import { MouseEvent, useEffect, useRef, useState } from 'react';
dayjs.extend(utc);
dayjs.extend(timezone);

import { useRouter } from 'next/router';

import {
  BodyWithSublink,
  CompanyDayOff,
  DayOff,
  InterviewLoad,
  KeywordCard,
  Keywords,
  RcCheckbox,
  SublinkTab,
  TimeRangeInput,
  WorkingHourDay,
  WorkingHours,
} from '@/devlink2';
import { ConfirmationPopup } from '@/devlink3';
import {
  DailyLimitType,
  holidayType,
  schedulingSettingType,
  WeeklyLimitType,
} from '@/src/types/scheduleTypes/scheduleSetting';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

import FilterInput from '../../CandidateDatabase/Search/FilterInput';
import Icon from '../../Common/Icons/Icon';
import { ShowCode } from '../../Common/ShowCode';
import UITextField from '../../Common/UITextField';
import SchedulingEmailTemplates from '../SchedulingEmailTemplates';
import { settingSubNavItem } from '../SubNav/utils';
import DateSelect from './Components/DateSelector';
import MuiSelect from './Components/MuiSelect';
import SelectTime from './Components/SelectTime';
import ToggleBtn from './Components/ToggleBtn';
import { hoursList } from './utils';
let schedulingSettingObj = {};
let changeValue = null;

function SchedulingSettings({
  updateSettings,
  initialData,
  isOverflow = true,
}) {
  const eventRef = useRef<HTMLInputElement>(null);
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
  const [selectedDate, setSelectedDate] = useState('');
  const [freeKeyWords, setFreeKeywords] = useState([]);
  const [softConflictsKeyWords, setSoftConflictsKeyWords] = useState([]);

  const [selectedTimeZone, setSelectedTimeZone] = useState<TimezoneObj>(null);
  const [isTimeZone, setIsTimeZone] = useState(true);

  const [selectedHourBreak, setSelectedHourBreak] = useState<{
    start_time: string;
    end_time: string;
  } | null>({ start_time: '', end_time: '' });

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
    setSelectedDate('');
  };
  const open = Boolean(anchorEl);

  function getDate(e: any) {
    setSelectedDate(dayjs(e).format('DD MMM YYYY'));
    // dateRef.current.value = String(new Date(e.$d));
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
      console.log('local timeZones', dayjs.tz.guess());

      setSelectedTimeZone({ ...schedulingSettingData.timeZone });
      setIsTimeZone(schedulingSettingData.isAutomaticTimezone);
      setSelectedDailyLimit({
        ...schedulingSettingData.interviewLoad.dailyLimit,
      });
      setSelectedWeeklyLimit({
        ...schedulingSettingData.interviewLoad.weeklyLimit,
      });
      setWorkingHours(workingHoursCopy);
      setDaysOff([...schedulingSettingData.totalDaysOff] as holidayType[]);
      setFreeKeywords(schedulingSettingData?.schedulingKeyWords?.free || []);
      setSoftConflictsKeyWords(
        schedulingSettingData?.schedulingKeyWords?.SoftConflicts || [],
      );
      setSelectedHourBreak({
        start_time: schedulingSettingData.break_hour?.start_time,
        end_time: schedulingSettingData.break_hour?.end_time,
      });
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
        },
        isAutomaticTimezone: isTimeZone,
        break_hour: {
          start_time: selectedHourBreak.start_time,
          end_time: selectedHourBreak.end_time,
        },
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
    softConflictsKeyWords,
    isTimeZone,
    selectedHourBreak,
  ]);

  useEffect(() => {
    initialLoad();

    return () => {
      changeValue = null;
    };
  }, []);

  const router = useRouter();

  const compareDates = (a: holidayType, b: holidayType) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return Number(dateA) - Number(dateB);
  };

  return (
    <Stack overflow={isOverflow ? 'auto' : 'visible'}>
      <BodyWithSublink
        slotSublinkTab={
          <>
            <SettingsSubNabItem />;
          </>
        }
        slotTabContent={
          <>
            <ShowCode>
              <ShowCode.When
                isTrue={router.query.subtab == settingSubNavItem.WORKINGHOURS}
              >
                <WorkingHours
                  slotTimeZoneInput={
                    <TimezoneSelector
                      disabled={isTimeZone}
                      value={selectedTimeZone}
                      setValue={setSelectedTimeZone}
                    />
                  }
                  // slotTimeZoneToggle={}
                  slotWorkingHourDay={
                    <Stack direction={'column'} paddingBottom={'50px'}>
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
                                        disable={!day.isWorkDay}
                                        value={dayjs()
                                          .set(
                                            'hour',
                                            parseInt(
                                              day.timeRange.startTime.split(
                                                ':',
                                              )[0],
                                            ),
                                          )
                                          .set(
                                            'minute',
                                            parseInt(
                                              day.timeRange.startTime.split(
                                                ':',
                                              )[1],
                                            ),
                                          )}
                                        onSelect={selectStartTime}
                                        i={i}
                                      />
                                    }
                                    slotEndTimeInput={
                                      <SelectTime
                                        disable={!day.isWorkDay}
                                        value={dayjs()
                                          .set(
                                            'hour',
                                            parseInt(
                                              day.timeRange.endTime.split(
                                                ':',
                                              )[0],
                                            ),
                                          )
                                          .set(
                                            'minute',
                                            parseInt(
                                              day.timeRange.endTime.split(
                                                ':',
                                              )[1],
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

                      <Stack
                        direction={'column'}
                        spacing={1}
                        marginTop={'20px'}
                      >
                        <Stack direction={'column'} spacing={0.5}>
                          <Typography variant='body1' fontSize={'15px'}>
                            Default Break Times
                          </Typography>
                          <Typography variant='body2'>
                            Define standard break times for the company.
                          </Typography>
                        </Stack>
                        <Stack spacing={1} direction={'column'}>
                          <Stack
                            direction={'row'}
                            alignItems={'center'}
                            spacing={1}
                          >
                            <Typography width={120} fontSize={'14px'}>
                              Break Start Time
                            </Typography>

                            {selectedHourBreak?.start_time &&
                              workingHours[1]?.timeRange?.startTime && (
                                <SelectTime
                                  minTime={dayjs()
                                    .set(
                                      'hour',
                                      parseInt(
                                        workingHours[1]?.timeRange?.startTime.split(
                                          ':',
                                        )[0],
                                      ),
                                    )
                                    .set(
                                      'minute',
                                      parseInt(
                                        workingHours[1]?.timeRange?.startTime.split(
                                          ':',
                                        )[1],
                                      ),
                                    )}
                                  maxTime={dayjs()
                                    .set(
                                      'hour',
                                      parseInt(
                                        workingHours[1]?.timeRange?.endTime.split(
                                          ':',
                                        )[0],
                                      ),
                                    )
                                    .set(
                                      'minute',
                                      parseInt(
                                        workingHours[1]?.timeRange?.endTime.split(
                                          ':',
                                        )[1],
                                      ),
                                    )}
                                  disableIgnoringDatePartForTimeValidation={
                                    true
                                  }
                                  value={dayjs()
                                    .set(
                                      'hour',
                                      parseInt(
                                        selectedHourBreak?.start_time?.split(
                                          ':',
                                        )[0],
                                      ),
                                    )
                                    .set(
                                      'minute',
                                      parseInt(
                                        selectedHourBreak?.start_time?.split(
                                          ':',
                                        )[1],
                                      ),
                                    )}
                                  onSelect={(e) => {
                                    setSelectedHourBreak((pre) => {
                                      pre.start_time = `${dayjs(e).format(
                                        'HH:mm',
                                      )}`;
                                      return { ...pre };
                                    });
                                  }}
                                  key={0}
                                />
                              )}
                          </Stack>
                          <Stack
                            spacing={1}
                            direction={'row'}
                            alignItems={'center'}
                          >
                            <Typography width={120} fontSize={'14px'}>
                              Break End Time
                            </Typography>

                            {workingHours[1]?.timeRange?.endTime &&
                              selectedHourBreak?.end_time && (
                                <SelectTime
                                  minTime={dayjs()
                                    .set(
                                      'hour',
                                      parseInt(
                                        workingHours[1]?.timeRange?.startTime.split(
                                          ':',
                                        )[0],
                                      ),
                                    )
                                    .set(
                                      'minute',
                                      parseInt(
                                        workingHours[1]?.timeRange?.startTime.split(
                                          ':',
                                        )[1],
                                      ),
                                    )}
                                  maxTime={dayjs()
                                    .set(
                                      'hour',
                                      parseInt(
                                        workingHours[1]?.timeRange?.endTime.split(
                                          ':',
                                        )[0],
                                      ),
                                    )
                                    .set(
                                      'minute',
                                      parseInt(
                                        workingHours[1]?.timeRange?.endTime.split(
                                          ':',
                                        )[1],
                                      ),
                                    )}
                                  disableIgnoringDatePartForTimeValidation={
                                    true
                                  }
                                  value={dayjs()
                                    .set(
                                      'hour',
                                      parseInt(
                                        selectedHourBreak?.end_time?.split(
                                          ':',
                                        )[0],
                                      ),
                                    )
                                    .set(
                                      'minute',
                                      parseInt(
                                        selectedHourBreak?.end_time?.split(
                                          ':',
                                        )[1],
                                      ),
                                    )}
                                  onSelect={(e) => {
                                    setSelectedHourBreak((pre) => {
                                      pre.end_time = `${dayjs(e).format(
                                        'HH:mm',
                                      )}`;
                                      return { ...pre };
                                    });
                                  }}
                                  key={0}
                                />
                              )}
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  }
                  slotTimeZoneToggle={
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
                  }
                />
              </ShowCode.When>
              <ShowCode.When
                isTrue={router.query.subtab == settingSubNavItem.DAYOFF}
              >
                <CompanyDayOff
                  slotDayOff={
                    <>
                      {daysOff.sort(compareDates).map((item, i) => {
                        return (
                          <DayOff
                            isEditVisible={false}
                            onClickRemove={{
                              onClick: () => removeDayOff(item.date),
                            }}
                            key={i}
                            textDate={item.date}
                            textDaysOffName={item.event_name}
                          />
                        );
                      })}
                      <Dialog
                        sx={{
                          '& .MuiDialog-paper': {
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '10px',
                          },
                        }}
                        open={open}
                        onClose={() => {
                          // resetState();
                          close();
                        }}
                      >
                        <ConfirmationPopup
                          isIcon={false}
                          textPopupTitle='Add holiday'
                          textPopupDescription={
                            <Stack gap={1}>
                              <Typography variant='body2'>Date</Typography>
                              <DateSelect
                                selectedDates={daysOff}
                                dateRef={dateRef}
                                getDate={getDate}
                              />
                              <Typography variant='body2'>Specialty</Typography>
                              <Stack>
                                <UITextField
                                  placeholder='Enter specialty'
                                  fullWidth
                                  ref={eventRef}
                                />
                              </Stack>
                            </Stack>
                          }
                          isGreyButtonVisible={false}
                          textPopupButton='Add'
                          onClickCancel={{
                            onClick: handleClose,
                          }}
                          onClickAction={{
                            onClick: () => {
                              if (selectedDate) {
                                setDaysOff(
                                  (pre) =>
                                    [
                                      ...pre,
                                      {
                                        date: selectedDate,
                                        event_name: eventRef.current.value,
                                      },
                                    ] as holidayType[],
                                );
                                handleClose();
                                toast.success(
                                  `Holiday added on ${dayjs(
                                    dateRef.current.value,
                                  ).format('DD-MMM-YYYY')} ${
                                    eventRef.current.value ? 'for' : ''
                                  } ${eventRef.current.value}`,
                                );
                              } else {
                                toast.message('Please select a date');
                              }
                            },
                          }}
                        />
                      </Dialog>
                    </>
                  }
                  onClickAddDate={{
                    onClick: openAddCompany,
                  }}
                />
              </ShowCode.When>
              <ShowCode.When
                isTrue={router.query.subtab == settingSubNavItem.INTERVIEWLOAD}
              >
                <InterviewLoad
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
                />
              </ShowCode.When>
            </ShowCode>
            <ShowCode.When
              isTrue={router.query.subtab == settingSubNavItem.KEYWORDS}
            >
              <Keywords
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
                                p: '5px',
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
                                toast.warning(`"${item}" keyword exist!`);
                                return null;
                              } else {
                                setSoftConflictsKeyWords((pre) => [
                                  item,
                                  ...pre,
                                ]);
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
                                p: '5px',
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
            </ShowCode.When>
            <ShowCode.When
              isTrue={router.query.subtab == settingSubNavItem.EMAILTEMPLATE}
            >
              <SchedulingEmailTemplates />
            </ShowCode.When>
          </>
        }
      />
    </Stack>
  );
}

export default SchedulingSettings;

export type TimezoneObj = {
  label: string;
  tzCode: string;
  name: string;
  utc: string;
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
    <Stack spacing={'10px'} width={420}>
      <Autocomplete
        disabled={disabled}
        disableClearable
        options={timeZones}
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
  );
};

const settingsItems = [
  { label: 'Interview Load', value: 'interviewLoad' },
  { label: 'Working Hours', value: 'workingHours' },
  { label: 'Company Day Off', value: 'dayOff' },
  { label: 'Keywords', value: 'keywords' },
  { label: 'Email Template', value: 'emailTemplate' },
];

function SettingsSubNabItem() {
  const router = useRouter();

  return (
    <>
      {settingsItems.map((item, i) => {
        return (
          <SublinkTab
            key={i}
            text={item.label}
            isActtive={router.query.subtab === item.value}
            onClickTab={{
              onClick: (e: any) => {
                e.stopPropagation();
                router.push(
                  `${pageRoutes.SCHEDULING}?tab=settings&subtab=${item.value}`,
                );
              },
            }}
          />
        );
      })}
    </>
  );
}
