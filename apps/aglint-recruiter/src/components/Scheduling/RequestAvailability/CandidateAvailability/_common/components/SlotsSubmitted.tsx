import dayjs from '@/utils/dayjs';

import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';

function SlotsSubmitted() {
  const { daySlots } = useRequestAvailabilityContext();
  return (
    <div className='rounded-lg border border-gray-200 p-4'>
      <h3 className='mb-4 text-lg font-semibold'>Submitted Availability</h3>
      {daySlots.map((daySlot) => (
        <div key={daySlot.round} className='mb-4'>
          <h4 className='font-medium'>Day {daySlot.round}</h4>
          {daySlot.dates.map((date) => (
            <div key={date.curr_day} className='ml-4'>
              <p>{dayjs(date.curr_day).format('MMMM D, YYYY')}</p>
              <ul className='ml-4 list-disc'>
                {date.slots.map((slot, index) => (
                  <li key={index}>
                    {dayjs(slot.startTime).format('h:mm A')} -{' '}
                    {dayjs(slot.endTime).format('h:mm A')}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SlotsSubmitted;
