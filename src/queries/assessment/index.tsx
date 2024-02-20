/* eslint-disable security/detect-object-injection */
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { type Database } from '@/src/types/schema';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { assessmentQueryKeys, useAssessmentId } from './keys';

export type Assessment = Database['public']['Tables']['assessment']['Row'];

export type AssessmentCreate = Pick<
  Assessment,
  'title' | 'description' | 'level' | 'type' | 'mode'
>;

export type AssessmentUpdate = Partial<
  Pick<Assessment, 'title' | 'description' | 'level' | 'type'>
>;

export const useAllAssessments = () => {
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = assessmentQueryKeys.assessments();
  return useQuery({
    queryKey: queryKey,
    queryFn: () => readAssessmentsDbAction(recruiter_id),
    enabled: !!recruiter_id,
  });
};

export const useCreateAssessment = () => {
  const queryClient = useQueryClient();
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = assessmentQueryKeys.assessments();
  const mutationKey = ['assessment-create'];
  const mutationQueue = useMutationState<AssessmentCreate>({
    filters: { mutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as AssessmentCreate,
  });
  const mutation = useMutation({
    mutationKey,
    mutationFn: (payload: AssessmentCreate) =>
      createAssessmentsDbAction(payload, recruiter_id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
    },
    onError: () => {
      toast.error('Unable to create assessment');
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Assessment[]>(queryKey, (prev) => [
        ...prev,
        data,
      ]);
    },
  });
  return {
    mutation,
    mutationQueue,
  };
};

export const useEditAssessment = () => {
  const queryClient = useQueryClient();
  const { assessment_id } = useAssessmentId();
  const { queryKey: masterQueryKey } = assessmentQueryKeys.assessments();
  const { queryKey } = assessmentQueryKeys.assessment({ assessment_id });
  const mutation = useMutation({
    mutationFn: (payload: AssessmentUpdate) =>
      updateAssessmentsDbAction(payload, assessment_id),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey });
      const previousAssessments =
        queryClient.getQueryData<Assessment[]>(masterQueryKey);
      queryClient.setQueryData<Assessment[]>(masterQueryKey, (prev) => {
        const newAssessments = prev.reduce((acc, curr) => {
          if (curr.id === assessment_id) acc.push({ ...curr, ...data });
          else acc.push(curr);
          return acc;
        }, [] as Assessment[]);
        return newAssessments;
      });
      return { previousAssessments };
    },
    onError: (err, variables, context) => {
      toast.error('Unable to edit assessment');
      queryClient.setQueryData<Assessment[]>(
        queryKey,
        context.previousAssessments,
      );
    },
  });
  return {
    mutation,
  };
};

const updateAssessmentsDbAction = async (
  payload: AssessmentUpdate,
  assessment_id: Assessment['id'],
) => {
  const { data, error } = await supabase
    .from('assessment')
    .update({ ...payload })
    .eq('id', assessment_id)
    .select();
  if (error) throw new Error(error.message);
  return data[0];
};

const readAssessmentsDbAction = async (
  recruiter_id: Database['public']['Tables']['recruiter']['Row']['id'],
) => {
  const { data, error } = await supabase
    .from('assessment')
    .select()
    .eq('recruiter_id', recruiter_id);
  if (error) throw new Error(error.message);
  return data;
};

const createAssessmentsDbAction = async (
  payload: AssessmentCreate,
  recruiter_id: Database['public']['Tables']['recruiter']['Row']['id'],
) => {
  const { data, error } = await supabase
    .from('assessment')
    .insert({ ...payload, recruiter_id })
    .select();
  if (error) throw new Error(error.message);
  return data[0];
};
