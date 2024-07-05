import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { Text } from '@/devlink/Text';
import { ScheduleOptionsList } from '@/devlink3/ScheduleOptionsList';

import { setSelectedCombIds, useSchedulingFlowStore } from '../store';
import DayCardWrapper from './DayCardWrapper';
import { extractPlanData, groupByDateRange } from './utils';

export type GroupByDateRange = ReturnType<typeof groupByDateRange>;

function StepSlotOptions({ isDebrief }: { isDebrief: boolean }) {
  const filteredSchedulingOptions = useSchedulingFlowStore(
    (state) => state.filteredSchedulingOptions,
  );

  const dateRange = useSchedulingFlowStore((state) => state.dateRange);

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
        slotDescription={
          isDebrief ? (
            <Text content={'Select a date and time for your interview.'} />
          ) : (
            <>
              <Text
                content={`Showing available options between ${dayjs(dateRange.start_date).format('DD MMM YYYY')} - ${dayjs(dateRange.end_date).format('DD MMM YYYY')}`}
                weight={'medium'}
              />

              <Text
                content={`Select multiple available options and then click 'send' to forward them to the candidate for selection.`}
              />
            </>
          )
        }
        slotDateOption={
          <>
            {memoGruopedData?.map((item, index) => {
              return (
                <DayCardWrapper
                  key={item.dateArray.join(', ')}
                  isRadioNeeded={isDebrief}
                  item={item}
                  onClickSelect={onClickSelect}
                  selectedCombIds={selectedCombIds}
                  isDisabled={false}
                  isDayCheckboxNeeded={!isDebrief}
                  isSlotCheckboxNeeded={false}
                  isDayCollapseNeeded={true}
                  isSlotCollapseNeeded={true}
                  index={index}
                  setSelectedCombIds={setSelectedCombIds}
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
