import type { Read } from '@/routers/tenant/read';
import { api } from '@/trpc/client';

export const useTenant = (): Read['output'] =>
  api.tenant.read.useSuspenseQuery(undefined, {
    staleTime: Infinity,
  })[0];

export type TenantType = ReturnType<typeof useTenant>;
