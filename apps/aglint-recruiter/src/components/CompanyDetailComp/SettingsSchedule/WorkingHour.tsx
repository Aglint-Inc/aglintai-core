/* eslint-disable jsx-a11y/label-has-associated-control */
import { type schedulingSettingType } from '@aglint/shared-types';
import { capitalize, cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Drawer } from '@/components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import dayjs from '@/src/utils/dayjs';

import { type TimezoneObj, TimezoneSelector } from '.';

let schedulingSettingObj = {};

export default function WorkingHour({ updateSettings, initialData }) {
  const [helperWorking] = useState(420);
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
    <div className='flex w-full justify-between items-start overflow-x-hidden'>
      <div
        className='relative w-[700px] overflow-auto space-y-2 rounded-lg bg-white m-2'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isHover && (
          <div className='absolute top-4 right-4'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setIsDrawerOpen(true)}
            >
              Edit
            </Button>
          </div>
        )}
        <TimeZone timeZone={initialData?.timeZone?.label} />
        <WorkingHourView workingHours={initialData.workingHours} />
        <Debreif breaktime={initialData.break_hour} />
        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <div className='p-4 bg-white h-full overflow-y-auto'>
            <h2 className='text-lg font-semibold mb-4'>Update Working Hours</h2>
            <div className='flex flex-col space-y-4'>
              <div className='flex flex-col space-y-2'>
                <label className='text-sm font-medium'>Time Zone</label>
                <TimezoneSelector
                  disabled={isTimeZone}
                  value={selectedTimeZone}
                  setValue={setSelectedTimeZone}
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <label className='text-sm font-medium'>Working Hours</label>
                <div className='flex flex-col space-y-2'>
                  {workingHours.map((day, i) => (
                    <div key={i} className='flex items-center space-x-2'>
                      <Checkbox
                        checked={day.isWorkDay}
                        onCheckedChange={() => {
                          setWorkingHours((pre) => {
                            const data = pre;
                            data[Number(i)].isWorkDay =
                              !data[Number(i)].isWorkDay;

                            return [...data];
                          });
                        }}
                      />
                      <label className='text-sm font-medium'>
                        {capitalize(day.day)}
                      </label>
                      <div className='flex space-x-2'>
                        <Select
                          disabled={!day.isWorkDay}
                          value={day.timeRange.startTime.split(':')[0]}
                          onValueChange={(value) =>
                            selectStartTime(
                              `${value}:${day.timeRange.startTime.split(':')[1]}`,
                              i,
                            )
                          }
                        >
                          <SelectTrigger className='w-[80px]'>
                            <SelectValue placeholder='Hour' />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => (
                              <SelectItem
                                key={i}
                                value={i.toString().padStart(2, '0')}
                              >
                                {i.toString().padStart(2, '0')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          disabled={!day.isWorkDay}
                          value={day.timeRange.startTime.split(':')[1]}
                          onValueChange={(value) =>
                            selectStartTime(
                              `${day.timeRange.startTime.split(':')[0]}:${value}`,
                              i,
                            )
                          }
                        >
                          <SelectTrigger className='w-[80px]'>
                            <SelectValue placeholder='Minute' />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 60 }, (_, i) => (
                              <SelectItem
                                key={i}
                                value={i.toString().padStart(2, '0')}
                              >
                                {i.toString().padStart(2, '0')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <span>-</span>
                      <div className='flex space-x-2'>
                        <Select
                          disabled={!day.isWorkDay}
                          value={day.timeRange.endTime.split(':')[0]}
                          onValueChange={(value) =>
                            selectEndTime(
                              `${value}:${day.timeRange.endTime.split(':')[1]}`,
                              i,
                            )
                          }
                        >
                          <SelectTrigger className='w-[80px]'>
                            <SelectValue placeholder='Hour' />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => (
                              <SelectItem
                                key={i}
                                value={i.toString().padStart(2, '0')}
                              >
                                {i.toString().padStart(2, '0')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          disabled={!day.isWorkDay}
                          value={day.timeRange.endTime.split(':')[1]}
                          onValueChange={(value) =>
                            selectEndTime(
                              `${day.timeRange.endTime.split(':')[0]}:${value}`,
                              i,
                            )
                          }
                        >
                          <SelectTrigger className='w-[80px]'>
                            <SelectValue placeholder='Minute' />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 60 }, (_, i) => (
                              <SelectItem
                                key={i}
                                value={i.toString().padStart(2, '0')}
                              >
                                {i.toString().padStart(2, '0')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex flex-col space-y-2'>
                <label className='text-sm font-medium'>
                  Default Break Times
                </label>
                <div className='flex space-x-2'>
                  <div className='flex flex-col space-y-1'>
                    <label className='text-sm'>Break Start Time</label>
                    {selectedHourBreak?.start_time &&
                      workingHours[1]?.timeRange?.startTime && (
                        <div className='flex space-x-2'>
                          <Select
                            value={selectedHourBreak?.start_time?.split(':')[0]}
                            onValueChange={(value) => {
                              setSelectedHourBreak((pre) => ({
                                ...pre,
                                start_time: `${value}:${pre.start_time?.split(':')[1] || '00'}`,
                              }));
                            }}
                          >
                            <SelectTrigger className='w-[80px]'>
                              <SelectValue placeholder='Hour' />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }, (_, i) => (
                                <SelectItem
                                  key={i}
                                  value={i.toString().padStart(2, '0')}
                                >
                                  {i.toString().padStart(2, '0')}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select
                            value={selectedHourBreak?.start_time?.split(':')[1]}
                            onValueChange={(value) => {
                              setSelectedHourBreak((pre) => ({
                                ...pre,
                                start_time: `${pre.start_time?.split(':')[0] || '00'}:${value}`,
                              }));
                            }}
                          >
                            <SelectTrigger className='w-[80px]'>
                              <SelectValue placeholder='Minute' />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 60 }, (_, i) => (
                                <SelectItem
                                  key={i}
                                  value={i.toString().padStart(2, '0')}
                                >
                                  {i.toString().padStart(2, '0')}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                  </div>
                  <div className='flex flex-col space-y-1'>
                    <label className='text-sm'>Break End Time</label>
                    {workingHours[1]?.timeRange?.endTime &&
                      selectedHourBreak?.end_time && (
                        <Select
                          onValueChange={(value) => {
                            const [hour, minute] = value.split(':');
                            setSelectedHourBreak((pre) => ({
                              ...pre,
                              end_time: `${hour}:${minute}`,
                            }));
                          }}
                        >
                          <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='Select end time' />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, hour) => (
                              <SelectGroup key={hour}>
                                <SelectLabel>{`${hour.toString().padStart(2, '0')}:00`}</SelectLabel>
                                {[
                                  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,
                                ].map((minute) => (
                                  <SelectItem
                                    key={`${hour}:${minute}`}
                                    value={`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`}
                                  >
                                    {`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-end space-x-2 mt-4'>
              <Button variant='outline' onClick={() => setIsDrawerOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={isUpdating}>
                {isUpdating ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
      <div
        className='transition-all duration-300 ease-in-out'
        style={{ width: helperWorking }}
      >
        {/* WorkingHoursHelper content */}
      </div>
    </div>
  );
}

const WorkingHourView = ({ workingHours }) => {
  return (
    <div className='flex flex-col'>
      <div className='space-y-2'>
        <div className='pl-2 h-5'></div>
        {workingHours
          .filter((day) => day.isWorkDay)
          .map((day, i) => (
            <div key={i} className='flex justify-between items-center'>
              <span className='font-medium'>{capitalize(day.day)}</span>
              <span>
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
                  .set('hour', parseInt(day?.timeRange.endTime?.split(':')[0]))
                  .set(
                    'minute',
                    parseInt(day?.timeRange.endTime?.split(':')[1]),
                  )
                  .format('hh:mm A')}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};
const TimeZone = ({ timeZone }) => {
  return (
    <div className='bg-white w-[600px] mt-0'>
      <div className='flex items-center h-10 py-2 font-medium'>Time Zone</div>
      <p>{timeZone}</p>
    </div>
  );
};
const Debreif = ({ breaktime }) => {
  return (
    <div className='bg-white w-[600px]'>
      <div className='flex items-center h-10 py-2 font-medium'>
        Default Break Times
      </div>
      <p className='pb-1'>
        <span className='font-medium'>Break Start Time</span>
        <span className='ml-5'>
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
      </p>
    </div>
  );
};
