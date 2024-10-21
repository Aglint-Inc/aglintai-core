import { createTRPCRouter } from '../../trpc';
import { get_candidate_portal_detail } from './get_candidate_portal_detail';
import { get_email } from './get_email';
import { get_home_page } from './get_home_page';
import { get_home_page_preview } from './get_home_page_preview';
import { get_interviews } from './get_interviews';
import { get_messages } from './get_messages';
import { get_navbar } from './get_navbar';
import { get_navbar_preview } from './get_navbar_preview';
import { get_profile } from './get_profile';
import { update_portal_detail } from './update_portal_detail';
import { update_profile } from './update_profile';

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
