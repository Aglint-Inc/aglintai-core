import { createTRPCRouter } from '../../trpc';
import { getOauthEmail } from './get_oauth_user';
import { updateCurrentUser } from './update_current_user';

export const user = createTRPCRouter({
  update_current_user: updateCurrentUser,
  get_oauth_user: getOauthEmail,
});
