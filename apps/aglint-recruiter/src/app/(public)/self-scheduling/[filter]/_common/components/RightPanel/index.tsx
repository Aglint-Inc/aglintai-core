'use client';

import { ScrollArea } from '@components/ui/scroll-area';

import { UIButton } from '@/common/UIButton';

import useInviteActions from '../../hooks/useInviteActions';
import {
  setSelectedDate,
  setSelectedDay,
  useCandidateInviteSelfScheduleStore,
} from '../../store';
import Rounds from './Rounds';

function RightPanel() {
  const { selectedDay, rounds } = useCandidateInviteSelfScheduleStore();
  const { handleSubmit, isPending } = useInviteActions();

  const numberOfSelections = rounds.length || 0;

  const selectedSlots = rounds
    .map((round) => round.selectedSlot)
    .filter((slot) => slot !== null);

  return (
    <>
      <ScrollArea className='h-[calc(100%-50px)]'>
        <Rounds />
      </ScrollArea>

      <div className='w-full pt-4'>
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
            data-testid={'booking-button'}
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
            data-testid={'continue-button'}
          >
            {'Continue'}
          </UIButton>
        )}
      </div>
    </>
  );
}

export default RightPanel;
