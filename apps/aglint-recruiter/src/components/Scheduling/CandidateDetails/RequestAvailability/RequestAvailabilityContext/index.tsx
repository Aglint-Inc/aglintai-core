/* eslint-disable no-unused-vars */
import {
  CandReqAvailableSlots,
  CurrRoundCandidateAvailReq,
  DatabaseTable,
  DatabaseTableInsert,
  DatabaseTableUpdate,
  InterviewSessionTypeDB,
} from '@aglint/shared-types';
import { ScheduleUtils } from '@aglint/shared-utils';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useRouterPro } from '@/src/hooks/useRouterPro';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { supabase } from '@/src/utils/supabase/client';
import { fillEmailTemplate } from '@/src/utils/support/supportUtils';
import toast from '@/src/utils/toast';

export type candidateRequestAvailabilityType =
  DatabaseTable['candidate_request_availability'] & {
    applications: DatabaseTable['applications'] & {
      candidates: DatabaseTable['candidates'];
    };
    recruiter: {
      id: string;
      name: string;
      logo: string;
    };

    request_session_relation: DatabaseTable['request_session_relation'] &
      {
        interview_session: DatabaseTable['interview_session'];
      }[];
  };

interface ContextValue {
  dateSlots: null | DatabaseTable['candidate_request_availability']['slots'];
  setDateSlots: (
    x: DatabaseTable['candidate_request_availability']['slots'],
  ) => void;

  candidateRequestAvailability: candidateRequestAvailabilityType | null;
  setCandidateRequestAvailability: (
    x: candidateRequestAvailabilityType | null,
  ) => void;

  loading: boolean;
  setLoading: (x: boolean) => void;

  daySlots: DatabaseTable['candidate_request_availability']['slots'];
  setDaySlots: (
    x: DatabaseTable['candidate_request_availability']['slots'],
  ) => void;
  selectedDateSlots:
    | null
    | DatabaseTable['candidate_request_availability']['slots'];
  setSelectedDateSlots: (
    x: DatabaseTable['candidate_request_availability']['slots'],
  ) => void;

  selectedSlots:
    | null
    | DatabaseTable['candidate_request_availability']['slots'];
  setSelectedSlots: (
    x: DatabaseTable['candidate_request_availability']['slots'],
  ) => void;

  multiDaySessions: InterviewSessionTypeDB[][] | null;
  setMultiDaySessions: (x: InterviewSessionTypeDB[][] | null) => void;

  openDaySlotPopup: null | number;
  setOpenDaySlotPopup: (x: null | number) => void;

  isSubmitted: boolean;
  setIsSubmitted: (x: boolean) => void;
  selectedDate: null | Dayjs[];
  setSelectedDate: Dispatch<SetStateAction<null | Dayjs[]>>;
}
const defaultProvider: ContextValue = {
  dateSlots: [],
  setDateSlots: () => {},
  candidateRequestAvailability: null,
  setCandidateRequestAvailability: () => {},
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
  openDaySlotPopup: null,
  setOpenDaySlotPopup: () => {},
  isSubmitted: false,
  setIsSubmitted: () => {},
  selectedDate: null,
  setSelectedDate: () => {},
};
const RequestAvailabilityContext = createContext<ContextValue>(defaultProvider);
const useRequestAvailabilityContext = () =>
  useContext(RequestAvailabilityContext);
function RequestAvailabilityProvider({ children }) {
  const [candidateRequestAvailability, setCandidateRequestAvailability] =
    useState<candidateRequestAvailabilityType | null>(null);
  const [dateSlots, setDateSlots] = useState<
    DatabaseTable['candidate_request_availability']['slots']
  >([]);

  const [daySlots, setDaySlots] = useState([]);
  const [selectedDateSlots, setSelectedDateSlots] = useState<
    DatabaseTable['candidate_request_availability']['slots']
  >([]);
  const [selectedSlots, setSelectedSlots] = useState<
    DatabaseTable['candidate_request_availability']['slots']
  >([]);
  const [selectedDate, setSelectedDate] = useState([
    dayjs(),
    dayjs().add(10, 'day'),
  ]);
  const [loading, setLoading] = useState(true);
  const [multiDaySessions, setMultiDaySessions] = useState<
    InterviewSessionTypeDB[][]
  >([]);

  const [openDaySlotPopup, setOpenDaySlotPopup] = useState<null | number>(null);
  const router = useRouterPro<{ request_id: string }>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function getRequestAvailabilityData({ request_id }) {
    const { data: requestAvailability } = await axios.post(
      '/api/scheduling/request_availability/getCandidateRequestData',
      {
        request_id: request_id,
      },
    );
    if (!requestAvailability) {
      setLoading(false);
      return;
    }

    setCandidateRequestAvailability(
      requestAvailability as candidateRequestAvailabilityType,
    );

    // check multi-day
    const meetingsRound = ScheduleUtils.getSessionRounds(
      requestAvailability?.request_session_relation.map(
        (ele) => ele.interview_session,
      ),
    ) as unknown as InterviewSessionTypeDB[][];
    setMultiDaySessions(meetingsRound);
    try {
      await Promise.all(
        meetingsRound.map(async (_, idx) => {
          const dateSlots = await getDateSlots({
            requestAvailability,
            day: idx + 1,
          });
          setDateSlots((prev) => [
            ...prev,
            {
              round: idx + 1,
              dates: dateSlots.map((d) => ({
                curr_day: d.curr_interview_day,
                slots: d.slots.map((slot) => ({
                  startTime: slot.start_time,
                  endTime: slot.end_time,
                  isSlotAvailable: slot.is_slot_available,
                })),
              })) as DatabaseTable['candidate_request_availability']['slots'][number]['dates'],
            },
          ]);
        }),
      );
    } catch (error) {
      toast.error('Something went wrong!');
    }
    setLoading(false);
  }
  useEffect(() => {
    if (router.params?.request_id) {
      getRequestAvailabilityData({
        request_id: router.params?.request_id,
      });
    }
  }, [router.params?.request_id]);

  return (
    <RequestAvailabilityContext.Provider
      value={{
        dateSlots,
        setDateSlots,
        candidateRequestAvailability,
        setCandidateRequestAvailability,
        loading,
        setLoading,
        daySlots,
        setDaySlots,
        selectedDateSlots,
        setSelectedDateSlots,
        selectedSlots,
        setSelectedSlots,
        multiDaySessions,
        setMultiDaySessions,
        openDaySlotPopup,
        setOpenDaySlotPopup,
        isSubmitted,
        setIsSubmitted,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </RequestAvailabilityContext.Provider>
  );
}

export { RequestAvailabilityProvider, useRequestAvailabilityContext };

export async function insertCandidateRequestAvailability(
  data: DatabaseTableInsert['candidate_request_availability'],
) {
  try {
    const { error, data: result } = await supabase
      .from('candidate_request_availability')
      .insert({ ...data })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return result;
  } catch (error) {
    toast.error(error.message);
  }
}

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
    toast.error(error.message);
  }
}

export const createTask = async (data: DatabaseTableInsert['new_tasks']) => {
  try {
    const { data: task, error } = await supabase
      .from('new_tasks')
      .insert({ ...data })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return task;
  } catch (error) {
    toast.error(error.message);
  }
};
export const updateTask = async (data: DatabaseTableUpdate['new_tasks']) => {
  try {
    const { data: task, error } = await supabase
      .from('new_tasks')
      .update({ ...data })
      .eq('id', data.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return task;
  } catch (error) {
    toast.error(error.message);
  }
};

export async function insertTaskProgress({
  taskData,
}: {
  taskData: DatabaseTableInsert['new_tasks_progress'];
}) {
  const { data: progress } = await axios.post(
    `/api/scheduling/request_availability/insertTaskProgress`,
    {
      data: {
        title: 'Candidate submitted the availability',
        progress_type: 'request_availability_list',
        ...taskData,
      } as DatabaseTableInsert['new_tasks_progress'],
    },
  );
  return progress;
}

export async function getDateSlots({
  requestAvailability,
  day,
}: {
  requestAvailability: candidateRequestAvailabilityType;
  day: number;
}) {
  const payload: CandReqAvailableSlots = {
    recruiter_id: requestAvailability.recruiter_id,
    candidate_tz: userTzDayjs.tz.guess(),
    avail_req_id: requestAvailability.id,
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
  let currentDate = start;

  while (currentDate <= end) {
    dateArray.push(dayjs(currentDate).toString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

export async function sendEmailToCandidate({
  recruiter,
  first_name,
  last_name,
  job_title,
  email,
  request_id,
  sessionNames,
  emailBody,
  emailSubject,
}: {
  recruiter: any;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  request_id: string;
  sessionNames: string[];
  emailBody: string;
  emailSubject: string;
}) {
  const body = fillEmailTemplate(emailBody, {
    company_name: recruiter.name,
    schedule_name: sessionNames.join(','),
    first_name: first_name,
    last_name: last_name,
    job_title: job_title,
    availability_link: `<a href='${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/request-availability/${request_id}'>Pick Your Slot</a>`,
  });

  const subject = fillEmailTemplate(emailSubject, {
    company_name: recruiter.name,
    schedule_name: sessionNames.join(','),
    first_name: first_name,
    last_name: last_name,
    job_title: job_title,
  });

  await axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/sendgrid`, {
    fromEmail: `messenger@aglinthq.com`,
    fromName: 'Aglint',
    email: email,
    subject: subject,
    text: body,
  });
  // end
}
