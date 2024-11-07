import { createTRPCRouter } from '../../trpc';
import { get_candidate_portal_detail } from './read/get_candidate_portal_detail';
import { get_email } from './read/get_email';
import { get_home_page } from './read/get_home_page';
import { get_home_page_preview } from './read/get_home_page_preview';
import { get_interviews } from './read/get_interviews';
import { get_messages } from './read/get_messages';
import { get_navbar } from './read/get_navbar';
import { get_navbar_preview } from './read/get_navbar_preview';
import { get_profile } from './read/get_profile';
import { update_portal_detail } from './update/update_portal_detail';
import { update_profile } from './update/update_profile';

export const candidatePortal = createTRPCRouter({
  get_email,
  get_interviews,
  get_messages,
  get_navbar,
  get_profile,
  update_profile,
  update_portal_detail,
  get_candidate_portal_detail,
  get_home_page,
  get_home_page_preview,
  get_navbar_preview,
});
