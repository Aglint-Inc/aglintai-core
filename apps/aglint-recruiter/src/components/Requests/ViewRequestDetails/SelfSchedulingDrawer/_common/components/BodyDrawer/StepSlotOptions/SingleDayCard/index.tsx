import {
  type PlanCombinationRespType,
  type SessionCombinationRespType,
} from '@aglint/shared-types';
import { Collapsible, CollapsibleContent } from '@components/ui/collapsible';
import dayjs from 'dayjs';
import { ChevronDown } from 'lucide-react';
import React, { useEffect } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { formatTimeWithTimeZone } from '@/components/Scheduling/utils';
import { userTzDayjs } from '@/services/CandidateScheduleV2/utils/userTzDayjs';

import { SingleDaySchedule } from '../../../SingleDaySchedule';
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

  const sesAllConflicts: PlanCombinationRespType['sessions'][number]['ints_conflicts'] =
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
      onClickSingleDay={() => {
        setCollapse(!collapse);
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
              textCount={''}
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
            <UIButton
              variant='secondary'
              size='sm'
              icon={<ChevronDown />}
              onClick={() => {
                setCollapse(!collapse);
              }}
            />
          )}
        </>
      }
      slotSessionDetails={
        <Collapsible open={isCollapseNeeded ? collapse : true}>
          <CollapsibleContent>
            {sessions.map((session) => {
              return (
                <SessionIndividual key={session.session_id} session={session} />
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      }
    />
  );
}

export default SingleDayCard;
