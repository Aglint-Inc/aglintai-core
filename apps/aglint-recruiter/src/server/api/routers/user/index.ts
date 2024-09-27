import { createTRPCRouter } from '../../trpc';
import { get } from './get';

export const user = createTRPCRouter({
  get,
});
