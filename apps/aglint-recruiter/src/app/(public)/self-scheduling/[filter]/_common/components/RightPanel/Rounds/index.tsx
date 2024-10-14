import { type ComponentProps } from 'react';
import { SelectedSessionSlotsCard } from 'src/app/(public)/_common/_components/SelectedSessionStotsCard';

import { UIButton } from '@/common/UIButton';

import {
  setSelectedDate,
  setSelectedDay,
  useCandidateInviteSelfScheduleStore,
} from '../../../store';
import { getDurationText } from '../../../utils';
import { SessionCard } from '../../ui/SessionCard';

function Rounds() {
  const { selectedDay, rounds, timezone } =
    useCandidateInviteSelfScheduleStore();

  const numberOfSelections = rounds.length || 0;

  return (
    <div className='flex flex-col gap-2'>
      {rounds?.map((round, ind) => {
        const dates: ComponentProps<
          typeof SelectedSessionSlotsCard
        >['selectedDates'] = round.selectedSlot
          ? [
              {
                curr_day: round.selectedSlot.start_time,
                slots: [
                  {
                    startTime: round.selectedSlot.start_time,
                    endTime: round.selectedSlot.end_time,
                    isSlotAvailable: true,
                  },
                ],
              },
            ]
          : [];

        const totalDuration = round.sessions.reduce((acc, curr) => {
          acc = acc + curr.interview_session.session_duration;
          return acc;
        }, 0);

        return (
          <>
            <SelectedSessionSlotsCard
              timezone={timezone.tzCode}
              isActive={ind + 1 === selectedDay}
              textDayCount={`Day ${ind + 1}`}
              textSelectedSlots='Selected Slot'
              slotChangeButton={
                numberOfSelections > 1 &&
                round.selectedSlot && (
                  <UIButton
                    size={'sm'}
                    variant='default'
                    onClick={() => {
                      setSelectedDate(dates[0].curr_day);
                      setSelectedDay(ind + 1);
                    }}
                  >
                    Change
                  </UIButton>
                )
              }
              isSubmitted={true}
              selectedDates={dates}
              isSelected={true}
              textTotalDuration={getDurationText(totalDuration)}
              slotSessionInfo={round.sessions.map((session, i) => {
                return (
                  <SessionCard
                    key={i}
                    duration={session.interview_session.session_duration}
                    name={session.interview_session.name}
                    schedule_type={session.interview_session.schedule_type}
                    session_type={session.interview_session.session_type}
                  />
                );
              })}
            />
          </>
        );
      })}
    </div>
  );
}

export default Rounds;
