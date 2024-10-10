'use client';

import { ScrollArea } from '@components/ui/scroll-area';

import { UIButton } from '@/common/UIButton';

import useInviteActions from '../../hooks/useInviteActions';
import { useInviteSlots } from '../../hooks/useInviteSlots';
import {
  setSelectedDate,
  setSelectedDay,
  useCandidateInviteStore,
} from '../../store';
import Rounds from './Rounds';

function RightPanel() {
  const { selectedDay, rounds } = useCandidateInviteStore();
  const { data } = useInviteSlots();
  const { handleSubmit, isPending } = useInviteActions();

  const numberOfDays = data?.length > 0 ? data[0]?.length : 0;
  const selectedSlots = rounds
    .map((round) => round.selectedSlots)
    .filter((slot) => slot !== null);

  return (
    <>
      <ScrollArea className='h-[calc(100%-50px)]'>
        <Rounds />
      </ScrollArea>
      <div className='w-full pt-4'>
        {selectedDay === numberOfDays ? (
          <UIButton
            className='w-full'
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
            className='w-full'
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
    </>
  );
}

export default RightPanel;
