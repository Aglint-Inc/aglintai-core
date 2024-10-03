import { createTRPCRouter } from '../../trpc';
import { departmentsUsage } from './departmentsUsage';
import { flags } from './flags';
import { invite } from './invite';
import { members } from './members';
import { officeLocations } from './officeLocations';
import { read } from './read';
import { roles } from './roles';
import { updateCandidatePortal } from './updateCandidatePortal';
import { updateTenant } from './updateTenant';

export const tenant = createTRPCRouter({
  read,
  roles,
  departmentsUsage,
  updateTenant,
  updateCandidatePortal,
  officeLocations,
  members,
  flags,
  invite,
});
