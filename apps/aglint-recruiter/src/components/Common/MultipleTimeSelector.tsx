'use client';

import dayjs from 'dayjs';
import { Clock, Plus, X } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface TimeRange {
  id: string;
  startTime: string;
  endTime: string;
}

interface TimeRangeInputProps {
  timeRanges: TimeRange[];
  // eslint-disable-next-line no-unused-vars
  onTimeRangesChange: (timeRanges: TimeRange[]) => void;
  className?: string;
}

export function TimeRangeInput({
  timeRanges,
  onTimeRangesChange,
  className,
}: TimeRangeInputProps) {
  const [open, setOpen] = React.useState(false);

  const timeOptions = React.useMemo(() => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 2; j++) {
        const time = dayjs()
          .hour(i)
          .minute(j * 30)
          .format('HH:mm');
        options.push(time);
      }
    }
    return options;
  }, []);

  const handleTimeChange = (
    id: string,
    type: 'startTime' | 'endTime',
    time: string,
  ) => {
    const updatedRanges = timeRanges.map((range) =>
      range.id === id ? { ...range, [type]: time } : range,
    );
    onTimeRangesChange(updatedRanges);
  };

  const handleAddTimeRange = () => {
    const newRange = {
      id: `range-${Date.now()}`,
      startTime: '09:00',
      endTime: '17:00',
    };
    onTimeRangesChange([...timeRanges, newRange]);
  };

  const handleRemoveTimeRange = (id: string) => {
    const updatedRanges = timeRanges.filter((range) => range.id !== id);
    onTimeRangesChange(updatedRanges);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !timeRanges.length && 'text-muted-foreground',
            className,
          )}
        >
          <Clock className='mr-2 h-4 w-4' />
          {timeRanges.length ? (
            `${timeRanges.length} time range${timeRanges.length > 1 ? 's' : ''} selected`
          ) : (
            <span>Select time ranges</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 p-0' align='start'>
        <div className='flex flex-col space-y-4 p-4'>
          {timeRanges.map((range, index) => (
            <div key={range.id} className='flex flex-col space-y-2'>
              <div className='flex items-center justify-between'>
                <label className='text-sm font-medium text-gray-700'>
                  Time Range {index + 1}
                </label>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => handleRemoveTimeRange(range.id)}
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
              <div className='flex space-x-2'>
                <Select
                  value={range.startTime}
                  onValueChange={(time) =>
                    handleTimeChange(range.id, 'startTime', time)
                  }
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Start Time' />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={`start-${time}`} value={time}>
                        {dayjs(time, 'HH:mm').format('h:mm A')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={range.endTime}
                  onValueChange={(time) =>
                    handleTimeChange(range.id, 'endTime', time)
                  }
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='End Time' />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={`end-${time}`} value={time}>
                        {dayjs(time, 'HH:mm').format('h:mm A')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
          <Button onClick={handleAddTimeRange} className='w-full'>
            <Plus className='mr-2 h-4 w-4' /> Add Time Range
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ('use client');

// import React from 'react';
// import dayjs from 'dayjs';
// import { TimeRangeInput } from './TimeRangeInput';

// interface TimeRange {
//   id: string;
//   startTime: string;
//   endTime: string;
// }

// export default function TimeRangeInputExample() {
//   const [timeRanges, setTimeRanges] = React.useState<TimeRange[]>([
//     { id: 'initial', startTime: '09:00', endTime: '17:00' },
//   ]);

//   const handleTimeRangesChange = (newTimeRanges: TimeRange[]) => {
//     setTimeRanges(newTimeRanges);
//     console.log('Updated time ranges:', newTimeRanges);
//   };

//   return (
//     <div className='p-4'>
//       <h1 className='text-2xl font-bold mb-4'>Time Range Input Example</h1>
//       <div className='flex flex-col space-y-2'>
//         <label
//           htmlFor='timeRange'
//           className='text-sm font-medium text-gray-700'
//         >
//           Select Time Ranges
//         </label>
//         <TimeRangeInput
//           timeRanges={timeRanges}
//           onTimeRangesChange={handleTimeRangesChange}
//         />
//       </div>
//       <div className='mt-4'>
//         <h2 className='text-xl font-semibold mb-2'>Selected Time Ranges:</h2>
//         {timeRanges.map((range, index) => (
//           <p key={range.id}>
//             Range {index + 1}:{' '}
//             {dayjs(range.startTime, 'HH:mm').format('h:mm A')} -{' '}
//             {dayjs(range.endTime, 'HH:mm').format('h:mm A')}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// }
