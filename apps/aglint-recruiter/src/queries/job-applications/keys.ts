export const applicationMutationKeys = {
  all: { mutationKey: ['application'] },
  move: () => ({
    mutationKey: [
      ...applicationMutationKeys.all.mutationKey,
      'move',
    ] as string[],
  }),
  reupload: () => ({
    mutationKey: [
      ...applicationMutationKeys.all.mutationKey,
      'reupload',
    ] as string[],
  }),
  delete: () => ({
    mutationKey: [
      ...applicationMutationKeys.all.mutationKey,
      'delete',
    ] as string[],
  }),
} as const;
