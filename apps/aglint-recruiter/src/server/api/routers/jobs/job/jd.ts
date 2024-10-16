import { privateProcedure, type ProcedureDefinition } from '@/server/api/trpc';

import { generateJd, schema } from '../common/generateJd';

export const jd = privateProcedure.input(schema).mutation(generateJd);

export type Jd = ProcedureDefinition<typeof jd>;
