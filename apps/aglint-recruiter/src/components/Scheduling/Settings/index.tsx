import {
  Autocomplete,
  Chip,
  Dialog,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { capitalize, cloneDeep } from 'lodash';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import timeZones from '@/src/utils/timeZone';
dayjs.extend(utc);
dayjs.extend(timezone);

import {
  DailyLimitType,
  holidayType,
  schedulingSettingType,
  WeeklyLimitType,
} from '@aglint/shared-types';
import { useRouter } from 'next/router';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { BodyWithSublink } from '@/devlink2/BodyWithSublink';
import { CompanyDayOff } from '@/devlink2/CompanyDayOff';
import { DayoffList } from '@/devlink2/DayoffList';
import { InterviewLoad } from '@/devlink2/InterviewLoad';
import { KeywordCard } from '@/devlink2/KeywordCard';
import { Keywords } from '@/devlink2/Keywords';
import { RcCheckbox } from '@/devlink2/RcCheckbox';
import { SublinkTab } from '@/devlink2/SublinkTab';
import { TextWithBg } from '@/devlink2/TextWithBg';
import { TimeRangeInput } from '@/devlink2/TimeRangeInput';
import { WorkingHourDay } from '@/devlink2/WorkingHourDay';
import { WorkingHours } from '@/devlink2/WorkingHours';
import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

import FilterInput from '../../CandidateDatabase/Search/FilterInput';
import { ShowCode } from '../../Common/ShowCode';
import UITextField from '../../Common/UITextField';
import ToggleBtn from '../../Common/UIToggle';
import { interviewLocationType } from '../../CompanyDetailComp/TeamManagement/AddMemberDialog';
import DateSelect from './Components/DateSelector';
import MuiNumberfield from './Components/MuiNumberfield';
import MuiSelect from './Components/MuiSelect';
import SelectTime from './Components/SelectTime';
import DebriefDefaults from './DebriefDefaults';
import SchedulerEmailTemps from './SchedulingEmailTemplates';
import SchedulingRegions from './SchedulingReason';
import { settingSubNavItem } from './SubNav/utils';
let schedulingSettingObj = {};
let changeValue = null;
type specificLocationType = 'all_locations' | 'specific_locations';

function SchedulingSettings({
  updateSettings,
  initialData,
  isOverflow = true,
}) {
  const { recruiter } = useAuthDetails();
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
  const [debriefDefaults, setDebriefDefaults] = useState<
    schedulingSettingType['debrief_defaults']
  >({
    hiring_manager: false,
    recruiter: false,
    recruiting_coordinator: false,
    sourcer: false,
    previous_interviewers: false,
  });
  const [daysOff, setDaysOff] = useState<holidayType[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [freeKeyWords, setFreeKeywords] = useState([]);
  const [softConflictsKeyWords, setSoftConflictsKeyWords] = useState([]);
  const [outOfOffice, setOutOfOffice] = useState<string[]>([]);
  const [recruitingBlocks, setRecruitingBlocks] = useState<string[]>([]);

  const [selectedTimeZone, setSelectedTimeZone] = useState<TimezoneObj>(null);
  const [isTimeZone, setIsTimeZone] = useState(true);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [specificLocationOn, setSpecificLocationOn] =
    useState<specificLocationType>('all_locations');

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
      pre.value = value as number;
      // pre.value = value.target.value as number;
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
      pre.value = value as number;
      // pre.value = value.target.value as number;
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

      setSelectedTimeZone({ ...schedulingSettingData.timeZone } as TimezoneObj);
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
      setOutOfOffice(
        schedulingSettingData?.schedulingKeyWords?.outOfOffice || [],
      );
      setRecruitingBlocks(
        schedulingSettingData?.schedulingKeyWords?.recruitingBlocks || [],
      );
      setSelectedHourBreak({
        start_time: schedulingSettingData.break_hour?.start_time,
        end_time: schedulingSettingData.break_hour?.end_time,
      });
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
        break_hour: {
          start_time: selectedHourBreak.start_time,
          end_time: selectedHourBreak.end_time,
        },
        debrief_defaults: debriefDefaults,
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
    outOfOffice,
    recruitingBlocks,
    isTimeZone,
    selectedHourBreak,
    debriefDefaults,
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
            <SettingsSubNabItem />
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
                        spacing={2}
                        marginTop={'var(--space-5)'}
                      >
                        <Stack direction={'column'}>
                          <Typography variant='body1medium'>
                            Default Break Times
                          </Typography>
                          <Typography variant='body1'>
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
                      handleChange={(e: any) => {
                        setIsTimeZone(e);
                        if (e) {
                          setSelectedTimeZone(
                            timeZones.filter((item) =>
                              item.label.includes(dayjs.tz.guess()),
                            )[0],
                          );
                        }
                      }}
                      isChecked={isTimeZone}
                    />
                  }
                />
              </ShowCode.When>
              <ShowCode.When
                isTrue={router.query.subtab == settingSubNavItem.DAYOFF}
              >
                <CompanyDayOff
                  slotAddButton={
                    <ButtonSolid
                      textButton='Add Day Off'
                      size={2}
                      iconName='add'
                      isLeftIcon
                      onClickButton={{
                        onClick: openAddCompany,
                      }}
                    />
                  }
                  slotDayoffList={
                    <>
                      {daysOff.sort(compareDates).map((item, i) => {
                        return (
                          <DayoffList
                            key={i}
                            slotTextWithBg={
                              item?.locations ? (
                                item.locations.map((location, index) => {
                                  return (
                                    <TextWithBg key={index} text={location} />
                                  );
                                })
                              ) : (
                                <Typography
                                  px={'var(--space-2)'}
                                  variant='caption'
                                  fontSize={'14px'}
                                >
                                  All locations
                                </Typography>
                              )
                            }
                            textDate={item.date}
                            textDayoff={item.event_name}
                            onClickDelete={{
                              onClick: () => removeDayOff(item.date),
                            }}
                          />
                        );
                      })}
                      <Dialog
                        open={open}
                        onClose={() => {
                          // resetState();
                          close();
                        }}
                      >
                        <ConfirmationPopup
                          isIcon={false}
                          textPopupTitle='Add Holiday'
                          textPopupDescription={
                            <Stack gap={1}>
                              {/* <Typography variant='body1'>Day off</Typography> */}
                              <Stack direction={'row'}>
                                <Typography>Day off</Typography>
                                <Typography
                                  sx={{ color: 'var(--error-9)', pl: 0.5 }}
                                >
                                  *
                                </Typography>
                              </Stack>
                              <Stack>
                                <UITextField
                                  placeholder='Enter the name of the holiday'
                                  fullWidth
                                  ref={eventRef}
                                />
                              </Stack>
                              {/* <Typography variant='body1'>Date</Typography> */}
                              <Stack direction={'row'}>
                                <Typography>Date</Typography>
                                <Typography
                                  sx={{ color: 'var(--error-9)', pl: 0.5 }}
                                >
                                  *
                                </Typography>
                              </Stack>
                              <DateSelect
                                selectedDates={daysOff}
                                dateRef={dateRef}
                                getDate={getDate}
                              />

                              <Typography variant='body1'>Location</Typography>
                              <Stack
                                fontSize={'12px'}
                                direction={'row'}
                                spacing={'var(--space-2)'}
                              >
                                <FormControl>
                                  <RadioGroup
                                    row
                                    aria-labelledby='demo-row-radio-buttons-group-label'
                                    name='row-radio-buttons-group'
                                  >
                                    {[
                                      'all_locations',
                                      'specific_locations',
                                    ].map((ele, i) => {
                                      return (
                                        <FormControlLabel
                                          checked={specificLocationOn === ele}
                                          key={i}
                                          onChange={(e: any) => {
                                            setSpecificLocationOn(
                                              e.target.value,
                                            );
                                          }}
                                          sx={{
                                            marginLeft: '0px',
                                            '& .MuiRadio-root': {
                                              marginRight: 'var(--space-1)',
                                            },
                                          }}
                                          value={ele}
                                          control={<Radio />}
                                          label={capitalize(
                                            ele.replaceAll('_', ' '),
                                          )}
                                        />
                                      );
                                    })}
                                  </RadioGroup>
                                </FormControl>
                              </Stack>

                              <ShowCode>
                                <ShowCode.When
                                  isTrue={
                                    specificLocationOn === 'specific_locations'
                                  }
                                >
                                  <Typography variant='body1'>
                                    Pick locations
                                  </Typography>

                                  <Autocomplete
                                    multiple
                                    fullWidth
                                    onChange={(_, value) => {
                                      setSelectedLocations(value);
                                    }}
                                    options={recruiter?.office_locations.map(
                                      (item: interviewLocationType) => {
                                        return `${item.city}, ${item.region}, ${item.country}`;
                                      },
                                    )}
                                    renderInput={(params) => (
                                      <TextField
                                        placeholder='Select Locations'
                                        {...params}
                                      />
                                    )}
                                  />
                                </ShowCode.When>
                              </ShowCode>
                            </Stack>
                          }
                          isGreyButtonVisible={true}
                          textPopupButton='Add'
                          onClickCancel={{
                            onClick: handleClose,
                          }}
                          onClickAction={{
                            onClick: () => {
                              if (!eventRef.current.value) {
                                toast.message('Please enter event name.');
                                return;
                              }
                              if (!selectedDate) {
                                toast.message('Please select a date.');
                                return;
                              }
                              if (
                                specificLocationOn === 'specific_locations' &&
                                selectedLocations.length === 0
                              ) {
                                toast.message('Please select a locations.');
                                return;
                              }
                              setDaysOff(
                                (pre) =>
                                  [
                                    ...pre,
                                    {
                                      date: selectedDate,
                                      event_name: eventRef.current.value,
                                      locations:
                                        specificLocationOn ===
                                        'specific_locations'
                                          ? selectedLocations
                                          : recruiter?.office_locations.map(
                                              (item: interviewLocationType) =>
                                                `${item.city}, ${item.region}, ${item.country}`,
                                            ),
                                    },
                                  ] as holidayType[],
                              );
                              handleClose();
                              toast.success(
                                `Holiday added on ${dayjs(selectedDate).format(
                                  'DD-MMM-YYYY',
                                )} ${
                                  eventRef.current.value ? 'for' : ''
                                } ${eventRef.current.value}`,
                              );
                            },
                          }}
                        />
                      </Dialog>
                    </>
                  }
                />
              </ShowCode.When>
              <ShowCode.When
                isTrue={router.query.subtab == settingSubNavItem.INTERVIEWLOAD}
              >
                <InterviewLoad
                  slotDailyLimit={
                    <>
                      <MuiNumberfield
                        handleSelect={handleSelectDailyValue}
                        value={selectedDailyLimit.value}
                        max={50}
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
                      <MuiNumberfield
                        handleSelect={handleSelectWeeklyValue}
                        value={selectedWeeklyLimit.value}
                        max={50}
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
                              deleteIcon={
                                <Stack>
                                  <GlobalIcon iconName='close' size='4' />
                                </Stack>
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
                                toast.warning(`"${item}" keyword exists.`);
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
                              deleteIcon={
                                <Stack>
                                  <GlobalIcon iconName='close' size='4' />
                                </Stack>
                              }
                              label={item}
                            />
                          </>
                        );
                      })}
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
                      slotSuggestPill={outOfOffice.map((item) => {
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
                                <Stack>
                                  <GlobalIcon iconName='close' size='4' />
                                </Stack>
                              }
                              label={item}
                            />
                          </>
                        );
                      })}
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
                      slotSuggestPill={recruitingBlocks.map((item) => {
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
                                <Stack>
                                  <GlobalIcon iconName='close' size='4' />
                                </Stack>
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
              <SchedulerEmailTemps />
            </ShowCode.When>
            <ShowCode.When
              isTrue={router.query.subtab == settingSubNavItem.REASONS}
            >
              <SchedulingRegions />
            </ShowCode.When>
            <ShowCode.When
              isTrue={router.query.subtab == settingSubNavItem.DEBRIEFDEFAULTS}
            >
              <DebriefDefaults
                value={debriefDefaults}
                setValue={setDebriefDefaults}
              />
            </ShowCode.When>
          </>
        }
      />
    </Stack>
  );
}

export default SchedulingSettings;

type TZ = (typeof timeZones)[number];

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
              placeholder='Ex. America/Los_Angeles (GMT-08:00)'
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
  { label: 'Scheduling Reasons', value: 'reasons' },
  { label: 'Debrief Defaults', value: 'debriefDefaults' },
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
                  `${ROUTES['/scheduling']()}?tab=settings&subtab=${item.value}`,
                );
              },
            }}
          />
        );
      })}
    </>
  );
}
