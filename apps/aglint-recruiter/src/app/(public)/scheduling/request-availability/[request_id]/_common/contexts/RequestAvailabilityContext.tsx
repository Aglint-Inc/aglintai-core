'use client';
/* eslint-disable no-unused-vars */
import {
  type CandReqAvailableSlots,
  type CurrRoundCandidateAvailReq,
  type DatabaseTable,
  type DatabaseTableUpdate,
  type InterviewSessionTypeDB,
} from '@aglint/shared-types';
import { dayjsLocal, ScheduleUtils } from '@aglint/shared-utils';
import axios from 'axios';
import dayjs, { type Dayjs } from 'dayjs';
import { useParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import {
  useCandidateAvailabilityData,
  useUpdateCandidateAvailability,
} from '../hooks/useRequestAvailability';
import { type CandidateAvailabilityType } from '../types';

interface ContextValue {
  dateSlots: NonNullable<
    DatabaseTable['candidate_request_availability']['slots']
  >;
  setDateSlots: (
    x: NonNullable<DatabaseTable['candidate_request_availability']['slots']>,
  ) => void;

  loading: boolean;
  setLoading: (x: boolean) => void;

  daySlots: NonNullable<
    DatabaseTable['candidate_request_availability']['slots']
  >;
  setDaySlots: (
    x: NonNullable<DatabaseTable['candidate_request_availability']['slots']>,
  ) => void;
  selectedDateSlots: NonNullable<
    DatabaseTable['candidate_request_availability']['slots']
  >;
  setSelectedDateSlots: (
    x: NonNullable<DatabaseTable['candidate_request_availability']['slots']>,
  ) => void;

  selectedSlots: NonNullable<
    DatabaseTable['candidate_request_availability']['slots']
  >;
  setSelectedSlots: (
    x: NonNullable<DatabaseTable['candidate_request_availability']['slots']>,
  ) => void;

  multiDaySessions: InterviewSessionTypeDB[][];
  setMultiDaySessions: (x: InterviewSessionTypeDB[][]) => void;

  openDaySlotPopup: number;
  setOpenDaySlotPopup: (x: number) => void;

  isSubmitted: boolean;
  setIsSubmitted: (x: boolean) => void;
  selectedDate: Dayjs[];
  setSelectedDate: (x: Dayjs[]) => void;
  handleClickDate: ({
    selectedDate,
    day,
  }: {
    selectedDate: NonNullable<
      DatabaseTable['candidate_request_availability']['slots']
    >[number]['dates'][number];
    day: number;
  }) => void;
  submitAvailability: () => void;
  submitting: boolean;
  setSubmitting: (x: boolean) => void;
  handleSlotClick: ({
    curr_day,
    slot,
  }: {
    curr_day: string;
    slot: NonNullable<
      DatabaseTable['candidate_request_availability']['slots']
    >[number]['dates'][number]['slots'][number];
  }) => void;
}
const defaultProvider: ContextValue = {
  dateSlots: [],
  setDateSlots: () => {},
  loading: true,
  setLoading: () => {},
  daySlots: [],
  setDaySlots: () => {},
  selectedDateSlots: [],
  setSelectedDateSlots: () => {},
  selectedSlots: [],
  setSelectedSlots: () => {},
  multiDaySessions: [],
  setMultiDaySessions: () => {},
  openDaySlotPopup: 0,
  setOpenDaySlotPopup: () => {},
  isSubmitted: false,
  setIsSubmitted: () => {},
  selectedDate: [],
  setSelectedDate: () => {},
  handleClickDate: () => {},
  submitAvailability: () => {},
  submitting: false,
  setSubmitting: () => {},
  handleSlotClick: () => {},
};
const RequestAvailabilityContext = createContext<ContextValue>(defaultProvider);
const useRequestAvailabilityContext = () =>
  useContext(RequestAvailabilityContext);
function RequestAvailabilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const request_id = params?.request_id;
  const { data: requestAvailability, isFetched } =
    useCandidateAvailabilityData();
  const { updateRequestAvailability } = useUpdateCandidateAvailability();

  const [dateSlots, setDateSlots] = useState<
    NonNullable<DatabaseTable['candidate_request_availability']['slots']>
  >([]);

  const [daySlots, setDaySlots] = useState<
    NonNullable<DatabaseTable['candidate_request_availability']['slots']>
  >([]);
  const [selectedDateSlots, setSelectedDateSlots] = useState<
    NonNullable<DatabaseTable['candidate_request_availability']['slots']>
  >([]);
  const [selectedSlots, setSelectedSlots] = useState<
    NonNullable<DatabaseTable['candidate_request_availability']['slots']>
  >([]);
  const [selectedDate, setSelectedDate] = useState([
    dayjs(),
    dayjs().add(10, 'day'),
  ]);
  const [loading, setLoading] = useState(true);
  const [multiDaySessions, setMultiDaySessions] = useState<
    InterviewSessionTypeDB[][]
  >([]);

  const [openDaySlotPopup, setOpenDaySlotPopup] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function defaultValues({
    requestAvailability,
  }: {
    requestAvailability: CandidateAvailabilityType | null;
  }) {
    if (!requestAvailability) {
      setLoading(false);
      return;
    }
    if (requestAvailability?.slots) {
      setDateSlots(requestAvailability.slots || []);
      setDaySlots(requestAvailability.slots || []);
      setIsSubmitted(true);
      setLoading(false);
      return;
    }
    if (!requestAvailability.visited) {
      updateRequestAvailability({
        id: String(request_id),
        visited: true,
      });
    }
    // check multi-day
    const meetingsRound = ScheduleUtils.getSessionRounds(
      requestAvailability?.request_session_relation.map((ele) => {
        return {
          break_duration: ele?.interview_session?.break_duration ?? 0,
          session_duration: ele?.interview_session?.session_duration ?? 0,
          session_order: ele?.interview_session?.session_order ?? 0,
        };
      }),
    ) as unknown as InterviewSessionTypeDB[][];
    setMultiDaySessions(meetingsRound);

    try {
      await Promise.all(
        meetingsRound.map(async (_, idx) => {
          if (requestAvailability) {
            const dateSlots = await getDateSlots({
              requestAvailability: requestAvailability,
              day: idx + 1,
            });
            const slot = {
              round: idx + 1,
              dates: dateSlots.map((d) => ({
                curr_day: d.curr_interview_day,
                slots: d.slots.map((slot) => ({
                  startTime: slot.start_time,
                  endTime: slot.end_time,
                  isSlotAvailable: slot.is_slot_available,
                })),
              })) as NonNullable<
                DatabaseTable['candidate_request_availability']['slots']
              >[number]['dates'],
            };
            setDateSlots((prev) => {
              if (prev)
                return [
                  ...prev,
                  {
                    ...slot,
                  },
                ];
              else return [slot];
            });
          }
        }),
      );
    } catch (error) {
      toast.error('Something went wrong!');
    }
    setLoading(false);
  }

  useEffect(() => {
    if (isFetched && requestAvailability) {
      defaultValues({ requestAvailability });
    }
  }, [isFetched]);

  // handle Click on DateCard

  const handleClickDate = ({
    selectedDate,
    day,
  }: {
    selectedDate: NonNullable<
      DatabaseTable['candidate_request_availability']['slots']
    >[number]['dates'][number];
    day: number;
  }) => {
    setSelectedDateSlots((prevState) => {
      if (prevState) {
        // Check if the day exists in the state
        const dayIndex = prevState.findIndex((slot) => slot.round === day);

        if (dayIndex !== -1) {
          // If the day exists, get the current dates for that day
          const currentDates = prevState[dayIndex].dates;
          const dateIndex = currentDates.indexOf(selectedDate);

          if (dateIndex !== -1) {
            // If the date already exists, remove it
            const newDates = currentDates.filter(
              (date) => date !== selectedDate,
            );
            return [
              ...prevState.slice(0, dayIndex),
              { ...prevState[dayIndex], dates: newDates },
              ...prevState.slice(1 + dayIndex),
            ];
          } else {
            // If the date does not exist, add it
            return [
              ...prevState.slice(0, dayIndex),
              {
                ...prevState[dayIndex],
                dates: [...currentDates, selectedDate],
              },
              ...prevState.slice(1 + dayIndex),
            ];
          }
        } else {
          // If the day does not exist, add a new object with the given day and selectedDate
          return [...prevState, { round: day, dates: [selectedDate] }];
        }
      } else return [{ round: day, dates: [selectedDate] }];
    });
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
  const handleSlotClick = ({
    curr_day,
    slot,
  }: {
    curr_day: string;
    slot: NonNullable<
      DatabaseTable['candidate_request_availability']['slots']
    >[number]['dates'][number]['slots'][number];
  }) => {
    setSelectedSlots((prevState) => {
      // Check if the day exists in the state
      const dayIndex = prevState.findIndex(
        (slot) => slot.round === openDaySlotPopup,
      );

      if (dayIndex !== -1) {
        // If the day exists, get the current dates for that day
        const currentDates = prevState[dayIndex].dates;
        const dateIndex = currentDates.findIndex(
          (date) => date.curr_day === curr_day,
        );

        if (dateIndex !== -1) {
          // If the date exists, check if the slot already exists
          const currentSlots = currentDates[dateIndex].slots;
          const slotIndex = currentSlots.indexOf(slot);

          if (slotIndex !== -1) {
            // If the slot exists, remove it
            const newSlots = currentSlots.filter((s) => s !== slot);
            return [
              ...prevState.slice(0, dayIndex),
              {
                ...prevState[dayIndex],
                dates: [
                  ...currentDates.slice(0, dateIndex),
                  { ...currentDates[dateIndex], slots: newSlots },
                  ...currentDates.slice(dateIndex + 1),
                ],
              },
              ...prevState.slice(dayIndex + 1),
            ];
          } else {
            // If the slot does not exist, add it
            return [
              ...prevState.slice(0, dayIndex),
              {
                ...prevState[dayIndex],
                dates: [
                  ...currentDates.slice(0, dateIndex),
                  {
                    ...currentDates[dateIndex],
                    slots: [...currentSlots, slot],
                  },
                  ...currentDates.slice(dateIndex + 1),
                ],
              },
              ...prevState.slice(dayIndex + 1),
            ];
          }
        } else {
          // If the date does not exist, add a new date with the slot
          return [
            ...prevState.slice(0, dayIndex),
            {
              ...prevState[dayIndex],
              dates: [...currentDates, { curr_day: curr_day, slots: [slot] }],
            },
            ...prevState.slice(dayIndex + 1),
          ];
        }
      } else {
        // If the day does not exist, add a new object with the given day and date with the slot
        return [
          ...prevState,
          {
            round: Number(openDaySlotPopup),
            dates: [{ curr_day: curr_day, slots: [slot] }],
          },
        ];
      }
    });
  };
  const [submitting, setSubmitting] = useState(false);
  async function submitAvailability() {
    if (selectedSlots) {
      setLoading(true);
      if (multiDaySessions.length > 1) {
        const requestData = await updateRequestAvailability({
          slots: daySlots,
          user_timezone: dayjsLocal.tz.guess(),
          id: String(request_id),
        });
        if (requestData) {
          setDaySlots(requestData?.slots ?? []);
        }
      } else {
        const requestData = await updateRequestAvailability({
          slots: [{ round: 1, dates: selectedSlots[0].dates }],
          user_timezone: dayjsLocal.tz.guess(),
          id: String(request_id),
        });
        if (requestData) {
          setDaySlots(requestData?.slots ?? []);
        }
      }

      setIsSubmitted(true);
      setLoading(false);
    }
  }

  return (
    <RequestAvailabilityContext.Provider
      value={{
        dateSlots,
        setDateSlots,
        loading,
        setLoading,
        daySlots,
        setDaySlots,
        selectedDateSlots,
        setSelectedDateSlots,
        selectedSlots,
        setSelectedSlots,
        multiDaySessions,
        openDaySlotPopup,
        setOpenDaySlotPopup,
        isSubmitted,
        setIsSubmitted,
        selectedDate,
        handleClickDate,
        submitAvailability,
        submitting,
        setSubmitting,
        setMultiDaySessions,
        setSelectedDate,
        handleSlotClick,
      }}
    >
      {children}
    </RequestAvailabilityContext.Provider>
  );
}

export { RequestAvailabilityProvider, useRequestAvailabilityContext };

export async function updateCandidateRequestAvailability({
  data,
  id,
}: {
  data: DatabaseTableUpdate['candidate_request_availability'];
  id: string;
}) {
  try {
    const { error, data: result } = await supabase
      .from('candidate_request_availability')
      .update({ ...data })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return result;
  } catch (error) {
    if (error instanceof Error) toast.error(error?.message);
  }
}

export async function getDateSlots({
  requestAvailability,
  day,
}: {
  requestAvailability: CandidateAvailabilityType;
  day: number;
}) {
  const payload: CandReqAvailableSlots = {
    recruiter_id: requestAvailability?.recruiter_id ?? '',
    candidate_tz: dayjsLocal.tz.guess(),
    avail_req_id: requestAvailability?.id ?? '',
    curr_round: day,
  };
  const { data: dateSlots } = await axios.post(
    '/api/scheduling/v1/cand_req_available_slots',
    payload,
  );
  return dateSlots as CurrRoundCandidateAvailReq[];
}

export function getDatesBetween(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateArray = [];
  const currentDate = start;

  while (currentDate <= end) {
    dateArray.push(dayjs(currentDate).toString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}
