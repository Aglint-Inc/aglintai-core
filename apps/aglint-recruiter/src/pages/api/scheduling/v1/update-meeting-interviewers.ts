import {
  APIUpdateMeetingInterviewers,
  CalendarEvent,
  ScheduleAuthType,
} from '@aglint/shared-types';
import { schema_update_meeting_ints, supabaseWrap } from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { GoogleCalender } from '@/src/services/GoogleCalender/google-calender';
import { ApiError } from '@/src/utils/customApiError';
import { CalEventAttendeesAuthDetails } from '@/src/utils/event_book/book_session';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsed_body = v.parse(schema_update_meeting_ints, {
      ...req.body,
    });
    const {
      company_cred_hash_str,
      meeting_organizer_auth,
      session_ints_auth,
      meeting_details,
    } = await fetch_details(req.body);

    const updated_session_attendees = session_ints_auth.map((int) => {
      let updated_int = {
        ...int,
      };
      if (
        int.session_relation_id === parsed_body.curr_declined_int_sesn_reln_id
      ) {
        updated_int.is_confirmed = false;
      }
      if (int.session_relation_id === parsed_body.new_int_sesn_reln_id) {
        updated_int.is_confirmed = true;
      }
      return updated_int;
    });

    const google_cal = new GoogleCalender(company_cred_hash_str, {
      email: meeting_organizer_auth.email,
      schedule_auth: meeting_organizer_auth.schedule_auth,
      user_id: meeting_organizer_auth.user_id,
    });
    await google_cal.authorizeUser();

    const updated_event = await google_cal.updateEvent({
      id: (meeting_details.meeting_json as CalendarEvent).id,
      attendees: updated_session_attendees
        .filter((i) => i.is_confirmed)
        .map((int) => ({
          email: (int.schedule_auth as ScheduleAuthType)?.email ?? int.email,
          organizer: false,
        })),
    });

    const attendees_promises = updated_session_attendees
      .filter((i) => i.is_confirmed)
      .map(async (int) => {
        const email =
          (int.schedule_auth as ScheduleAuthType)?.email ?? int.email;
        const int_cal = new GoogleCalender(company_cred_hash_str, int);
        await int_cal.authorizeUser();
        await int_cal.importEvent(updated_event, email);
      });
    await Promise.all(attendees_promises);

    await Promise.all(
      updated_session_attendees.map(
        async (reln) =>
          await updateInterviewers({
            id: reln.session_relation_id,
            is_confirmed: reln.is_confirmed,
          }),
      ),
    );

    return res.status(200).json('ok');
  } catch (error) {
    console.error(error);
    return res
      .status(error.status ?? 500)
      .json({ name: error.name, message: error.message });
  }
};

export default handler;

const fetch_details = async (payload: APIUpdateMeetingInterviewers) => {
  const { session_id } = payload;

  const [meeting_details, session_intes] = await Promise.all([
    (async () => {
      const [meeting_details] = supabaseWrap(
        await supabaseAdmin
          .from('meeting_details')
          .select()
          .eq('session_id', session_id),
      );
      const [rec_auth] = await supabaseWrap(
        await supabaseAdmin
          .from('recruiter_user')
          .select('user_id,email,schedule_auth')
          .eq('user_id', meeting_details.organizer_id),
      );
      return {
        ...meeting_details,
        organizer_email: rec_auth.email,
        organizer_id: rec_auth.user_id,
        schedule_auth: rec_auth.schedule_auth,
      };
    })(),
    (async () => {
      const session_intes = supabaseWrap(
        await supabaseAdmin
          .from('meeting_interviewers')
          .select()
          .eq('session_id', session_id),
      );
      return session_intes;
    })(),
  ]);

  const meeting_organizer_auth: Omit<
    CalEventAttendeesAuthDetails,
    'session_relation_id'
  > = {
    email: meeting_details.organizer_email,
    schedule_auth: meeting_details.schedule_auth,
    user_id: meeting_details.organizer_id,
  };

  const session_ints_auth_details = await supabaseWrap(
    await supabaseAdmin
      .from('recruiter_relation')
      .select(
        'recruiter(id,integrations(service_json)),recruiter_user!public_recruiter_relation_user_id_fkey(user_id, email,schedule_auth)',
      )
      .in(
        'user_id',
        session_intes.map((i) => i.user_id),
      ),
  );
  const session_ints_auth: (CalEventAttendeesAuthDetails & {
    session_relation_id: string;
    is_confirmed: boolean;
  })[] = session_ints_auth_details.map((int) => ({
    email: int.recruiter_user.email,
    schedule_auth: int.recruiter_user.schedule_auth as ScheduleAuthType,
    user_id: int.recruiter_user.user_id,
    is_confirmed: session_intes.find(
      (s_int) => s_int.user_id === int.recruiter_user.user_id,
    ).is_confirmed,
    session_relation_id: session_intes.find(
      (s_int) => s_int.user_id === int.recruiter_user.user_id,
    ).session_relation_id,
  }));
  const hashed_comp_cred =
    session_ints_auth_details[0].recruiter.integrations.service_json;

  if (
    !session_ints_auth.find(
      (int) =>
        int.session_relation_id === payload.curr_declined_int_sesn_reln_id,
    )
  ) {
    throw new ApiError(
      'SERVER_ERROR',
      `${payload.curr_declined_int_sesn_reln_id} not exist in meeting_interviewers`,
    );
  }

  if (
    !session_ints_auth.find(
      (int) => int.session_relation_id === payload.new_int_sesn_reln_id,
    )
  ) {
    throw new ApiError(
      'SERVER_ERROR',
      `${payload.new_int_sesn_reln_id} not exist in meeting_interviewers`,
    );
  }
  return {
    company_cred_hash_str: hashed_comp_cred,
    meeting_organizer_auth,
    session_ints_auth,
    meeting_details,
    session_intes,
  };
};

const updateInterviewers = async ({ id, is_confirmed }) => {
  supabaseWrap(
    await supabaseAdmin
      .from('interview_session_relation')
      .update({
        is_confirmed,
      })
      .eq('id', id)
      .select(),
  );
};
// fetch current meeting interviewers
// is organizer changed
// fetch interviewer service json and schedule_auth
// fetch meeting event
// get meeting organizer and meeting attendees and candidate
// if organizer need to be changed  update organizer
// if attendeed need to be changed update attendees
