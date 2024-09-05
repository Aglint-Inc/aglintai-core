import { schedulingSettingType } from '@aglint/shared-types';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import { Label } from '@components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { capitalize, cloneDeep } from 'lodash';
import { Calendar, Clock, Coffee, Edit, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import TimePicker from '@/components/Common/TimePicker';
import TimezonePicker from '@/components/Common/TimezonePicker';
import { TimezoneObj } from '@/components/CompanyDetailComp/Scheduling';
import dayjs from '@/utils/dayjs';

import DayWithTime from './DayWithTime';

export default function WorkingHour({
  updateSettings,
  initialData,
}: {
  updateSettings: any;
  initialData: schedulingSettingType;
}) {
  const [workingHours, setWorkingHours] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState<TimezoneObj>(null);
  const [selectedHourBreak, setSelectedHourBreak] = useState<{
    start_time: string;
    end_time: string;
  } | null>({ start_time: '', end_time: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    initialLoad();
  }, []);

  function initialLoad() {
    if (initialData) {
      const schedulingSettingData = cloneDeep(
        initialData,
      ) as schedulingSettingType;
      setSelectedTimeZone({ ...schedulingSettingData.timeZone } as TimezoneObj);
      setSelectedHourBreak({
        start_time: schedulingSettingData.break_hour?.start_time,
        end_time: schedulingSettingData.break_hour?.end_time,
      });
      setWorkingHours(cloneDeep(schedulingSettingData.workingHours));
    }
  }

  const handleUpdate = async (updatedData) => {
    setIsUpdating(true);
    try {
      const schedulingSettingObj = {
        ...initialData,
        ...updatedData,
      } as schedulingSettingType;
      await updateSettings(schedulingSettingObj);
    } catch (e) {
      // Handle error
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div className='container mx-auto p-6 space-y-6'>
      <TimeZoneCard
        timeZone={initialData?.timeZone?.label}
        selectedTimeZone={selectedTimeZone}
        setSelectedTimeZone={setSelectedTimeZone}
        handleUpdate={handleUpdate}
        isUpdating={isUpdating}
      />
      <WorkingHoursCard
        workingHours={workingHours}
        setWorkingHours={setWorkingHours}
        handleUpdate={handleUpdate}
        isUpdating={isUpdating}
      />
      <BreakTimeCard
        breaktime={selectedHourBreak}
        setSelectedHourBreak={setSelectedHourBreak}
        handleUpdate={handleUpdate}
        isUpdating={isUpdating}
      />
    </div>
  );
}

const TimeZoneCard = ({
  timeZone,
  selectedTimeZone,
  setSelectedTimeZone,
  handleUpdate,
  isUpdating,
}) => (
  <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-2xl font-bold'>Time Zone</CardTitle>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <Edit className='h-4 w-4' />
            <span className='sr-only'>Edit Time Zone</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className='flex flex-col gap-4'>
            <Label>Time Zone</Label>
            <TimezonePicker
              value={selectedTimeZone?.tzCode}
              onChange={(value) => setSelectedTimeZone(value)}
            />
            <Button
              onClick={() => handleUpdate({ timeZone: selectedTimeZone })}
              disabled={isUpdating}
            >
              {isUpdating && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </CardHeader>
    <CardContent>
      <div className='flex items-center space-x-4'>
        <Clock className='h-6 w-6 text-muted-foreground' />
        <div>
          <p className='text-sm font-medium'>Current Time Zone</p>
          <p className='text-2xl font-bold'>{timeZone}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const WorkingHoursCard = ({
  workingHours,
  setWorkingHours,
  handleUpdate,
  isUpdating,
}) => (
  <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-2xl font-bold'>Working Hours</CardTitle>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <Edit className='h-4 w-4' />
            <span className='sr-only'>Edit Working Hours</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className='flex flex-col gap-4'>
            {workingHours.map((day, i) => (
              <DayWithTime
                key={i}
                day={day}
                i={i}
                startTime={day.timeRange.startTime}
                endTime={day.timeRange.endTime}
                selectStartTime={(value, i) => {
                  setWorkingHours((pre) => {
                    const data = [...pre];
                    data[i].timeRange.startTime = dayjs(value).format('HH:mm');
                    return data;
                  });
                }}
                selectEndTime={(value, i) => {
                  setWorkingHours((pre) => {
                    const data = [...pre];
                    data[i].timeRange.endTime = dayjs(value).format('HH:mm');
                    return data;
                  });
                }}
                setWorkingHours={setWorkingHours}
              />
            ))}
            <Button
              onClick={() => handleUpdate({ workingHours })}
              disabled={isUpdating}
            >
              {isUpdating && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </CardHeader>
    <CardContent>
      <div className='flex items-center space-x-4 mb-4'>
        <Calendar className='h-6 w-6 text-muted-foreground' />
        <p className='text-sm font-medium'>Weekly Schedule</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Hours</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workingHours
            .filter((day) => day.isWorkDay)
            .map((day, i) => (
              <TableRow key={i}>
                <TableCell className='font-medium'>
                  {capitalize(day.day)}
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const BreakTimeCard = ({
  breaktime,
  setSelectedHourBreak,
  handleUpdate,
  isUpdating,
}) => (
  <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-2xl font-bold'>Break Time</CardTitle>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <Edit className='h-4 w-4' />
            <span className='sr-only'>Edit Break Time</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center space-x-2'>
              <p>Break Start Time</p>
              <TimePicker
                onChange={(value) => {
                  setSelectedHourBreak((pre) => ({
                    ...pre,
                    start_time: dayjs(value).format('HH:mm'),
                  }));
                }}
                value={
                  new Date(
                    dayjs()
                      .set(
                        'hour',
                        parseInt(breaktime?.start_time?.split(':')[0] || '0'),
                      )
                      .set(
                        'minute',
                        parseInt(breaktime?.start_time?.split(':')[1] || '0'),
                      )
                      .toISOString(),
                  )
                }
              />
            </div>
            <div className='flex items-center space-x-2'>
              <p>Break End Time</p>
              <TimePicker
                onChange={(value) => {
                  setSelectedHourBreak((pre) => ({
                    ...pre,
                    end_time: dayjs(value).format('HH:mm'),
                  }));
                }}
                value={
                  new Date(
                    dayjs()
                      .set(
                        'hour',
                        parseInt(breaktime?.end_time?.split(':')[0] || '0'),
                      )
                      .set(
                        'minute',
                        parseInt(breaktime?.end_time?.split(':')[1] || '0'),
                      )
                      .toISOString(),
                  )
                }
              />
            </div>
            <Button
              onClick={() => handleUpdate({ break_hour: breaktime })}
              disabled={isUpdating}
            >
              {isUpdating && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </CardHeader>
    <CardContent>
      <div className='flex items-center space-x-4'>
        <Coffee className='h-6 w-6 text-muted-foreground' />
        <div>
          <p className='text-sm font-medium'>Default Break Times</p>
          <p className='text-2xl font-bold'>
            {dayjs()
              .set('hour', parseInt(breaktime?.start_time?.split(':')[0]))
              .set('minute', parseInt(breaktime?.start_time?.split(':')[1]))
              .format('hh:mm A')}
            {' - '}
            {dayjs()
              .set('hour', parseInt(breaktime?.end_time?.split(':')[0]))
              .set('minute', parseInt(breaktime?.end_time?.split(':')[1]))
              .format('hh:mm A')}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);
