import { Popover, Stack } from '@mui/material';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useState } from 'react';

import {
  TableBodyCell,
  TimeRangeAvailable,
  TimeRangeDisabled,
  TimeRangeRequested,
  ViewMorePopover,
} from '@/devlink2';
import { TimeRangeConfirmed } from '@/devlink2/TimeRangeConfirmed';

import {
  AvalabilitySlotType,
  InterviewerAvailabliity,
} from './availability.types';
import UITypography from '../../Common/UITypography';

const AvailabilityCell = ({
  timeDurSlots,
  day,
  cellPath,
  timeZone,
}: {
  timeDurSlots: InterviewerAvailabliity;
  day: string;
  cellPath: string;
  timeZone: string;
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const totalSlots = timeDurSlots.availability[String(day)]?.length ?? 0;
  if (!timeDurSlots.availability[String(day)]) {
    return <TableBodyCell />;
  }

  return (
    <>
      <TableBodyCell
        slotTimeRanges={
          <>
            {timeDurSlots.availability[String(day)]
              .slice(0, 3)
              .map((timeRange) => {
                return (
                  <TimeRangePill
                    key={cellPath}
                    timeRange={timeRange}
                    isChecked={false}
                    timeZone={timeZone}
                  />
                );
              })}
            {totalSlots - 3 > 0 && (
              <Stack
                style={{ marginTop: '2px', cursor: 'pointer' }}
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                }}
              >
                <UITypography type='extraSmall'>
                  + {totalSlots - 3} More
                </UITypography>
              </Stack>
            )}
          </>
        }
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        sx={{
          mt: '-100px',
          '& .MuiPaper-root': {
            border: 'none !important',
            overflow: 'visible !important',
          },
        }}
      >
        <ViewMorePopover
          onClickClose={{
            onClick: () => {
              setAnchorEl(null);
            },
          }}
          slotTimeRage={
            <>
              {timeDurSlots.availability[String(day)]
                .slice(3)
                .map((timeRange) => {
                  return (
                    <TimeRangePill
                      key={cellPath}
                      isChecked={false}
                      timeRange={timeRange}
                      timeZone={timeZone}
                    />
                  );
                })}
            </>
          }
          textdate={dayjs(day).format('dddd DD MMM')}
        />
      </Popover>
    </>
  );
};

export default AvailabilityCell;

const TimeRangePill = ({
  timeRange,
  isChecked,
  timeZone,
}: {
  timeRange: AvalabilitySlotType;
  isChecked: boolean;
  timeZone: string;
}) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const textTimeRange = `${dayjs
    .tz(timeRange.startTime, timeZone)
    .format('hh:mm A')}-${dayjs
    .tz(timeRange.endTime, timeZone)
    .format('hh:mm A')} (${timeZone})`;

  if (timeRange.status === 'available') {
    return (
      <TimeRangeAvailable
        textTimeRange={textTimeRange}
        isSelected={isChecked}
      />
    );
  }
  if (timeRange.status === 'requested') {
    return <TimeRangeRequested textTimeRange={textTimeRange} />;
  }
  if (timeRange.status === 'confirmed') {
    return <TimeRangeConfirmed textTimeRange={textTimeRange} />;
  }
  if (timeRange.status === 'declined') {
    return <TimeRangeDisabled textTimeRange={textTimeRange} />;
  }
};
