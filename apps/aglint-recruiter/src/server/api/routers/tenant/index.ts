import { createTRPCRouter } from '../../trpc';
import { read } from './read';

export const tenant = createTRPCRouter({
  read,
});
