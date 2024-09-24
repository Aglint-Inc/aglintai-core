import React from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';

import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';
import DaySessionCard from './DaySessionCard';
import SlotsPicker from './SlotsPicker';

function MultiDaySessions() {
  const {
    submitting,
    isSubmitted,
    multiDaySessions,
    daySlots,
    submitAvailability,
    openDaySlotPopup,
    setOpenDaySlotPopup,
  } = useRequestAvailabilityContext();
  return (
    <>
      <UIDialog
        open={openDaySlotPopup !== null}
        onClose={() => {
          setOpenDaySlotPopup(null);
        }}
        title='Available Slots'
        size='xl'
        slotButtons={<></>}
      >
        <div className="h-[600px] overflow-auto">
        <SlotsPicker singleDay={false} />
        </div>
      </UIDialog>
      <div className='flex w-full flex-col items-center gap-4'>
        <div className='flex w-full flex-col gap-2'>
          {multiDaySessions.map((sessions, i) => {
            const totalSessionMinutes = sessions.reduce(
              (accumulator, session) => accumulator + session.session_duration,
              0,
            );
            const dates =
              daySlots.find((ele) => ele.round === i + 1)?.dates || [];
            return (
              <DaySessionCard
                key={i}
                cardIndex={i}
                totalSessionMinutes={totalSessionMinutes}
                sessions={sessions}
                dates={dates}
              />
            );
          })}
        </div>
        <div className='w-72'>
          {!isSubmitted && (
            <UIButton
              size='md'
              className='w-full'
              onClick={submitAvailability}
              variant='outline'
              disabled={multiDaySessions.length !== daySlots.length}
            >
              {submitting ? 'Submitting...' : 'Submit Availability'}
            </UIButton>
          )}
        </div>
      </div>
    </>
  );
}

export default MultiDaySessions;
