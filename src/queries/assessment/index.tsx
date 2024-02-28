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
import { Assessment, AssessmentTemplate, AssessmentUpdate } from './types';

export const useAllAssessments = () => {
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = assessmentQueryKeys.assessments();
  return useQuery({
    queryKey: queryKey,
    queryFn: () => readAssessmentsDbAction(recruiter_id),
    staleTime: 0,
    enabled: !!recruiter_id,
  });
};

export const useAllAssessmentTemplates = () => {
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = assessmentQueryKeys.templates();
  return useQuery({
    queryKey: queryKey,
    queryFn: () => readAssessmentTemplatesDbAction(),
    staleTime: 0,
    enabled: !!recruiter_id,
  });
};

export const useCreateAssessment = () => {
  const queryClient = useQueryClient();
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = assessmentQueryKeys.assessments();
  const mutationKey = ['assessment-create'];
  const mutationQueue = useMutationState<Assessment>({
    filters: { mutationKey, status: 'pending' },
    select: (mutation) => ({
      ...(mutation.state.variables as Assessment),
      duration: 0,
      jobs: [],
    }),
  });
  const mutation = useMutation({
    mutationKey,
    mutationFn: (payload: Partial<Assessment>) =>
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
    // onSettled: async () => {
    //   await queryClient.cancelQueries({ queryKey });
    //   queryClient.invalidateQueries({ queryKey });
    // },
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
    // onSettled: async () => {
    //   await queryClient.cancelQueries({ queryKey });
    //   queryClient.invalidateQueries({ queryKey });
    // },
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

const readAssessmentTemplatesDbAction = async () => {
  const { data, error } = await supabase.rpc('getassessmenttemplates');
  if (error) throw new Error(error.message);
  return data as unknown as AssessmentTemplate[];
};

const readAssessmentsDbAction = async (
  recruiter_id: Database['public']['Tables']['recruiter']['Row']['id'],
) => {
  const { data, error } = await supabase.rpc('getassessments', {
    recruiterid: recruiter_id,
  });
  if (error) throw new Error(error.message);
  return data as unknown as Assessment[];
};

const createAssessmentsDbAction = async (
  payload: Partial<Assessment>,
  recruiter_id: Database['public']['Tables']['recruiter']['Row']['id'],
) => {
  const { data, error } = await supabase
    .from('assessment')
    .insert({ ...payload, recruiter_id })
    .select();
  if (error) throw new Error(error.message);
  const newAssessment = data[0] as unknown as Assessment;
  newAssessment['jobs'] = [];
  newAssessment['duration'] = 0;
  return newAssessment;
};
