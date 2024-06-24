import { DatabaseTable } from '@aglint/shared-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { jobsQueryKeys } from './keys';
import { Job, JobCreate, JobInsert } from './types';

export const useJobRead = () => {
  const queryClient = useQueryClient();
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = jobsQueryKeys.jobs();
  const response = useQuery({
    queryKey,
    queryFn: () => readJobs(recruiter_id),
    enabled: !!recruiter_id,
  });
  const refetch = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };
  return { ...response, refetch };
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
    onError: (_, __, context) => {
      toast.error('Unable to update job');
      queryClient.setQueryData<Job[]>(queryKey, context.previousJobs);
    },
  });
  return mutation;
};

export const useJobUIUpdate = () => {
  const queryClient = useQueryClient();
  const { queryKey } = jobsQueryKeys.jobs();
  const mutate = (newJob: Partial<Job>) => {
    const previousJobs = queryClient.getQueryData<Job[]>(queryKey);
    const newJobs = previousJobs.reduce((acc, curr) => {
      if (curr.id === newJob.id) acc.push({ ...curr, ...newJob });
      else acc.push(curr);
      return acc;
    }, [] as Job[]);
    queryClient.setQueryData<Job[]>(queryKey, newJobs);
  };
  return { mutate };
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

export const useJobRefresh = () => {
  const queryClient = useQueryClient();
  const { queryKey } = jobsQueryKeys.jobs();
  const mutation = useMutation({
    mutationFn: (id: Job['id']) => readJob(id),
    onSuccess: (data) => {
      queryClient.setQueryData<Job[]>(queryKey, (prev) => {
        return prev.reduce((acc, curr) => {
          if (curr.id === data.id) acc.push(data);
          else acc.push(curr);
          return acc;
        }, [] as Job[]);
      });
    },
  });
  return mutation;
};

export const readJobs = async (recruiter_id: string) => {
  const { data, error } = await supabase.rpc('getjobsv2', {
    recruiter_id,
  });
  if (error) throw new Error(error.message);
  return data as unknown as Job[];
};

export const readJob = async (id: Job['id']) => {
  const { data, error } = await supabase.rpc('getjob', {
    jobid: id,
  });
  if (error) throw new Error(error.message);
  return data[0] as unknown as Job;
};

const createJob = async (job: JobInsert) => {
  const { data: d1, error: e1 } = await supabase
    .from('public_jobs')
    .insert(job)
    .select('id');

  if (e1) throw new Error(e1.message);

  const { data: d2, error: e2 } = await supabase.rpc('getjob', {
    jobid: d1[0].id,
  });
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
