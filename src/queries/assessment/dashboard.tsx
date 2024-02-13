/* eslint-disable security/detect-object-injection */
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { Database } from '@/src/types/schema';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { type AssessmentCreate, Assessment, AssessmentUpdate } from './types';

export const useDashboardQueryKey = () => {
  const {
    recruiter: { id: recruiter_id },
  } = useAuthDetails();
  return {
    recruiter_id,
    dashboardQueryKey: ['assessmentDashboard', { recruiter_id }],
    pageQueryKey: ['assessmentPage'],
    dashboardCreateMutationKey: ['assessmentCreate'],
    dashboardEditMutationKey: ['assessmentEdit'],
  };
};

export const useAssessmentDashboard = () => {
  const { dashboardQueryKey, recruiter_id } = useDashboardQueryKey();
  return useQuery({
    queryKey: dashboardQueryKey,
    queryFn: () => readAssessmentsDbAction(recruiter_id),
  });
};

export const useCreateAssessment = () => {
  const queryClient = useQueryClient();
  const { dashboardQueryKey, recruiter_id, dashboardCreateMutationKey } =
    useDashboardQueryKey();
  return useMutation({
    mutationKey: dashboardCreateMutationKey,
    mutationFn: (payload: AssessmentCreate) =>
      createAssessmentsDbAction(payload, recruiter_id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: dashboardQueryKey });
    },
    onError: (err) => {
      toast.error(JSON.stringify(err));
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Assessment[]>(dashboardQueryKey, (prev) => [
        ...prev,
        data,
      ]);
      queryClient.invalidateQueries({ queryKey: dashboardQueryKey });
    },
  });
};

export const useEditAssessment = (assessmentId: Assessment['id']) => {
  const queryClient = useQueryClient();
  const { dashboardQueryKey, dashboardEditMutationKey } =
    useDashboardQueryKey();
  return useMutation({
    mutationKey: dashboardEditMutationKey,
    mutationFn: (payload: AssessmentUpdate) =>
      updateAssessmentsDbAction(payload, assessmentId),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: dashboardQueryKey });
      const previousAssessments =
        queryClient.getQueryData<Assessment[]>(dashboardQueryKey);
      queryClient.setQueryData<Assessment[]>(dashboardQueryKey, (prev) => {
        const newAssessments = prev.reduce((acc, curr) => {
          if (curr.id === assessmentId) acc.push({ ...curr, ...data });
          else acc.push(curr);
          return acc;
        }, [] as Assessment[]);
        return newAssessments;
      });
      return { previousAssessments };
    },
    onError: (err, variables, context) => {
      toast.error(JSON.stringify(err));
      queryClient.setQueryData<Assessment[]>(
        dashboardQueryKey,
        context.previousAssessments,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardQueryKey });
    },
  });
};

export const useCreateAssessmentQueue = () => {
  const { dashboardCreateMutationKey } = useDashboardQueryKey();
  return useMutationState<AssessmentCreate>({
    filters: { mutationKey: dashboardCreateMutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as AssessmentCreate,
  });
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
