
import { api } from '@/trpc/client';

export const useRequestAvailabilityDetails = api.candidate_availability.availableSlots.useQuery;
