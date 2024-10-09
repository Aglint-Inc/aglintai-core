import { dayjsLocal } from '@aglint/shared-utils';
import { useEffect } from 'react';
import { DateCard } from 'src/app/(public)/_common/_components/DateCard';
import TimeSlotsColumn from 'src/app/(public)/_common/_components/TimeSlotsColumn';

import { UITimeRangeCard } from '@/common/UITimeRangeCard';
import { Loader } from '@/components/Common/Loader';
import { UIButton } from '@/components/Common/UIButton';
import toast from '@/utils/toast';

import useInviteActions from '../../hooks/useInviteActions';
import { useInviteSlots } from '../../hooks/useInviteSlots';
import {
  setSelectedDate,
  setSelectedSlots,
  useCandidateInviteStore,
} from '../../store';
import { type SessionData } from '../../types/types';

const MultiDay = () => {
  const { status } = useInviteSlots();
  if (status === 'error') return <MultiDayError />;
  if (status === 'pending') return <MultiDayLoading />;
  return <MultiDaySuccess />;
};

export default MultiDay;

const MultiDayError = () => {
  const { refetch } = useInviteSlots();
  useEffect(() => {
    toast.error('Something went wrong. Please try again.');
  }, []);
  return (
    <UIButton variant='default' onClick={() => refetch()}>
      Try again
    </UIButton>
  );
};

const MultiDayLoading = () => {
  return (
    <div className={'flex justify-center'}>
      <div className={'w-[120px]'}>
        <Loader />
      </div>
    </div>
  );
};

const MultiDaySuccess = () => {
  const { handleSelectSlot } = useInviteActions();
  const { selectedSlots, selectedDate, selectedDay, timezone } =
    useCandidateInviteStore();

  const { data } = useInviteSlots();

  const sessions: SessionData[] = data.reduce((acc: SessionData[], curr) => {
    const { start_time } = curr[selectedDay - 1][0].sessions[0];
    acc.push({
      date: start_time,
      slots: curr[selectedDay - 1],
    });
    return acc;
  }, []);

  const filteredSession = sessions.find((session) =>
    dayjsLocal(session.date).isSame(selectedDate, 'day'),
  );

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(sessions[0].date);
      setSelectedSlots([sessions[0].slots[0]]);
    }
  }, []);

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex flex-row gap-2 border-b px-4 pb-4'>
          {sessions.map((session, index) => {
            return (
              <DateCard
                key={index}
                textDate={dayjsLocal(session.date)
                  .tz(timezone.tzCode)
                  .format('DD')}
                textMonth={dayjsLocal(session.date)
                  .tz(timezone.tzCode)
                  .format('MMM')}
                textDay={dayjsLocal(session.date)
                  .tz(timezone.tzCode)
                  .format('dddd')}
                onClickDate={() => {
                  setSelectedDate(session.date);
                }}
                isActive={dayjsLocal(selectedDate).isSame(session.date, 'day')}
              />
            );
          })}
        </div>
        <div className='p-4'>
          {selectedDate && (
            <TimeSlotsColumn
              date={selectedDate ?? ''}
              timeRangeArea={filteredSession?.slots.map((slot, ind) => {
                const startTime = dayjsLocal(slot.sessions[0].start_time)
                  .tz(timezone.tzCode)
                  .format('hh:mm A');
                const endTime = dayjsLocal(
                  slot.sessions[slot.sessions.length - 1].end_time,
                )
                  .tz(timezone.tzCode)
                  .format('hh:mm A');

                return (
                  <UITimeRangeCard
                    onClickTime={() => {
                      if (
                        selectedSlots[selectedDay - 1]?.slot_comb_id ===
                        slot.slot_comb_id
                      ) {
                        setSelectedSlots([]);
                      } else {
                        handleSelectSlot(selectedDay - 1, slot);
                      }
                    }}
                    isSemiActive={false}
                    isActive={
                      selectedSlots?.length > 0
                        ? selectedSlots[selectedDay - 1]?.slot_comb_id ===
                          slot.slot_comb_id
                        : false
                    }
                    key={ind}
                    textTime={`${startTime} - ${endTime}`}
                    ShowCloseIcon={true}
                  />
                );
              })}
            />
          )}
        </div>
      </div>
    </>
  );
};
