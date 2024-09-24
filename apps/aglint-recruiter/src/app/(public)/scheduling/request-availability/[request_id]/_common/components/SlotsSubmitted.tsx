import { dayjsLocal } from '@aglint/shared-utils';
import { Badge } from '@components/ui/badge';

import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';

function SlotsSubmitted() {
  const { daySlots } = useRequestAvailabilityContext();
  return (
    <div className='flex w-full flex-col gap-4 rounded-lg border border-gray-200 p-4'>
      {daySlots.map((daySlot) => (
        <div key={daySlot.round} className='flex flex-col gap-2'>
          <h4 className='font-medium'>Day {daySlot.round}</h4>
          <div className='flex w-full flex-col gap-4 rounded-sm'>
            {daySlot.dates.map((date) => (
              <div key={date.curr_day} className='flex flex-col gap-1'>
                <p className='text-sm'>
                  {dayjsLocal(date.curr_day).format('MMMM D, YYYY')}
                </p>
                <div className='flex flex-row flex-wrap gap-2'>
                  {date.slots.map((slot, index) => (
                    <div key={index}>
                      <Badge
                        className='rounded-sm bg-green-100'
                        variant='secondary'
                      >
                        {dayjsLocal(slot.startTime).format('h:mm A')} -{''}
                        {dayjsLocal(slot.endTime).format('h:mm A')}
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
