import { createTRPCRouter } from '../../trpc';
import { getOauthEmail } from './get_oauth_user';
import { updateAdminUser } from './update_admin_user';
import { updateCurrentUser } from './update_current_user';
import { updateUser } from './update_user';

export const user = createTRPCRouter({
  update_current_user: updateCurrentUser,
  get_oauth_user: getOauthEmail,
  update_admin_user: updateAdminUser,
  update_user: updateUser,
});
