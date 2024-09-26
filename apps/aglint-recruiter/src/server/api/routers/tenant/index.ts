import { createTRPCRouter } from '../../trpc';
import { departmentsUsage } from './departmentsUsage';
import { read } from './read';
import { roles } from './roles';
import { updateTenant } from './updateTenant';

export const tenant = createTRPCRouter({
  read,
  roles,
  departmentsUsage,
  updateTenant,
});
