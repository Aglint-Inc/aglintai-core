import { availableSlots } from './availableSlots';
import { create } from './create';
import { getCandidateAvailabilityData } from './getCandidateAvailabilityData';
import { getMeetings } from './getMeetings';
import { getScheduledMeetings } from './getScheduledMeetings';
import { readCandidateAvailability } from './read';
import { update } from './update';
export const candidate_availability = {
  readCandidateAvailability,
  availableSlots,
  create,
  update,
  getMeetings,
  getCandidateAvailabilityData,
  getScheduledMeetings,
};
