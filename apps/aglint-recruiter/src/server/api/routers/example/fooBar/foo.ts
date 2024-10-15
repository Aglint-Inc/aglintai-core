import { type ProcedureDefinition, publicProcedure } from '@/server/api/trpc';

const query = () => {
  return `Foo`;
};

export const foo = publicProcedure.query(query);

export type Foo = ProcedureDefinition<typeof foo>;
