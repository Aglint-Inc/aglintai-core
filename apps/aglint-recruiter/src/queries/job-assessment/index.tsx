/* eslint-disable security/detect-object-injection */
import { type JobTypeDB } from '@aglint/shared-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJob } from '@/src/context/JobContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { assessmentQueryKeys, generateUUID } from '../assessment/keys';
import { type Assessment, type AssessmentTemplate } from '../assessment/types';

export const useJobAssessmentsConnect = () => {
  const { job_id: id, job } = useJob();
  const title = job?.job_title ?? null;
  const queryClient = useQueryClient();
  const { queryKey } = assessmentQueryKeys.assessments();
  return useMutation({
    mutationFn: (assessment_id: Assessment['id']) =>
      connectJobAssessmentDbAction(id, assessment_id),
    onMutate: async (assessment_id) => {
      await queryClient.cancelQueries({ queryKey });
      const prevAssessments = queryClient.getQueryData<Assessment[]>(queryKey);
      queryClient.setQueryData<Assessment[]>(queryKey, (prev) => {
        const newAssessments = prev.reduce((acc, curr) => {
          if (curr.id === assessment_id)
            acc.push({ ...curr, jobs: [...curr.jobs, { title, id: id }] });
          else acc.push(curr);
          return acc;
        }, [] as Assessment[]);
        return newAssessments;
      });
      return { prevAssessments };
    },
    onError: (error, variables, context) => {
      toast.error('Unable to connect assessment');
      queryClient.setQueryData<Assessment[]>(queryKey, context.prevAssessments);
    },
  });
};

type BulkConnectProps = {
  assessments: Assessment[];
  templates: (AssessmentTemplate & {
    assessment_id: Assessment['id'];
  })[];
};

export const useJobAssessmentsBulkConnect = () => {
  const { recruiter_id } = useAuthDetails();
  const { job, job_id } = useJob();
  const id = job_id;
  const title = job?.job_title ?? null;
  const queryClient = useQueryClient();
  const { queryKey } = assessmentQueryKeys.assessments();
  const { queryKey: templateQueryKey } = assessmentQueryKeys.templates();
  return useMutation({
    mutationFn: (props: BulkConnectProps) =>
      bulkConnectJobAssessmentDbAction(id, props, recruiter_id),
    onMutate: async ({ assessments, templates }) => {
      await queryClient.cancelQueries({ queryKey });
      const prevAssessments = queryClient.getQueryData<Assessment[]>(queryKey);
      queryClient.setQueryData<Assessment[]>(queryKey, (prev) => {
        const newAssessments = prev.reduce((acc, curr) => {
          if (assessments.find(({ id }) => id === curr.id))
            acc.push({ ...curr, jobs: [...curr.jobs, { title, id: id }] });
          else acc.push(curr);
          return acc;
        }, [] as Assessment[]);
        const newTemplatestoAssessments = templates.reduce(
          // eslint-disable-next-line no-unused-vars
          (acc, { assessment_id, ...rest }) => {
            acc.push({
              ...rest,
              recruiter_id,
              id: assessment_id,
              jobs: [{ id: id, title }],
              created_at: null,
              loading: true,
            });
            return acc;
          },
          [] as Assessment[],
        );
        newAssessments.unshift(...newTemplatestoAssessments);
        return newAssessments;
      });
      const prevTemplates =
        queryClient.getQueryData<AssessmentTemplate[]>(templateQueryKey);
      queryClient.setQueryData<AssessmentTemplate[]>(
        templateQueryKey,
        (prev) => {
          const newTemplates = prev.reduce((acc, curr) => {
            if (!templates.find(({ id }) => id === curr.id)) acc.push(curr);
            return acc;
          }, [] as AssessmentTemplate[]);
          return newTemplates;
        },
      );
      return { prevAssessments, prevTemplates };
    },
    onError: (error, variables, context) => {
      toast.error('Unable to connect assessment');
      queryClient.setQueryData<Assessment[]>(queryKey, context.prevAssessments);
      queryClient.setQueryData<AssessmentTemplate[]>(
        templateQueryKey,
        context.prevTemplates,
      );
    },
    onSettled: async () => {
      await queryClient.cancelQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useJobAssessmentTemplateConnect = () => {
  const { recruiter_id } = useAuthDetails();
  const { job, job_id } = useJob();
  const id = job_id;
  const title = job?.job_title ?? null;
  const assessment_id = generateUUID();
  const queryClient = useQueryClient();
  const { queryKey } = assessmentQueryKeys.assessments();
  const { queryKey: templateQueryKey } = assessmentQueryKeys.templates();
  return useMutation({
    mutationFn: (template: AssessmentTemplate) =>
      connectJobAssessmentTemplateDbAction(
        assessment_id,
        id,
        template.id,
        recruiter_id,
      ),
    onMutate: async (template) => {
      await queryClient.cancelQueries({ queryKey });
      await queryClient.cancelQueries({ queryKey: templateQueryKey });
      const prevAssessments = queryClient.getQueryData<Assessment[]>(queryKey);
      queryClient.setQueryData<Assessment[]>(queryKey, (prev) => {
        const newAssessments: Assessment[] = [
          {
            ...template,
            recruiter_id,
            jobs: [{ id, title }],
            loading: true,
          },
          ...prev,
        ];
        return newAssessments;
      });
      const prevTemplates =
        queryClient.getQueryData<AssessmentTemplate[]>(templateQueryKey);
      queryClient.setQueryData<AssessmentTemplate[]>(
        templateQueryKey,
        (prev) => {
          const newTemplates: AssessmentTemplate[] = prev.filter(
            (t) => t.id !== template.id,
          );
          return newTemplates;
        },
      );
      return { prevAssessments, prevTemplates };
    },
    onError: (error, variables, context) => {
      toast.error('Unable to connect assessment');
      queryClient.setQueryData<Assessment[]>(queryKey, context.prevAssessments);
      queryClient.setQueryData<AssessmentTemplate[]>(
        templateQueryKey,
        context.prevTemplates,
      );
    },
    onSettled: async () => {
      await queryClient.cancelQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useJobAssessmentsDisconnect = () => {
  const { job_id } = useJob();
  const id = job_id;
  const queryClient = useQueryClient();
  const { queryKey } = assessmentQueryKeys.assessments();
  return useMutation({
    mutationFn: (assessment_id: Assessment['id']) =>
      disconnectJobAssessmentDbAction(id, assessment_id),
    onMutate: async (assessment_id) => {
      await queryClient.cancelQueries({ queryKey });
      const prevAssessments = queryClient.getQueryData<Assessment[]>(queryKey);
      queryClient.setQueryData<Assessment[]>(queryKey, (prev) => {
        const newAssessments = prev.reduce((acc, curr) => {
          if (curr.id === assessment_id)
            acc.push({
              ...curr,
              jobs: curr.jobs.filter(({ id }) => id !== id),
            });
          else acc.push(curr);
          return acc;
        }, [] as Assessment[]);
        return newAssessments;
      });
      return { prevAssessments };
    },
    onError: (error, variables, context) => {
      toast.error('Unable to disconnect assessment');
      queryClient.setQueryData<Assessment[]>(queryKey, context.prevAssessments);
    },
  });
};

const connectJobAssessmentDbAction = async (
  job_id: JobTypeDB['id'],
  assessment_id: Assessment['id'],
) => {
  const { error } = await supabase
    .from('assessment_job_relation')
    .insert({ job_id, assessment_id });
  if (error) throw new Error(error.message);
};

const bulkConnectJobAssessmentDbAction = async (
  job_id: JobTypeDB['id'],
  props: BulkConnectProps,
  recruiter_id: string,
) => {
  const { assessments, templates } = props;
  const assessmentPayload = assessments.map(({ id }) => id);
  const templatePayload = templates.map(({ id, assessment_id }) => ({
    template_id: id,
    assessment_id,
  }));
  const { error } = await supabase.rpc('connectbulkassessmenttemplate', {
    assessments: assessmentPayload,
    templates: templatePayload,
    recruiterid: recruiter_id,
    jobid: job_id,
  });
  if (error) throw new Error(error.message);
};

const connectJobAssessmentTemplateDbAction = async (
  assessment_id: Assessment['id'],
  job_id: JobTypeDB['id'],
  template_id: AssessmentTemplate['id'],
  recruiter_id: string,
) => {
  const { error } = await supabase.rpc('connectassessmenttemplate', {
    assessmentid: assessment_id,
    jobid: job_id,
    templateid: template_id,
    recruiterid: recruiter_id,
  });
  if (error) throw new Error(error.message);
};

const disconnectJobAssessmentDbAction = async (
  job_id: JobTypeDB['id'],
  assessment_id: Assessment['id'],
) => {
  const { error } = await supabase
    .from('assessment_job_relation')
    .delete()
    .eq('job_id', job_id)
    .eq('assessment_id', assessment_id);
  if (error) throw new Error(error.message);
};
