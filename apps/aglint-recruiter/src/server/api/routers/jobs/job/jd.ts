import { privateProcedure } from '@/server/api/trpc';

import { generateJd, schema } from '../common/generateJd';

export const jd = privateProcedure.input(schema).mutation(generateJd);
