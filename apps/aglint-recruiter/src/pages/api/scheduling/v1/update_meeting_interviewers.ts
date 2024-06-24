/* eslint-disable no-console */
import {
  APIUpdateMeetingInterviewers,
  CalendarEvent,
  CompServiceKeyCred,
  ScheduleAuthType,
} from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { GoogleCalender } from '@/src/services/GoogleCalender/google-calender';
import { CalEventAttendeesAuthDetails } from '@/src/utils/event_book/book_session';
import { decrypt_string } from '@/src/utils/integrations/crypt-funcs';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const required_fields: (keyof APIUpdateMeetingInterviewers)[] = [
  'meeting_id',
  'replaced_inters',
  'candidate_email',
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    required_fields.forEach((field) => {
      if (!has(req.body, field)) {
        return res.status(400).send(`missing Field ${field}`);
      }
    });
    const { replaced_inters } = req.body as APIUpdateMeetingInterviewers;

    const {
      company_cred,
      meeting_organizer_auth,
      session_ints_auth,
      meeting_details,
      session_intes,
    } = await fetch_details(req.body);

    const google_cal = new GoogleCalender({
      company_cred: company_cred,
      recruiter: {
        email: meeting_organizer_auth.email,
        schedule_auth: meeting_organizer_auth.schedule_auth,
        user_id: meeting_organizer_auth.user_id,
      },
    });
    await google_cal.authorizeUser();
    let updated_attendees_auth = session_ints_auth.filter((int) =>
      replaced_inters.find((int2) => int2.user_id === int.user_id),
    );
    const updated_event = await google_cal.updateEvent({
      id: (meeting_details.meeting_json as CalendarEvent).id,
      attendees: updated_attendees_auth.map((int) => ({
        email: (int.schedule_auth as ScheduleAuthType)?.email ?? int.email,
        organizer: false,
      })),
    });
    console.log('updateed event');

    const attendees_promises = updated_attendees_auth.map(async (int) => {
      const email = (int.schedule_auth as ScheduleAuthType)?.email ?? int.email;
      const int_cal = new GoogleCalender({
        company_cred: company_cred,
        recruiter: int,
      });
      await int_cal.authorizeUser();
      await int_cal.importEvent(updated_event, email);
    });
    await Promise.all(attendees_promises);
    console.log('imported event');
    const updated_session_attendees = session_intes.map((int) => ({
      session_relation_id: int.session_relation_id,
      is_confirmed: Boolean(
        updated_attendees_auth.find((att) => att.user_id === int.user_id),
      ),
    }));

    await Promise.all(
      updated_session_attendees.map(async (reln) =>
        updateInterviewers({
          id: reln.session_relation_id,
          is_confirmed: reln.is_confirmed,
        }),
      ),
    );

    return res.status(200).json('ok');
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
};

export default handler;

const fetch_details = async (payload: APIUpdateMeetingInterviewers) => {
  const { meeting_id } = payload;

  const [meeting_details, session_intes] = await Promise.all([
    (async () => {
      const [meeting_details] = supabaseWrap(
        await supabaseAdmin
          .from('meeting_details')
          .select()
          .eq('id', meeting_id),
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
        schedule_auth: rec_auth.schedule_auth as ScheduleAuthType,
      };
    })(),
    (async () => {
      const session_intes = supabaseWrap(
        await supabaseAdmin
          .from('meeting_interviewers')
          .select()
          .eq('meeting_id', meeting_id),
      );
      return session_intes;
    })(),
  ]);

  const meeting_organizer_auth: CalEventAttendeesAuthDetails = {
    email: meeting_details.organizer_email,
    schedule_auth: meeting_details.schedule_auth,
    user_id: meeting_details.organizer_id,
  };

  const session_ints_auth_details = await supabaseWrap(
    await supabaseAdmin
      .from('recruiter_relation')
      .select(
        'recruiter(service_json,id),recruiter_user!public_recruiter_relation_user_id_fkey(user_id, email,schedule_auth)',
      )
      .in(
        'user_id',
        session_intes.map((i) => i.user_id),
      ),
  );
  const session_ints_auth: CalEventAttendeesAuthDetails[] =
    session_ints_auth_details.map((int) => ({
      email: int.recruiter_user.email,
      schedule_auth: int.recruiter_user.schedule_auth as ScheduleAuthType,
      user_id: int.recruiter_user.user_id,
    }));
  const hashed_comp_cred = session_ints_auth_details[0].recruiter.service_json;
  let company_cred: CompServiceKeyCred;
  if (hashed_comp_cred) {
    company_cred = JSON.parse(
      decrypt_string(hashed_comp_cred),
    ) as CompServiceKeyCred;
  }

  return {
    company_cred,
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
