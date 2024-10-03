/* eslint-disable security/detect-object-injection */
import { type DatabaseTable } from '@aglint/shared-types';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { UITimeRangeCard } from 'src/app/_common/components/UITimeRangeCard';

import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';

function TimeSlotsColumn({
  slotTime,
  onClose,
}: {
  slotTime: NonNullable<
    DatabaseTable['candidate_request_availability']['slots']
  >[number]['dates'][number];
  onClose?: any;
}) {
  const {
    selectedSlots,
    isSubmitted,
    handleSlotClick,
    openDaySlotPopup: day,
  } = useRequestAvailabilityContext();

  return (
    <>
      <div className='relative w-full flex-1 rounded-lg border-none bg-blue-100'>
        <div className='flex h-12 items-center justify-start rounded-t-lg px-4'>
          <div>{dayjs(slotTime.curr_day).format('dddd DD, MMMM')}</div>
        </div>
        {day === 1 && (
          <span
            onClick={onClose}
            className='absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full border border-neutral-300 bg-white'
          >
            <X className='h-5 w-5 text-neutral-600' />
          </span>
        )}
        <div className='flex w-full flex-row flex-wrap gap-2 p-3 pt-0'>
          {slotTime.slots.map((slot, ind) => {
            const daySlot = (selectedSlots ?? []).find(
              (ele) => ele.round === day,
            );

            const daySlotDates =
              daySlot &&
              daySlot.dates.find((ele) => ele.curr_day === slotTime.curr_day);

            const isSelected =
              (!isSubmitted &&
                daySlotDates &&
                daySlotDates.slots
                  .map((ele) => ele.startTime)
                  .includes(slot.startTime)) ||
              isSubmitted;
            return (
              <div key={ind}>
                <UITimeRangeCard
                  onClickTime={() => {
                    if (!isSubmitted)
                      handleSlotClick({
                        curr_day: slotTime.curr_day,
                        slot: slot,
                      });
                  }}
                  isSemiActive={slot.isSlotAvailable && !isSelected}
                  isActive={isSelected}
                  key={ind}
                  textTime={`${dayjs(slot.startTime).format('hh:mm A')} - ${dayjs(slot.endTime).format('hh:mm A')}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default TimeSlotsColumn;
