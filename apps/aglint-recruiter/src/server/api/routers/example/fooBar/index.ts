import { createTRPCRouter } from '@/server/api/trpc';

import { bar } from './bar';
import { foo, fooSchema } from './foo';

export const fooBar = createTRPCRouter({
  foo,
  bar,
});
