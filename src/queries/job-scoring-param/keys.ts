export const jobScoringParamKeys = {
  all: { queryKey: ['aglint_job_scoring_param'] as string[] },
  job: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobScoringParamKeys.all.queryKey, { job_id }]
  })
} as const;
