import { createTRPCRouter } from '../../trpc';
import { deleteDepartment } from './department/delete';
import { insertDepartment } from './department/insert';
import { departments } from './department/read';
import { departmentsUsage } from './departmentsUsage';
import { flags } from './flags';
import { invite } from './invite';
import { cancel_invite } from './invite/cancel_invite';
import { resend_invite } from './invite/resend';
import { deleteLocation } from './location/delete';
import { locationUsage } from './location/deleteUsage';
import { insertLocation } from './location/insert';
import { locations } from './location/read';
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
  departments,
  insertDepartment,
  departmentsUsage,
  deleteDepartment,
  updateTenant,
  updateTenantPreference,
  locations,
  deleteLocation,
  updateLocation,
  insertLocation,
  locationUsage,
  members,
  flags,
  invite,
  'cancel-invite': cancel_invite,
  'resend-invite': resend_invite,
  templates,
  updateWithRole,
});
