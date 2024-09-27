import { createTRPCRouter } from '@/server/api/trpc';

import { read } from './read';
import { updateNote } from './update';

export const note = createTRPCRouter({ read, updateNote });
