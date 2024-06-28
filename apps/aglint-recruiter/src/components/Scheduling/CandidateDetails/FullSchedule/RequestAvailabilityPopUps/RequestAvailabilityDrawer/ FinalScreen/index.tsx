import { Stack } from '@mui/material';
import React from 'react';

import DayCardWrapper from '../../../../SchedulingDrawer/StepSlotOptions/DayCardWrapper';
import { useAvailabilityContext } from '../../RequestAvailabilityContext';

function FinalScreen() {
  const { selectedDateSlots } = useAvailabilityContext();
  return (
    <div>
      <Stack
        p={2}
        overflow={'auto'}
        height={'calc(100vh - 96px)'}
        direction={'column'}
      >
        {selectedDateSlots?.map((item, index) => {
          const date = item.dateSlots[0]?.sessions[0]?.start_time;
          return (
            <DayCardWrapper
              key={index}
              isDebrief={true}
              selectedCombIds={[]}
              item={{
                dateArray: [date],
                plans: item.dateSlots,
              }}
              onClickSelect={() => {}}
              isDayCollapseNeeded={false}
              isSlotCollapseNeeded={false}
              isCheckboxAndRadio={false}
            />
          );
        })}
      </Stack>
    </div>
  );
}

export default FinalScreen;
