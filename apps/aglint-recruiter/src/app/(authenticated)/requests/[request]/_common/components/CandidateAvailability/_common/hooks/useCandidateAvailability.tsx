import type { ReadCandidateAvailability } from '@/routers/candidate_availability/read';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useCandidateAvailability = (
  input: ReadCandidateAvailability['input'],
): ProcedureQuery<ReadCandidateAvailability> =>
  api.candidate_availability.readCandidateAvailability.useQuery(input, {
    enabled: !!input.candidate_availability_id,
  });
