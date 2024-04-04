import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { Database } from '@/src/types/schema';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { interviewPlanRecruiterUserQuery } from '../interview-coordinators';
import { useCurrentJob } from '../job-assessment/keys';
import { interviewPlanKeys, interviewSessionMutationKeys } from './keys';
import {
  AddInterviewCoordinatorType,
  InterviewPlansType,
  InterviewSessionRelationType,
  InterviewSessionUpdate,
} from './types';

export const useInterviewPlans = () => {
  const queryClient = useQueryClient();
  const { job, job_id } = useCurrentJob();
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = interviewPlanKeys.interview_plan({ job_id });
  const response = useQuery({
    queryKey,
    queryFn: () => getInterviewPlans(job_id),
    enabled: !!(recruiter_id && job),
  });
  const refetch = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };
  return { ...response, refetch };
};

export const useCreateInterviewPlan = () => {
  const queryClient = useQueryClient();
  const { job_id } = useCurrentJob();
  const { queryKey } = interviewPlanKeys.interview_plan({ job_id });
  const mutation = useMutation({
    mutationFn: async () => {
      await createInterviewPlan(job_id);
      await queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      toast.error('Unable to create interview plan.');
    },
  });
  return mutation;
};

export const useAddInterviewSession = () => {
  const queryClient = useQueryClient();
  const { job_id } = useCurrentJob();
  const { queryKey } = interviewPlanKeys.interview_plan({ job_id });
  const mutation = useMutation({
    mutationFn: async (args: CreateInterviewSession) => {
      await createInterviewSession(args);
      await queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      toast.error('Unable to create interview session.');
    },
  });
  return mutation;
};

export const useUpdateInterviewSession = () => {
  const queryClient = useQueryClient();
  const { job_id } = useCurrentJob();
  const { queryKey } = interviewPlanKeys.interview_plan({ job_id });
  const { mutationKey } = interviewSessionMutationKeys.update();
  const mutation = useMutation({
    mutationKey,
    mutationFn: async (args: UpdateInterviewSession) => {
      await updateInterviewSession(args);
      await queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      toast.error('Unable to update interview session.');
    },
  });
  return mutation;
};

export const useDeleteInterviewSession = () => {
  const queryClient = useQueryClient();
  const { job_id } = useCurrentJob();
  const { queryKey } = interviewPlanKeys.interview_plan({ job_id });
  const { mutationKey } = interviewSessionMutationKeys.delete();
  const mutation = useMutation({
    mutationKey,
    mutationFn: async (args: DeleteInterviewSession) => {
      await deleteInterviewSession(args);
      await queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      toast.error('Unable to delete interview session.');
    },
  });
  return mutation;
};

export const useEditInterviewSession = () => {
  const queryClient = useQueryClient();
  const { job_id } = useCurrentJob();
  const { queryKey } = interviewPlanKeys.interview_plan({ job_id });
  const { mutationKey } = interviewSessionMutationKeys.update();
  const mutation = useMutation({
    mutationKey,
    mutationFn: async (args: EditInterviewSession) => {
      await editInterviewSession(args);
      await queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      toast.error('Unable to update interview session.');
    },
  });
  return mutation;
};

export const useAddDebriefSession = () => {
  const queryClient = useQueryClient();
  const { job_id } = useCurrentJob();
  const { queryKey } = interviewPlanKeys.interview_plan({ job_id });
  const mutation = useMutation({
    mutationFn: async (args: CreateDebriefSession) => {
      await createDebriefSession(args);
      await queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      toast.error('Unable to create debrief session.');
    },
  });
  return mutation;
};

export const useEditDebriefSession = () => {
  const queryClient = useQueryClient();
  const { job_id } = useCurrentJob();
  const { queryKey } = interviewPlanKeys.interview_plan({ job_id });
  const { mutationKey } = interviewSessionMutationKeys.update();
  const mutation = useMutation({
    mutationKey,
    mutationFn: async (args: UpdateDebriefSession) => {
      await updateDebriefSession(args);
      await queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      toast.error('Unable to update debrief session.');
    },
  });
  return mutation;
};

export const useAddInterviewCoordinator = () => {
  const queryClient = useQueryClient();
  const { job_id } = useCurrentJob();
  const { queryKey } = interviewPlanKeys.interview_plan({ job_id });
  const mutation = useMutation({
    mutationFn: addInterviewCoordinator,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey });
      const previousPlans =
        queryClient.getQueryData<InterviewPlansType>(queryKey);
      const newPlans = {
        ...structuredClone(previousPlans),
        coordinator_id: payload.coordinator.user_id,
        recruiter_user: { ...payload.coordinator },
      };
      queryClient.setQueryData<InterviewPlansType>(queryKey, newPlans);
      return { previousPlans, newPlans };
    },
    onError: (error, variables, context) => {
      toast.error('Unable to add coordinator');
      queryClient.setQueryData<InterviewPlansType>(
        queryKey,
        context.previousPlans,
      );
    },
  });
  return mutation;
};

export type DeleteInterviewSession = Parameters<
  typeof deleteInterviewSession
>[0];

export const deleteInterviewSession = async ({
  session_id,
}: {
  session_id: string;
}) => {
  const { error } = await supabase.rpc('delete_session', { session_id });
  if (error) throw new Error(error.message);
};

export type UpdateInterviewSession = Parameters<
  typeof updateInterviewSession
>[0];

export const updateInterviewSession = async ({
  session,
  session_id,
}: {
  session_id: string;
  session: InterviewSessionUpdate;
}) => {
  const { error } = await supabase
    .from('interview_session')
    .update(session)
    .eq('id', session_id);
  if (error) throw new Error(error.message);
};

export const createInterviewPlan = async (job_id: string) => {
  const { data, error } = await supabase
    .from('interview_plan')
    .insert({ job_id })
    .select();
  if (error) throw new Error(error.message);
  return data[0];
};

export const getInterviewPlans = async (job_id: string) => {
  const { data, error } = await supabase
    .from('interview_plan')
    .select(
      `*, recruiter_user(${interviewPlanRecruiterUserQuery}), interview_session(*, interview_module(*), interview_session_relation(*, recruiter_user(${interviewPlanRecruiterUserQuery}), interview_module_relation(id, training_status, recruiter_user(${interviewPlanRecruiterUserQuery}))))`,
    )
    .eq('job_id', job_id);
  if (error) throw new Error(error.message);
  if (data.length === 0) return null;
  const response = data[0];
  if (response?.interview_session)
    response.interview_session.sort(
      (a, b) => a.session_order - b.session_order,
    );
  return response;
};

export type CreateInterviewSession = Omit<
  Database['public']['Functions']['insert_interview_session']['Args'],
  'interview_module_relation_entries'
> & {
  interview_module_relation_entries: Pick<
    InterviewSessionRelationType[number],
    'id' | 'interviewer_type' | 'training_type'
  >[];
};
export const createInterviewSession = async (args: CreateInterviewSession) => {
  const { error } = await supabase.rpc('insert_interview_session', args);
  if (error) throw new Error(error.message);
};

export type EditInterviewSession = Omit<
  Database['public']['Functions']['update_interview_session']['Args'],
  'interview_module_relation_entries'
> & {
  interview_module_relation_entries: Pick<
    InterviewSessionRelationType[number],
    'id' | 'interviewer_type' | 'training_type'
  >[];
};
export const editInterviewSession = async (args: EditInterviewSession) => {
  const { error } = await supabase.rpc('update_interview_session', args);
  if (error) throw new Error(error.message);
};

export type CreateDebriefSession = Omit<
  Database['public']['Functions']['insert_debrief_session']['Args'],
  'members'
> & {
  members: Pick<InterviewSessionRelationType[number], 'id'>[];
};
export const createDebriefSession = async (args: CreateDebriefSession) => {
  const { error } = await supabase.rpc('insert_debrief_session', args);
  if (error) throw new Error(error.message);
};

export type UpdateDebriefSession = Omit<
  Database['public']['Functions']['update_debrief_session']['Args'],
  'interview_module_relation_entries'
> & {
  members: Pick<InterviewSessionRelationType[number], 'id'>[];
};
export const updateDebriefSession = async (args: UpdateDebriefSession) => {
  const { error } = await supabase.rpc('update_debrief_session', args);
  if (error) throw new Error(error.message);
};

export const addInterviewCoordinator = async ({
  coordinator,
  plan_id,
}: AddInterviewCoordinatorType) => {
  const { data, error } = await supabase
    .from('interview_plan')
    .update({ coordinator_id: coordinator.user_id })
    .eq('id', plan_id)
    .select(`recruiter_user(${interviewPlanRecruiterUserQuery})`);
  if (error) throw new Error(error.message);
  return data[0]['recruiter_user'];
};
