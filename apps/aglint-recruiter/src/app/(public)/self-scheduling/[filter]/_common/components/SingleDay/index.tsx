import { dayjsLocal } from '@aglint/shared-utils';
import { useToast } from '@components/hooks/use-toast';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { useEffect } from 'react';
import { DateCard } from 'src/app/(public)/_common/_components/DateCard';
import TimeSlotsColumn from 'src/app/(public)/_common/_components/TimeSlotsColumn';

import { UITimeRangeCard } from '@/common/UITimeRangeCard';
import { UIButton } from '@/components/Common/UIButton';

import useInviteActions from '../../hooks/useInviteActions';
import { useInviteSlots } from '../../hooks/useInviteSlots';
import {
  setRounds,
  setSelectedDate,
  useCandidateInviteStore,
} from '../../store';
import { type SessionData } from '../../types/types';

export const SingleDay = () => {
  const { status } = useInviteSlots();
  if (status === 'error') return <SingleDayError />;
  if (status === 'pending') return <SingleDayLoading />;
  return <SingleDaySuccess />;
};

const SingleDayError = () => {
  const { refetch } = useInviteSlots();
  const { toast } = useToast();
  useEffect(() => {
    toast({
      title: 'Something went wrong. Please try again.',
      variant: 'destructive',
    });
  }, []);
  return (
    <UIButton variant='default' onClick={() => refetch()}>
      Try again
    </UIButton>
  );
};

const SingleDayLoading = () => {
  return (
    <div className='space-y-4'>
      {[1, 2, 3].map((index) => (
        <Card key={index}>
          <CardHeader className='space-y-2'>
            <Skeleton className='h-4 w-1/4' />
          </CardHeader>
          <CardContent className='space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-4/5' />
            <Skeleton className='h-4 w-3/5' />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const SingleDaySuccess = () => {
  const { handleSelectSlot } = useInviteActions();
  const { selectedDate, timezone, rounds } = useCandidateInviteStore();
  const { data } = useInviteSlots();

  const sessions: SessionData[] = data.reduce((acc: SessionData[], curr) => {
    const { start_time } = curr[0][0].sessions[0];
    acc.push({
      date: start_time,
      slots: curr[0],
    });
    return acc;
  }, []);

  const filteredSession = sessions.find((session) =>
    dayjsLocal(session.date).isSame(selectedDate, 'day'),
  );

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(sessions[0].date);
    }
  }, []);

  const selectedSlots = rounds[0]?.selectedSlots;

  return (
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
              isActive={selectedDate === session.date}
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
                      selectedSlots &&
                      selectedSlots?.slot_comb_id === slot.slot_comb_id
                    ) {
                      setRounds([
                        {
                          ...rounds[0],
                          selectedSlots: null,
                        },
                      ]);
                    } else {
                      handleSelectSlot(0, slot);
                    }
                  }}
                  isSemiActive={false}
                  isActive={
                    selectedSlots
                      ? selectedSlots?.slot_comb_id === slot.slot_comb_id
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
  );
};
