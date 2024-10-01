import { type CalendarEvent } from '@aglint/shared-types';
import { CApiError } from '@aglint/shared-utils';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { GoogleCalender } from '@/services/GoogleCalender/google-calender';
import type { CalEventAttendeesAuthDetails } from '@/utils/event_book/types';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

type BodyParams = {
  calender_event: CalendarEvent;
};

const cancelCalenderEvent = async (req_body: BodyParams) => {
  const { calender_event } = req_body as BodyParams;
  const { comp_cred, recruiter } = await getRecruiterCredentials(
    calender_event.organizer.email,
  );

  const google_cal = new GoogleCalender(comp_cred, recruiter);

  await google_cal.authorizeUser();

  await google_cal.updateEventStatus(calender_event.id, 'cancelled');
};

const getRecruiterCredentials = async (email: string) => {
  const supabaseAdmin = getSupabaseServer();

  const rec_user = (
    await supabaseAdmin
      .from('recruiter_user')
      .select()
      .eq('email', email)
      .single()
      .throwOnError()
  ).data;
  if (!rec_user) {
    throw new CApiError('SERVER_ERROR', 'No recruiter user found');
  }

  const user_id = rec_user.user_id;
  const rec = (
    await supabaseAdmin
      .from('recruiter_relation')
      .select(
        'recruiter!inner(integrations!inner(service_json)),recruiter_user!public_recruiter_relation_user_id_fkey!inner(schedule_auth)',
      )
      .eq('user_id', user_id)
      .single()
      .throwOnError()
  ).data;
  if (!rec) {
    throw new CApiError('SERVER_ERROR', 'No recruiter found');
  }
  const r: CalEventAttendeesAuthDetails = {
    email,
    schedule_auth: rec.recruiter_user.schedule_auth as any,
    user_id,
  };
  return { comp_cred: rec.recruiter.integrations.service_json, recruiter: r };
};

export default createPageApiPostRoute(null, cancelCalenderEvent);
