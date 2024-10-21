import { createTRPCRouter } from '../../trpc';
import { get } from './get';
import { post } from './post';

export const rolesAndPermissions = createTRPCRouter({
  get,
  post,
});
