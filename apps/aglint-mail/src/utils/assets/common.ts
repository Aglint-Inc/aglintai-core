interface SessionType {
  individual: string;
  debrief: string;
  panel: string;
}
interface ScheduleType {
  zoom: string;
  google_meet: string;
  phone_call: string;
  in_person_meeting: string;
}

export const durationIcon =
  'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/email_template_assets/duration.png?t=2024-07-22T04%3A49%3A13.702Z';

export const aglintLogo =
  'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/email_template_assets/brand_logo.png?t=2024-07-19T04%3A12%3A33.952Z';

export const companyLogoDummy =
  'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/email_template_assets/company_logo.png?t=2024-07-19T04%3A22%3A16.344Z';

export const sessionTypeIcons: SessionType = {
  individual:
    'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/email_template_assets/individual.png?t=2024-07-19T04%3A24%3A25.281Z',
  debrief:
    'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/email_template_assets/debrief.png?t=2024-07-19T04%3A24%3A13.777Z',
  panel:
    'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/email_template_assets/panel.png?t=2024-07-19T04%3A24%3A46.817Z',
};

export const scheduleTypeIcons: ScheduleType = {
  zoom: 'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/email_template_assets/google_meet.png?t=2024-07-19T04%3A27%3A34.002Z',
  google_meet:
    'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/email_template_assets/google_meet.png?t=2024-07-19T04%3A27%3A34.002Z',
  phone_call:
    'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/email_template_assets/google_meet.png?t=2024-07-19T04%3A27%3A34.002Z',
  in_person_meeting:
    'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/email_template_assets/in_person_meeting.png?t=2024-07-19T04%3A27%3A29.064Z',
};
