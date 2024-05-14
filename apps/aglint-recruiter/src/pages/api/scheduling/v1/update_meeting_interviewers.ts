/* eslint-disable no-console */
import {
  APIUpdateMeetingInterviewers,
  CalendarEvent,
  CompServiceKeyCred,
} from '@aglint/shared-types';
import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { GoogleCalender } from '@/src/services/GoogleCalender/google-calender';
import { decrypt_string } from '@/src/utils/integrations/crypt-funcs';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const required_fields: (keyof APIUpdateMeetingInterviewers)[] = [
  'meeting_id',
  'replaced_inters',
  'candidate_email',
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { replaced_inters, candidate_email, meeting_id } =
      req.body as APIUpdateMeetingInterviewers;
    required_fields.forEach((field) => {
      if (!has(req.body, field)) {
        return res.status(400).send(`missing Field ${field}`);
      }
    });
    const {
      curr_cal_event,
      curr_organizer,
      confirmed_inters,
      not_confirmed_inters,
      service_json,
      confirmed_inter,
      curr_ints_auth,
    } = await fetch_details(req.body);

    const curr_meeting_ints = [...confirmed_inters, ...not_confirmed_inters];
    const curr_org_email = curr_organizer.recruiter_user.email;
    let is_organiser_changed = Boolean(
      !replaced_inters.find((i) => i.email === curr_org_email),
    );
    let updated_event: CalendarEvent;

    let updated_db_sess_reln: {
      session_relation_id: string;
      is_confirmed: boolean;
    }[] = [];
    if (is_organiser_changed) {
      const google_cal = new GoogleCalender(null, null);
      await google_cal.authSuperAdmin(confirmed_inter.recruiter.id);
      const new_organiser = replaced_inters[0];
      updated_db_sess_reln = [
        {
          session_relation_id: confirmed_inters.find(
            (i) => i.email === curr_org_email,
          ).session_relation_id,
          is_confirmed: false,
        },
        {
          session_relation_id: not_confirmed_inters.find(
            (i) => i.email === new_organiser.email,
          ).session_relation_id,
          is_confirmed: true,
        },
      ];

      updated_event = await google_cal.changeMeetingOrganizer(
        curr_org_email,
        curr_cal_event.id,
        new_organiser.email,
      );
    } else {
      const organizer_auth = curr_organizer;
      const google_cal = new GoogleCalender(
        {
          company_cred: service_json,
          recruiter: {
            email: organizer_auth.recruiter_user.email,
            schedule_auth: organizer_auth.recruiter_user.schedule_auth,
            user_id: organizer_auth.recruiter_user.user_id,
          },
        },
        null,
      );
      await google_cal.authorizeUser();
      const new_inter_emails = replaced_inters.slice(1).map((i) => i.email);
      const attendees = [...new_inter_emails, candidate_email];
      updated_event = await google_cal.updateEvent({
        id: curr_cal_event.id,
        attendees: attendees.map((i) => ({
          email: i,
          organizer: false,
        })),
      });
      const attendees_promises = new_inter_emails.map(async (int_email) => {
        const int = curr_ints_auth.find(
          (a) => a.recruiter_user.email === int_email,
        );

        const email =
          (int.recruiter_user.schedule_auth as any)?.email ??
          int.recruiter_user.email;
        const int_cal = new GoogleCalender({
          company_cred: service_json,
          recruiter: int.recruiter_user,
        });
        await int_cal.authorizeUser();
        await int_cal.importEvent(updated_event, email);
      });
      await Promise.all(attendees_promises);

      confirmed_inters.forEach((conf_int) => {
        if (
          conf_int.email !== curr_org_email &&
          !attendees.find((email) => email === conf_int.email)
        ) {
          updated_db_sess_reln.push({
            is_confirmed: false,
            session_relation_id: conf_int.session_relation_id,
          });
        }
      });
      attendees.forEach((email) => {
        const int = curr_meeting_ints.find((int) => int.email === email);
        if (int) {
          updated_db_sess_reln.push({
            session_relation_id: int.session_relation_id,
            is_confirmed: true,
          });
        }
      });
    }
    supabaseWrap(
      await supabaseAdmin
        .from('interview_meeting')
        .update({
          meeting_json: updated_event,
        })
        .eq('id', meeting_id),
    );
    await Promise.all(
      updated_db_sess_reln.map(async (reln) =>
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
  const { meeting_id, replaced_inters } = payload;

  const [meeting_details, current_meeting_inters] = await Promise.all([
    (async () => {
      const [meeting_details] = supabaseWrap(
        await supabaseAdmin
          .from('meeting_details')
          .select()
          .eq('id', meeting_id),
      );
      return meeting_details;
    })(),
    (async () => {
      const current_meeting_inters = supabaseWrap(
        await supabaseAdmin
          .from('meeting_interviewers')
          .select()
          .eq('meeting_id', meeting_id),
      );
      return current_meeting_inters;
    })(),
  ]);

  // validation
  replaced_inters.forEach((new_att) => {
    if (!current_meeting_inters.find((int) => int.email === new_att.email)) {
      throw new Error(`${new_att} does not exist in the session`);
    }
  });

  const confirmed_inters = current_meeting_inters.filter((c) => c.is_confirmed);
  const not_confirmed_inters = current_meeting_inters.filter(
    (c) => !c.is_confirmed,
  );
  const curr_ints_auth = await supabaseWrap(
    await supabaseAdmin
      .from('recruiter_relation')
      .select(
        'recruiter(service_json,id),recruiter_user!public_recruiter_relation_user_id_fkey(user_id, email,schedule_auth)',
      )
      .in(
        'user_id',
        current_meeting_inters.map((i) => i.user_id),
      ),
  );
  const confirmed_inter = curr_ints_auth.find(
    (int) => int.recruiter_user.email === confirmed_inters[0].email,
  );
  let service_json: CompServiceKeyCred = null;
  if (confirmed_inter.recruiter.service_json) {
    service_json = JSON.parse(
      decrypt_string(confirmed_inter.recruiter.service_json),
    ) as CompServiceKeyCred;
  }
  const google_cal = new GoogleCalender({
    company_cred: service_json,
    recruiter: {
      email: confirmed_inter.recruiter_user.email,
      schedule_auth: confirmed_inter.recruiter_user.schedule_auth,
      user_id: confirmed_inter.recruiter_user.user_id,
    },
  });
  await google_cal.authorizeUser();
  const meeting_event = await google_cal.getCalenderEventById(
    (meeting_details.meeting_json as CalendarEvent).id,
  );
  curr_ints_auth.find(
    (i) => i.recruiter_user.email === meeting_event.organizer.email,
  );
  const curr_organizer = curr_ints_auth.find(
    (i) => i.recruiter_user.email === meeting_event.organizer.email,
  );

  return {
    curr_cal_event: meeting_event,
    curr_organizer,
    confirmed_inters,
    not_confirmed_inters,
    service_json,
    confirmed_inter,
    curr_ints_auth,
  };
};
const updateInterviewers = async ({ id, is_confirmed }) => {
  console.log(
    supabaseWrap(
      await supabaseAdmin
        .from('interview_session_relation')
        .update({
          is_confirmed,
        })
        .eq('id', id)
        .select(),
    ),
  );
};
// fetch current meeting interviewers
// is organizer changed
// fetch interviewer service json and schedule_auth
// fetch meeting event
// get meeting organizer and meeting attendees and candidate
// if organizer need to be changed  update organizer
// if attendeed need to be changed update attendees
