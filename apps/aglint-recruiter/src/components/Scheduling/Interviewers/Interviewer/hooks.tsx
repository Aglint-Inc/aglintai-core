import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { InterviewerDetailsType } from './type';

const imrQueryKeys = {
  all: { queryKey: ['all'] },
  imr: () => ({
    queryKey: [...imrQueryKeys.all.queryKey, 'imr'], // Imr =>interview_module_relation
  }),
  imr_member: (member_id: string) => ({
    queryKey: [...imrQueryKeys.imr().queryKey, { member_id }], // Imr =>interview_module_relation
  }),
  interviewer_schedules: () => ({
    queryKey: [...imrQueryKeys.all.queryKey, 'interviewerSchedules'], // Imr =>interview_module_relation
  }),
  interviewer_schedules_member: (member_id: string) => ({
    queryKey: [...imrQueryKeys.interviewer_schedules().queryKey, { member_id }], // Imr =>interview_module_relation
  }),
} as const;

export const useImrQuery = ({ user_id }) => {
  const queryClient = useQueryClient();
  const { queryKey } = imrQueryKeys.imr_member(user_id);
  const query = useQuery({
    queryKey,
    queryFn: () => getInterviewerDetails(user_id),
    enabled: !!user_id,
  });
  const refetch = () => queryClient.invalidateQueries({ queryKey });
  return { ...query, refetch };
};

const getInterviewerDetails = async (user_id: string) => {
  const { data } = await axios.post(
    '/api/scheduling/get_interviewer_and_modules',
    {
      user_id: user_id,
    },
  );
  return data as InterviewerDetailsType;
};
