import { type SessionCombinationRespType } from '@aglint/shared-types';
import { Collapsible, CollapsibleContent } from '@components/ui/collapsible';
import dayjs from 'dayjs';
import { ChevronDown } from 'lucide-react';
import React, { useEffect } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { formatTimeWithTimeZone } from '@/components/Scheduling/utils';
import { userTzDayjs } from '@/services/CandidateScheduleV2/utils/userTzDayjs';

import ConflictWithHover from '../../../../ConflictWithHover';
import { SingleDaySchedule } from '../../../ui/SingleDaySchedule';
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

  const sesAllConflicts = sessions.flatMap((session) =>
    session.ints_conflicts.flatMap((item) => item.conflict_reasons),
  );

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
          <ConflictWithHover
            conflictReasons={sesAllConflicts}
            isToolTipVisible={false}
          />

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
