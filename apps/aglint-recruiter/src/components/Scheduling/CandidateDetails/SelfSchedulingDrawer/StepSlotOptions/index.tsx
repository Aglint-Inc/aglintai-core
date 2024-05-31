import { ScheduleOptionsList } from '@/devlink3/ScheduleOptionsList';

import { useSchedulingFlowStore } from '../store';
import DayCardWrapper from './DayCardWrapper';
import { extractPlanData, groupByDateRange } from './utils';

export type GroupByDateRange = ReturnType<typeof groupByDateRange>;

function StepSlotOptions({ isDebrief }: { isDebrief: boolean }) {
  const schedulingOptions = useSchedulingFlowStore(
    (state) => state.schedulingOptions,
  );

  const groupedData: GroupByDateRange = groupByDateRange(
    extractPlanData(schedulingOptions),
  );

  return (
    <ScheduleOptionsList
      textDescription={
        isDebrief ? 'Select a date and time for your interview.' : ''
      }
      slotDateOption={
        <>
          {groupedData?.map((item) => {
            return (
              <DayCardWrapper
                key={item.dateArray.join(', ')}
                isDebrief={isDebrief}
                item={item}
              />
            );
          })}
        </>
      }
    />
  );
}

export default StepSlotOptions;
