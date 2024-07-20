import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

import { ApiResponseActivities } from '@/src/pages/api/scheduling/fetch_activities';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { getScheduleName } from '../../utils';
import {
  setAvailabilities,
  setFetchingSchedule,
  setinitialSessions,
  setScheduleName,
  setSelectedApplication,
  setSelectedSchedule,
} from '../store';
import {
  fetchApplicationDetails,
  fetchRequestAvailibilities,
  fetchSessionDetailsFromInterviewPlan,
  fetchSessionDetailsFromSchedule,
} from './utils';

export const useAllActivities = ({ application_id }) => {
  const queryClient = useQueryClient();
  const queryKey = ['activitiesCandidate', { application_id }];
  const query = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data: resAct, status }: AxiosResponse<ApiResponseActivities> =
        await axios.post('/api/scheduling/fetch_activities', {
          application_id,
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

      const { data: schedule, error } = await supabase
        .from('interview_schedule')
        .select('*')
        .eq('application_id', application_id);

      const resApplicationDetails = await fetchApplicationDetails({
        application_id,
        supabaseCaller: supabase,
      });
      setSelectedApplication(resApplicationDetails);

      if (!error) {
        setSelectedSchedule(schedule[0]);

        if (schedule.length == 0) {
          const resSessionDetails = await fetchSessionDetailsFromInterviewPlan({
            job_id: resApplicationDetails.public_jobs.id,
            supabaseCaller: supabase,
          });

          setScheduleName(
            getScheduleName({
              job_title: resApplicationDetails?.public_jobs?.job_title,
              first_name: resApplicationDetails?.candidates?.first_name,
              last_name: resApplicationDetails?.candidates?.last_name,
            }),
          );
          if (resSessionDetails?.length > 0) {
            setinitialSessions(
              resSessionDetails.sort(
                (itemA, itemB) =>
                  itemA.interview_session['session_order'] -
                  itemB.interview_session['session_order'],
              ),
            );
          }
        } else {
          fetchRequestAvailibilities({
            application_id,
            supabaseCaller: supabase,
          }).then((ava) => {
            setAvailabilities(ava);
          });

          await fetchSessionDetailsFromSchedule({
            application_id,
            supabaseCaller: supabase,
          }).then((sessionsWithPlan) => {
            if (sessionsWithPlan?.length > 0) {
              setinitialSessions(
                sessionsWithPlan.sort(
                  (itemA, itemB) =>
                    itemA.interview_session['session_order'] -
                    itemB.interview_session['session_order'],
                ),
              );
            }
          });
          setScheduleName(schedule[0].schedule_name);
        }
      }
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
