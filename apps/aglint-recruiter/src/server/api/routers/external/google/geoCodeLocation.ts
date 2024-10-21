import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { geoCodeLocation as geoCodeLocationFn } from '@/utils/externalApi/google/geoLocation';

export const helloSchema = z.object({ address: z.string() });

const query = ({
  input: { address },
}: PrivateProcedure<typeof helloSchema>) => {
  return geoCodeLocationFn(address);
};

export const geoCodeLocation = privateProcedure.input(helloSchema).query(query);

export type GeoCodeLocation = ProcedureDefinition<typeof geoCodeLocation>;
