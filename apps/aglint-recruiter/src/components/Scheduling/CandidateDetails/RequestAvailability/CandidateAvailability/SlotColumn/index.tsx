import { Stack } from '@mui/material';
import dayjs from 'dayjs';

import { AvailableTimeRange } from '@/devlink/AvailableTimeRange';
import { SlotPicker } from '@/devlink2/SlotPicker';

import {
  dateSlotsType,
  useRequestAvailabilityContext,
} from '../../RequestAvailabilityContext';

function SlotColumn({ date, onClose }: { date: dateSlotsType; onClose }) {
  const { setSelectedSlots, selectedSlots } = useRequestAvailabilityContext();
  const handleSlotClick = (ele: { startTime: string; endTime: string }) => {
    //@ts-ignore
    setSelectedSlots((pre: { startTime: string; endTime: string }[]) => {
      if (pre.map((ele) => ele.startTime).includes(ele.startTime)) {
        return pre.filter((date) => date.startTime !== ele.startTime);
      } else {
        return [...pre, ele];
      }
    });
  };
  return (
    <SlotPicker
      onClickClose={{ onClick: () => onClose() }}
      textDateHeading={dayjs(date.curr_day).format('dddd DD, MMMM')}
      slotTime={date.slots.map((slot, ind) => {
        return (
          <Stack key={ind}>
            <AvailableTimeRange
              onClickTime={{
                onClick: () => {
                  handleSlotClick(slot);
                },
              }}
              isSemiActive={false}
              isActive={selectedSlots
                .map((ele) => ele.startTime)
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
