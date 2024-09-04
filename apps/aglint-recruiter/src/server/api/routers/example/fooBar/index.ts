import { createTRPCRouter } from '@/server/api/trpc';

import { bar, barSchema } from './bar';
import { foo, fooSchema } from './foo';

export const fooBar = createTRPCRouter({
  foo,
  bar,
});

export const fooBarSchema = {
  foo: fooSchema,
  bar: barSchema,
};
