import type { RouterInputs, RouterOutputs, Unvoid } from '@/trpc/client';

export type Applications<T extends 'input' | 'output'> = T extends 'input'
  ? Unvoid<RouterInputs['jobs']['job']['applications']>
  : RouterOutputs['jobs']['job']['applications']['items'];

export type Application = Applications<'output'>[number];
