/* eslint-disable security/detect-object-injection */
import { Button } from '@components/ui/button';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { Separator } from '@components/ui/separator';
import dayjs from 'dayjs';
import { CheckCircle, X } from 'lucide-react';
import { useEffect } from 'react';

import { UITimeRangeCard } from '@/common/UITimeRangeCard';

import {
  DateCard,
  DateCardsSkelton,
} from '../../../../_common/_components/DateCard';
import TimeSlotsColumn from '../../../../_common/_components/TimeSlotsColumn';
import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';
import { useCandidateAvailabilityData } from '../hooks/useRequestAvailability';

export default function SlotsPicker({ singleDay }: { singleDay: boolean }) {
  const {
    selectedDateSlots,
    selectedSlots,
    openDaySlotPopup: day,
    setIsSubmitted,
    dateSlots,
    handleClickDate,
    multiDaySessions,
  } = useRequestAvailabilityContext();
  const { data: candidateRequestAvailability } = useCandidateAvailabilityData();
  const NoOfSlotsNeeds = candidateRequestAvailability?.number_of_slots || 2;
  const NoOfDaysNeeds = candidateRequestAvailability?.number_of_days || 2;
  useEffect(() => {
    if (candidateRequestAvailability?.slots) {
      setIsSubmitted(true);
    }
  }, [candidateRequestAvailability]);

  if (!candidateRequestAvailability) return null;

  const daySlotDates =
    selectedDateSlots.find((ele) => ele.round === day)?.dates ?? [];

  const markAsAllDateSelected = daySlotDates.length >= (NoOfDaysNeeds ?? 0);
  const markAsAllSlotsSelected = selectedSlots.length
    ? selectedSlots
        .find((ele) => ele.round === day)
        ?.dates.every((item) => item.slots.length >= (NoOfSlotsNeeds ?? 0))
    : false;

  return (
    <>
      <div className='flexflex-col gap-10 px-0'>
        <div className='items-left flex flex-col gap-4'>
          <div className='flex items-start gap-2'>
            <div className='relative'>
              {markAsAllDateSelected ? (
                <CheckCircle className='mt-1 h-6 w-6 text-green-500' />
              ) : (
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-200'>
                  1
                </div>
              )}
            </div>
            <div className='flex flex-col'>
              <div className='text-md font-semibold'>
                Select available dates
              </div>
              <span className='text-sm text-muted-foreground'>
                {' '}
                {`Select ${NoOfDaysNeeds} or more days. Click on a date to select. Click again to deselect.`}
              </span>
            </div>
          </div>
          <div className='w-full'>
            {dateSlots.length ? (
              <div>
                <ScrollArea className='w-[710px]'>
                  <div className='flex gap-2 pb-4'>
                    {singleDay
                      ? (
                          dateSlots?.find((slot) => slot.round === day || 1)
                            ?.dates || []
                        ).map((dateSlot, i) => {
                          return (
                            <DateCard
                              isDisable={dateSlot.slots.length === 0}
                              isActive={daySlotDates
                                .map((ele) => ele.curr_day)
                                .includes(dateSlot.curr_day)}
                              key={i}
                              textDate={dayjs(dateSlot.curr_day).format('DD')}
                              textDay={dayjs(dateSlot.curr_day).format('dddd')}
                              textMonth={dayjs(dateSlot.curr_day).format('MMM')}
                              onClickDate={() => {
                                handleClickDate({
                                  selectedDate: dateSlot,
                                  day: day ?? 1,
                                });
                              }}
                            />
                          );
                        })
                      : (
                          dateSlots?.find((slot) => slot.round === day || 1)
                            ?.dates || []
                        ).map((dateSlot, i) => {
                          let enable = false;
                          const justPrevDay =
                            day > 1
                              ? multiDaySessions[day - 2][0].break_duration /
                                1440
                              : 0;
                          const dates =
                            dateSlots
                              .find((ele) => ele.round === day || 1)
                              ?.dates.filter((ele) => ele.slots.length) ?? [];
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
                                  (acc, session) =>
                                    acc + session.break_duration,
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
                                  (acc, session) =>
                                    acc + session.break_duration,
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
                              isActive={daySlotDates
                                .map((ele) => ele.curr_day)
                                .includes(dateSlot.curr_day)}
                              key={i}
                              textDate={dayjs(dateSlot.curr_day).format('DD')}
                              textDay={dayjs(dateSlot.curr_day).format('dddd')}
                              textMonth={dayjs(dateSlot.curr_day).format('MMM')}
                              onClickDate={() => {
                                handleClickDate({
                                  selectedDate: dateSlot,
                                  day,
                                });
                              }}
                            />
                          );
                        })}
                  </div>
                  <ScrollBar orientation='horizontal' />
                </ScrollArea>
              </div>
            ) : (
              <div className='flex w-full flex-row items-start gap-4'>
                {Array.from({ length: 7 }).map((_, i) => (
                  <DateCardsSkelton key={i} />
                ))}
              </div>
            )}
          </div>
        </div>

        <Separator className='my-4' />

        <div className='flex w-full flex-col items-start gap-4'>
          {markAsAllDateSelected ? (
            <div className='flex w-full flex-col items-start gap-4'>
              <div className='flex items-start gap-2'>
                <div className='relative'>
                  {markAsAllSlotsSelected ? (
                    <CheckCircle className='mt-1 h-6 w-6 text-green-500' />
                  ) : (
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-200'>
                      2
                    </div>
                  )}
                </div>
                <div className='flex flex-col'>
                  <div className='text-md font-semibold'>
                    Choose time slots.
                  </div>
                  <span className='text-sm text-muted-foreground'>{`Choose ${NoOfSlotsNeeds} or more slots per day. Click on a timeslot to select. Click again to deselect.`}</span>
                </div>
              </div>
            </div>
          ) : null}
          <ScrollArea className='h-[380px]'>
            {markAsAllDateSelected ? <TimeSlotsWrapper /> : null}
          </ScrollArea>
        </div>
      </div>
    </>
  );
}

function TimeSlotsWrapper() {
  const {
    selectedDateSlots,
    handleClickDate,
    openDaySlotPopup: day,
    selectedSlots,
    isSubmitted,
    handleSlotClick,
  } = useRequestAvailabilityContext();

  return (
    <div className=''>
      <div className='flex flex-col gap-3'>
        {selectedDateSlots
          .find((ele) => ele.round === day)
          ?.dates.sort((a, b) =>
            dayjs(a.curr_day).isAfter(dayjs(b.curr_day)) ? 1 : -1,
          )
          .map((slotTime, i) => (
            <TimeSlotsColumn
              key={i}
              date={slotTime.curr_day}
              closeBtn={
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() =>
                    handleClickDate({ selectedDate: slotTime, day })
                  }
                >
                  <X className='h-4 w-4 text-destructive' />
                </Button>
              }
              timeRangeArea={slotTime.slots.map((slot, ind) => {
                const daySlot = (selectedSlots ?? []).find(
                  (ele) => ele.round === day,
                );

                const daySlotDates =
                  daySlot &&
                  daySlot.dates.find(
                    (ele) => ele.curr_day === slotTime.curr_day,
                  );

                const isSelected =
                  (!isSubmitted &&
                    daySlotDates &&
                    daySlotDates.slots
                      .map((ele) => ele.startTime)
                      .includes(slot.startTime)) ||
                  isSubmitted;
                return (
                  <div key={ind}>
                    <UITimeRangeCard
                      onClickTime={() => {
                        if (!isSubmitted)
                          handleSlotClick({
                            curr_day: slotTime.curr_day,
                            slot: slot,
                          });
                      }}
                      isSemiActive={slot.isSlotAvailable && !isSelected}
                      isActive={isSelected}
                      key={ind}
                      textTime={`${dayjs(slot.startTime).format('hh:mm A')} - ${dayjs(slot.endTime).format('hh:mm A')}`}
                    />
                  </div>
                );
              })}
            />
          ))}
      </div>
    </div>
  );
}
