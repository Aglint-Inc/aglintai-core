import { type SessionCombinationRespType } from '@aglint/shared-types';

import ConflictWithHover from '../../../ui/ConflictWithHover';

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
  const dayAllConflicts = slotsWithDaySessions.flatMap((slot) =>
    slot.daySessions.flatMap((item) =>
      item.sessions.flatMap((session) =>
        session.ints_conflicts.flatMap((item) => item.conflict_reasons),
      ),
    ),
  );

  return (
    <>
      <ConflictWithHover
        conflictReasons={dayAllConflicts}
        isToolTipVisible={false}
      />
    </>
  );
}

export default DayCardConflicts;
