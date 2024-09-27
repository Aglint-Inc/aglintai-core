import { createTRPCRouter } from '../../trpc';
import { departmentsUsage } from './departmentsUsage';
import { flags } from './flags';
import { members } from './members';
import { officeLocations } from './officeLocations';
import { read } from './read';
import { roles } from './roles';
import { updateTenant } from './updateTenant';

export const tenant = createTRPCRouter({
  read,
  roles,
  departmentsUsage,
  updateTenant,
  officeLocations,
  members,
  flags,
});
