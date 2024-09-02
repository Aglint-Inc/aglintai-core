import { type ConflictReason as ConflictReasonType } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import React from 'react';

import { GlobalBadge } from '@/devlink/GlobalBadge';
import { ConflictPopover } from '@/devlink3/ConflictPopover';
import { ConflictReason } from '@/devlink3/ConflictReason';
import { CustomTooltip } from '@/src/components/Common/Tooltip';

function ConflictWithHover({
  isNoConflict,
  isHardConflict,
  isOutsideWorkHours,
  isSoftConflict,
  textCount,
  conflictReasons,
  isToolTipVisible = false,
}: {
  isNoConflict: boolean;
  isHardConflict: boolean;
  isOutsideWorkHours: boolean;
  isSoftConflict: boolean;
  textCount: string | number;
  conflictReasons: ConflictReasonType[];
  isToolTipVisible: boolean;
}) {
  const BadgeContent = () => {
    if (isHardConflict) {
      return (
        <GlobalBadge
          iconName={'warning'}
          color={'error'}
          textBadge={textCount}
          showIcon={true}
        />
      );
    } else if (isSoftConflict) {
      return (
        <GlobalBadge
          iconName={'info'}
          color={'warning'}
          textBadge={textCount}
          showIcon={true}
        />
      );
    } else if (isOutsideWorkHours) {
      return (
        <GlobalBadge
          iconName={'dark_mode'}
          color={'info'}
          textBadge={textCount}
          showIcon={true}
        />
      );
    } else if (isNoConflict) {
      return (
        <GlobalBadge
          iconName={'check_circle'}
          color={'success'}
          textBadge={textCount}
          showIcon={true}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <>
      {!isNoConflict && isToolTipVisible ? (
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
            <BadgeContent />
          </Stack>
        </CustomTooltip>
      ) : (
        <Stack>
          <BadgeContent />
        </Stack>
      )}
    </>
  );
}

export default ConflictWithHover;
