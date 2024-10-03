import { type RouterOutputs } from '@/trpc/client';

export type CandidateMeetingsType =
  RouterOutputs['candidate_availability']['getMeetings'];

export type CandidateAvailabilityType =
  RouterOutputs['candidate_availability']['getCandidateAvailabilityData'];
