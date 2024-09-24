import { createTRPCRouter } from '../../trpc';
import { read } from './read';

export const integrations = createTRPCRouter({
  read,
});
