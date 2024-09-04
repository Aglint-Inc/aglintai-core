import { schedulingSettingType } from '@aglint/shared-types';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import {
  Sheet,
  SheetContent
} from '@components/ui/sheet';
import { ButtonSoft } from '@devlink/ButtonSoft';
import { WorkingDaysList } from '@devlink3/WorkingDaysList';
import { WorkingHourDetails } from '@devlink3/WorkingHourDetails';
import { WorkingHoursHelper } from '@devlink3/WorkingHoursHelper';
import { Stack, Typography } from '@mui/material';
import { capitalize, cloneDeep } from 'lodash';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import TimePicker from '@/components/Common/TimePicker';
import TimezonePicker from '@/components/Common/TimezonePicker';
import { TimezoneObj } from '@/components/CompanyDetailComp/Scheduling';
import dayjs from '@/utils/dayjs';

import DayWithTime from './DayWithTime';

let schedulingSettingObj = {};

export default function WorkingHour({
  updateSettings,
  initialData,
}: {
  updateSettings: any;
  initialData: schedulingSettingType;
}) {
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
  const [isHover, setIsHover] = useState(false);

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
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        width={'700px'}
        overflow={'auto'}
        spacing={2}
        borderRadius={'8px'}
        bgcolor={'white'}
        margin={2}
        position={'relative'}
      >
        {isHover && (
          <Stack position={'absolute'} top={'16px'} right={'16px'}>
            <ButtonSoft
              textButton='Edit'
              color={'neutral'}
              size={2}
              onClickButton={{ onClick: () => setIsDrawerOpen(true) }}
            />
          </Stack>
        )}
        <TimeZone timeZone={initialData?.timeZone?.label} />
        <WorkingHourView workingHours={initialData.workingHours} />
        <Debreif breaktime={initialData.break_hour} />

        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetContent className='min-w-[800px]'>
            <div className='flex flex-col gap-2 w-full h-full '>
              <div className='flex flex-col gap-2 w-full h-[calc(100%-40px)] '>
                <div className='flex flex-center-align items-center gap-2'>
                  <Label>Time Zone</Label>
                  <TimezonePicker
                    value={selectedTimeZone?.tzCode}
                    onChange={(value) => {
                      setSelectedTimeZone(value);
                    }}
                  />
                </div>
                <div>
                  <h2>Default Working Hours</h2>
                  <p>Set the standard working hours for the company.</p>
                  <div className='flex flex-col space-y-2'>
                    {!!workingHours.length &&
                      workingHours.map((day, i) => {
                        const startTime = dayjs()
                          .set(
                            'hour',
                            parseInt(day.timeRange.startTime.split(':')[0]),
                          )
                          .set(
                            'minute',
                            parseInt(day.timeRange.startTime.split(':')[1]),
                          )
                          .toISOString();
                        const endTime = dayjs()
                          .set(
                            'hour',
                            parseInt(day.timeRange.endTime.split(':')[0]),
                          )
                          .set(
                            'minute',
                            parseInt(day.timeRange.endTime.split(':')[1]),
                          )
                          .toISOString();
                        return (
                          <>
                            <DayWithTime
                              day={day}
                              endTime={endTime}
                              startTime={startTime}
                              i={i}
                              selectStartTime={selectStartTime}
                              selectEndTime={selectEndTime}
                              setWorkingHours={setWorkingHours}
                            />
                          </>
                        );
                      })}
                  </div>
                </div>
                <div>
                  <div className={'flex flex-col'}>
                    <h2>Default Break Times</h2>
                    <p>Define standard break times for the company.</p>
                  </div>
                  <div className='flex flex-center items-center'>
                    <p>Break Start Time</p>
                    {selectedHourBreak?.start_time &&
                      workingHours[1]?.timeRange?.startTime && (
                        <TimePicker
                          onChange={(value) => {
                            setSelectedHourBreak((pre) => {
                              pre.start_time = `${dayjs(value).format('HH:mm')}`;
                              return { ...pre };
                            });
                          }}
                          value={
                            new Date(
                              dayjs()
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
                                )
                                .toISOString(),
                            )
                          }
                        />
                      )}
                  </div>
                  <div className='flex flex-center items-center'>
                    <p>Break End Time</p>
                    {workingHours[1]?.timeRange?.endTime &&
                      selectedHourBreak?.end_time && (
                        <TimePicker
                          onChange={(value) => {
                            setSelectedHourBreak((pre) => {
                              pre.end_time = `${dayjs(value).format('HH:mm')}`;
                              return { ...pre };
                            });
                          }}
                          value={
                            new Date(
                              dayjs()
                                .set(
                                  'hour',
                                  parseInt(
                                    selectedHourBreak?.end_time?.split(':')[0],
                                  ),
                                )
                                .set(
                                  'minute',
                                  parseInt(
                                    selectedHourBreak?.end_time?.split(':')[1],
                                  ),
                                )
                                .toISOString(),
                            )
                          }
                        />
                      )}
                  </div>
                </div>
              </div>
              <div className='flex w-full h-[40px] space-x-2'>
                <Button
                  className='w-full'
                  variant='secondary'
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className={`w-full`}
                  variant='default'
                  disabled={isUpdating}
                  onClick={handleUpdate}
                >
                  {isUpdating && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Update
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
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
        </span>{' '}
        -{' '}
        {dayjs()
          .set('hour', parseInt(breaktime?.end_time?.split(':')[0]))
          .set('minute', parseInt(breaktime?.end_time?.split(':')[1]))
          .format('hh:mm A')}
      </Typography>
      <Typography></Typography>
    </Stack>
  );
};
