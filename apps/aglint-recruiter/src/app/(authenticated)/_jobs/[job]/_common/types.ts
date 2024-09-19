import type { RouterInputs, RouterOutputs, Unvoid } from '@/trpc/client';

export type Applications<T extends 'input' | 'output'> = T extends 'input'
  ? Unvoid<RouterInputs['jobs']['job']['applications']['read']>
  : RouterOutputs['jobs']['job']['applications']['read']['items'];

export type Application = Applications<'output'>[number];
