import { createTRPCRouter } from '../../trpc';
import { getEmail } from './get_email';
import { getInterviews } from './get_interviews';
import { getMessages } from './get_messages';
import { getNav } from './get_nav';
import { getProfile } from './get_profile';
import { updateProfile } from './update_profile';

export const candidatePortal = createTRPCRouter({
  get_email: getEmail,
  get_interviews: getInterviews,
  get_messages: getMessages,
  get_navbar: getNav,
  get_profile: getProfile,
  update_profile: updateProfile,
});
