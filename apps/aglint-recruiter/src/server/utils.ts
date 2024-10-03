import type { DatabaseTable } from '@aglint/shared-types';
import {
  type MutationProcedure,
  type QueryProcedure,
  TRPCError,
} from '@trpc/server/unstable-core-do-not-import';

import type { AppRouter } from './api/root';
import { API_PERMISSIONS } from './permissions';

type Procedures = AppRouter['_def']['procedures'];

type Permissions = (DatabaseTable['permissions']['name'] | 'public')[];

type NestedPermissions<T> = T extends
  | QueryProcedure<any>
  | MutationProcedure<any>
  ? Permissions
  : {
      [K in keyof T]: Permissions | NestedPermissions<T[K]>;
    };

const getPermissions = (
  input: string[],
  permission: ApiPermissions = API_PERMISSIONS,
) => {
  if (input.length === 0) return null;
  const route = input[0] as keyof ApiPermissions;
  const level = permission[route];
  if (!level) return null;
  if (Array.isArray(level)) {
    return level;
  }
  input.shift();
  return getPermissions(input, level as unknown as ApiPermissions);
};

export const authorize = (path: string, permissions: Permissions = []) => {
  const input = path.split('.');
  const apiPermission = getPermissions(input);
  if (!apiPermission)
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Path does not exist',
    });
  return (
    apiPermission.includes('public') ||
    apiPermission.every((permission) => permissions.includes(permission))
  );
};

export type ApiPermissions = NestedPermissions<Procedures>;

export const trpcPublicRoutes = (requestUrl: string) => {
  if (!requestUrl.startsWith('/api/trpc/')) return false;
  const path = requestUrl.split('/api/trpc/')[1];
  return authorize(path);
};
