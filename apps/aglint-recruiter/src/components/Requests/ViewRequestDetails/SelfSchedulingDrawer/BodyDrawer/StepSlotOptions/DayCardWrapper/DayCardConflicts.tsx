import { SessionCombinationRespType } from '@aglint/shared-types';
import React from 'react';

import ConflictWithHover from '../SingleDayCard/SessionIndividual/ConflictWithHover';

function DayCardConflicts({
  slotsWithDaySessions,
}: {
  slotsWithDaySessions: {
    daySessions: {
      date: string;
      sessions: SessionCombinationRespType[];
    }[];
    plan_comb_id: string;
  }[];
}) {
  const dayNoConflicts = slotsWithDaySessions.filter((slot) =>
    slot.daySessions.every((item) =>
      item.sessions.every((session) => session.ints_conflicts.length === 0),
    ),
  );

  const daySoftConflicts = slotsWithDaySessions.filter((slot) =>
    slot.daySessions.some((item) =>
      item.sessions.some(
        (session) =>
          session.ints_conflicts.length > 0 &&
          session.ints_conflicts.some(
            (conflict) =>
              conflict.conflict_reasons.length > 0 &&
              conflict.conflict_reasons.some(
                (reason) => reason.conflict_type === 'soft',
              ),
          ),
      ),
    ),
  );

  const dayHardConflicts = slotsWithDaySessions.filter((slot) =>
    slot.daySessions.some((item) =>
      item.sessions.some(
        (session) =>
          session.ints_conflicts.length > 0 &&
          session.ints_conflicts.some(
            (conflict) =>
              conflict.conflict_reasons.length > 0 &&
              conflict.conflict_reasons.some(
                (reason) =>
                  reason.conflict_type !== 'soft' &&
                  reason.conflict_type !== 'out_of_working_hours',
              ),
          ),
      ),
    ),
  );

  const dayOutsideWorkHours = slotsWithDaySessions.filter((slot) =>
    slot.daySessions.some((item) =>
      item.sessions.some(
        (session) =>
          session.ints_conflicts.length > 0 &&
          session.ints_conflicts.some(
            (conflict) =>
              conflict.conflict_reasons.length > 0 &&
              conflict.conflict_reasons.some(
                (reason) => reason.conflict_type === 'out_of_working_hours',
              ),
          ),
      ),
    ),
  );
  return (
    <>
      {dayNoConflicts.length > 0 && (
        <ConflictWithHover
          isNoConflict={true}
          isHardConflict={false}
          isOutsideWorkHours={false}
          isSoftConflict={false}
          conflictReasons={[]}
          textCount={dayNoConflicts.length}
          isToolTipVisible={false}
        />
      )}
      {daySoftConflicts.length > 0 && (
        <ConflictWithHover
          isHardConflict={false}
          isOutsideWorkHours={false}
          isSoftConflict={true}
          isNoConflict={false}
          conflictReasons={[]}
          textCount={daySoftConflicts.length}
          isToolTipVisible={false}
        />
      )}
      {dayHardConflicts.length > 0 && (
        <ConflictWithHover
          isNoConflict={false}
          isHardConflict={true}
          isOutsideWorkHours={false}
          isSoftConflict={false}
          conflictReasons={[]}
          textCount={dayHardConflicts.length}
          isToolTipVisible={false}
        />
      )}
      {dayOutsideWorkHours.length > 0 && (
        <ConflictWithHover
          isNoConflict={false}
          isHardConflict={false}
          isOutsideWorkHours={true}
          isSoftConflict={false}
          conflictReasons={[]}
          textCount={dayOutsideWorkHours.length}
          isToolTipVisible={false}
        />
      )}
    </>
  );
}

export default DayCardConflicts;
