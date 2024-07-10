import {
  PlanCombinationRespType,
  SessionCombinationRespType,
} from '@aglint/shared-types';
import { Collapse } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';

import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { SingleDaySchedule } from '@/devlink3/SingleDaySchedule';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';

import { formatTimeWithTimeZone } from '../../../../utils';
import ConflictWithHover from './SessionIndividual/ConflictWithHover';
import SessionIndividual from './SessionIndividual/SessionIndividual';

function SingleDayCard({
  item,
  ind,
  isMultiDay,
  isCollapseNeeded = true,
  selectedCombIds = [],
  comb_id,
  isAutoCollapse,
}: {
  item: {
    date: string;
    sessions: SessionCombinationRespType[];
    no_slot_reasons: {
      reason: string;
    }[];
  };
  ind: number;
  isMultiDay: boolean;
  isCollapseNeeded?: boolean;
  selectedCombIds: string[];
  comb_id: string;
  isAutoCollapse: boolean;
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
    .filter(
      (item) =>
        item.conflict_type !== 'soft' &&
        item.conflict_type !== 'out_of_working_hours',
    );

  const sesOutsideWorkHours = sesAllConflicts
    .map((item) => item.conflict_reasons)
    .map((item) => item)
    .flat()
    .filter((item) => item.conflict_type === 'out_of_working_hours');

  const [collapse, setCollapse] = React.useState(false);

  useEffect(() => {
    if (isAutoCollapse) {
      if (selectedCombIds.length > 0 && selectedCombIds.includes(comb_id)) {
        setCollapse(true);
      } else {
        setCollapse(false);
      }
    }
  }, [selectedCombIds]);

  return (
    <SingleDaySchedule
      onClickSingleDay={{
        onClick: () => {
          setCollapse(!collapse);
        },
      }}
      rotateArrow={{
        style: {
          display: isCollapseNeeded ? 'flex' : 'none',
        },
      }}
      isMultiDay={isMultiDay}
      textDayCount={`Day ${ind + 1}`}
      textDate={dayjs(day).format('MMMM DD')}
      textTotalTimeRange={totalTimeRange}
      slotConflicts={
        <>
          {sesAllConflicts.length === 0 && (
            <ConflictWithHover
              isNoConflict={true}
              isHardConflict={false}
              isOutsideWorkHours={false}
              isSoftConflict={false}
              conflictReasons={[]}
              textCount={'No conflicts'}
              isToolTipVisible={false}
            />
          )}
          {sesSoftConflicts.length > 0 && (
            <ConflictWithHover
              isHardConflict={false}
              isOutsideWorkHours={false}
              isSoftConflict={true}
              isNoConflict={false}
              conflictReasons={sesSoftConflicts}
              textCount={sesSoftConflicts.length}
              isToolTipVisible={false}
            />
          )}
          {sesHardConflicts.length > 0 && (
            <ConflictWithHover
              isNoConflict={false}
              isHardConflict={true}
              isOutsideWorkHours={false}
              isSoftConflict={false}
              conflictReasons={sesHardConflicts}
              textCount={sesHardConflicts.length}
              isToolTipVisible={false}
            />
          )}
          {sesOutsideWorkHours.length > 0 && (
            <ConflictWithHover
              isNoConflict={false}
              isHardConflict={false}
              isOutsideWorkHours={true}
              isSoftConflict={false}
              conflictReasons={sesOutsideWorkHours}
              textCount={sesOutsideWorkHours.length}
              isToolTipVisible={false}
            />
          )}
          {isCollapseNeeded && (
            <IconButtonSoft
              size={1}
              color={'neutral'}
              iconName={'keyboard_double_arrow_down'}
              onClickButton={{
                onClick: () => {
                  setCollapse(!collapse);
                },
              }}
            />
          )}
        </>
      }
      slotSessionDetails={
        <Collapse in={isCollapseNeeded ? collapse : true}>
          {sessions.map((session) => {
            return (
              <SessionIndividual key={session.session_id} session={session} />
            );
          })}
        </Collapse>
      }
    />
  );
}

export default SingleDayCard;
