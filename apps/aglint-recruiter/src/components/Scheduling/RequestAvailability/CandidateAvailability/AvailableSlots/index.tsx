/* eslint-disable security/detect-object-injection */
import {
  type DatabaseTable,
  type DatabaseTableInsert,
} from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { ShowCode } from '@/components/Common/ShowCode';
import { UIButton } from '@/components/Common/UIButton';
import { useRouterPro } from '@/hooks/useRouterPro';
import { userTzDayjs } from '@/services/CandidateScheduleV2/utils/userTzDayjs';
import toast from '@/utils/toast';

import {
  insertTaskProgress,
  useRequestAvailabilityContext,
} from '../../RequestAvailabilityContext';
import { DateCard } from './Components/DateCard';
import SlotColumn from './SlotColumn';

export default function AvailableSlots({ singleDay }: { singleDay: boolean }) {
  const router = useRouterPro();
  const {
    dateSlots,
    candidateRequestAvailability,
    setSelectedDateSlots,
    setSelectedSlots,
    selectedDateSlots,
    selectedSlots,
    setDaySlots,
    openDaySlotPopup: day,
    setOpenDaySlotPopup,
    multiDaySessions,
    setIsSubmitted,
    setCandidateRequestAvailability,
  } = useRequestAvailabilityContext();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const handleClickDate = ({
    selectedDate,
    day,
  }: {
    selectedDate: DatabaseTable['candidate_request_availability']['slots'][number]['dates'][number];
    day: number;
  }) => {
    //@ts-expect-error
    setSelectedDateSlots((prevState) => {
      // Check if the day exists in the state
      const dayIndex = prevState.findIndex((slot) => slot.round === day);

      if (dayIndex !== -1) {
        // If the day exists, get the current dates for that day
        const currentDates = prevState[dayIndex].dates;
        const dateIndex = currentDates.indexOf(selectedDate);

        if (dateIndex !== -1) {
          // If the date already exists, remove it
          const newDates = currentDates.filter((date) => date !== selectedDate);
          return [
            ...prevState.slice(0, dayIndex),
            { ...prevState[dayIndex], dates: newDates },
            ...prevState.slice(1 + dayIndex),
          ];
        } else {
          // If the date does not exist, add it
          return [
            ...prevState.slice(0, dayIndex),
            { ...prevState[dayIndex], dates: [...currentDates, selectedDate] },
            ...prevState.slice(1 + dayIndex),
          ];
        }
      } else {
        // If the day does not exist, add a new object with the given day and selectedDate
        return [...prevState, { round: day, dates: [selectedDate] }];
      }
    });
    //@ts-expect-error
    setSelectedSlots((prevState) => {
      const dayIndex = prevState.findIndex((slot) => slot.round === day);

      if (dayIndex !== -1) {
        const currentDates = prevState[dayIndex].dates;
        const dateIndex = currentDates.findIndex(
          (date) => date.curr_day === selectedDate.curr_day,
        );

        if (dateIndex !== -1) {
          const newDates = currentDates.filter(
            (date) => date.curr_day !== selectedDate.curr_day,
          );
          return [
            ...prevState.slice(0, dayIndex),
            { ...prevState[dayIndex], dates: newDates },
            ...prevState.slice(dayIndex + 1),
          ];
        } else {
          return [
            ...prevState.slice(0, dayIndex),
            {
              ...prevState[dayIndex],
              dates: [
                ...currentDates,
                { curr_day: selectedDate.curr_day, slots: [] },
              ],
            },
            ...prevState.slice(dayIndex + 1),
          ];
        }
      } else {
        return [
          ...prevState,
          {
            round: day,
            dates: [{ curr_day: selectedDate.curr_day, slots: [] }],
          },
        ];
      }
    });
  };
  const markAsAllDateSelected =
    selectedDateSlots.find((ele) => ele.round === day)?.dates.length &&
    selectedDateSlots.find((ele) => ele.round === day)?.dates.length >=
      candidateRequestAvailability.number_of_days;
  const markAsAllSlotsSelected =
    selectedSlots.length &&
    selectedSlots
      .find((ele) => ele.round === day)
      ?.dates.every(
        (item) =>
          item.slots.length >= candidateRequestAvailability.number_of_slots,
      );
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
      submitData();
    }

    setOpenDaySlotPopup(null);
  };
  async function submitData() {
    setLoading(true);
    const { data: requestData } = await axios.post(
      `/api/scheduling/request_availability/updateRequestAvailability`,
      {
        data: {
          slots: [{ round: 1, dates: selectedSlots[0].dates }],
          user_timezone: userTzDayjs.tz.guess(),
        },
        id: String(router.params?.request_id),
      },
    );
    const { data: task } = await axios.post(
      `/api/scheduling/request_availability/getTaskIdDetailsByRequestId`,
      {
        request_id: candidateRequestAvailability?.id,
      },
    );
    if (task.id) {
      await insertTaskProgress({
        taskData: {
          title: 'Candidate submitted the availability',
          task_id: task.id,
          created_by: {
            name: getFullName(
              candidateRequestAvailability.applications.candidates.first_name,
              candidateRequestAvailability.applications.candidates.last_name,
            ),
            id: candidateRequestAvailability.applications.candidates.id,
          },
          jsonb_data: {
            dates: selectedSlots[0].dates.map((ele) => ele.curr_day),
          },
        },
      });
    }
    const dates = selectedSlots
      .map((ele) => ele.dates)
      .flat()
      .map((ele) => `${dayjs(ele.curr_day).format('DD MMM')}`);
    await axios.post(
      `/api/scheduling/request_availability/insertScheduleActivities`,
      {
        data: {
          title: `Candidate submitted availability`,
          description: `Candidate submitted availability on ${dates} for ${candidateRequestAvailability.request_session_relation.map((ele) => ele.interview_session.name).join(',')} Interviews.`,
          module: 'scheduler',
          task_id: task.id,
          logged_by: 'candidate',
          application_id: candidateRequestAvailability.application_id,
        } as DatabaseTableInsert['application_logs'],
      },
    );
    setCandidateRequestAvailability(requestData);
    setIsSubmitted(true);
    setLoading(false);
  }

  useEffect(() => {
    if (candidateRequestAvailability?.slots) {
      setIsSubmitted(true);
    }
  }, [candidateRequestAvailability]);
  const scrollRef = useRef<HTMLDivElement>(null);
  if (candidateRequestAvailability) {
    return (
      <div className='bg-white bg-opacity-70 p-2'>
        <PickSlotDay
          isPickedCalendarActive={markAsAllDateSelected}
          textPickDays={`Pick at least ${candidateRequestAvailability.number_of_days} days.`}
          isPickSlotIconActive={markAsAllSlotsSelected}
          textPickSlots={`Pick at least  ${candidateRequestAvailability.number_of_slots} slots from each day.`}
          slotPrimaryButton={
            <UIButton
              size='md'
              onClick={handleSubmit}
              disabled={!markAsAllSlotsSelected}
              className='w-full'
            >
              {singleDay ? 'Submit Availability' : 'Done'}
            </UIButton>
          }
          slotCalenderPick={
            <ShowCode>
              <ShowCode.When isTrue={singleDay}>
                <CalendarPick
                  onClickNext={() => {
                    const TypoElement =
                      document.getElementById('newCalendarPick');

                    TypoElement.scrollLeft = TypoElement.scrollLeft + 400;
                  }}
                  onClickPrev={() => {
                    const TypoElement =
                      document.getElementById('newCalendarPick');
                    TypoElement.scrollLeft = TypoElement.scrollLeft - 400;
                  }}
                  styleScrollProps={{
                    id: 'newCalendarPick',
                  }}
                  slotDatePicker={dateSlots
                    .find((ele) => ele.round === 1)
                    ?.dates.filter((ele) => ele.slots.length)
                    .map((dateSlot, i) => {
                      return (
                        <DateCard
                          // isDisable={day > 1}
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
                />
              </ShowCode.When>
              <ShowCode.Else>
                <CalendarPick
                  onClickNext={() => {
                    const TypoElement =
                      document.getElementById('newCalendarPick');

                    TypoElement.scrollLeft = TypoElement.scrollLeft + 400;
                  }}
                  onClickPrev={() => {
                    const TypoElement =
                      document.getElementById('newCalendarPick');
                    TypoElement.scrollLeft = TypoElement.scrollLeft - 400;
                  }}
                  styleScrollProps={{
                    id: 'newCalendarPick',
                  }}
                  slotDatePicker={dateSlots
                    .find((ele) => ele.round === day)
                    ?.dates.filter((ele) => ele.slots.length)
                    .map((dateSlot, i) => {
                      let enable = false;
                      const justPrevDay =
                        day > 1 &&
                        multiDaySessions[day - 2][0].break_duration / 1440;
                      const dates = dateSlots
                        .find((ele) => ele.round === day)
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
                          isDisable={enable}
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
                />
              </ShowCode.Else>
            </ShowCode>
          }
          slotTimePick={
            <>
              <div className='flex max-w-2xl items-center space-x-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => {
                    if (scrollRef.current) {
                      const scrollAmount = 400;
                      scrollRef.current.scrollLeft += -scrollAmount;
                    }
                    const element = document.getElementById('newTimePick');
                    if (element) element.scrollLeft -= 400;
                  }}
                  className='flex-shrink-0'
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <div
                  ref={scrollRef}
                  className='scrollbar-hide flex h-[360px] max-w-[900px] space-x-4 overflow-x-auto p-4 py-2'
                  id='newTimePick'
                >
                  <ShowCode>
                    <ShowCode.When
                      isTrue={
                        !selectedDateSlots.find((ele) => ele.round === day) ||
                        selectedDateSlots.find((ele) => ele.round === day)
                          ?.dates.length === 0
                      }
                    >
                      <div className='flex flex-col items-center justify-center p-8 text-center'>
                        <Calendar className='mb-2 h-12 w-12 text-gray-400' />
                        <h3 className='mb-1 text-lg font-medium text-gray-900'>
                          No availability
                        </h3>
                        <p className='text-sm text-gray-500'>
                          There are no available time slots at the moment.
                        </p>
                      </div>
                    </ShowCode.When>
                    <ShowCode.Else>
                      {selectedDateSlots.length > 0 &&
                        selectedDateSlots
                          .find((ele) => ele.round === day)
                          ?.dates.sort((a, b) =>
                            dayjs(a.curr_day).isAfter(dayjs(b.curr_day))
                              ? 1
                              : -1,
                          )
                          .map((slotTime, i) => (
                            <SlotColumn
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
                    </ShowCode.Else>
                  </ShowCode>
                </div>

                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => {
                    if (scrollRef.current) {
                      const scrollAmount = 400;
                      scrollRef.current.scrollLeft += scrollAmount;
                    }
                    const element = document.getElementById('newTimePick');
                    if (element) element.scrollLeft += 400;
                  }}
                  className='flex-shrink-0'
                >
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </>
          }
          isPickTimeDescVisible={false}
        />
      </div>
    );
  }
  if (!candidateRequestAvailability) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
        <div className='text-center'>
          <h1 className='mb-4 text-6xl font-bold text-gray-800'>404</h1>
          <p className='mb-8 text-xl text-gray-600'>Page not found</p>
          <div className='flex justify-center'>
            <AlertCircle className='h-16 w-16 text-red-500' />
          </div>
        </div>
      </div>
    );
  }
}

export function CalendarPick({
  onClickPrev,
  onClickNext,
  slotDatePicker,
  styleScrollProps,
  isArrowVisible = true,
}: {
  onClickPrev?: () => void;
  onClickNext?: () => void;
  slotDatePicker?: React.ReactNode;
  styleScrollProps?: React.HTMLAttributes<HTMLDivElement>;
  isArrowVisible?: boolean;
}) {
  return (
    <div className='flex items-center justify-start space-x-4'>
      {isArrowVisible && (
        <Button variant='ghost' size='sm' onClick={onClickPrev}>
          <ChevronLeft className='h-4 w-4' />
        </Button>
      )}
      <div
        className='scrollbar-hide flex w-[800px] max-w-[800px] space-x-4 overflow-x-auto p-3'
        {...styleScrollProps}
      >
        {slotDatePicker}
      </div>
      {isArrowVisible && (
        <Button variant='ghost' size='sm' onClick={onClickNext}>
          <ChevronRight className='h-4 w-4' />
        </Button>
      )}
    </div>
  );
}

export function PickSlotDay({
  isPickedCalendarActive = false,
  textPickDays = 'Pick at least 4 days',
  slotCalenderPick,
  isPickSlotIconActive = false,
  textPickSlots = 'Pick at least 2 slots from each day',
  isPickTimeDescVisible = true,
  slotTimePick,
  slotPrimaryButton,
}: {
  isPickedCalendarActive: boolean;
  textPickDays: string;
  slotCalenderPick: React.ReactNode;
  isPickSlotIconActive: boolean;
  textPickSlots: string;
  isPickTimeDescVisible: boolean;
  slotTimePick: React.ReactNode;
  slotPrimaryButton: React.ReactNode;
}) {
  return (
    <div className='flex flex-col space-y-4 px-4'>
      <div className='flex flex-col items-center space-y-4'>
        <div className='flex items-center space-x-2'>
          <div className='relative'>
            <Calendar className='h-4 w-4 text-gray-500' />
            {isPickedCalendarActive && (
              <div className='absolute inset-0 bg-white'>
                <CheckCircle className='h-4 w-4 text-green-800' />
              </div>
            )}
          </div>
          <span className='text-sm'>{textPickDays}</span>
        </div>
        <div className='max-w-2xl'>{slotCalenderPick}</div>
      </div>
      <div className='flex flex-col items-center space-y-4'>
        <div className='flex flex-col items-center space-y-1'>
          <div className='flex items-center space-x-2'>
            <div className='relative'>
              <Calendar className='h-4 w-4 text-gray-500' />
              {isPickSlotIconActive ? (
                <div className='absolute inset-0 bg-white'>
                  <CheckCircle className='h-4 w-4 text-green-800' />
                </div>
              ) : null}
            </div>
            <span className='text-sm'>{textPickSlots}</span>
          </div>
          {isPickTimeDescVisible ? (
            <span className='text-xs text-gray-500'>
              Pick more than preferred slots to increase the flexibility of your
              interview
            </span>
          ) : null}
        </div>
        <div>{slotTimePick}</div>
      </div>
      <div className='flex justify-center'>
        <div className='w-[300px]'>{slotPrimaryButton}</div>
      </div>
    </div>
  );
}
