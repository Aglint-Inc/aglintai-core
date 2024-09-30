import { api } from '@/trpc/client';

export const useCandidateAvailability =
  api.candidate_availability.readCandidateAvailability.useQuery;
