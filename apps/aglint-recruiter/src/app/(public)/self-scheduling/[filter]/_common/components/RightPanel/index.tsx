'use client';

import { ScrollArea } from '@components/ui/scroll-area';
import { cn } from '@lib/utils';
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
  const { selectedSlots, selectedDay } = useCandidateInviteStore();
  const { data } = useInviteSlots();
  const { handleSubmit, isPending } = useInviteActions();

  const numberOfDays = data?.length > 0 ? data[0]?.length : 0;

  return (
    <div className='flex flex-col gap-2'>
      <ScrollArea className='h-[63vh]'>
        <div className='flex flex-col gap-2'>
          {selectedSlots?.map((slot, ind) => {
            const dates: ComponentProps<
              typeof SelectedSessionSlotsCard
            >['selectedDates'] = [
              {
                curr_day: slot.sessions[0].start_time,
                slots: [
                  {
                    startTime: slot.sessions[0].start_time,
                    endTime: slot.sessions[slot.sessions.length - 1].end_time,
                    isSlotAvailable: true,
                  },
                ],
              },
            ];

            const totalDuration = slot.sessions.reduce((acc, curr) => {
              acc = acc + curr.duration;
              return acc;
            }, 0);

            return (
              <>
                <div className={cn('rounded-lg border')}>
                  <SelectedSessionSlotsCard
                    textDayCount={`Day ${ind + 1}`}
                    textSelectedSlots='Selected Slot'
                    slotChangeButton={
                      numberOfDays > 1 &&
                      selectedSlots.length > 1 && (
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
                    slotSessionInfo={slot.sessions.map((session, i) => {
                      return (
                        <SessionCard
                          key={i}
                          duration={session.duration}
                          name={session.session_name}
                          schedule_type={session.schedule_type}
                          session_type={session.session_type}
                        />
                      );
                    })}
                  />
                </div>
              </>
            );
          })}
        </div>
      </ScrollArea>

      <UIButton
        onClick={() => {
          if (selectedSlots.length === numberOfDays) {
            handleSubmit();
          } else if (selectedSlots.length <= numberOfDays) {
            setSelectedDate(null);
            setSelectedDay(selectedDay + 1);
          }
        }}
        isLoading={isPending}
      >
        {selectedSlots.length === numberOfDays ? 'Submit' : 'Continue'}
      </UIButton>
    </div>
  );
}

export default RightPanel;
