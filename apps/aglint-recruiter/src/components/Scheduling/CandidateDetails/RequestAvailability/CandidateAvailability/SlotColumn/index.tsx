/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';

import { AvailableTimeRange } from '@/devlink/AvailableTimeRange';
import { SlotPicker } from '@/devlink2/SlotPicker';

import { useRequestAvailabilityContext } from '../../RequestAvailabilityContext';

function SlotColumn({
  slotTime,
  onClose,
}: {
  slotTime: DatabaseTable['candidate_request_availability']['slots'][number];
  onClose;
}) {
  const { setSelectedSlots, selectedSlots } = useRequestAvailabilityContext();
  const handleSlotClick = ({
    curr_day,
    slot,
  }: {
    curr_day: string;
    slot: DatabaseTable['candidate_request_availability']['slots'][number]['slots'][number];
  }) => {
    setSelectedSlots(
      //@ts-ignore
      (prev: DatabaseTable['candidate_request_availability']['slots']) => {
        const dateIndex = prev.findIndex((date) => date.curr_day === curr_day);

        if (dateIndex !== -1) {
          const existingSlots = prev[dateIndex].slots;
          const isSlotExisting = existingSlots.some(
            (s) => s.startTime === slot.startTime && s.endTime === slot.endTime,
          );

          const updatedSlots = isSlotExisting
            ? existingSlots.filter(
                (s) =>
                  !(
                    s.startTime === slot.startTime && s.endTime === slot.endTime
                  ),
              )
            : [...existingSlots, slot];

          return [
            ...prev.slice(0, dateIndex),
            { curr_day, slots: updatedSlots },
            ...prev.slice(dateIndex + 1),
          ];
        } else {
          return [...prev, { curr_day, slots: [slot] }];
        }
      },
    );
  };

  return (
    <SlotPicker
      onClickClose={{ onClick: () => onClose() }}
      textDateHeading={dayjs(slotTime.curr_day).format('dddd DD, MMMM')}
      slotTime={slotTime.slots.map((slot, ind) => {
        return (
          <Stack key={ind}>
            <AvailableTimeRange
              onClickTime={{
                onClick: () => {
                  handleSlotClick({ curr_day: slotTime.curr_day, slot: slot });
                },
              }}
              isSemiActive={false}
              isActive={selectedSlots
                .find((ele) => ele.curr_day === slotTime.curr_day)
                .slots.map((ele) => ele.startTime)
                .includes(slot.startTime)}
              key={ind}
              textTime={`${dayjs(slot.startTime).format('hh:mm')} - ${dayjs(slot.endTime).format('hh:mm')}`}
            />
          </Stack>
        );
      })}
    />
  );
}

export default SlotColumn;
