/* eslint-disable security/detect-object-injection */
import { type DatabaseTable } from '@aglint/shared-types';
import {
  Section,
  SectionActions,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { Button } from '@components/ui/button';
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
    <Section className='rounded-lg border-none bg-gray-100 p-4'>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>
            <>{dayjs(slotTime.curr_day).format('dddd DD, MMMM')}</>
          </SectionTitle>
        </SectionHeaderText>
        <SectionActions>
          {day === 1 && (
            <Button variant='outline' size='sm' onClick={onClose}>
              <X className='mr-2 h-4 w-4 text-destructive' />
              Remove
            </Button>
          )}
        </SectionActions>
      </SectionHeader>
      <div className='flex w-full flex-row flex-wrap gap-2'>
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
    </Section>
  );
}

export default TimeSlotsColumn;
