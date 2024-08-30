import type { ApiPermissions } from './utils';

export const API_PERMISSIONS: ApiPermissions = {
  scheduling: {
    analytics: ['scheduling_module'],
  },
} as const;
