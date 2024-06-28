import { ConflictReason as ConflictReasonType } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import React from 'react';

import { ConflictChip } from '@/devlink3/ConflictChip';
import { ConflictPopover } from '@/devlink3/ConflictPopover';
import { ConflictReason } from '@/devlink3/ConflictReason';
import { CustomTooltip } from '@/src/components/Common/Tooltip';

function ConflictWithHover({
  isHardConflict,
  isOutsideWorkHours,
  isSoftConflict,
  textCount,
  conflictReasons,
}: {
  isHardConflict: boolean;
  isOutsideWorkHours: boolean;
  isSoftConflict: boolean;
  textCount: number;
  conflictReasons: ConflictReasonType[];
}) {
  return (
    <>
      <CustomTooltip
        title={
          <React.Fragment>
            <ConflictPopover
              isHardConflict={isHardConflict}
              isOutsideWorkHours={isOutsideWorkHours}
              isSoftConflict={isSoftConflict}
              slotConflictReason={conflictReasons.map((item, ind) => {
                return (
                  <ConflictReason
                    key={ind}
                    textConflictReason={
                      item.conflict_type === 'out_of_working_hours'
                        ? item.conflict_event || 'Out of working hours'
                        : item.conflict_event
                    }
                  />
                );
              })}
            />
          </React.Fragment>
        }
      >
        <Stack>
          <ConflictChip
            isHardConflict={isHardConflict}
            isOutsideWorkHours={isOutsideWorkHours}
            isSoftConflict={isSoftConflict}
            textCount={textCount}
          />
        </Stack>
      </CustomTooltip>
    </>
  );
}

export default ConflictWithHover;
