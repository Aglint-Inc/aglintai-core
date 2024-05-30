/* eslint-disable no-unused-vars */
import {
  CandReqAvailableSlots,
  DatabaseTable,
  DatabaseTableInsert,
  DatabaseTableUpdate,
} from '@aglint/shared-types';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

export type candidateRequestAvailabilityType =
  DatabaseTable['candidate_request_availability'] & {
    applications: DatabaseTable['applications'] & {
      candidates: DatabaseTable['candidates'];
    };
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
}
const defaultProvider: ContextValue = {
  dateSlots: [],
  setDateSlots: () => {},
  candidateRequestAvailability: null,
  setCandidateRequestAvailability: () => {},
  loading: true,
  setLoading: () => {},
  selectedDateSlots: [],
  setSelectedDateSlots: () => {},
  selectedSlots: [],
  setSelectedSlots: () => {},
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
  const [selectedDateSlots, setSelectedDateSlots] = useState<
    DatabaseTable['candidate_request_availability']['slots']
  >([]);
  const [selectedSlots, setSelectedSlots] = useState<
    DatabaseTable['candidate_request_availability']['slots']
  >([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    const {
      applications: { candidates },
    } = requestAvailability;
    setCandidateRequestAvailability(
      requestAvailability as candidateRequestAvailabilityType,
    );

    try {
      const { data: dateSlots } = await axios.post(
        '/api/scheduling/v1/cand_req_available_slots',
        {
          candidate_tz: candidates.timezone || 'Asia/Calcutta',
          recruiter_id: requestAvailability.recruiter_id,
          session_ids: requestAvailability.session_ids.map((ele) => ele.id),
          date_range_start: dayjs(requestAvailability.date_range[0]).format(
            'DD/MM/YYYY',
          ),
          date_range_end: dayjs(requestAvailability.date_range[1]).format(
            'DD/MM/YYYY',
          ),
          current_interview_day: 1,
          previously_selected_dates: [
            dayjs().add(-1, 'day').format('DD/MM/YYYY'),
          ],
        } as CandReqAvailableSlots,
      );
      setDateSlots(dateSlots);
    } catch (error) {
      toast.error('Something went wrong!');
    }
    setLoading(false);
  }

  useEffect(() => {
    if (router.query?.request_id) {
      getRequestAvailabilityData({
        request_id: router.query?.request_id,
      });
    }
  }, [router.query?.request_id]);
  return (
    <RequestAvailabilityContext.Provider
      value={{
        dateSlots,
        setDateSlots,
        candidateRequestAvailability,
        setCandidateRequestAvailability,
        loading,
        setLoading,
        selectedDateSlots,
        setSelectedDateSlots,
        selectedSlots,
        setSelectedSlots,
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

export async function insertTaskProgress({
  request_availability_id,
  taskData,
}) {
  const { data: task } = await axios.post(
    `/api/scheduling/request_availability/getTaskIdDetailsByRequestId`,
    {
      request_id: request_availability_id,
    },
  );

  if (task.id) {
    const { data: progress } = await axios.post(
      `/api/scheduling/request_availability/insertTaskProgress`,
      {
        data: {
          ...taskData,
          title: 'Candidate submitted the availability',
          progress_type: 'request_availability_list',
          task_id: task.id,
        } as DatabaseTableInsert['new_tasks_progress'],
      },
    );

    return progress;
  }
  return null;
}
