import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

import axios from '@/src/client/axios';
import { ApiCandidateDetails } from '@/src/pages/api/scheduling/application/fetchcandidatedetails';
import { ApiResponseActivities } from '@/src/pages/api/scheduling/fetch_activities';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  setAvailabilities,
  setFetchingSchedule,
  setinitialSessions,
  setScheduleName,
  setSelectedApplication,
  setSelectedSchedule,
} from '../store';
import { fetchRequestAvailibilities } from './utils';

export const useAllActivities = ({
  application_id,
  session_id,
}: {
  application_id: string;
  session_id?: string;
}) => {
  const queryClient = useQueryClient();
  const queryKey = ['activitiesCandidate', { application_id }];
  const query = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data: resAct, status }: AxiosResponse<ApiResponseActivities> =
        await axios.post('/api/scheduling/fetch_activities', {
          application_id,
          session_id,
        });
      if (status !== 200) {
        toast.error('Unable to fetch activities');
      }
      return resAct.data;
    },
    enabled: !!application_id,
    initialData: [],
  });
  const refetch = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };
  return { ...query, refetch };
};

export const useGetScheduleApplication = () => {
  const router = useRouter();

  const fetchInterviewDataByApplication = async () => {
    try {
      const application_id = router.query.application_id as string;

      fetchRequestAvailibilities({
        application_id,
        supabaseCaller: supabase,
      }).then((ava) => {
        setAvailabilities(ava);
      });

      await axios
        .call<ApiCandidateDetails>(
          'POST',
          '/api/scheduling/application/fetchcandidatedetails',
          {
            application_id,
          },
        )
        .then((res) => {
          setSelectedApplication(res.application);
          setSelectedSchedule(res.schedule);
          setScheduleName(res.scheduleName);
          setinitialSessions(res.sessions);
        });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setFetchingSchedule(false);
    }
  };

  return {
    fetchInterviewDataByApplication,
  };
};
