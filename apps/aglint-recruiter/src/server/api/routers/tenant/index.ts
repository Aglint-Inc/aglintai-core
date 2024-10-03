import { createTRPCRouter } from '../../trpc';
import { departmentsUsage } from './departmentsUsage';
import { flags } from './flags';
import { invite } from './invite';
import { resend_invite } from './invite/resend';
import { members } from './members';
import { officeLocations } from './officeLocations';
import { read } from './read';
import { roles } from './roles';
import { templates } from './templates';
import { updateTenant } from './updateTenant';
import { updateTenantPreference } from './updateTenantPreference';

export const tenant = createTRPCRouter({
  read,
  roles,
  departmentsUsage,
  updateTenant,
  updateTenantPreference,
  officeLocations,
  members,
  flags,
  invite,
  'resend-invite': resend_invite,
  templates,
});
