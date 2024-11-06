import { dayjsLocal } from '@aglint/shared-utils';
import { ScrollArea } from '@components/ui/scroll-area';
import { useEffect } from 'react';
import { DateCard } from 'src/app/(public)/_common/_components/DateCard';
import TimeSlotsColumn from 'src/app/(public)/_common/_components/TimeSlotsColumn';

import { UITimeRangeCard } from '@/common/UITimeRangeCard';
import { UIButton } from '@/components/Common/UIButton';
import { transformPlanCombinationPack } from '@/services/CandidateSchedule/utils/bookingUtils/candidateSelfSchedule/transformPlanCombinationPack';
import toast from '@/utils/toast';

import useInviteActions from '../../../hooks/useInviteActions';
import { useInviteSlots } from '../../../hooks/useInviteSlots';
import { useRounds } from '../../../hooks/useRounds';
import {
  setInitialDayDate,
  setSelectedDate,
  useCandidateInviteSelfScheduleStore,
} from '../../../store';

const SlotsSelfSchedule = () => {
  const { status } = useInviteSlots();
  if (status === 'error') return <Error />;
  return <Success />;
};

export default SlotsSelfSchedule;

const Success = () => {
  const { handleSelectSlot } = useInviteActions();
  const { selectedDate, selectedDay, timezone, rounds, initialDayDate } =
    useCandidateInviteSelfScheduleStore();
  const { data: verified_slots } = useInviteSlots();
  const data = transformPlanCombinationPack(verified_slots, timezone.tzCode);
  useRounds();

  let dates: string[] = [];

  if (selectedDay === 1) {
    dates = data.map((ele) => {
      return ele.interview_start_date;
    });
  } else {
    const nextDayDate = data
      ?.find((ele) => ele.interview_start_date === initialDayDate)
      ?.interview_rounds.find(
        (ele) => ele.current_round_idx === selectedDay - 1,
      )?.current_interview_date;

    dates = nextDayDate ? [nextDayDate] : [];
  }

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(dates[0]);
    }
  }, [selectedDay, timezone]);

  useEffect(() => {
    setInitialDayDate(dates[0]);
  }, [timezone]);

  const filteredDay = data
    ?.find((ele) => ele.interview_start_date === initialDayDate)
    ?.interview_rounds.find((ele) => ele.current_round_idx === selectedDay - 1);

  return (
    <>
      <div className='flex h-full flex-col'>
        <div className='flex flex-row gap-2 border-b px-4 pb-4'>
          {dates.map((date) => {
            return (
              <DateCard
                key={date}
                textDate={dayjsLocal(date).tz(timezone.tzCode).format('DD')}
                textMonth={dayjsLocal(date).tz(timezone.tzCode).format('MMM')}
                textDay={dayjsLocal(date).tz(timezone.tzCode).format('dddd')}
                onClickDate={() => {
                  if (selectedDay === 1) {
                    setInitialDayDate(date);
                  }
                  setSelectedDate(date);
                }}
                isActive={dayjsLocal(selectedDate)
                  .tz(timezone.tzCode)
                  .isSame(date, 'day')}
                isDisable={false}
              />
            );
          })}
        </div>
        <ScrollArea>
          <div className='flex flex-col gap-2 overflow-auto p-4'>
            {selectedDate && (
              <TimeSlotsColumn
                timezone={timezone.tzCode}
                date={filteredDay?.current_interview_date ?? ''}
                timeRangeArea={filteredDay?.current_day_slots.map(
                  (slot, ind) => {
                    return (
                      <UITimeRangeCard
                        onClickTime={() => {
                          handleSelectSlot(selectedDay - 1, slot);
                        }}
                        isSemiActive={false}
                        isActive={
                          rounds[selectedDay - 1]?.selectedSlot?.start_time ===
                            slot.start_time &&
                          rounds[selectedDay - 1]?.selectedSlot?.end_time ===
                            slot.end_time
                        }
                        key={ind}
                        timeZone={timezone.tzCode}
                        ShowCloseIcon={false}
                        startTime={slot.start_time}
                        endTime={slot.end_time}
                      />
                    );
                  },
                )}
              />
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

const Error = () => {
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
