import { createTRPCRouter } from '../../trpc';
import { allDepartments } from './departments';
import { departmentsUsage } from './departmentsUsage';
import { flags } from './flags';
import { invite } from './invite';
import { cancel_invite } from './invite/cancel_invite';
import { resend_invite } from './invite/resend';
import { members } from './members';
import { officeLocations } from './officeLocations';
import { read } from './read';
import { roles } from './roles';
import { templates } from './templates';
import { updateTenant } from './updateTenant';
import { updateTenantPreference } from './updateTenantPreference';
import { updateWithRole } from './updateWithRole';

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
  'cancel-invite': cancel_invite,
  'resend-invite': resend_invite,
  templates,
  updateWithRole,
  all_departments: allDepartments,
});
