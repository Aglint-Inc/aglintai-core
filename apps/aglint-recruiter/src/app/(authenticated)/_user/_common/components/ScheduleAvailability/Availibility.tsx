import { schedulingSettingType } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  Drawer,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@mui/material';
import { capitalize, cloneDeep, debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export const LoadMax = {
  dailyHours: 8,
  dailyInterviews: 10,
  weeklyHours: 40,
  weeklyInterviews: 50,
};



import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { updateMember } from '@/context/AuthContext/utils';
// import InterviewerLevelSettings from '../InterviewerLevelSettings';
import { InterviewLoadCard } from './components/InterviewLoadCard';
import { InterviewLoadDetails } from './components/InterviewLoadDetails';
import { ScheduleSettings } from './components/ScheduleSettings';
import { SideDrawerLarge } from './components/SideDrawerLarge';
import { TimeRangeInput } from './components/TimeRangeInput';
import { WorkingDaysList } from './components/WorkingDaysList';
import { WorkingHourDay } from './components/WorkingHourDay';
import { WorkingHourDetails } from './components/WorkingHourDetails';
import { RcCheckbox } from './components/RcCheckBox';
import { getShortTimeZone } from '@aglint/shared-utils';

type interviewLoadType = {
  type: 'Hours' | 'Interviews';
  value: number;
  max: number;
};
let schedulingSettingObj = {};
function Availibility({
  updateSettings,
  interviewerDetails,
  totalHoursThisWeek,
  totalHoursToday,
  totalInterviewsThisWeek,
  interviewerDetailsRefetch,
  totalInterviewsToday,
}) {
  const [workingHours, setWorkingHours] = useState([]);

  const [selectedTimeZone, setSelectedTimeZone] = useState(null);
  const [isTimeZone, setIsTimeZone] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { recruiter } = useAuthDetails();
  const [isHover, setIsHover] = useState(false);

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

  const [editDrawer, setEditDrawer] = useState(false);

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
  const schedulingSettingData = cloneDeep(
    interviewerDetails.scheduling_settings,
  ) as schedulingSettingType;

  function initialLoad() {
    if (schedulingSettingData) {
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

      setWorkingHours(workingHoursCopy);
    }
  }

  const updateHandle = async () => {
    try {
      setIsSaving(true);
      schedulingSettingObj = {
        ...schedulingSettingData,
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

        isAutomaticTimezone: isTimeZone,
      } as schedulingSettingType;
      await updateSettings(schedulingSettingObj);

      interviewerDetailsRefetch();
    } catch (e) {
      //   console.log(e);
    } finally {
      setIsSaving(false);
      setEditDrawer(false);
    }
  };

  useEffect(() => {
    initialLoad();
  }, []);

  return (
    <Stack
      overflow={'hidden'}
      padding={2}
      spacing={2}
      bgcolor={'white'}
      width={'900px'}
      gap={1}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Stack bgcolor={'white'}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          spacing={1}
        >
          <p>
            Time Zone
          </p>
          <Stack width={'47px'} height={'32px'}>
            {isHover && (
              <button
                className="px-4 py-2 text-neutral-700 bg-neutral-200 rounded"
                onClick={() => setEditDrawer(true)}
              >
                Edit
              </button>
            )}
          </Stack>
        </Stack>
        <Typography>{selectedTimeZone?.label}</Typography>
      </Stack>
      <InterviewLoadDetails

        slotInterviewLoadCard={
          <>
            <InterviewLoadCard
              textHeading='Today'
              textLabel={
                interviewerDetails?.scheduling_settings?.interviewLoad
                  ?.dailyLimit.type === 'Interviews'
                  ? 'Interview'
                  : 'Hour'
              }
              textInterviewCounts={
                interviewerDetails?.scheduling_settings?.interviewLoad
                  ?.dailyLimit.type === 'Interviews'
                  ? totalInterviewsToday +
                      ' / ' +
                      interviewerDetails.scheduling_settings?.interviewLoad
                        ?.dailyLimit.value || 0
                  : totalHoursToday +
                      ' / ' +
                      interviewerDetails.scheduling_settings?.interviewLoad
                        ?.dailyLimit.value || 0
              }
            />
            <InterviewLoadCard
              textHeading='This Week'
              textLabel={
                interviewerDetails?.scheduling_settings?.interviewLoad
                  ?.weeklyLimit.type === 'Interviews'
                  ? 'Interview'
                  : 'Hour'
              }
              textInterviewCounts={
                interviewerDetails?.scheduling_settings?.interviewLoad
                  ?.weeklyLimit.type === 'Interviews'
                  ? totalInterviewsThisWeek +
                      ' / ' +
                      interviewerDetails.scheduling_settings?.interviewLoad
                        ?.weeklyLimit.value || 0
                  : totalHoursThisWeek +
                      ' / ' +
                      interviewerDetails.scheduling_settings?.interviewLoad
                        ?.weeklyLimit.value || 0
              }
            />
          </>
        }
      />
      <WorkingHourDetails
    
        slotDays={schedulingSettingData.workingHours
          .filter((day) => day.isWorkDay)
          .map((day, i) => (
            <WorkingDaysList
              key={i}
              textDay={capitalize(day.day)}
              textTime={
                <Typography>
                  <span>
                    {dayjsLocal()
                      .set(
                        'hour',
                        parseInt(day.timeRange.startTime.split(':')[0]),
                      )
                      .set(
                        'minute',
                        parseInt(day.timeRange.startTime.split(':')[1]),
                      )
                      .format('hh:mm A') +
                      ' to ' +
                      dayjsLocal()
                        .set(
                          'hour',
                          parseInt(day.timeRange.endTime.split(':')[0]),
                        )
                        .set(
                          'minute',
                          parseInt(day.timeRange.endTime.split(':')[1]),
                        )
                        .format('hh:mm A')}
                  </span>{' '}
                  {getShortTimeZone(schedulingSettingData.timeZone.tzCode)}
                </Typography>
              }
            />
          ))}
        // slotEdit={
        //   <ButtonGhost
        //     textButton='Edit'
        //     size={1}
        //     onClickButton={{ onClick: () => setEditDrawer(true) }}
        //   />
        // }
      />
      <InterviewerLevelSettings
        initialData={interviewerDetails?.scheduling_settings}
        companyKeywords={recruiter.scheduling_settings.schedulingKeyWords}
        updateSettings={(x) => {
          return updateMember({
            data: {
              user_id: interviewerDetails.user_id,
              scheduling_settings: x,
            },
          });
        }}
        isAvailability={false}
      />
      <Drawer
        open={editDrawer}
        anchor='right'
        onClose={() => setEditDrawer(false)}
      >
        <SideDrawerLarge
        
          onClickCancel={{
            onClick: () => {
              setEditDrawer(false);
            },
          }}
          drawerSize={'medium'}
          textDrawertitle={'Edit Availability'}
          slotButtons={
            <>
              <button
                className="px-4 py-2 text-neutral-700 bg-neutral-200 rounded"
                onClick={() => {
                  setEditDrawer(false);
                }}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 ${isSaving ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded`}
                disabled={isSaving}
                onClick={() => {
                  updateHandle();
                }}
              >
                {isSaving ? 'Updating...' : 'Update'}
              </button>
            </>
          }
          slotSideDrawerbody={
            <Stack padding={'16px'}>
              <ScheduleSettings
                slotTimeZoneInput={
                  <div className="flex flex-col-reverse gap-2" style={{ width: '420px' }}>
                    time zone auto complete
                    {/* <Autocomplete
                      disabled={isTimeZone}
                      disableClearable
                      options={timeZone}
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
                            <Typography
                              variant='body1'
                              color={'var(--neutral-12)'}
                            >
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
                    /> */}
                  </div>
                }
                isKeywordVisible={false}
                isCompanyLevelVisible={false}
                slotKeywordCard={<></>}
                slotDailyLimit={
                  <>
                    <div className="flex flex-row items-center space-x-3">
                      <MuiNumberfield
                        isMarginTop={false}
                        handleSelect={(value) => handleDailyValue(+value)}
                        value={dailyLmit.value}
                        max={dailyLmit.max}
                      />
                      <div className="flex flex-row space-x-3">
                        {['Interviews', 'Hours'].map((ele, i) => {
                          return (
                            <label key={i} className="flex items-center space-x-1">
                              <input
                                type="radio"
                                checked={dailyLmit.type === ele}
                                onChange={(e: any) => {
                                  handleType(e.target.value);
                                }}
                                value={ele}
                                className="form-radio"
                              />
                              <span>{capitalize(ele.replaceAll('_', ' '))}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </>
                }
                slotWeeklyLimit={
                  <>
                    <Stack spacing={3} direction={'row'} alignItems={'center'}>
                      {' '}
                      <MuiNumberfield
                        handleSelect={(value) => handleWeeklyValue(+value)}
                        isMarginTop={false}
                        value={weeklyLmit.value}
                        max={weeklyLmit.max}
                      />
                      <RadioGroup
                        row
                        aria-labelledby='demo-row-radio-buttons-group-label'
                        name='row-radio-buttons-group'
                      >
                        {['Interviews', 'Hours'].map((ele, i) => {
                          return (
                            <FormControlLabel
                              checked={weeklyLmit.type === ele}
                              key={i}
                              onChange={(e: any) => {
                                handleType(e.target.value);
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
                                  onclickCheck={() => {
                                      setWorkingHours((pre) => {
                                        const data = pre;
                                        data[Number(i)].isWorkDay =
                                          !data[Number(i)].isWorkDay;

                                        return [...data];
                                      })
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
              />
            </Stack>
          }
        />
      </Drawer>
    </Stack>
  );
}

export default Availibility;



function MuiNumberfield({
  value,
  handleSelect,
  width = '70px',
  height = '28px',
  isDebounceEnable = true,
  isDisable = false,
  isMarginTop = true,
  max = 100,
}: {
  value: number | string;
  width?: string;
  isDebounceEnable?: boolean;
  height?: string;
  isMarginTop?: boolean;
  isDisable?: boolean;
  handleSelect: any;
  max?: number;
}) {
  const [tempValue, setTempValue] = useState(value);
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  function handlerMinMax(e) {
    let newValue = +e.target.value;
    if (!(newValue >= 0)) newValue = 0;
    if (newValue > max) newValue = max;
    setTempValue(newValue);
    if (tempValue == newValue) return;
    if (isDebounceEnable) {
      debouncedChange(newValue);
    } else {
      handleSelect(newValue);
    }
  }

  const debouncedChange = useCallback(
    debounce((newValue) => {
      handleSelect(newValue);
    }, 500),
    [],
  );

  return (
    <div style={{ marginTop: isMarginTop ? '12px' : '' }}>
      <input
        disabled={isDisable}
        style={{
          width: width,
          height: height, // Customize the height here
        }}
        value={Number(tempValue).toString()}
        onChange={handlerMinMax}
        type='number'
        className="border rounded px-2 py-1"
      />
    </div>
  );
}



function SelectTime({
  i,
  value,
  onSelect,
  disable,
  minTime = undefined,
  maxTime = undefined,
  disableIgnoringDatePartForTimeValidation,
}: {
  i?: number;
  value: any;
  onSelect: any;
  disable?: boolean;
  minTime?: any;
  maxTime?:any;
  // minTime?: Dayjs;
  // maxTime?: Dayjs;
  disableIgnoringDatePartForTimeValidation?: boolean;
}) {
  return (
    <></>
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    //   <DesktopTimePicker
    //     defaultValue={value}
    //     onChange={(value) => {
    //       onSelect(value, i);
    //     }}
    //     format='hh:mm A'
    //     disabled={disable}
    //     minTime={minTime}
    //     maxTime={maxTime}
    //     disableIgnoringDatePartForTimeValidation={
    //       disableIgnoringDatePartForTimeValidation
    //     }
    //     slots={{
    //       openPickerIcon: ClockIcon,
    //     }}
    //     ampm={false}
    //   />
    // </LocalizationProvider>
  );
}
