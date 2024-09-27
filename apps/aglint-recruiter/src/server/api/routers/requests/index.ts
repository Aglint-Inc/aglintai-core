import { createTRPCRouter } from '../../trpc';
import { create } from './create';
import { note } from './note';

export const requests = createTRPCRouter({
  create,
  note,
});
