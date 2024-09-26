import { createTRPCRouter } from '../../trpc';
import { getOauthEmail } from './get_oauth_user';
import { updateUser } from './update_current_user';

export const user = createTRPCRouter({
  update_current_user: updateUser,
  get_oauth_user: getOauthEmail,
});
