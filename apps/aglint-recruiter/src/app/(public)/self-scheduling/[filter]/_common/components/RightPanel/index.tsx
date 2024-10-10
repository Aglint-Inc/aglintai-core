'use client';

import { ScrollArea } from '@components/ui/scroll-area';
import { type ComponentProps } from 'react';
import { SelectedSessionSlotsCard } from 'src/app/(public)/_common/_components/SelectedSessionStotsCard';

import { UIButton } from '@/common/UIButton';

import useInviteActions from '../../hooks/useInviteActions';
import {
  setSelectedDate,
  setSelectedDay,
  useCandidateInviteSelfScheduleStore,
} from '../../store';
import { getDurationText } from '../../utils/utils';
import { SessionCard } from '../ui/SessionCard';

function RightPanel() {
  const { selectedDay, rounds, timezone } =
    useCandidateInviteSelfScheduleStore();
  const { handleSubmit, isPending } = useInviteActions();

  const numberOfSelections = rounds.length || 0;
  const selectedSlots = rounds
    .map((round) => round.selectedSlot)
    .filter((slot) => slot !== null);

  return (
    <div className='relative flex h-full w-full flex-col gap-2'>
      <ScrollArea className='mb-[50px]'>
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
      </ScrollArea>

      <div className='absolute bottom-0 right-0 w-full'>
        {selectedDay === numberOfSelections ? (
          <UIButton
            className='w-full'
            onClick={() => {
              if (selectedSlots.length === numberOfSelections) {
                handleSubmit();
              }
            }}
            isLoading={isPending}
            disabled={selectedSlots.length !== numberOfSelections}
          >
            {'Submit'}
          </UIButton>
        ) : (
          <UIButton
            className='w-full'
            onClick={() => {
              if (selectedSlots.length <= numberOfSelections) {
                setSelectedDate(null);
                setSelectedDay(selectedDay + 1);
              }
            }}
            disabled={rounds[selectedDay - 1]?.selectedSlot === null}
          >
            {'Continue'}
          </UIButton>
        )}
      </div>
    </div>
  );
}

export default RightPanel;
