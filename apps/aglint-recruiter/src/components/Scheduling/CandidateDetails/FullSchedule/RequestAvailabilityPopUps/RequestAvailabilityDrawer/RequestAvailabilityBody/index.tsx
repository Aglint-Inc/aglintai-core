import { PlanCombinationRespType } from '@aglint/shared-types';
import { Divider, Stack } from '@mui/material';
import dayjs from 'dayjs';

import { Stepper } from '@/devlink2/Stepper';
import { ShowCode } from '@/src/components/Common/ShowCode';

import FinalScreen from '../ FinalScreen';
import DayCardWrapper from '../../../../SelfSchedulingDrawer/StepSlotOptions/DayCardWrapper';
import { useAvailabilityContext } from '../../RequestAvailabilityContext';

function RequestAvailabilityBody({
  availableSlots,
}: {
  availableSlots: PlanCombinationRespType[][][];
}) {
  const {
    selectedDayAvailableBlocks,
    selectedDateSlots,
    setSelectedDateSlots,
    selectedIndex,
    setSelectedIndex,
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
      overflow={'auto'}
      height={'calc(100vh - 96px)'}
      direction={'column'}
      // gap={'var(--space-2)'}
    >
      <Stack p={2} height={'80px'} direction={'row'}>
        {[...availableSlots, [{}]]?.map(
          (ele: PlanCombinationRespType[][], i) => {
            const firstIndex = 0;
            const lastIndex = [...availableSlots, {}].length - 1;

            return (
              <Stepper
                key={i}
                isLeftLine={i !== firstIndex}
                isRightLine={i !== lastIndex}
                textStepName={
                  i === lastIndex
                    ? 'Final Confirmation'
                    : `Pick Slot For Day ${i + 1}`
                }
                isCurrent={selectedIndex === i}
                isCompleted={i < selectedIndex}
                onClickCompleted={{
                  onClick: () => {
                    if (i < lastIndex) {
                      setSelectedIndex(i);
                    }
                  },
                }}
              />
            );
          },
        )}
      </Stack>
      <Divider
        sx={{
          margin: 0,
        }}
      />
      <Stack
        p={2}
        height={'calc(100vh - 177px)'}
        overflow={'auto'}
        direction={'column'}
      >
        <ShowCode>
          <ShowCode.When isTrue={selectedIndex === availableSlots?.length}>
            <FinalScreen />
          </ShowCode.When>
          <ShowCode.Else>
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
          </ShowCode.Else>
        </ShowCode>
      </Stack>
    </Stack>
  );
}

export default RequestAvailabilityBody;
