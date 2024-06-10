import { PlanCombinationRespType } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';

import DayCardWrapper from '../../../../SelfSchedulingDrawer/StepSlotOptions/DayCardWrapper';
import { useAvailabilityContext } from '../../RequestAvailabilityContext';

function RequestAvailabilityBody() {
  const {
    selectedDayAvailableBlocks,
    selectedDateSlots,
    setSelectedDateSlots,
    selectedIndex,
  } = useAvailabilityContext();

  const onClickSelect = (comb_id: string, item: PlanCombinationRespType[]) => {
    const selectedSlots = item.find((ele) => ele.plan_comb_id === comb_id);
    setSelectedDateSlots((prev) => {
      const round = selectedIndex + 1;
      const roundExists = prev.some((item) => item.round === round);

      if (roundExists) {
        return prev.map((item) => {
          if (item.round === round) {
            return {
              ...item,
              dateSlots: [selectedSlots],
            };
          }
          return item;
        });
      } else {
        return [...prev, { round, dateSlots: [selectedSlots] }];
      }
    });
  };
  const selectedIds = selectedDateSlots
    .map((ele) => ele.dateSlots)
    .flat()
    .map((ele) => ele.plan_comb_id);
  return (
    <Stack
      p={2}
      overflow={'auto'}
      height={'100%'}
      direction={'column'}
      gap={'var(--space-2)'}
    >
      {selectedDayAvailableBlocks?.map((item, index) => {
        const date = item[0]?.sessions[0]?.start_time;
        const prevSelectedDate = selectedDateSlots.find(
          (ele) => ele.round === selectedIndex,
        )?.dateSlots[0].sessions[0].start_time;
        const isPastDate = dayjs().isAfter(dayjs(date), 'day');
        const isPrevSelectedDate =
          date?.split('T')[0] !== prevSelectedDate?.split('T')[0];

        return (
          <DayCardWrapper
            key={index}
            isDebrief={true}
            selectedCombIds={selectedIds}
            item={{
              dateArray: [date],
              plans: item,
            }}
            onClickSelect={(id) => onClickSelect(id, item)}
            isDisabled={!isPrevSelectedDate || isPastDate}
            isDayCollapseNeeded={false}
          />
        );
      })}
    </Stack>
  );
}

export default RequestAvailabilityBody;
