import {
  holidayType,
  InterviewLoadType,
  schedulingSettingType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  Alert,
  Autocomplete,
  Chip,
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { capitalize, cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import { DayOff } from '@/devlink2/DayOff';
import { KeywordCard } from '@/devlink2/KeywordCard';
import { Keywords } from '@/devlink2/Keywords';
import { RcCheckbox } from '@/devlink2/RcCheckbox';
import { ScheduleSettings } from '@/devlink2/ScheduleSettings';
import { TimeRangeInput } from '@/devlink2/TimeRangeInput';
import { WorkingHourDay } from '@/devlink2/WorkingHourDay';
import FilterInput from '@/src/components/CandidateDatabase/Search/FilterInput';
import UITextField from '@/src/components/Common/UITextField';
import { LoadMax } from '@/src/components/CompanyDetailComp/SettingsSchedule';
import DateSelect from '@/src/components/CompanyDetailComp/SettingsSchedule/Components/DateSelector';
import MuiNumberfield from '@/src/components/CompanyDetailComp/SettingsSchedule/Components/MuiNumberfield';
import SelectTime from '@/src/components/CompanyDetailComp/SettingsSchedule/Components/SelectTime';
import timeZones from '@/src/utils/timeZone';
import toast from '@/src/utils/toast';

import { useImrQuery } from '../hooks';
import { RolesPill } from '@/devlink/RolesPill';

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
  const [interviewLoad, setInterviewLoad] = useState<InterviewLoadType>({
    daily: {
      type: 'Hours',
      value: 20,
      max: LoadMax.dailyHours,
    },
    weekly: {
      type: 'Hours',
      value: 10,
      max: LoadMax.weeklyHours,
    },
  });

  function loadChangeHandle(value, module, type) {
    if (type === 'type') {
      setInterviewLoad(
        (prevState) =>
          ({
            ...prevState,
            [module]: {
              // eslint-disable-next-line security/detect-object-injection
              ...prevState[module],
              [type]: value,
              value:
                module === 'weekly'
                  ? value === 'Hours'
                    ? // eslint-disable-next-line security/detect-object-injection
                      prevState[module].value > LoadMax.weeklyHours
                      ? LoadMax.weeklyHours
                      : // eslint-disable-next-line security/detect-object-injection
                        prevState[module].value
                    : // eslint-disable-next-line security/detect-object-injection
                      prevState[module].value
                  : value === 'Interviews'
                    ? // eslint-disable-next-line security/detect-object-injection
                      prevState[module].value
                    : // eslint-disable-next-line security/detect-object-injection
                      prevState[module].value > LoadMax.dailyHours
                      ? LoadMax.dailyHours
                      : // eslint-disable-next-line security/detect-object-injection
                        prevState[module].value,
              max:
                module === 'weekly'
                  ? value === 'Hours'
                    ? LoadMax.weeklyHours
                    : LoadMax.weeklyInterviews
                  : value === 'Interviews'
                    ? LoadMax.dailyInterviews
                    : LoadMax.dailyHours,
            },
          }) as InterviewLoadType,
      );
    } else {
      setInterviewLoad((prevState) => ({
        ...prevState,
        [module]: {
          // eslint-disable-next-line security/detect-object-injection
          ...prevState[module],
          [type]: value,
        },
      }));
    }
  }

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
    const selectedDate = dayjsLocal(e).format('DD MMM YYYY');
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
      //   console.log('local timeZones', dayjsLocal.tz.guess());

      setSelectedTimeZone({ ...schedulingSettingData.timeZone });
      setIsTimeZone(schedulingSettingData.isAutomaticTimezone);

      setInterviewLoad({
        daily: {
          type: schedulingSettingData.interviewLoad.dailyLimit.type,
          value: schedulingSettingData.interviewLoad.dailyLimit.value,
          max:
            schedulingSettingData.interviewLoad.dailyLimit.type === 'Hours'
              ? LoadMax.dailyHours
              : LoadMax.dailyInterviews,
        },
        weekly: {
          type: schedulingSettingData.interviewLoad.weeklyLimit.type,
          value: schedulingSettingData.interviewLoad.weeklyLimit.value,
          max:
            schedulingSettingData.interviewLoad.dailyLimit.type === 'Hours'
              ? LoadMax.weeklyHours
              : LoadMax.weeklyInterviews,
        },
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
            type: interviewLoad.daily.type,
            value: interviewLoad.daily.value,
          },
          weeklyLimit: {
            type: interviewLoad.weekly.type,
            value: interviewLoad.weekly.value,
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
    interviewLoad,
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
              <Stack spacing={3}>
                <MuiNumberfield
                  handleSelect={(e) => loadChangeHandle(e, 'daily', 'value')}
                  value={interviewLoad.daily.value}
                  max={interviewLoad.daily.max}
                />
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                >
                  {['Hours', 'Interviews'].map((ele, i) => {
                    return (
                      <FormControlLabel
                        checked={interviewLoad.daily.type === ele}
                        key={i}
                        onChange={(e: any) => {
                          loadChangeHandle(e.target.value, 'daily', 'type');
                        }}
                        sx={{
                          marginLeft: '0px',
                          '& .MuiRadio-root': {
                            marginRight: 'var(--space-1)',
                          },
                        }}
                        value={ele}
                        control={<Radio />}
                        label={capitalize(ele.replaceAll('_', ' '))}
                      />
                    );
                  })}
                </RadioGroup>
              </Stack>
            </>
          }
          slotWeeklyLimit={
            <>
              <Stack spacing={3}>
                <MuiNumberfield
                  handleSelect={(e) => loadChangeHandle(e, 'weekly', 'value')}
                  value={interviewLoad.weekly.value}
                  max={interviewLoad.weekly.max}
                />
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                >
                  {['Hours', 'Interviews'].map((ele, i) => {
                    return (
                      <FormControlLabel
                        checked={interviewLoad.weekly.type === ele}
                        key={i}
                        onChange={(e: any) => {
                          loadChangeHandle(e.target.value, 'weekly', 'type');
                        }}
                        sx={{
                          marginLeft: '0px',
                          '& .MuiRadio-root': {
                            marginRight: 'var(--space-1)',
                          },
                        }}
                        value={ele}
                        control={<Radio />}
                        label={capitalize(ele.replaceAll('_', ' '))}
                      />
                    );
                  })}
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
                          return (
                            <Chip
                              key={item}
                              sx={{ opacity: 0.7 }}
                              label={item}
                            />
                          );
                        } else {
                          return (
                            <RolesPill
                              key={item}
                              textRoles={item}
                              onClickRemoveRoles={{
                                onClick: () => {
                                  setFreeKeywords((prev) =>
                                    prev.filter((ele) => ele !== item),
                                  );
                                },
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
                          return (
                            <Chip
                              key={item}
                              label={item}
                              sx={{ opacity: 0.7 }}
                            />
                          );
                        } else {
                          return (
                            <RolesPill
                              key={item}
                              textRoles={item}
                              onClickRemoveRoles={{
                                onClick: () => {
                                  setSoftConflictsKeyWords((prev) =>
                                    prev.filter((ele) => ele !== item),
                                  );
                                },
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
                      {outOfOffice.map((item) => {
                        if (companyKeywords.outOfOffice.includes(item)) {
                          return (
                            <Chip
                              key={item}
                              label={item}
                              sx={{ opacity: 0.7 }}
                            />
                          );
                        } else {
                          return (
                            <RolesPill
                              key={item}
                              textRoles={item}
                              onClickRemoveRoles={{
                                onClick: () => {
                                  setOutOfOffice((prev) =>
                                    prev.filter((ele) => ele !== item),
                                  );
                                },
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
                          return (
                            <Chip
                              key={item}
                              label={item}
                              sx={{ opacity: 0.7 }}
                            />
                          );
                        } else {
                          return (
                            <RolesPill
                              key={item}
                              textRoles={item}
                              onClickRemoveRoles={{
                                onClick: () => {
                                  setRecruitingBlocks((prev) =>
                                    prev.filter((ele) => ele !== item),
                                  );
                                },
                              }}
                            />
                          );
                        }
                      })}

                      {/* {recruitingBlocks.map((item) => (
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
                      ))} */}
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
