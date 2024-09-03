/* eslint-disable security/detect-object-injection */
import { type DB } from '@aglint/shared-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { assessmentQueryKeys, generateUUID, useAssessmentId } from './keys';
import {
  type Assessment,
  type AssessmentCreate,
  type AssessmentRowInsert,
  type AssessmentTemplate,
  type AssessmentUpdate,
} from './types';

export const useAllAssessments = () => {
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = assessmentQueryKeys.assessments();
  return useQuery({
    queryKey: queryKey,
    queryFn: () => readAssessmentsDbAction(recruiter_id),
    enabled: !!recruiter_id,
  });
};

export const useAllAssessmentTemplates = () => {
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = assessmentQueryKeys.templates();
  return useQuery({
    queryKey: queryKey,
    queryFn: () => readAssessmentTemplatesDbAction(),
    enabled: !!recruiter_id,
  });
};

export const useCreateAssessment = () => {
  const queryClient = useQueryClient();
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = assessmentQueryKeys.assessments();
  const id = generateUUID();
  const uiDefaults = { duration: 0, jobs: [], question_count: 0 };
  const mutation = useMutation({
    mutationFn: (payload: AssessmentCreate) =>
      createAssessmentsDbAction({ ...payload, id, recruiter_id }),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey });
      const previousAssessments =
        queryClient.getQueryData<Assessment[]>(queryKey);
      const newAssessment: Assessment = {
        ...payload,
        ...uiDefaults,
        id,
        created_at: new Date().toISOString(),
        recruiter_id,
        loading: true,
      };
      const newAssessments = [newAssessment, ...previousAssessments];
      queryClient.setQueryData<Assessment[]>(queryKey, newAssessments);
      return { previousAssessments, newAssessments };
    },
    onError: (error, variables, context) => {
      toast.error('Unable to create assessment');
      queryClient.setQueryData<Assessment[]>(
        queryKey,
        context.previousAssessments,
      );
    },
    onSuccess: (assessment, _, context) => {
      const updatedAssessments = context.newAssessments.reduce((acc, curr) => {
        if (curr.id === assessment.id)
          acc.push({ ...assessment, ...uiDefaults });
        else acc.push(curr);
        return acc;
      }, [] as Assessment[]);
      queryClient.setQueryData<Assessment[]>(queryKey, updatedAssessments);
    },
  });
  return {
    mutation,
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

export const useDeleteAssessment = () => {
  const queryClient = useQueryClient();
  const { assessment_id } = useAssessmentId();
  const { queryKey } = assessmentQueryKeys.assessments();
  const mutation = useMutation({
    mutationFn: () => deleteAssessmentDbAction(assessment_id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      await queryClient.cancelQueries({ queryKey });
      const previousAssessments =
        queryClient.getQueryData<Assessment[]>(queryKey);
      const newAssessments = previousAssessments.reduce((acc, curr) => {
        if (curr.id === assessment_id) acc.push({ ...curr, loading: true });
        else acc.push(curr);
        return acc;
      }, [] as Assessment[]);
      queryClient.setQueryData<Assessment[]>(queryKey, newAssessments);
      return { previousAssessments, newAssessments };
    },
    onError: (error, variables, context) => {
      toast.error('Unable to delete assessment');
      queryClient.setQueryData<Assessment[]>(
        queryKey,
        context.previousAssessments,
      );
    },
    onSuccess: (_, variables, context) => {
      const updatedAssessments = context.newAssessments.filter(
        ({ id }) => id !== assessment_id,
      );
      queryClient.setQueryData<Assessment[]>(queryKey, updatedAssessments);
    },
  });
  return { mutation };
};

export const useDuplicateAssessment = () => {
  const { recruiter_id } = useAuthDetails();
  const queryClient = useQueryClient();
  const { assessment_id } = useAssessmentId();
  const id = generateUUID();
  const { queryKey } = assessmentQueryKeys.assessments();
  const mutation = useMutation({
    mutationFn: (title: string) =>
      duplicateAssessmentsDbAction(id, assessment_id, recruiter_id, title),
    onMutate: async (title) => {
      await queryClient.cancelQueries({ queryKey });
      const previousAssessments =
        queryClient.getQueryData<Assessment[]>(queryKey);
      const newAssessments = [
        {
          ...previousAssessments.find(({ id }) => id === assessment_id),
          jobs: [],
          id,
          title,
          loading: true,
        },
        ...previousAssessments,
      ];
      queryClient.setQueryData<Assessment[]>(queryKey, newAssessments);
      return { previousAssessments, newAssessments };
    },
    onError: (error, variables, context) => {
      toast.error('Unable to duplicate assessment');
      queryClient.setQueryData<Assessment[]>(
        queryKey,
        context.previousAssessments,
      );
    },
    onSuccess: (id, _, context) => {
      const updatedAssessments = context.newAssessments.reduce((acc, curr) => {
        if (curr.id === id) acc.push({ ...curr, loading: false });
        else acc.push(curr);
        return acc;
      }, [] as Assessment[]);
      queryClient.setQueryData<Assessment[]>(queryKey, updatedAssessments);
    },
  });
  return { mutation };
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

const duplicateAssessmentsDbAction = async (
  new_assessment_id: Assessment['id'],
  target_assessment_id: Assessment['id'],
  recruiter_id: string,
  title: string,
) => {
  const { error } = await supabase.rpc('duplicateassessment', {
    assessmentid: target_assessment_id,
    newassessmentid: new_assessment_id,
    recruiterid: recruiter_id,
    newtitle: title,
  });
  if (error) throw new Error(error.message);
  return new_assessment_id;
};

const readAssessmentTemplatesDbAction = async () => {
  const { data, error } = await supabase.rpc('getassessmenttemplates');
  if (error) throw new Error(error.message);
  return data as unknown as AssessmentTemplate[];
};

const readAssessmentsDbAction = async (
  recruiter_id: DB['public']['Tables']['recruiter']['Row']['id'],
) => {
  const { data, error } = await supabase.rpc('getassessments', {
    recruiterid: recruiter_id,
  });
  if (error) throw new Error(error.message);
  return data as unknown as Assessment[];
};

const deleteAssessmentDbAction = async (
  assessment_id: DB['public']['Tables']['assessment']['Row']['id'],
) => {
  const { error } = await supabase
    .from('assessment')
    .delete()
    .eq('id', assessment_id);
  if (error) throw new Error(error.message);
};

const createAssessmentsDbAction = async (payload: AssessmentRowInsert) => {
  const { data, error } = await supabase
    .from('assessment')
    .insert(payload)
    .select();
  if (error) throw new Error(error.message);
  const newAssessment = data[0] as unknown as Assessment;
  newAssessment['jobs'] = [];
  newAssessment['duration'] = 0;
  return newAssessment;
};
