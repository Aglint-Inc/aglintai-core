import {
  type CandReqSlotsType,
  type PlanCombinationRespType,
} from '@aglint/shared-types';
import { Divider, Stack } from '@mui/material';

import { Stepper } from '@/devlink2/Stepper';
import { ShowCode } from '@/src/components/Common/ShowCode';

import DayCardWrapper from '../../../../SchedulingDrawer/StepSlotOptions/DayCardWrapper';
import { useAvailabilityContext } from '../../RequestAvailabilityContext';
import FinalScreen from '../FinalScreen';

function RequestAvailabilityBody({
  availableSlots,
}: {
  availableSlots: CandReqSlotsType[];
}) {
  const {
    selectedDayAvailableBlocks,
    selectedDateSlots,
    setSelectedDateSlots,
    selectedIndex,
    setSelectedIndex,
  } = useAvailabilityContext();
  const onClickSelect = (
    comb_id: string,
    item: CandReqSlotsType['selected_dates'][number],
  ) => {
    const selectedSlots = item.plans.filter(
      (ele) => ele.plan_comb_id === comb_id,
    );
    setSelectedDateSlots((prev: CandReqSlotsType[]) => {
      const round = selectedIndex + 1;
      const roundExists = prev.some((item) => item.current_round === round);

      if (roundExists) {
        return prev.map((ele) => {
          if (ele.current_round === round) {
            return {
              ...ele,
              selected_dates: [
                {
                  curr_date: item.curr_date,
                  plans: selectedSlots,
                },
              ],
            };
          }
          return ele;
        });
      } else {
        return [
          ...prev,
          {
            current_round: round,
            selected_dates: [
              {
                curr_date: item.curr_date,
                plans: selectedSlots,
              },
            ],
          },
        ];
      }
    });
  };
  const selectedIds = selectedDateSlots
    .map((ele) => ele.selected_dates)
    .flat()
    .map((ele) => ele.plans)
    .flat()
    .map((ele) => ele.plan_comb_id)
    .flat();

  return (
    <Stack
      overflow={'auto'}
      height={'calc(100vh - 96px)'}
      direction={'column'}
      // gap={'var(--space-2)'}
    >
      <Stack p={2} height={'80px'} direction={'row'}>
        {availableSlots &&
          [...availableSlots, [{}]]?.map(
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
        gap={'16px'}
      >
        <ShowCode>
          <ShowCode.When isTrue={selectedIndex === availableSlots?.length}>
            <FinalScreen />
          </ShowCode.When>
          <ShowCode.Else>
            {selectedDayAvailableBlocks?.map((item, index) => {
              // const date = item.curr_date;

              // const prevSelectedDate = selectedDateSlots.find(
              //   (ele) => ele.current_round === selectedIndex,
              // )?.selected_dates[0]?.curr_date;
              // const isPastDate = dayjs().isAfter(dayjs(date), 'day');
              // const isPrevSelectedDate =
              //   date?.split('T')[0] !== prevSelectedDate?.split('T')[0];

              return (
                <DayCardWrapper
                  key={index}
                  isRadioNeeded={true}
                  selectedCombIds={selectedIds}
                  item={{
                    date_range: [item.curr_date],
                    plans: item.plans,
                  }}
                  onClickSelect={(id) => {
                    onClickSelect(id, item);
                  }}
                  isDisabled={false}
                  isDayCollapseNeeded={false}
                  index={index}
                  isSlotCollapseNeeded={true}
                  setSelectedCombIds={() => {}}
                  isDayCheckboxNeeded={false}
                  isSlotCheckboxNeeded={false}
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
