import { InterviewLoadType, schedulingSettingType } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  Autocomplete,
  Drawer,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { capitalize, cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { Text } from '@/devlink/Text';
import { RcCheckbox } from '@/devlink2/RcCheckbox';
import { ScheduleSettings } from '@/devlink2/ScheduleSettings';
import { TimeRangeInput } from '@/devlink2/TimeRangeInput';
import { WorkingHourDay } from '@/devlink2/WorkingHourDay';
import { InterviewLoadCard } from '@/devlink3/InterviewLoadCard';
import { InterviewLoadDetails } from '@/devlink3/InterviewLoadDetails';
import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import { WorkingDaysList } from '@/devlink3/WorkingDaysList';
import { WorkingHourDetails } from '@/devlink3/WorkingHourDetails';
import UITextField from '@/src/components/Common/UITextField';
import { LoadMax } from '@/src/components/CompanyDetailComp/SettingsSchedule';
import MuiNumberfield from '@/src/components/CompanyDetailComp/SettingsSchedule/Components/MuiNumberfield';
import SelectTime from '@/src/components/CompanyDetailComp/SettingsSchedule/Components/SelectTime';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import timeZones from '@/src/utils/timeZone';

import InterviewerLevelSettings from '../InterviewerLevelSettings';

let schedulingSettingObj = {};
function Availibility({
  updateSettings,
  interviewerDetails,
  totalHoursThisWeek,
  totalHoursToday,
  totalInterviewsThisWeek,
  interviewerDetailsRefetch,
  totalInterviewsToday,
  handleMemberUpdate,
}) {
  const [workingHours, setWorkingHours] = useState([]);

  const [selectedTimeZone, setSelectedTimeZone] = useState(null);
  const [isTimeZone, setIsTimeZone] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { recruiter } = useAuthDetails();
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
  const [editDrawer, setEditDrawer] = useState(false);
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
                      Math.floor(prevState[module].value)
                    : // eslint-disable-next-line security/detect-object-injection
                      prevState[module].value > LoadMax.dailyHours
                      ? LoadMax.dailyHours
                      : // eslint-disable-next-line security/detect-object-injection
                        Math.floor(prevState[module].value),
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
    }
  }

  const updateHandle = async () => {
    try {
      setIsSaving(true);
      schedulingSettingObj = {
        ...schedulingSettingData,
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
      borderRadius={'8px'}
      border={'1px solid var(--neutral-6)'}
      bgcolor={'white'}
      width={'860px'}
      margin={2}
      gap={1}
    >
      <Stack bgcolor={'white'}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          spacing={1}
        >
          <Text weight={'medium'} content='Time Zone' />
          <ButtonSoft
            textButton='Edit'
            color={'neutral'}
            size={1}
            onClickButton={{ onClick: () => setEditDrawer(true) }}
          />
        </Stack>
        <Typography>{selectedTimeZone?.label}</Typography>
      </Stack>
      <InterviewLoadDetails
        // slotEdit={
        //   <ButtonGhost
        //     textButton='Edit'
        //     size={1}
        //     onClickButton={{ onClick: () => setEditDrawer(true) }}
        //   />
        // }
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
                  {schedulingSettingData.timeZone.label}{' '}
                  <span style={{ fontWeight: '500' }}>
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
                  </span>
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
          return handleMemberUpdate({
            user_id: interviewerDetails.user_id,
            data: { scheduling_settings: x },
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
          isHeaderIconVisible={false}
          drawerSize={'medium'}
          textDrawertitle={'Edit Availability'}
          slotButtons={
            <>
              <ButtonSoft
                textButton='Cancel'
                size={2}
                color={'neutral'}
                onClickButton={{
                  onClick: () => {
                    setEditDrawer(false);
                  },
                }}
              />
              <ButtonSolid
                textButton='Update'
                isLoading={isSaving}
                isDisabled={isSaving}
                size={2}
                onClickButton={{
                  onClick: () => {
                    updateHandle();
                  },
                }}
              />
            </>
          }
          slotSideDrawerbody={
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
                  />
                </Stack>
              }
              isKeywordVisible={false}
              isCompanyLevelVisible={false}
              slotKeywordCard={<></>}
              slotDailyLimit={
                <>
                  <Stack spacing={1} direction={'row'} alignItems={'center'}>
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
                    <MuiNumberfield
                      isMarginTop={false}
                      handleSelect={(e) =>
                        loadChangeHandle(e, 'daily', 'value')
                      }
                      value={interviewLoad.daily.value}
                      max={interviewLoad.daily.max}
                    />
                  </Stack>
                </>
              }
              slotWeeklyLimit={
                <>
                  <Stack spacing={1} direction={'row'} alignItems={'center'}>
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
                              loadChangeHandle(
                                e.target.value,
                                'weekly',
                                'type',
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
                            label={capitalize(ele.replaceAll('_', ' '))}
                          />
                        );
                      })}
                    </RadioGroup>
                    <MuiNumberfield
                      handleSelect={(e) =>
                        loadChangeHandle(e, 'weekly', 'value')
                      }
                      isMarginTop={false}
                      value={interviewLoad.weekly.value}
                      max={interviewLoad.weekly.max}
                    />
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
              isCompanyDaysOffVisible={false}
            />
          }
        />
      </Drawer>
    </Stack>
  );
}

export default Availibility;
