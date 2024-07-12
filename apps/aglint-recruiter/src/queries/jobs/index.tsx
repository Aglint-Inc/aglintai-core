import { DatabaseTable } from '@aglint/shared-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEqual } from 'lodash';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { useInvalidateJobQueries } from '../job';
import { jobsQueryKeys } from './keys';
import { Job, JobCreate, JobInsert } from './types';

export const useJobsRead = () => {
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = jobsQueryKeys.jobs();
  return useQuery({
    queryKey,
    queryFn: () => readJobs(recruiter_id),
    enabled: !!recruiter_id,
  });
};

export const useJobCreate = () => {
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = jobsQueryKeys.jobs();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newJob: Omit<JobCreate, 'jd_json'>) => {
      const {
        hiring_manager,
        recruiter,
        recruiting_coordinator,
        sourcer,
        ...rest
      } = newJob;
      const job = {
        ...rest,
        jd_json: {
          educations: [],
          skills: [],
          rolesResponsibilities: [],
          title: '',
          level: 'Mid-level',
        } as DatabaseTable['public_jobs']['jd_json'],
      };

      return createJob({
        ...job,
        draft: {
          ...job,
        },
        recruiter_id,
        scoring_criteria_loading: true,
        hiring_manager,
        recruiter,
        recruiting_coordinator,
        sourcer,
      });
    },
    onError: () => {
      toast.error('Unable to create job');
    },
    onSuccess: (data) => {
      if (data)
        queryClient.setQueryData<Job[]>(queryKey, (prev) => [data, ...prev]);
      else queryClient.invalidateQueries({ queryKey });
    },
  });
  return mutation;
};

export const useJobUpdate = () => {
  const queryClient = useQueryClient();
  const { queryKey } = jobsQueryKeys.jobs();
  const { removeJobQueries } = useInvalidateJobQueries();
  const mutation = useMutation({
    mutationFn: (job: Parameters<typeof updateJob>[0]) => updateJob(job),
    onMutate: (job) => {
      const previousJobs = queryClient.getQueryData<Job[]>(queryKey);
      const newJobs = previousJobs.reduce((acc, curr) => {
        if (curr.id === job.id) {
          const safeJob = {
            ...structuredClone(curr),
            ...structuredClone(job),
          };
          acc.push(safeJob);
        } else acc.push(curr);
        return acc;
      }, [] as Job[]);
      queryClient.setQueryData<Job[]>(queryKey, newJobs);
      return { previousJobs, newJobs };
    },
    onSuccess: (_, { id, parameter_weights, draft, jd_json }) => {
      if (
        parameter_weights ||
        (draft && jd_json && !isEqual(draft.jd_json, jd_json))
      ) {
        removeJobQueries(id);
      }
    },
    onError: (_, __, context) => {
      toast.error('Unable to update job');
      queryClient.setQueryData<Job[]>(queryKey, context.previousJobs);
    },
  });
  return mutation;
};

export const useJobDelete = () => {
  const queryClient = useQueryClient();
  const { queryKey } = jobsQueryKeys.jobs();
  const mutation = useMutation({
    mutationFn: (id: Job['id']) => deleteJob(id),
    onMutate: (id) => {
      const previousJobs = queryClient.getQueryData<Job[]>(queryKey);
      const newJobs = previousJobs.filter((job) => job.id !== id);
      queryClient.setQueryData<Job[]>(queryKey, newJobs);
      return { previousJobs, newJobs };
    },
    onError: (_, __, context) => {
      toast.error('Unable to delete job');
      queryClient.setQueryData<Job[]>(queryKey, context.previousJobs);
    },
    onSuccess: () => {
      toast.success('Job deleted successfully.');
    },
  });
  return mutation;
};

export const readJobs = async (recruiter_id: string) =>
  (
    await supabase
      .from('job_view')
      .select()
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data;

export const readJob = async (id: string) =>
  (
    await supabase
      .from('job_view')
      .select()
      .eq('id', id)
      .throwOnError()
      .single()
  ).data;

const createJob = async (job: JobInsert) => {
  const { data: d1, error: e1 } = await supabase
    .from('public_jobs')
    .insert(job)
    .select('id')
    .single();

  if (e1) throw new Error(e1.message);

  const { data: d2, error: e2 } = await supabase
    .from('job_view')
    .select()
    .eq('id', d1.id);
  if (e2) return null;
  return d2[0] as unknown as Job;
};

const updateJob = async (job: JobInsert) => {
  const { error: e1 } = await supabase
    .from('public_jobs')
    .update(job)
    .eq('id', job.id);

  if (e1) throw new Error(e1.message);
};

const deleteJob = async (id: Job['id']) => {
  const { error } = await supabase.from('public_jobs').delete().eq('id', id);
  if (error) throw new Error(error.message);
};
