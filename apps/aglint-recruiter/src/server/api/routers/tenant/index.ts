import { createTRPCRouter } from '../../trpc';
import { allDepartments } from './departments';
import { departmentsUsage } from './departmentsUsage';
import { flags } from './flags';
import { invite } from './invite';
import { cancel_invite } from './invite/cancel_invite';
import { resend_invite } from './invite/resend';
import { deleteLocation } from './location/delete';
import { deleteLocationUsage } from './location/deleteUsage';
import { insertLocation } from './location/insert';
import { readLocations } from './location/read';
import { updateLocation } from './location/update';
import { members } from './members';
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
  readLocations,
  deleteLocation,
  updateLocation,
  insertLocation,
  deleteLocationUsage,
  members,
  flags,
  invite,
  'cancel-invite': cancel_invite,
  'resend-invite': resend_invite,
  templates,
  updateWithRole,
  all_departments: allDepartments,
});
