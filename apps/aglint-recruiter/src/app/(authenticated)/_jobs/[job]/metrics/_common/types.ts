import type { RouterOutputs } from '@/trpc/client';

type MetricsOutputs = RouterOutputs['jobs']['job']['metrics'];

type Types = keyof MetricsOutputs;

export type Metrics<T extends Types> = MetricsOutputs[T];

export type MetricsOptions<T extends Types> = {
  [_id in keyof Metrics<T>]: string;
};
