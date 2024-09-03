/* eslint-disable security/detect-object-injection */
import { type DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';

import { AvailableTimeRange } from '@/devlink/AvailableTimeRange';
import { SlotPicker } from '@/devlink2/SlotPicker';

import { useRequestAvailabilityContext } from '../../../RequestAvailabilityContext';

function SlotColumn({
  slotTime,
  onClose,
}: {
  slotTime: DatabaseTable['candidate_request_availability']['slots'][number]['dates'][number];
  onClose?: any;
}) {
  const {
    setSelectedSlots,
    selectedSlots,
    openDaySlotPopup: day,
    isSubmitted,
  } = useRequestAvailabilityContext();
  const handleSlotClick = ({
    curr_day,
    slot,
  }: {
    curr_day: string;
    slot: DatabaseTable['candidate_request_availability']['slots'][number]['dates'][number]['slots'][number];
  }) => {
    //@ts-ignore

    setSelectedSlots((prevState) => {
      // Check if the day exists in the state
      const dayIndex = prevState.findIndex((slot) => slot.round === day);

      if (dayIndex !== -1) {
        // If the day exists, get the current dates for that day
        const currentDates = prevState[dayIndex].dates;
        const dateIndex = currentDates.findIndex(
          (date) => date.curr_day === curr_day,
        );

        if (dateIndex !== -1) {
          // If the date exists, check if the slot already exists
          const currentSlots = currentDates[dateIndex].slots;
          const slotIndex = currentSlots.indexOf(slot);

          if (slotIndex !== -1) {
            // If the slot exists, remove it
            const newSlots = currentSlots.filter((s) => s !== slot);
            return [
              ...prevState.slice(0, dayIndex),
              {
                ...prevState[dayIndex],
                dates: [
                  ...currentDates.slice(0, dateIndex),
                  { ...currentDates[dateIndex], slots: newSlots },
                  ...currentDates.slice(dateIndex + 1),
                ],
              },
              ...prevState.slice(dayIndex + 1),
            ];
          } else {
            // If the slot does not exist, add it
            return [
              ...prevState.slice(0, dayIndex),
              {
                ...prevState[dayIndex],
                dates: [
                  ...currentDates.slice(0, dateIndex),
                  {
                    ...currentDates[dateIndex],
                    slots: [...currentSlots, slot],
                  },
                  ...currentDates.slice(dateIndex + 1),
                ],
              },
              ...prevState.slice(dayIndex + 1),
            ];
          }
        } else {
          // If the date does not exist, add a new date with the slot
          return [
            ...prevState.slice(0, dayIndex),
            {
              ...prevState[dayIndex],
              dates: [...currentDates, { curr_day: curr_day, slots: [slot] }],
            },
            ...prevState.slice(dayIndex + 1),
          ];
        }
      } else {
        // If the day does not exist, add a new object with the given day and date with the slot
        return [
          ...prevState,
          { round: day, dates: [{ curr_day: curr_day, slots: [slot] }] },
        ];
      }
    });
  };

  return (
    <SlotPicker
      isCloseButtonVisible={day === 1}
      onClickClose={{ onClick: () => onClose() }}
      textDateHeading={dayjs(slotTime.curr_day).format('dddd DD, MMMM')}
      slotTime={slotTime.slots.map((slot, ind) => {
        const isSelected =
          (!isSubmitted &&
            selectedSlots
              .find((ele) => ele.round === day)
              .dates.find((ele) => ele.curr_day === slotTime.curr_day)
              .slots.map((ele) => ele.startTime)
              .includes(slot.startTime)) ||
          isSubmitted;
        return (
          <Stack key={ind}>
            <AvailableTimeRange
              onClickTime={{
                onClick: () => {
                  if (!isSubmitted)
                    handleSlotClick({
                      curr_day: slotTime.curr_day,
                      slot: slot,
                    });
                },
              }}
              isSemiActive={slot.isSlotAvailable && !isSelected}
              isActive={isSelected}
              key={ind}
              textTime={`${dayjs(slot.startTime).format('hh:mm A')} - ${dayjs(slot.endTime).format('hh:mm A')}`}
            />
          </Stack>
        );
      })}
    />
  );
}

export default SlotColumn;
