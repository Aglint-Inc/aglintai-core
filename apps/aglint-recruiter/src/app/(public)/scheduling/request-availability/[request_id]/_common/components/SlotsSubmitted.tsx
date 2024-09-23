import { Badge } from '@components/ui/badge';

import dayjs from '@/utils/dayjs';

import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';

function SlotsSubmitted() {
  const { daySlots } = useRequestAvailabilityContext();
  return (

    <div className='rounded-lg border border-gray-200 p-4 w-full flex flex-col gap-4'>
      {daySlots.map((daySlot) => (
        <div key={daySlot.round} className='flex flex-col gap-2'>
          <h4 className='font-medium'>Day {daySlot.round}</h4>
          <div className='flex flex-col gap-4  rounded-sm w-full'>
          {daySlot.dates.map((date) => (
            <div key={date.curr_day} className='flex flex-col gap-1'>
              <p className='text-sm'>{dayjs(date.curr_day).format('MMMM D, YYYY')}</p>
              <div className='flex flex-row flex-wrap gap-2'>
                {date.slots.map((slot, index) => (
                  <div key={index}>
                  <Badge className='rounded-sm bg-green-100 ' variant='secondary'>
                    {dayjs(slot.startTime).format('h:mm A')} -{''}
                    {dayjs(slot.endTime).format('h:mm A')}
                  </Badge>
                  </div>
                  
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SlotsSubmitted;
