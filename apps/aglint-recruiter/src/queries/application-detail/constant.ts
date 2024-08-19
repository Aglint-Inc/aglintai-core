export const applicationDetailQuery = {
  application: ({ application_id }) => ({
    queryKey: ['application-detail', { application_id }] as const,
  }),
} as const;
