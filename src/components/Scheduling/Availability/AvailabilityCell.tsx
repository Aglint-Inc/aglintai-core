import { Popover, Stack } from '@mui/material';
import dayjs from 'dayjs';
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
import { checkSlot, unCheckSlot } from './store';
import UITypography from '../../Common/UITypography';

const AvailabilityCell = ({
  timeDurSlots,
  day,
  cellPath,
  checkedTimeDur,
}: {
  timeDurSlots: InterviewerAvailabliity;
  checkedTimeDur: AvalabilitySlotType[];
  day: string;
  cellPath: string;
}) => {
  const cnt = checkedTimeDur.length;
  const [anchorEl, setAnchorEl] = useState(null);
  const totalSlots = timeDurSlots.availability[String(day)].length;
  return (
    <>
      <TableBodyCell
        slotTimeRanges={
          <>
            {timeDurSlots.availability[String(day)]
              .slice(0, 3)
              .map((timeRange) => {
                const isChecked =
                  checkedTimeDur.filter(
                    (c) => c.startTime === timeRange.startTime,
                  ).length > 0;

                return (
                  <TimeRangePill
                    key={cellPath}
                    cellPath={cellPath}
                    isChecked={isChecked}
                    timeRange={timeRange}
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
        isSelectedCell={cnt > 0}
        textSelectedCount={cnt}
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
                  const isChecked =
                    checkedTimeDur.filter(
                      (c) => c.startTime === timeRange.startTime,
                    ).length > 0;
                  return (
                    <TimeRangePill
                      key={cellPath}
                      cellPath={cellPath}
                      isChecked={isChecked}
                      timeRange={timeRange}
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
  cellPath,
}: {
  timeRange: AvalabilitySlotType;
  isChecked: boolean;
  cellPath: string;
}) => {
  const textTimeRange = `${dayjs(timeRange.startTime).format(
    'hh:mm A',
  )}-${dayjs(timeRange.endTime).format('hh:mm A')}`;

  if (timeRange.status === 'available') {
    return (
      <TimeRangeAvailable
        textTimeRange={textTimeRange}
        isSelected={isChecked}
        onClickPill={{
          onClick: () => {
            if (isChecked) {
              unCheckSlot(`${cellPath}`, timeRange);
            } else {
              checkSlot(`${cellPath}`, timeRange);
            }
          },
        }}
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
