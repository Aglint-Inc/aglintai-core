import { DB } from '@aglint/shared-types';
import {
  useMutation,
  useMutationState,
  useQueryClient,
} from '@tanstack/react-query';

import { useJob } from '@/src/context/JobContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { jobQueries } from '../job';
import { interviewSessionMutationKeys } from './keys';
import {
  InterviewPlansType,
  InterviewSessionRelationType,
  InterviewSessionUpdate,
} from './types';

export const useCreateInterviewPlan = () => {
  const queryClient = useQueryClient();
  const { job_id, recruiter_id } = useJob();
  const id = job_id;
  const { queryKey } = jobQueries.interview_plans({ id });
  const mutation = useMutation({
    mutationFn: async ({ name, order }: { name: string; order?: number }) => {
      await createInterviewPlan(name, id, recruiter_id, order);
      await queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      toast.error('Unable to create interview plan.');
    },
  });
  return mutation;
};

const mutationKey = ['interview-plan'];
const mutationKeySwap = [...mutationKey, 'SWAP'];
const mutationKeyUpdate = [...mutationKey, 'UPDATE'];
const mutationKeyDelete = [...mutationKey, 'DELETE'];

export const useInterviewPlanMutation = () => {
  const swap = useMutationState({
    filters: { mutationKey: mutationKeySwap, status: 'pending' },
    select: (mutation) => mutation.state.variables as SwapPayload,
  });
  const update = useMutationState({
    filters: { mutationKey: mutationKeyUpdate },
    select: (mutation) => mutation.state.variables as UpdatePayload,
  });
  const remove = useMutationState({
    filters: { mutationKey: mutationKeyDelete },
    select: (mutation) => mutation.state.variables as DeletePayload,
  });
  return { swap, update, remove };
};

type UpdatePayload = {
  id: string;
  data: {
    name?: string;
    order?: number;
  };
};

export const useUpdateInterviewPlan = () => {
  const queryClient = useQueryClient();
  const { job_id } = useJob();
  const id = job_id;
  const { queryKey } = jobQueries.interview_plans({ id });
  const mutation = useMutation({
    mutationKey: mutationKeyUpdate,
    mutationFn: async ({ id, data }: UpdatePayload) => {
      await updateInterviewPlan(id, data);
      await queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      toast.error('Unable to create interview plan.');
    },
  });
  return mutation;
};

type SwapPayload = {
  plan_id_1: string;
  plan_id_2: string;
};

export const useSwapInterviewPlan = () => {
  const queryClient = useQueryClient();
  const { job_id } = useJob();
  const { queryKey } = jobQueries.interview_plans({ id: job_id });
  const mutation = useMutation({
    mutationKey: mutationKeySwap,
    mutationFn: async ({ plan_id_1, plan_id_2 }: SwapPayload) => {
      await supabase
        .rpc('swap_stage_order', { plan_id_1, plan_id_2 })
        .throwOnError();
      await queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      toast.error('Unable to move interview stage.');
    },
  });
  return mutation;
};

type DeletePayload = {
  id: string;
};

export const useDeleteInterviewPlan = () => {
  const queryClient = useQueryClient();
  const { job_id } = useJob();
  const id = job_id;
  const { queryKey } = jobQueries.interview_plans({ id });
  const mutation = useMutation({
    mutationKey: mutationKeyDelete,
    mutationFn: async ({ id }: DeletePayload) => {
      await deleteInterviewPlan(id);
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
  const { job_id } = useJob();
  const id = job_id;
  const { queryKey } = jobQueries.interview_plans({ id });
  const mutation = useMutation({
    mutationFn: async (args: CreateInterviewSession) => {
      await createInterviewSession(args);
      await Promise.allSettled([queryClient.invalidateQueries({ queryKey })]);
    },
    onError: () => {
      toast.error('Unable to create interview session.');
    },
  });
  return mutation;
};

export const useUpdateInterviewSession = () => {
  const queryClient = useQueryClient();
  const { job_id } = useJob();
  const id = job_id;
  const { queryKey } = jobQueries.interview_plans({ id });
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
  const { job_id, revalidateJobQueries } = useJob();
  const id = job_id;
  const { queryKey } = jobQueries.interview_plans({ id });
  const { mutationKey } = interviewSessionMutationKeys.delete();

  const mutation = useMutation({
    mutationKey,
    mutationFn: async (args: DeleteInterviewSession) => {
      await deleteInterviewSession(args);
      await Promise.allSettled([
        queryClient.invalidateQueries({ queryKey }),
        revalidateJobQueries(),
      ]);
    },
    onError: () => {
      toast.error('Unable to delete interview session.');
    },
  });
  return mutation;
};

export const useEditInterviewSession = () => {
  const queryClient = useQueryClient();
  const { job_id } = useJob();
  const id = job_id;
  const { queryKey } = jobQueries.interview_plans({ id });
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
  const { job_id } = useJob();
  const id = job_id;
  const { queryKey } = jobQueries.interview_plans({ id });

  const mutation = useMutation({
    mutationFn: async (args: CreateDebriefSession) => {
      await createDebriefSession(args);
      await Promise.allSettled([queryClient.invalidateQueries({ queryKey })]);
    },
    onError: () => {
      toast.error('Unable to create debrief session.');
    },
  });
  return mutation;
};

export const useEditDebriefSession = () => {
  const queryClient = useQueryClient();
  const { job_id } = useJob();
  const id = job_id;
  const { queryKey } = jobQueries.interview_plans({ id });
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

export const useReorderInterviewSessions = () => {
  const queryClient = useQueryClient();
  const { job_id } = useJob();
  const id = job_id;
  const { queryKey } = jobQueries.interview_plans({ id });
  const mutation = useMutation({
    mutationFn: async (args: {
      updatedInterviewSessions: InterviewPlansType[number]['interview_session'];
      interviewPlanId: string;
    }) => {
      const sessions = args.updatedInterviewSessions.map(
        ({ id, session_order }) => ({ id, session_order }),
      );
      await reorderSessions({
        sessions,
        interview_plan_id: args.interviewPlanId,
      });
      await queryClient.invalidateQueries({ queryKey });
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey });
      const oldInterviewPlan =
        queryClient.getQueryData<InterviewPlansType>(queryKey);
      queryClient.setQueryData<InterviewPlansType>(
        queryKey,
        oldInterviewPlan.map((item) =>
          item.id === payload.interviewPlanId
            ? { ...item, interview_session: payload.updatedInterviewSessions }
            : item,
        ),
      );
      return { oldInterviewPlan };
    },
    onError: (error, variables, context) => {
      toast.error('Unable to reorder sessions');
      queryClient.setQueryData<InterviewPlansType>(
        queryKey,
        context.oldInterviewPlan,
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
  interview_plan_id,
}: {
  session_id: string;
  interview_plan_id: string;
}) => {
  const { error } = await supabase.rpc('delete_session', {
    session_id,
    interview_plan_id,
  });
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

export const createInterviewPlan = async (
  name: string,
  job_id: string,
  recruiter_id: string,
  order: number = 1,
) => {
  const { data, error } = await supabase
    .from('interview_plan')
    .insert({ name, job_id, plan_order: order, recruiter_id })
    .select();
  if (error) throw new Error(error.message);
  return data[0];
};

export const updateInterviewPlan = async (
  id: string,
  { name, order }: { name?: string; order?: number },
) => {
  const { data, error } = await supabase
    .from('interview_plan')
    .update({ name, plan_order: order })
    .eq('id', id)
    .select();
  if (error) throw new Error(error.message);
  return data[0];
};

export const deleteInterviewPlan = async (id: string) => {
  const { data, error } = await supabase
    .from('interview_plan')
    .delete()
    .eq('id', id)
    .select();
  if (error) throw new Error(error.message);
  return data[0];
};

export type CreateInterviewSession = Omit<
  DB['public']['Functions']['insert_interview_session']['Args'],
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
  DB['public']['Functions']['update_interview_session']['Args'],
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

export type CreateDebriefSession =
  DB['public']['Functions']['insert_debrief_session']['Args'];

export const createDebriefSession = async (args: CreateDebriefSession) => {
  const { error } = await supabase.rpc('insert_debrief_session', args);
  if (error) throw new Error(error.message);
};

export type UpdateDebriefSession =
  DB['public']['Functions']['update_debrief_session']['Args'];

export const updateDebriefSession = async (args: UpdateDebriefSession) => {
  const { error } = await supabase.rpc('update_debrief_session', args);
  if (error) throw new Error(error.message);
};

export type ReorderSessions = Omit<
  DB['public']['Functions']['reorder_sessions']['Args'],
  'sessions'
> & {
  sessions: { id: string; session_order: number }[];
};

export const reorderSessions = async (args: ReorderSessions) => {
  const { error } = await supabase.rpc('reorder_sessions', args);
  if (error) throw new Error(error.message);
};
