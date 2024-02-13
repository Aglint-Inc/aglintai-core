import dayjs from 'dayjs';
import React from 'react';

import { PanelDetailTableHeaderRow, TableHeaderCell } from '@/devlink2';

import { useAvailableStore } from './store';
import { DAYS_LENGTH } from './utils';

const CalenderHeaderRow = () => {
  const dateRangeView = useAvailableStore((state) => state.dateRangeView);

  return (
    <>
      <PanelDetailTableHeaderRow
        slotHeaderCells={
          <>
            {Array(DAYS_LENGTH)
              .fill(-1)
              .map((_, idx) => {
                return (
                  <TableHeaderCell
                    key={idx}
                    textDateMonth={dayjs(dateRangeView.startDate)
                      .add(idx, 'day')
                      .format('DD MMM')}
                  />
                );
              })}
          </>
        }
      />
    </>
  );
};

export default CalenderHeaderRow;
