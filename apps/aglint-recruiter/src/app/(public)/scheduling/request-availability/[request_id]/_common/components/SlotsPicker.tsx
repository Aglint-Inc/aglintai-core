/* eslint-disable security/detect-object-injection */
import { type DatabaseTable } from '@aglint/shared-types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@components/ui/carousel';
import dayjs from 'dayjs';
import { Calendar, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import toast from '@/utils/toast';

import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';
import { DateCard } from './DateCard';
import TimeSlotsColumn from './TimeSlotsColumn';

export default function SlotsPicker({ singleDay }: { singleDay: boolean }) {
  const {
    candidateRequestAvailability,
    selectedDateSlots,
    selectedSlots,
    setDaySlots,
    openDaySlotPopup: day,
    setOpenDaySlotPopup,
    setIsSubmitted,
    submitAvailability,
  } = useRequestAvailabilityContext();

  const markAsAllDateSelected =
    selectedDateSlots.find((ele) => ele.round === day)?.dates.length &&
    selectedDateSlots.find((ele) => ele.round === day)?.dates.length >=
      candidateRequestAvailability.number_of_days;
  const markAsAllSlotsSelected = selectedSlots.length
    ? selectedSlots
        .find((ele) => ele.round === day)
        ?.dates.every(
          (item) =>
            item.slots.length >= candidateRequestAvailability.number_of_slots,
        )
    : false;
  const handleSubmit = async () => {
    const eventsByDate = selectedSlots
      .find((ele) => ele.round === day)
      .dates.map((ele) => ele.slots)
      .flat()
      .reduce((acc, event) => {
        const date = event.startTime.split('T')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(event);
        return acc;
      }, {});
    const checkMinimumSlotsSelected = Object.keys(eventsByDate).filter(
      (date) =>
        eventsByDate[date].length <
        candidateRequestAvailability.number_of_slots,
    );

    const checkSlotsSelectedForDates = selectedDateSlots
      .find((ele) => ele.round === day)
      .dates.map((ele) => ele.curr_day.split('T')[0])
      .filter((date) => !Object.keys(eventsByDate).includes(date));

    if (!markAsAllDateSelected) {
      toast.message(
        `Please Select minimum ${candidateRequestAvailability.number_of_days} days`,
      );
      return;
    }
    if (checkSlotsSelectedForDates.length) {
      toast.message(
        `You have not selected any slots for ${checkSlotsSelectedForDates.map((date) => dayjs(date).format('MMM DD')).join(',')}`,
      );
      return;
    }
    if (checkMinimumSlotsSelected.length) {
      toast.message(
        `You have to select minimum ${candidateRequestAvailability.number_of_slots} slots on ${checkMinimumSlotsSelected.map((date) => dayjs(date).format('MMM DD')).join(',')} `,
      );
      return;
    }
    if (!singleDay) {
      setDaySlots(
        //@ts-expect-error
        (pre: DatabaseTable['candidate_request_availability']['slots']) => {
          const updatedSlots = [...pre];
          const existingSlotIndex = updatedSlots.findIndex(
            (slot) => slot.round === day,
          );

          if (existingSlotIndex !== -1) {
            updatedSlots[existingSlotIndex] = {
              ...selectedSlots.find((ele) => ele.round === day),
            };
          } else {
            updatedSlots.push({
              ...selectedSlots.find((ele) => ele.round === day),
            });
          }
          return updatedSlots;
        },
      );
    } else {
      submitAvailability();
    }
    setOpenDaySlotPopup(null);
  };

  useEffect(() => {
    if (candidateRequestAvailability?.slots) {
      setIsSubmitted(true);
    }
  }, [candidateRequestAvailability]);
  if (candidateRequestAvailability) {
    return (
      <>
        <div className='bg-white bg-opacity-70 p-2'>
          <div className='flex flex-col space-y-4 px-4'>
            <div className='flex flex-col items-center space-y-4'>
              <div className='flex items-center space-x-2'>
                <div className='relative'>
                  {markAsAllDateSelected ? (
                    <CheckCircle className='h-4 w-4 text-green-800' />
                  ) : (
                    <Calendar className='h-4 w-4 text-gray-500' />
                  )}
                </div>
                <span className='text-sm'>{`Pick at least ${candidateRequestAvailability.number_of_days} days.`}</span>
              </div>
              <div className='max-w-2xl'>
                <Carousel className='w-full'>
                  <CarouselContent>
                    <DaysWrapInWeek isSingleDay={singleDay} />
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
            <div className='flex flex-col items-center space-y-4'>
              {markAsAllDateSelected ? (
                <div className='flex flex-col items-center space-y-1'>
                  <div className='flex items-center space-x-2'>
                    <div className='relative'>
                      {markAsAllSlotsSelected ? (
                        <CheckCircle className='h-4 w-4 text-green-800' />
                      ) : (
                        <Calendar className='h-4 w-4 text-gray-500' />
                      )}
                    </div>
                    <span className='text-sm'>{`Pick at least ${candidateRequestAvailability.number_of_slots} slots from each day.`}</span>
                  </div>
                </div>
              ) : null}
              <div>{markAsAllDateSelected ? <TimeSlotsWrapper /> : null}</div>
            </div>
            <div className='flex justify-center'>
              {markAsAllDateSelected && markAsAllSlotsSelected ? (
                <div className='w-[300px]'>
                  <UIButton
                    size='md'
                    onClick={handleSubmit}
                    disabled={!markAsAllSlotsSelected}
                    className='w-full'
                  >
                    {singleDay ? 'Submit Availability' : 'Done'}
                  </UIButton>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}

function TimeSlotsWrapper() {
  const {
    selectedDateSlots,
    handleClickDate,
    openDaySlotPopup: day,
  } = useRequestAvailabilityContext();
  return (
    <div className='flex max-w-2xl flex-col items-start space-x-2'>
      <div className='scrollbar-hide flex h-[360px] max-w-[600px] space-x-4 overflow-x-auto p-4 py-2'>
        {selectedDateSlots
          .find((ele) => ele.round === day)
          ?.dates.sort((a, b) =>
            dayjs(a.curr_day).isAfter(dayjs(b.curr_day)) ? 1 : -1,
          )
          .map((slotTime, i) => (
            <TimeSlotsColumn
              onClose={() =>
                handleClickDate({
                  selectedDate: slotTime,
                  day,
                })
              }
              key={i}
              slotTime={slotTime}
            />
          ))}
      </div>
    </div>
  );
}
function DaysWrapInWeek({ isSingleDay }: { isSingleDay: boolean }) {
  const {
    multiDaySessions,
    dateSlots,
    handleClickDate,
    selectedDateSlots,
    openDaySlotPopup: day,
  } = useRequestAvailabilityContext();
  const dates = dateSlots?.find((slot) => slot.round === day || 1)?.dates || [];
  const weeks: DatabaseTable['candidate_request_availability']['slots'][number]['dates'][] =
    [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  return (
    <>
      {weeks.map((week, weekIndex) => {
        return (
          <CarouselItem key={weekIndex}>
            <div className='flex justify-center space-x-2 p-2'>
              {isSingleDay
                ? week.map((dateSlot, i) => {
                    return (
                      <DateCard
                        isDisable={dateSlot.slots.length === 0}
                        isActive={selectedDateSlots
                          .find((ele) => ele.round === day || 1)
                          ?.dates.map((ele) => ele.curr_day)
                          .includes(dateSlot.curr_day)}
                        key={i}
                        textDate={dayjs(dateSlot.curr_day).format('DD')}
                        textDay={dayjs(dateSlot.curr_day).format('dddd')}
                        textMonth={dayjs(dateSlot.curr_day).format('MMM')}
                        onClickDate={() => {
                          handleClickDate({ selectedDate: dateSlot, day });
                        }}
                      />
                    );
                  })
                : week.map((dateSlot, i) => {
                    let enable = false;
                    const justPrevDay =
                      day > 1 &&
                      multiDaySessions[day - 2][0].break_duration / 1440;
                    const dates = dateSlots
                      .find((ele) => ele.round === day || 1)
                      ?.dates.filter((ele) => ele.slots.length);
                    const prevSelectedDates = selectedDateSlots
                      .filter((ele) => ele.round === day - 1)
                      .map((ele) => ele.dates)
                      .flat()
                      ?.map((ele) => ele.curr_day.split('T')[0]);

                    const totalDayDurations = multiDaySessions.reduce(
                      (accumulator, sessions) => {
                        const breakDurations = sessions.filter(
                          (session) => session.break_duration >= 1440,
                        );
                        return (
                          accumulator +
                          breakDurations.reduce(
                            (acc, session) => acc + session.break_duration,
                            0,
                          )
                        );
                      },
                      0,
                    );
                    const prevDayDurations = multiDaySessions
                      .slice(0, day - 1)
                      .reduce((accumulator, sessions) => {
                        const breakDurations = sessions.filter(
                          (session) => session.break_duration >= 1440,
                        );
                        return (
                          accumulator +
                          breakDurations.reduce(
                            (acc, session) => acc + session.break_duration,
                            0,
                          )
                        );
                      }, 0);

                    const prevNumberOfDay = prevDayDurations / 1440;

                    const numberOfDay =
                      totalDayDurations / 1440 - prevNumberOfDay;

                    if (i >= dates.length - numberOfDay) {
                      enable = true;
                    }

                    if (
                      day > 1 &&
                      dayjs(prevSelectedDates[justPrevDay]).isAfter(
                        dayjs(dateSlot.curr_day),
                        'day',
                      )
                    ) {
                      enable = true;
                    }

                    if (
                      dayjs(dayjs(dateSlot.curr_day)).isAfter(
                        prevSelectedDates[0],
                        'day',
                      ) &&
                      dayjs(dayjs(dateSlot.curr_day)).isBefore(
                        prevSelectedDates[prevSelectedDates.length - 1],
                        'day',
                      ) &&
                      !prevSelectedDates.includes(
                        dateSlot.curr_day.split('T')[0],
                      )
                    ) {
                      enable = false;
                    }

                    return (
                      <DateCard
                        isDisable={enable || dateSlot.slots.length === 0}
                        isActive={selectedDateSlots
                          .find((ele) => ele.round === day)
                          ?.dates.map((ele) => ele.curr_day)
                          .includes(dateSlot.curr_day)}
                        key={i}
                        textDate={dayjs(dateSlot.curr_day).format('DD')}
                        textDay={dayjs(dateSlot.curr_day).format('dddd')}
                        textMonth={dayjs(dateSlot.curr_day).format('MMM')}
                        onClickDate={() => {
                          handleClickDate({ selectedDate: dateSlot, day });
                        }}
                      />
                    );
                  })}
            </div>
          </CarouselItem>
        );
      })}
    </>
  );
}
