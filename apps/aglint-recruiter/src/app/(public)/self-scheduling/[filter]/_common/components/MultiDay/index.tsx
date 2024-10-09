import { dayjsLocal } from '@aglint/shared-utils';
import { useToast } from '@components/hooks/use-toast';
import { useEffect } from 'react';
import { DateCard } from 'src/app/(public)/_common/_components/DateCard';
import TimeSlotsColumn from 'src/app/(public)/_common/_components/TimeSlotsColumn';

import { UITimeRangeCard } from '@/common/UITimeRangeCard';
import { Loader } from '@/components/Common/Loader';
import { UIButton } from '@/components/Common/UIButton';
import toast from '@/utils/toast';

import useInviteActions from '../../hooks/useInviteActions';
import { useInviteSlots } from '../../hooks/useInviteSlots';
import { setSelectedDate, useCandidateInviteStore } from '../../store';
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
  const { toast } = useToast();
  const { handleSelectSlot } = useInviteActions();
  const { selectedDate, selectedDay, timezone, rounds } =
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
    if (!selectedDate && sessions?.length > 0) {
      if (selectedDay === 1) {
        setSelectedDate(sessions[0].date);
      } else {
        const validsessions = sessions.filter(
          (session) =>
            !dayjsLocal(selectedSlots[selectedDay - 2].sessions[0].start_time)
              .tz(timezone.tzCode)
              .isSameOrAfter(session.date, 'day'),
        );
        if (validsessions.length === 0) {
          toast({
            title: 'No available slots',
            variant: 'destructive',
          });
        }
        setSelectedDate(validsessions[0].date);
      }
    }
  }, [selectedDay]);

  const selectedSlots = rounds
    .map((round) => round.selectedSlots)
    .filter((slot) => slot !== null);

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
                isActive={dayjsLocal(selectedDate)
                  .tz(timezone.tzCode)
                  .isSame(session.date, 'day')}
                isDisable={
                  selectedDay > 1 &&
                  dayjsLocal(
                    selectedSlots[selectedDay - 2].sessions[0].start_time,
                  )
                    .tz(timezone.tzCode)
                    .isSameOrAfter(session.date, 'day')
                }
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
                      handleSelectSlot(selectedDay - 1, slot);
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
                    ShowCloseIcon={false}
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
