import type { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import {
  type QueryClient,
  type QueryFilters,
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { useCallback } from 'react';

import { UploadApiFormData } from '@/apiUtils/job/candidateUpload/types';
import { handleJobApi } from '@/apiUtils/job/utils';
import { useTenant } from '@/company/hooks';
import { type GetInterviewPlansType } from '@/pages/api/scheduling/get_interview_plans';
import { api } from '@/trpc/client';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import { GC_TIME, noPollingKey } from '..';
import { jobKey, jobsQueryKeys } from '../jobs/keys';
import { type Job } from '../jobs/types';

export const jobQueries = {
  job: ({
    id,
    enabled,
    queryClient,
    initialData,
    refetchOnMount,
  }: Pollers & { initialData?: Job }) =>
    queryOptions({
      queryKey: [...jobsQueryKeys.jobs().queryKey, { id }],
      enabled,
      initialData: initialData!,
      refetchOnMount,
      queryFn: async () => {
        const job = await readJob(id);
        const { queryKey } = jobsQueryKeys.jobs();
        const jobs = queryClient!.getQueryData<Job[]>(queryKey)!;
        queryClient!.setQueryData<Job[]>(
          queryKey,
          jobs.reduce((acc, curr) => {
            if (curr.id === id) acc.push(job);
            else acc.push(curr);
            return acc;
          }, [] as Job[]),
        );
        return job;
      },
    }),
  interview_plans: ({ id }: JobRequisite) =>
    queryOptions({
      queryKey: [
        ...jobQueries.job({ id }).queryKey,
        'interview_plans',
        noPollingKey,
      ],
      queryFn: async () =>
        (await axios.get(`/api/scheduling/get_interview_plans?job_id=${id}`))
          .data as GetInterviewPlansType['respone'],
    }),
  polling: ({ id, enabled, queryClient }: Pollers) => {
    return queryOptions({
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      refetchInterval: enabled ? 5000 : false,
      queryKey: ['job_polling', { id }],
      queryFn: async () => {
        await jobQueries.refresh({ id, queryClient });
        return true;
      },
    });
  },
  refresh: async ({ id, queryClient }: Pollers) => {
    await queryClient!.invalidateQueries({
      predicate: (query) =>
        query.queryKey.includes(jobKey) &&
        !!query.queryKey.find((key) => (key as any)?.id === id) &&
        !query.queryKey.includes(noPollingKey),
    });
  },
};

export const useJobSync = () => {
  const queryClient = useQueryClient();
  return api.ats.sync.job.useMutation({
    onSuccess: (_, data) => {
      if (data) {
        toast.success('Synced successfully');
        jobQueries.refresh({ id: data.job_id, queryClient });
      }
    },
    onError: () => toast.error('Synced failed'),
  });
};

export const useInvalidateJobQueries = () => {
  const queryClient = useQueryClient();
  const utils = api.useUtils();
  const predicateFn = useCallback(
    (id: string): QueryFilters['predicate'] =>
      (query) =>
        query.queryKey.includes(jobKey) &&
        Boolean(query.queryKey.find((key) => (key as any)?.id === id)) &&
        !query.queryKey.includes(noPollingKey),
    [jobKey, noPollingKey],
  );
  const revalidateJobQueries = async (id: Job['id']) =>
    await Promise.allSettled([
      queryClient.invalidateQueries({
        type: 'active',
        predicate: predicateFn(id!),
      }),
      queryClient.removeQueries({
        type: 'inactive',
        predicate: predicateFn(id!),
      }),
      utils.jobs.job.applications.read.invalidate({ job_id: id! }),
    ]);

  return { revalidateJobQueries };
};

type Pollers = JobRequisite &
  Partial<{
    enabled: boolean;
    queryClient: QueryClient;
    refetchOnMount: boolean;
  }>;

export type JobRequisite = Pick<DatabaseTable['public_jobs'], 'id'>;

export const readJob = async (id: string) =>
  (
    await supabase
      .from('job_view')
      .select()
      .eq('id', id)
      .throwOnError()
      .single()
  ).data!;

type ApplicationsAllQueryPrerequistes = {
  recruiter_id: DatabaseTable['recruiter']['id'];
  job_id: DatabaseTable['public_jobs']['id'];
  count?: number;
  polling?: boolean;
};

export const useUploadApplication = ({ job_id }: { job_id: string }) => {
  const { recruiter_id } = useTenant();
  const { revalidateJobQueries } = useInvalidateJobQueries();
  return useMutation({
    mutationFn: async (
      payload: Omit<HandleUploadApplication, 'job_id' | 'recruiter_id'>,
    ) => {
      toast.message('Uploading application');
      await handleUploadApplication({
        job_id,
        recruiter_id,
        ...payload,
      });
      await revalidateJobQueries(job_id);
    },
    onError: (error) => toast.error(`Upload failed. (${error.message})`),
    onSuccess: () => toast.success('Uploaded successfully'),
  });
};
type HandleUploadApplication = ApplicationsAllQueryPrerequistes & {
  recruiter_id: string;
  candidate: Omit<DatabaseTableInsert['candidates'], 'recruiter_id'>;
  file: File;
};
const handleUploadApplication = async (payload: HandleUploadApplication) => {
  const formData = new FormData();
  formData.append(UploadApiFormData.FILES, payload.file);
  const request = {
    params: {
      email: payload.candidate.email,
      first_name: payload.candidate.first_name,
      job_id: payload.job_id,
      last_name: payload.candidate.last_name,
      phone: payload.candidate.phone || null,
      linkedin: payload.candidate.linkedin || null,
      recruiter_id: payload.recruiter_id,
    },
    files: formData,
  };
  const response = await handleJobApi('candidateUpload/manualUpload', request);
  if (!response.confirmation) throw new Error(response.error);
};

export const useUploadResume = (params: { job_id: string }) => {
  const { recruiter_id } = useTenant();
  const { revalidateJobQueries } = useInvalidateJobQueries();
  return useMutation({
    mutationFn: async (
      payload: Omit<HandleUploadResume, 'job_id' | 'recruiter_id'>,
    ) => {
      toast.message('Uploading applications');
      await handleBulkResumeUpload({
        job_id: params.job_id,
        recruiter_id,
        ...payload,
      });
      await revalidateJobQueries(params.job_id);
    },
    onError: (error) => toast.error(`Upload failed. (${error.message})`),
    onSuccess: () => toast.success('Uploaded successfully'),
  });
};
type HandleUploadResume = ApplicationsAllQueryPrerequistes & {
  recruiter_id: string;
  files: File[];
};
const handleResumeUpload = async (payload: HandleUploadResume) => {
  const formData = new FormData();
  payload.files.forEach((file) =>
    formData.append(UploadApiFormData.FILES, file),
  );
  const request = {
    params: {
      job_id: payload.job_id,
      recruiter_id: payload.recruiter_id,
    },
    files: formData,
  };
  const response = await handleJobApi('candidateUpload/resumeUpload', request);
  if (response.filter(({ confirmation }) => !confirmation).length !== 0)
    throw new Error('Failed to upload resume');
  return response;
};
const handleBulkResumeUpload = async (payload: HandleUploadResume) => {
  const promises = payload.files.map((file) =>
    handleResumeUpload({
      job_id: payload.job_id,
      recruiter_id: payload.recruiter_id,
      files: [file],
    }),
  );
  const responses = await Promise.allSettled(promises);
  const failedResponses = responses.filter(
    ({ status }) => status === 'rejected',
  ) as PromiseRejectedResult[];
  if (failedResponses.length !== 0)
    throw new Error(`Failed to upload ${failedResponses.length} resumes.`);
};

export const useUploadCsv = (params: { job_id: string }) => {
  const { recruiter_id } = useTenant();
  const { revalidateJobQueries } = useInvalidateJobQueries();
  return useMutation({
    mutationFn: async (
      payload: Omit<HandleUploadCsv, 'job_id' | 'recruiter_id'>,
    ) => {
      toast.message('Uploading applications');
      await handleBulkCsvUpload({
        job_id: params.job_id,
        recruiter_id,
        ...payload,
      });
      await revalidateJobQueries(params.job_id);
    },
    onError: (error) => toast.error(`Upload failed. (${error.message})`),
    onSuccess: () => toast.success('Uploaded successfully'),
  });
};
type HandleUploadCsv = ApplicationsAllQueryPrerequistes & {
  candidates: Parameters<
    typeof handleJobApi<'candidateUpload/csvUpload'>
  >['1']['candidates'];
  recruiter_id: string;
};
const handleBulkCsvUpload = async (payload: HandleUploadCsv) => {
  const formData = {
    job_id: payload.job_id,
    recruiter_id: payload.recruiter_id,
    candidates: payload.candidates,
  };
  const response = await handleJobApi('candidateUpload/csvUpload', formData);
  if (!response.confirmation) throw new Error(response.error);
};
