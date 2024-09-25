import { createTRPCRouter } from '../../trpc';
import { read } from './read';

export const auth = createTRPCRouter({
  read,
});
