/* eslint-disable no-unused-vars */
import { dayjsLocal } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { PopoverClose } from '@radix-ui/react-popover';
import capitalize from 'lodash/capitalize';
import { Calendar, Edit, Loader2 } from 'lucide-react';
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import DayWithTime from './DayWithTime';

// Define types for the component props
interface TimeRange {
  startTime: string;
  endTime: string;
}

interface WorkingHour {
  day: string;
  isWorkDay: boolean;
  timeRange: TimeRange;
}

interface WorkTimeProps {
  workingHours: WorkingHour[];
  setWorkingHours: Dispatch<SetStateAction<WorkingHour[]>>;
  handleUpdate: (data: { workingHours: WorkingHour[] }) => Promise<void>;
}

const WorkTime: FC<WorkTimeProps> = ({
  workingHours,
  setWorkingHours,
  handleUpdate,
}) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleUpdateAndClose = async () => {
    await handleUpdate({ workingHours });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Card className='group relative'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>Working Hours</CardTitle>
        <CardDescription className='text-sm text-gray-500'>
          Set your company&apos;s operational hours for each day of the week.
        </CardDescription>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='absolute right-2 top-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100'
            >
              <Edit className='h-3 w-3' />
              <span className='sr-only'>Edit Working Hours</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full' side='left' align='start'>
            <div className='flex flex-col gap-4'>
              <Label>Edit Working Hours</Label>
              {workingHours.map((day, i) => {
                const startTime = dayjsLocal()
                  .set(
                    'hour',
                    parseInt(day.timeRange.startTime?.split(':')[0] || '0'),
                  )
                  .set(
                    'minute',
                    parseInt(day.timeRange.startTime?.split(':')[1] || '0'),
                  )
                  .toISOString();

                const endTime = dayjsLocal()
                  .set(
                    'hour',
                    parseInt(day.timeRange.endTime?.split(':')[0] || '0'),
                  )
                  .set(
                    'minute',
                    parseInt(day.timeRange.endTime?.split(':')[1] || '0'),
                  )
                  .toISOString();

                return (
                  <DayWithTime
                    key={i}
                    day={day}
                    i={i}
                    startTime={startTime}
                    endTime={endTime}
                    selectStartTime={(value, i) => {
                      setWorkingHours((pre) => {
                        const data = [...pre];
                        data[i].timeRange.startTime =
                          dayjsLocal(value).format('HH:mm');
                        return data;
                      });
                    }}
                    selectEndTime={(value, i) => {
                      setWorkingHours((pre) => {
                        const data = [...pre];
                        data[i].timeRange.endTime =
                          dayjsLocal(value).format('HH:mm');
                        return data;
                      });
                    }}
                    setWorkingHours={setWorkingHours}
                  />
                );
              })}
              <PopoverClose>
                <Button className='w-full' onClick={handleUpdateAndClose}>
                  Update
                </Button>
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        <div className='group relative rounded-lg py-4'>
          <div className='mb-4 flex items-center space-x-2'>
            <Calendar className='h-4 w-4 text-muted-foreground' />
            <p className='text-sm font-medium'>Weekly Schedule</p>
          </div>
          <div className=''>
            <Table>
              <TableHeader className='bg-gray-100'>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workingHours
                  .filter((day) => day.isWorkDay)
                  .map((day, i) => (
                    <TableRow key={i} className='hover:bg-transparent'>
                      <TableCell className='font-medium'>
                        {capitalize(day.day)}
                      </TableCell>
                      <TableCell>
                        {dayjsLocal()
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
                        {dayjsLocal()
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkTime;
