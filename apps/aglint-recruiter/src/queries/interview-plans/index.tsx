import { type DB } from '@aglint/shared-types';
import { useMutation, useMutationState } from '@tanstack/react-query';

import { useTenant } from '@/company/hooks';
import { useCurrentJob } from '@/job/hooks';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import { interviewSessionMutationKeys } from './keys';
import {
  type InterviewSessionRelationType,
  type InterviewSessionUpdate,
} from './types';

export const useCreateInterviewPlan = () => {
  const { recruiter_id } = useTenant();
  const { job_id } = useCurrentJob();
  const id = job_id;
  const mutation = useMutation({
    mutationFn: async ({ name, order }: { name: string; order?: number }) => {
      return await createInterviewPlan(name, id, recruiter_id, order);
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
  const mutation = useMutation({
    mutationKey: mutationKeyUpdate,
    mutationFn: async ({ id, data }: UpdatePayload) => {
      return await updateInterviewPlan(id, data);
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
  const mutation = useMutation({
    mutationKey: mutationKeySwap,
    mutationFn: async ({ plan_id_1, plan_id_2 }: SwapPayload) => {
      await supabase
        .rpc('swap_stage_order', { plan_id_1, plan_id_2 })
        .throwOnError();
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
  const mutation = useMutation({
    mutationKey: mutationKeyDelete,
    mutationFn: async ({ id }: DeletePayload) => {
      await deleteInterviewPlan(id);
    },
    onError: () => {
      toast.error('Unable to create interview plan.');
    },
  });
  return mutation;
};

export const useAddInterviewSession = () => {
  const mutation = useMutation({
    mutationFn: async (args: CreateInterviewSession) => {
      return await createInterviewSession(args);
    },
    onError: () => {
      toast.error('Unable to create interview session.');
    },
  });
  return mutation;
};

export const useUpdateInterviewSession = () => {
  const { mutationKey } = interviewSessionMutationKeys.update();
  const mutation = useMutation({
    mutationKey,
    mutationFn: async (args: UpdateInterviewSession) => {
      return await updateInterviewSession(args);
    },
    onError: () => {
      toast.error('Unable to update interview session.');
    },
  });
  return mutation;
};

export const useDeleteInterviewSession = () => {
  const mutation = useMutation({
    mutationKey,
    mutationFn: async (args: DeleteInterviewSession) => {
      return await deleteInterviewSession(args);
    },
    onError: () => {
      toast.error('Unable to delete interview session.');
    },
  });
  return mutation;
};

export const useEditInterviewSession = () => {
  const { mutationKey } = interviewSessionMutationKeys.update();
  const mutation = useMutation({
    mutationKey,
    mutationFn: async (args: EditInterviewSession) => {
      return await editInterviewSession(args);
    },
    onError: () => {
      toast.error('Unable to update interview session.');
    },
  });
  return mutation;
};

export const useAddDebriefSession = () => {
  const mutation = useMutation({
    mutationFn: async (args: CreateDebriefSession) => {
      return await createDebriefSession(args);
    },
    onError: () => {
      toast.error('Unable to create debrief session.');
    },
  });
  return mutation;
};

export const useEditDebriefSession = () => {
  const { mutationKey } = interviewSessionMutationKeys.update();
  const mutation = useMutation({
    mutationKey,
    mutationFn: async (args: UpdateDebriefSession) => {
      await updateDebriefSession(args);
    },
    onError: () => {
      toast.error('Unable to update debrief session.');
    },
  });
  return mutation;
};

export type DeleteInterviewSession = Parameters<
  typeof deleteInterviewSession
>[0];

const deleteInterviewSession = async ({
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

const updateInterviewSession = async ({
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

const createInterviewPlan = async (
  name: string,
  job_id: string,
  recruiter_id: string,
  order = 1,
) => {
  const { data, error } = await supabase
    .from('interview_plan')
    .insert({ name, job_id, plan_order: order, recruiter_id })
    .select();
  if (error) throw new Error(error.message);
  return data[0];
};

const updateInterviewPlan = async (
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

const deleteInterviewPlan = async (id: string) => {
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
const createInterviewSession = async (args: CreateInterviewSession) => {
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

const createDebriefSession = async (args: CreateDebriefSession) => {
  const { error } = await supabase.rpc('insert_debrief_session', args);
  if (error) throw new Error(error.message);
};

export type UpdateDebriefSession =
  DB['public']['Functions']['update_debrief_session']['Args'];

export const updateDebriefSession = async (args: UpdateDebriefSession) => {
  const { error } = await supabase.rpc('update_debrief_session', args);
  if (error) throw new Error(error.message);
};
