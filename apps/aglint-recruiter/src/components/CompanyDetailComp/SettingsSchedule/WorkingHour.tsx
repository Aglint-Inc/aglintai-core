import { schedulingSettingType } from '@aglint/shared-types';
import { Drawer, Stack, Typography } from '@mui/material';
import { capitalize, cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { RcCheckbox } from '@/devlink2/RcCheckbox';
import { TimeRangeInput } from '@/devlink2/TimeRangeInput';
import { WorkingHourDay } from '@/devlink2/WorkingHourDay';
import { WorkingHours } from '@/devlink2/WorkingHours';
import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import { WorkingDaysList } from '@/devlink3/WorkingDaysList';
import { WorkingHourDetails } from '@/devlink3/WorkingHourDetails';
import { WorkingHoursHelper } from '@/devlink3/WorkingHoursHelper';
import dayjs from '@/src/utils/dayjs';
import timeZones from '@/src/utils/timeZone';

import { TimezoneObj, TimezoneSelector } from '.';
import SelectTime from './Components/SelectTime';
import ToggleBtn from './Components/ToggleBtn';

let schedulingSettingObj = {};

export default function WorkingHour({ updateSettings, initialData }) {
  const [helperWorking, setHelperWorking] = useState(420);
  const [workingHours, setWorkingHours] = useState([]);
  const [isTimeZone, setIsTimeZone] = useState(true);
  const [selectedTimeZone, setSelectedTimeZone] = useState<TimezoneObj>(null);
  const [selectedHourBreak, setSelectedHourBreak] = useState<{
    start_time: string;
    end_time: string;
  } | null>({ start_time: '', end_time: '' });

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
  const toggleHelperWorking = () => {
    // Toggle between 0px and 420px
    setHelperWorking(helperWorking === 10 ? 420 : 10);
  };
  function initialLoad() {
    if (initialData) {
      const schedulingSettingData = cloneDeep(
        initialData,
      ) as schedulingSettingType;

      setSelectedTimeZone({ ...schedulingSettingData.timeZone } as TimezoneObj);
      setIsTimeZone(schedulingSettingData.isAutomaticTimezone);
      setSelectedHourBreak({
        start_time: schedulingSettingData.break_hour?.start_time,
        end_time: schedulingSettingData.break_hour?.end_time,
      });
      const workingHoursCopy = cloneDeep(schedulingSettingData.workingHours);
      setWorkingHours(workingHoursCopy);
    }
  }

  useEffect(() => {
    initialLoad();
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      schedulingSettingObj = {
        ...initialData,
        timeZone: selectedTimeZone,
        workingHours: workingHours,

        isAutomaticTimezone: isTimeZone,
        break_hour: {
          start_time: selectedHourBreak.start_time,
          end_time: selectedHourBreak.end_time,
        },
      } as schedulingSettingType;

      await updateSettings(schedulingSettingObj);
      setIsDrawerOpen(false);
    } catch (e) {
      //
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Stack
      display={'flex'}
      flexDirection={'row'}
      width={'100%'}
      justifyContent={'space-between'}
      alignItems={'start'}
      sx={{ overflowX: 'hidden' }}
    >
      <Stack
        width={'700px'}
        overflow={'auto'}
        spacing={2}
        borderRadius={'8px'}
        bgcolor={'white'}
        margin={2}
        position={'relative'}
      >
        <Stack position={'absolute'} top={'16px'} right={'16px'}>
          <ButtonSoft
            textButton='Edit'
            color={'neutral'}
            size={2}
            onClickButton={{ onClick: () => setIsDrawerOpen(true) }}
          />
        </Stack>
        <TimeZone timeZone={initialData?.timeZone?.label} />
        <WorkingHourView workingHours={initialData.workingHours} />
        <Debreif breaktime={initialData.break_hour} />
        <Drawer
          anchor={'right'}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <SideDrawerLarge
            onClickCancel={{
              onClick: () => {
                setIsDrawerOpen(false);
              },
            }}
            isHeaderIconVisible={false}
            textDrawertitle='Company Working Hour Update'
            drawerSize={'medium'}
            slotButtons={
              <>
                <ButtonSoft
                  size={2}
                  textButton='Cancel'
                  color={'neutral'}
                  onClickButton={{ onClick: () => setIsDrawerOpen(false) }}
                />
                <ButtonSolid
                  size={2}
                  textButton='Update'
                  isLoading={isUpdating}
                  isDisabled={isUpdating}
                  onClickButton={{ onClick: handleUpdate }}
                />
              </>
            }
            slotSideDrawerbody={
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
                                disableIgnoringDatePartForTimeValidation={true}
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
                                    pre.start_time = `${dayjs(e).format('HH:mm')}`;
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
                                disableIgnoringDatePartForTimeValidation={true}
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
                                    pre.end_time = `${dayjs(e).format('HH:mm')}`;
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
            }
          />
        </Drawer>
      </Stack>
      <WorkingHoursHelper
        styleWidth={{ style: { width: helperWorking } }}
        onClickArrow={{
          style: {
            transform: `rotate(${helperWorking === 420 ? '0deg' : '180deg'})`,
          },
          onClick: () => {
            toggleHelperWorking();
          },
        }}
      />
    </Stack>
  );
}

const WorkingHourView = ({ workingHours }) => {
  return (
    <Stack>
      <WorkingHourDetails
        slotEdit={<Stack pl={2} height={'20px'}></Stack>}
        slotDays={workingHours
          .filter((day) => day.isWorkDay)
          .map((day, i) => (
            <WorkingDaysList
              key={i}
              textDay={<Typography>{capitalize(day.day)}</Typography>}
              textTime={
                <Typography>
                  {dayjs()
                    .set(
                      'hour',
                      parseInt(day?.timeRange.startTime?.split(':')[0]),
                    )
                    .set(
                      'minute',
                      parseInt(day?.timeRange.startTime?.split(':')[1]),
                    )
                    .format('hh:mm A')}
                  {' - '}
                  {dayjs()
                    .set(
                      'hour',
                      parseInt(day?.timeRange.endTime?.split(':')[0]),
                    )
                    .set(
                      'minute',
                      parseInt(day?.timeRange.endTime?.split(':')[1]),
                    )
                    .format('hh:mm A')}
                </Typography>
              }
            />
          ))}
      />
    </Stack>
  );
};
const TimeZone = ({ timeZone }) => {
  return (
    <Stack bgcolor={'white'} width={'600px'} marginTop={'0px !important'}>
      <Stack
        fontWeight={500}
        alignItems={'center'}
        height={'10px'}
        paddingBlock={2}
        direction={'row'}
      >
        Time Zone
        {/* {isEditHover && (
          // <Stack pl={2}>
          //   <ButtonGhost
          //     textButton='Edit'
          //     size={1}
          //     onClickButton={{ onClick: () => setIsDrawerOpen(true) }}
          //   />
          // </Stack>
        )} */}
      </Stack>
      <Typography>{timeZone}</Typography>
    </Stack>
  );
};
const Debreif = ({ breaktime }) => {
  return (
    <Stack bgcolor={'white'} width={'600px'}>
      <Stack
        fontWeight={500}
        alignItems={'center'}
        height={'10px'}
        paddingBlock={2}
        direction={'row'}
      >
        Default Break Times{' '}
      </Stack>
      <Typography pb={'4px'}>
        <span style={{ fontWeight: '500' }}>Break Start Time</span>
        <span style={{ marginLeft: '20px' }}>
          {dayjs()
            .set('hour', parseInt(breaktime?.start_time?.split(':')[0]))
            .set('minute', parseInt(breaktime?.start_time?.split(':')[1]))
            .format('hh:mm A')}
        </span>
      </Typography>
      <Typography>
        <span style={{ fontWeight: '500' }}>Break End Time</span>{' '}
        <span style={{ marginLeft: '24px' }}> </span>
        {dayjs()
          .set('hour', parseInt(breaktime?.end_time?.split(':')[0]))
          .set('minute', parseInt(breaktime?.end_time?.split(':')[1]))
          .format('hh:mm A')}
      </Typography>
    </Stack>
  );
};
