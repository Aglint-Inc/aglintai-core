export const jobQueryKeys = {
  all: { queryKey: ['aglint_jobs'] as string[] },
  jobs: () => ({
    queryKey: [...jobQueryKeys.all.queryKey, 'jobs']
  }),
  job: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobQueryKeys.jobs().queryKey, { job_id }]
  }),
  scoring_param: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobQueryKeys.jobs().queryKey, { job_id }, 'scoring_param']
  })
} as const;
