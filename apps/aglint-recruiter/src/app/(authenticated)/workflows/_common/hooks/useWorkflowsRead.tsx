import type { Read } from '@/routers/workflows/read';
import { api } from '@/trpc/client';

export const useWorkflowsRead = (): Read['output'] =>
  api.workflows.read.useSuspenseQuery()[0];
