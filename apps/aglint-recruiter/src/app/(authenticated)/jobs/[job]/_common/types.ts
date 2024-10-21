import type { Read } from '@/routers/jobs/job/applications/read';

export type Applications = Read;

export type Application = Applications['output']['items'][number];
