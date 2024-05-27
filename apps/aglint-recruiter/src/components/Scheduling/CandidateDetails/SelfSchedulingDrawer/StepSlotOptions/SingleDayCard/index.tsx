import {
  PlanCombinationRespType,
  SessionCombinationRespType,
} from '@aglint/shared-types';
import dayjs from 'dayjs';
import React from 'react';

import { ConflictHard } from '@/devlink3/ConflictHard';
import { ConflictSoft } from '@/devlink3/ConflictSoft';
import { NoConflicts } from '@/devlink3/NoConflicts';
import { SingleDaySchedule } from '@/devlink3/SingleDaySchedule';
import { userTzDayjs } from '@/src/services/CandidateSchedule/utils/userTzDayjs';

import { formatTimeWithTimeZone } from '../../../../utils';
import SessionIndividual from './SessionIndividual/SessionIndividual';

function SingleDayCard({
  item,
  ind,
  isMultiDay,
}: {
  item: {
    date: string;
    sessions: SessionCombinationRespType[];
  };
  ind: number;
  isMultiDay: boolean;
}) {
  const day = item.date;
  const sessions = item.sessions;
  const totalTimeRange = formatTimeWithTimeZone({
    start_time: sessions[0].start_time,
    end_time: sessions[sessions.length - 1].end_time,
    timeZone: userTzDayjs.tz.guess(),
  });

  let sesAllConflicts: PlanCombinationRespType['sessions'][number]['ints_conflicts'] =
    [];

  sessions.map((session) =>
    session.ints_conflicts.map((item) => sesAllConflicts.push(item)),
  );

  const sesSoftConflicts = sesAllConflicts
    .map((item) => item.conflict_reasons)
    .map((item) => item)
    .flat()
    .filter((item) => item.conflict_type === 'soft');

  const sesHardConflicts = sesAllConflicts
    .map((item) => item.conflict_reasons)
    .map((item) => item)
    .flat()
    .filter((item) => item.conflict_type !== 'soft');

  return (
    <SingleDaySchedule
      isMultiDay={isMultiDay}
      textDayCount={`Day ${ind + 1}`}
      textDate={dayjs(day).format('MMMM DD')}
      textTotalTimeRange={totalTimeRange}
      slotConflicts={
        <>
          {sesAllConflicts.length === 0 && <NoConflicts />}
          {sesSoftConflicts.length > 0 && (
            <ConflictSoft
              isHover={false}
              textConflict={sesSoftConflicts.length}
            />
          )}
          {sesHardConflicts.length > 0 && (
            <ConflictHard
              isHover={false}
              textConflict={sesHardConflicts.length}
            />
          )}
        </>
      }
      slotSessionDetails={
        <>
          {sessions.map((session) => {
            return (
              <SessionIndividual key={session.session_id} session={session} />
            );
          })}
        </>
      }
    />
  );
}

export default SingleDayCard;
