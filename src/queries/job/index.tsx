import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { JdJsonType } from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { jobQueryKeys } from './keys';
import { Job, JobCreate, JobInsert } from './types';

export const useJobRead = () => {
  const queryClient = useQueryClient();
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = jobQueryKeys.jobs();
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
  const { queryKey } = jobQueryKeys.jobs();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newJob: Omit<JobCreate, 'jd_json'>) => {
      const job = {
        ...newJob,
        jd_json: {
          educations: [],
          skills: [],
          rolesResponsibilities: [],
          title: '',
          level: 'Mid-level',
        } as JdJsonType,
      };
      return createJob({
        recruiter_id,
        ...job,
        scoring_criteria_loading: true,
        draft: {
          ...job,
        },
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
  const { queryKey } = jobQueryKeys.jobs();
  const mutation = useMutation({
    mutationFn: (newJob: Partial<Job>) => updateJob(newJob),
    onMutate: (newJob) => {
      const previousJobs = queryClient.getQueryData<Job[]>(queryKey);
      const newJobs = previousJobs.reduce((acc, curr) => {
        if (curr.id === newJob.id) acc.push({ ...curr, ...newJob });
        else acc.push(curr);
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
  const { queryKey } = jobQueryKeys.jobs();
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
  const { queryKey } = jobQueryKeys.jobs();
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
      toast.success('Job successfully deleted');
    },
  });
  return mutation;
};

export const useJobRefresh = () => {
  const queryClient = useQueryClient();
  const { queryKey } = jobQueryKeys.jobs();
  const mutation = useMutation({
    mutationFn: (id: Job['id']) => readJob(id),
    onError: () => {
      toast.error('Unable to delete job');
    },
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
  const { data, error } = await supabase.rpc('getjobs', {
    recruiterid: recruiter_id,
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

const createJob = async (newJob: JobInsert) => {
  const { data: d1, error: e1 } = await supabase
    .from('public_jobs')
    .insert(newJob)
    .select('id');
  if (e1) throw new Error(e1.message);
  const { data: d2, error: e2 } = await supabase.rpc('getjob', {
    jobid: d1[0].id,
  });
  if (e2) return null;
  return d2[0] as unknown as Job;
};

const updateJob = async (newJob: Partial<Job>) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .update(newJob)
    .eq('id', newJob.id)
    .select();
  if (error) throw new Error(error.message);
  return { data, error };
};

const deleteJob = async (id: Job['id']) => {
  const { error } = await supabase.from('public_jobs').delete().eq('id', id);
  if (error) throw new Error(error.message);
};
