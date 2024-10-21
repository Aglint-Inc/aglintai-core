import type { GetCandidateAvailabilityData } from '@/routers/candidate_availability/getCandidateAvailabilityData';
import type { GetMeetings } from '@/routers/candidate_availability/getMeetings';

export type CandidateMeetingsType = GetMeetings['output'];

export type CandidateAvailabilityType = GetCandidateAvailabilityData['output'];
