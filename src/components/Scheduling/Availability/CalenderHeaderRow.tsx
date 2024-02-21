import dayjs from 'dayjs';
import React from 'react';

import { PanelDetailTableHeaderRow, TableHeaderCell } from '@/devlink2';

import { StateAvailibility } from './availability.types';
import { useAvailableStore } from './store';

const CalenderHeaderRow = () => {
  const dateRangeTableView = useAvailableStore(
    (state) => state.dateRangeTableView,
  );
  const dayKeys = getDateRangeKeys(dateRangeTableView);
  return (
    <>
      <PanelDetailTableHeaderRow
        slotHeaderCells={
          <>
            {dayKeys.map((dayKey, idx) => {
              return (
                <TableHeaderCell
                  key={idx}
                  textDateMonth={dayjs(dayKey).format('dddd DD MMM')}
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

export const getDateRangeKeys = (
  dateRange: StateAvailibility['dateRangeView'],
) => {
  let diff = dayjs(dateRange.endDate).diff(dateRange.startDate, 'day') + 1;
  const dayKeys = [];
  let itr = 0;
  while (itr < diff) {
    dayKeys.push(
      dayjs(dateRange.startDate).add(itr, 'day').format('YYYY-MM-DD'),
    );
    itr += 1;
  }

  return dayKeys;
};
