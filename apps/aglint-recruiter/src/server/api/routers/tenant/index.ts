import { createTRPCRouter } from '../../trpc';
import { read } from './read';
import { roles } from './roles';

export const tenant = createTRPCRouter({
  read,
  roles,
});
