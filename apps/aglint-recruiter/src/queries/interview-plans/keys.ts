export const interviewSessionMutationKeys = {
  all: { mutationKey: ['interview_session'] },
  update: () => ({
    mutationKey: [
      ...interviewSessionMutationKeys.all.mutationKey,
      'update',
    ] as string[],
  }),
  delete: () => ({
    mutationKey: [
      ...interviewSessionMutationKeys.all.mutationKey,
      'delete',
    ] as string[],
  }),
} as const;
