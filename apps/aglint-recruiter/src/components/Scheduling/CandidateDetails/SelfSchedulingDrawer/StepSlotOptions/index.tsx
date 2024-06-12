import { Stack } from '@mui/material';
import { useMemo } from 'react';

import { ScheduleOptionsList } from '@/devlink3/ScheduleOptionsList';

import { setSelectedCombIds, useSchedulingFlowStore } from '../store';
import DayCardWrapper from './DayCardWrapper';
import { extractPlanData, groupByDateRange } from './utils';

export type GroupByDateRange = ReturnType<typeof groupByDateRange>;

function StepSlotOptions({ isDebrief }: { isDebrief: boolean }) {
  const filteredSchedulingOptions = useSchedulingFlowStore(
    (state) => state.filteredSchedulingOptions,
  );

  const selectedCombIds = useSchedulingFlowStore(
    (state) => state.selectedCombIds,
  );

  const groupedData: GroupByDateRange = groupByDateRange(
    extractPlanData(filteredSchedulingOptions),
  );

  const onClickSelect = (comb_id: string) => {
    if (isDebrief) {
      setSelectedCombIds([comb_id]);
    } else {
      if (!selectedCombIds.includes(comb_id)) {
        setSelectedCombIds([...selectedCombIds, comb_id]);
      } else {
        setSelectedCombIds(selectedCombIds.filter((id) => id !== comb_id));
      }
    }
  };

  const memoGruopedData = useMemo(
    () => groupedData,
    [filteredSchedulingOptions],
  );

  return (
    <Stack height={'calc(100vh - 96px)'}>
      <ScheduleOptionsList
        textDescription={
          isDebrief ? 'Select a date and time for your interview.' : ''
        }
        slotDateOption={
          <>
            {memoGruopedData?.map((item) => {
              return (
                <DayCardWrapper
                  key={item.dateArray.join(', ')}
                  isDebrief={isDebrief}
                  item={item}
                  onClickSelect={onClickSelect}
                  selectedCombIds={selectedCombIds}
                  isDisabled={false}
                  isCheckboxAndRadio={true}
                  isDayCollapseNeeded={true}
                  isSlotCollapseNeeded={true}
                />
              );
            })}
          </>
        }
      />
    </Stack>
  );
}

export default StepSlotOptions;
