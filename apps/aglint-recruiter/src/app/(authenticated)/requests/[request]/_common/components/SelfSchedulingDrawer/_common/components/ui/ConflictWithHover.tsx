import { type ConflictReason as ConflictReasonType } from '@aglint/shared-types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';

import { UIBadge } from '@/components/Common/UIBadge';

function ConflictWithHover({
  conflictReasons,
  isToolTipVisible = false,
}: {
  conflictReasons: ConflictReasonType[];
  isToolTipVisible: boolean;
}) {
  const softConflicts = conflictReasons.filter(
    (reason) => reason.conflict_type === 'soft',
  );

  const hardConflicts = conflictReasons.filter(
    (reason) =>
      reason.conflict_type !== 'soft' &&
      reason.conflict_type !== 'out_of_working_hours',
  );

  const outsideWorkHours = conflictReasons.filter(
    (reason) => reason.conflict_type === 'out_of_working_hours',
  );

  const allConflicts: {
    type: 'soft' | 'hard' | 'out_of_working_hours';
    conflicts: ConflictReasonType[];
  }[] = [
    {
      type: 'soft',
      conflicts: softConflicts,
    },
    {
      type: 'hard',
      conflicts: hardConflicts,
    },
    {
      type: 'out_of_working_hours',
      conflicts: outsideWorkHours,
    },
  ];

  const isNoConflict =
    [...hardConflicts, ...softConflicts, ...outsideWorkHours].length === 0;

  return (
    <>
      {allConflicts
        .filter((ele) => ele.conflicts.length > 0)
        .map((ele) => {
          return (
            <>
              {isToolTipVisible ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        {
                          <BadgeContent
                            isHardConflict={ele.type === 'hard'}
                            isSoftConflict={ele.type === 'soft'}
                            isOutsideWorkHours={
                              ele.type === 'out_of_working_hours'
                            }
                            textCount={ele.conflicts.length}
                          />
                        }
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className='px-2 py-1'>
                      {conflictReasons.map((item, ind) => {
                        return (
                          <li key={ind}>
                            {item.conflict_type === 'out_of_working_hours'
                              ? item.conflict_event || 'Out of working hours'
                              : item.conflict_event}
                          </li>
                        );
                      })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <BadgeContent
                  isHardConflict={ele.type === 'hard'}
                  isSoftConflict={ele.type === 'soft'}
                  isOutsideWorkHours={ele.type === 'out_of_working_hours'}
                  textCount={ele.conflicts.length}
                />
              )}
            </>
          );
        })}

      {isNoConflict && (
        <BadgeContent
          isHardConflict={false}
          isOutsideWorkHours={false}
          isSoftConflict={false}
          textCount={''}
        />
      )}
    </>
  );
}

export default ConflictWithHover;

const BadgeContent = ({
  isHardConflict,
  isSoftConflict,
  isOutsideWorkHours,
  textCount,
}: {
  isHardConflict: boolean;
  isSoftConflict: boolean;
  isOutsideWorkHours: boolean;
  textCount: number | string;
}) => {
  if (isHardConflict) {
    return (
      <UIBadge
        iconName='OctagonX'
        color='error'
        size='sm'
        iconSize={14}
        textBadge={textCount}
      />
    );
  } else if (isSoftConflict) {
    return (
      <UIBadge
        iconName='TriangleAlert'
        color='warning'
        size='sm'
        iconSize={14}
        textBadge={textCount}
      />
    );
  } else if (isOutsideWorkHours) {
    return (
      <UIBadge
        iconName='ClockArrowDown'
        color='info'
        size='sm'
        iconSize={14}
        textBadge={textCount}
      />
    );
  } else {
    return (
      <UIBadge
        iconName='CheckCircle'
        color='success'
        size={'sm'}
        iconSize={14}
        textBadge={textCount}
      />
    );
  }
};
