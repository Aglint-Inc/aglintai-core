'use client';

import { ScrollArea } from '@components/ui/scroll-area';
import { type ComponentProps } from 'react';
import { SelectedSessionSlotsCard } from 'src/app/(public)/_common/_components/SelectedSessionStotsCard';

import { UIButton } from '@/common/UIButton';

import useInviteActions from '../../hooks/useInviteActions';
import { useInviteSlots } from '../../hooks/useInviteSlots';
import {
  setSelectedDate,
  setSelectedDay,
  useCandidateInviteStore,
} from '../../store';
import { getDurationText } from '../../utils/utils';
import { SessionCard } from '../ui/SessionCard';

function RightPanel() {
  const { selectedDay, rounds } = useCandidateInviteStore();
  const { data } = useInviteSlots();
  const { handleSubmit, isPending } = useInviteActions();

  const numberOfDays = data?.length > 0 ? data[0]?.length : 0;
  const selectedSlots = rounds
    .map((round) => round.selectedSlots)
    .filter((slot) => slot !== null);

  return (
    <div className='flex flex-col gap-2'>
      <ScrollArea className='h-[63vh]'>
        <div className='flex flex-col gap-2'>
          {rounds?.map((round, ind) => {
            const dates: ComponentProps<
              typeof SelectedSessionSlotsCard
            >['selectedDates'] = round.selectedSlots
              ? [
                  {
                    curr_day: round.selectedSlots.sessions[0].start_time,
                    slots: [
                      {
                        startTime: round.selectedSlots.sessions[0].start_time,
                        endTime:
                          round.selectedSlots.sessions[
                            round.selectedSlots.sessions.length - 1
                          ].end_time,
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
                  isActive={ind + 1 === selectedDay}
                  textDayCount={`Day ${ind + 1}`}
                  textSelectedSlots='Selected Slot'
                  slotChangeButton={
                    numberOfDays > 1 &&
                    round.selectedSlots && (
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
      </ScrollArea>

      {selectedDay === numberOfDays ? (
        <UIButton
          onClick={() => {
            if (selectedSlots.length === numberOfDays) {
              handleSubmit();
            }
          }}
          isLoading={isPending}
          disabled={selectedSlots.length !== numberOfDays}
        >
          {'Submit'}
        </UIButton>
      ) : (
        <UIButton
          onClick={() => {
            if (selectedSlots.length <= numberOfDays) {
              setSelectedDate(null);
              setSelectedDay(selectedDay + 1);
            }
          }}
          disabled={rounds[selectedDay - 1]?.selectedSlots === null}
        >
          {'Continue'}
        </UIButton>
      )}
    </div>
  );
}

export default RightPanel;
