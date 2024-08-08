/* eslint-disable security/detect-object-injection */
import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { Page404 } from '@/devlink/Page404';
import { AvailabilityEmpty } from '@/devlink2/AvailabilityEmpty';
import { CalendarPick } from '@/devlink2/CalendarPick';
import { DatePicker } from '@/devlink2/DatePicker';
import { PickSlotDay } from '@/devlink2/PickSlotDay';
import { TimePick } from '@/devlink2/TimePick';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import {
  insertTaskProgress,
  useRequestAvailabilityContext,
} from '../../RequestAvailabilityContext';
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
  const [loading, setLoading] = useState(false);
  const handleClickDate = ({
    selectedDate,
    day,
  }: {
    selectedDate: DatabaseTable['candidate_request_availability']['slots'][number]['dates'][number];
    day: number;
  }) => {
    //@ts-ignore
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
    //@ts-ignore
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
        //@ts-ignore
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
  if (candidateRequestAvailability) {
    return (
      <Stack bgcolor={'var(--white-a7'}>
        <PickSlotDay
          isPickedCalendarActive={markAsAllDateSelected}
          textPickDays={`Pick at least ${candidateRequestAvailability.number_of_days} days.`}
          isPickSlotIconActive={markAsAllSlotsSelected}
          textPickSlots={`Pick at least  ${candidateRequestAvailability.number_of_slots} slots from each day.`}
          slotPrimaryButton={
            <ButtonSolid
              size={2}
              onClickButton={{
                onClick: handleSubmit,
              }}
              textButton={singleDay ? 'Submit Availability' : 'Done'}
              isLoading={loading}
              isDisabled={!markAsAllSlotsSelected}
            />
          }
          slotCalenderPick={
            <ShowCode>
              <ShowCode.When isTrue={singleDay}>
                <CalendarPick
                  slotDatePicker={dateSlots
                    .find((ele) => ele.round === 1)
                    ?.dates.filter((ele) => ele.slots.length)
                    .map((dateSlot, i) => {
                      return (
                        <DatePicker
                          // isDisable={day > 1}
                          isActive={selectedDateSlots
                            .find((ele) => ele.round === day)
                            ?.dates.map((ele) => ele.curr_day)
                            .includes(dateSlot.curr_day)}
                          key={i}
                          textDate={dayjs(dateSlot.curr_day).format('DD')}
                          textDay={dayjs(dateSlot.curr_day).format('dddd')}
                          textMonth={dayjs(dateSlot.curr_day).format('MMM')}
                          onClickDate={{
                            onClick: () => {
                              handleClickDate({ selectedDate: dateSlot, day });
                            },
                          }}
                        />
                      );
                    })}
                />
              </ShowCode.When>
              <ShowCode.Else>
                <CalendarPick
                  onClickNext={{
                    onClick: () => {
                      const TypoElement =
                        document.getElementById('newCalendarPick');

                      TypoElement.scrollLeft = TypoElement.scrollLeft + 400;
                    },
                  }}
                  onClickPrev={{
                    onClick: () => {
                      const TypoElement =
                        document.getElementById('newCalendarPick');
                      TypoElement.scrollLeft = TypoElement.scrollLeft - 400;
                    },
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

                      let prevNumberOfDay = prevDayDurations / 1440;

                      let numberOfDay =
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
                        <DatePicker
                          isDisable={enable}
                          isActive={selectedDateSlots
                            .find((ele) => ele.round === day)
                            ?.dates.map((ele) => ele.curr_day)
                            .includes(dateSlot.curr_day)}
                          key={i}
                          textDate={dayjs(dateSlot.curr_day).format('DD')}
                          textDay={dayjs(dateSlot.curr_day).format('dddd')}
                          textMonth={dayjs(dateSlot.curr_day).format('MMM')}
                          onClickDate={{
                            onClick: () => {
                              handleClickDate({ selectedDate: dateSlot, day });
                            },
                          }}
                        />
                      );
                    })}
                />
              </ShowCode.Else>
            </ShowCode>
          }
          slotTimePick={
            <TimePick
              onClickNext={{
                onClick: () => {
                  const TypoElement = document.getElementById('newTimePick');

                  TypoElement.scrollLeft = TypoElement.scrollLeft + 400;
                },
              }}
              onClickPrev={{
                onClick: () => {
                  const TypoElement = document.getElementById('newTimePick');
                  TypoElement.scrollLeft = TypoElement.scrollLeft - 400;
                },
              }}
              styleScrollProps={{
                id: 'newTimePick',
              }}
              slotSlotPicker={
                <ShowCode>
                  <ShowCode.When
                    isTrue={
                      !selectedDateSlots.find((ele) => ele.round === day) ||
                      selectedDateSlots.find((ele) => ele.round === day)?.dates
                        .length === 0
                    }
                  >
                    <AvailabilityEmpty />
                  </ShowCode.When>
                  <ShowCode.Else>
                    {selectedDateSlots.length > 0 &&
                      selectedDateSlots
                        .find((ele) => ele.round === day)
                        ?.dates.sort((a, b) =>
                          dayjs(a.curr_day).isAfter(dayjs(b.curr_day)) ? 1 : -1,
                        )
                        .map((slotTime, i) => {
                          return (
                            <SlotColumn
                              onClose={() =>
                                handleClickDate({ selectedDate: slotTime, day })
                              }
                              key={i}
                              slotTime={slotTime}
                            />
                          );
                        })}
                  </ShowCode.Else>
                </ShowCode>
              }
            />
          }
        />
      </Stack>
    );
  }
  if (!candidateRequestAvailability) {
    return (
      <Stack>
        <Page404 />
      </Stack>
    );
  }
}
