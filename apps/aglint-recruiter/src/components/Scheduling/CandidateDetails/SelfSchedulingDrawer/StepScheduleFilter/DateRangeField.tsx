import { MenuItem, Stack, TextField } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { RolesPill } from '@/devlink/RolesPill';

import { setFilters, useSchedulingFlowStore } from '../store';

interface DateRange {
  startTime: string;
  endTime: string;
}

function DateRangeField() {
  const filters = useSchedulingFlowStore((state) => state.filters);
  const startTime = new Date();
  startTime.setHours(7, 0, 0, 0); // Start time at 9:00 AM
  const endTime = new Date();
  endTime.setHours(20, 0, 0, 0); // End time at 8:00 PM
  const intervalInMinutes = 120; // Interval set to 60 minutes (1 hour)

  const dateRanges = generateDateRanges(startTime, endTime, intervalInMinutes);

  const filteredDateRanges = dateRanges.filter((dateRange) => {
    return !filters.preferredDateRanges.some(
      (range) => range.startTime === dateRange.startTime,
    );
  });

  return (
    <Stack spacing={2}>
      {filters.preferredDateRanges.length > 0 && (
        <Stack gap={1} direction={'row'} sx={{ flexWrap: 'wrap' }}>
          {filters.preferredDateRanges.map((dateRange, index) => {
            return (
              <RolesPill
                textRoles={`${dayjs(dateRange.startTime).format('hh:mm A')} - ${dayjs(dateRange.endTime).format('hh:mm A')}`}
                key={index}
                onClickRemoveRoles={{
                  onClick: () => {
                    setFilters({
                      preferredDateRanges: filters.preferredDateRanges.filter(
                        (range) => range.startTime !== dateRange.startTime,
                      ),
                    });
                  },
                }}
              />
            );
          })}
        </Stack>
      )}

      <TextField
        fullWidth
        select
        value={[]}
        sx={{
          width: '100%',
          '& .MuiSelect-select span::before': {
            content: `"Select time ranges"`,
            color: 'grey.500',
          },
          '& .MuiList-root-MuiMenu-list': {
            padding: '0px !important',
          },
        }}
      >
        {filteredDateRanges.map((dateRange, index) => (
          <MenuItem
            key={index}
            value={dateRange.startTime}
            onClick={() => {
              if (
                filters.preferredDateRanges.some(
                  (range) => range.startTime === dateRange.startTime,
                )
              ) {
                setFilters({
                  preferredDateRanges: filters.preferredDateRanges.filter(
                    (range) => range.startTime !== dateRange.startTime,
                  ),
                });
              } else {
                setFilters({
                  preferredDateRanges: [
                    ...filters.preferredDateRanges,
                    dateRange,
                  ],
                });
              }
            }}
          >
            {dayjs(dateRange.startTime).format('hh:mm A')} -{' '}
            {dayjs(dateRange.endTime).format('hh:mm A')}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}

export default DateRangeField;

function generateDateRanges(
  startTime: Date,
  endTime: Date,
  intervalInMinutes: number,
): DateRange[] {
  const start = dayjs(startTime);
  const end = dayjs(endTime);

  // Calculate the total number of intervals
  const totalIntervals = end.diff(start, 'minute') / intervalInMinutes;

  // Initialize an array to store the date ranges
  const dateRanges: DateRange[] = [];

  // Generate date ranges based on the intervals
  for (let i = 0; i < totalIntervals; i++) {
    const rangeStartTime = start
      .add(i * intervalInMinutes, 'minute')
      .format('YYYY-MM-DD HH:mm:ss');
    const rangeEndTime = start
      .add((i + 1) * intervalInMinutes, 'minute')
      .format('YYYY-MM-DD HH:mm:ss');
    dateRanges.push({ startTime: rangeStartTime, endTime: rangeEndTime });
  }

  return dateRanges;
}
