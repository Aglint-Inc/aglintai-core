import { createTRPCRouter } from '../../trpc';
import { get } from './get';

export const rolesAndPermissions = createTRPCRouter({
  get,
});
