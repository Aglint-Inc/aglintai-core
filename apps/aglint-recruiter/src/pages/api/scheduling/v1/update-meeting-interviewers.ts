import {
  type APIUpdateMeetingInterviewers,
  type CalendarEvent,
  type ScheduleAuthType,
} from '@aglint/shared-types';
import {
  CApiError,
  createRequestProgressLogger,
  schema_update_meeting_ints,
  supabaseWrap,
} from '@aglint/shared-utils';
import { executeWorkflowAction } from '@aglint/shared-utils/src/request-workflow/utils';
import { type z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { GoogleCalender } from '@/services/GoogleCalender/google-calender';
import type { CalEventAttendeesAuthDetails } from '@/utils/event_book/types';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const updateMeetingInterviewers = async (
  parsed_body: z.infer<typeof schema_update_meeting_ints>,
) => {
  const supabaseAdmin = getSupabaseServer();

  const reqProgressLogger = createRequestProgressLogger({
    request_id: parsed_body.request_id,
    supabaseAdmin,
    event_type: 'REPLACE_ALTERNATIVE_INTERVIEWER',
  });
  const change_int = async () => {
    const {
      company_cred_hash_str,
      meeting_organizer_auth,
      session_ints_auth,
      meeting_details,
    } = await fetch_details(parsed_body);

    const updated_session_attendees = session_ints_auth.map((int) => {
      const updated_int = {
        ...int,
      };
      if (
        int.session_relation_id === parsed_body.curr_declined_int_sesn_reln_id
      ) {
        updated_int.is_confirmed = false;
      }
      if (int.user_id === parsed_body.new_int_user_id) {
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
    supabaseWrap(
      await supabaseAdmin
        .from('interview_session_cancel')
        .update({
          is_resolved: true,
        })
        .eq('session_relation_id', parsed_body.curr_declined_int_sesn_reln_id),
    );
  };
  await executeWorkflowAction(change_int, {}, reqProgressLogger);
};

const syncIntInSession = async (
  user_id: string,
  session_id: string,
  is_debrief: boolean,
) => {
  const supabaseAdmin = getSupabaseServer();

  if (is_debrief) {
    let [sesn_reln] = supabaseWrap(
      await supabaseAdmin
        .from('interview_session_relation')
        .select()
        .eq('session_id', session_id)
        .eq('user_id', user_id),
      false,
    );
    if (sesn_reln) {
      return sesn_reln;
    }
    [sesn_reln] = supabaseWrap(
      await supabaseAdmin
        .from('interview_session_relation')
        .insert({
          session_id,
          interviewer_type: 'qualified',
          is_confirmed: false,
          user_id,
          training_type: 'qualified',
        })
        .select(),
    );
    return sesn_reln;
  }

  const [module_relation] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session_relation')
      .select('*,interview_module_relation!inner(*)')
      .eq('interview_module_relation.user_id', user_id)
      .eq('session_id', session_id),
    false,
  );
  if (!module_relation) {
    throw new CApiError('SERVER_ERROR', 'No module relation found');
  }
  const [sesn_reln] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session_relation')
      .select('*')
      .eq('session_id', session_id)
      .eq(
        'interview_module_relation_id',
        module_relation.interview_module_relation.id,
      ),
    false,
  );

  if (!sesn_reln) {
    supabaseWrap(
      await supabaseAdmin.from('interview_session_relation').insert({
        session_id,
        interviewer_type: 'qualified',
        is_confirmed: false,
        interview_module_relation_id: module_relation.id,
        training_type: 'qualified',
      }),
    );
  }

  return sesn_reln;
};

const fetch_details = async (payload: APIUpdateMeetingInterviewers) => {
  const { session_id } = payload;
  const supabaseAdmin = getSupabaseServer();

  const [meeting_details] = await Promise.all([
    (async () => {
      const meeting_details = supabaseWrap(
        await supabaseAdmin
          .from('meeting_details')
          .select()
          .eq('session_id', session_id)
          .single(),
      );
      if (!meeting_details.organizer_id) {
        throw new CApiError('SERVER_ERROR', 'No organizer found');
      }
      await syncIntInSession(
        payload.new_int_user_id,
        payload.session_id,
        meeting_details.session_type === 'debrief',
      );
      const rec_auth = supabaseWrap(
        await supabaseAdmin
          .from('recruiter_user')
          .select('user_id,email,schedule_auth')
          .eq('user_id', meeting_details.organizer_id)
          .single(),
      );

      return {
        ...meeting_details,
        organizer_email: rec_auth.email,
        organizer_id: rec_auth.user_id,
        schedule_auth: rec_auth.schedule_auth,
      };
    })(),
  ]);
  if (meeting_details.module_id) {
    await createSesnRelnIfNotExists({
      module_id: meeting_details.module_id,
      session_id,
      user_id: payload.new_int_user_id,
    });
  }
  const session_intes = (
    await supabaseAdmin
      .from('meeting_interviewers')
      .select()
      .eq('session_id', session_id)
      .throwOnError()
  ).data;
  if (!session_intes) {
    throw new CApiError('SERVER_ERROR', 'No interviewers found');
  }

  const meeting_organizer_auth: Omit<
    CalEventAttendeesAuthDetails,
    'session_relation_id'
  > = {
    email: meeting_details.organizer_email,
    schedule_auth: meeting_details.schedule_auth,
    user_id: meeting_details.organizer_id,
  };

  const session_ints_auth_details = await (
    await supabaseAdmin
      .from('recruiter_relation')
      .select(
        'recruiter!inner(id,integrations!inner(service_json)),recruiter_user!public_recruiter_relation_user_id_fkey!inner(user_id, email,schedule_auth)',
      )
      .in(
        'user_id',
        session_intes.map((i) => i.user_id),
      )
      .throwOnError()
  ).data;
  if (!session_ints_auth_details) {
    throw new CApiError('SERVER_ERROR', 'No interviewers found');
  }

  const session_ints_auth: (CalEventAttendeesAuthDetails & {
    session_relation_id: string;
    is_confirmed: boolean;
  })[] = session_ints_auth_details.map((int) => {
    const int_details = session_intes.find(
      (s_int) => s_int.user_id === int.recruiter_user.user_id,
    );
    if (!int_details) {
      throw new CApiError('SERVER_ERROR', 'No interviewers found');
    }
    return {
      email: int.recruiter_user.email,
      schedule_auth: int.recruiter_user.schedule_auth as ScheduleAuthType,
      user_id: int.recruiter_user.user_id,
      is_confirmed: int_details.is_confirmed ?? false,
      session_relation_id: int_details.session_relation_id as string,
    };
  });
  const hashed_comp_cred =
    session_ints_auth_details[0].recruiter.integrations.service_json;

  return {
    company_cred_hash_str: hashed_comp_cred,
    meeting_organizer_auth,
    session_ints_auth,
    meeting_details,
    session_intes,
  };
};

const updateInterviewers = async ({
  id,
  is_confirmed,
}: {
  id: string;
  is_confirmed: boolean;
}) => {
  const supabaseAdmin = getSupabaseServer();

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

const createSesnRelnIfNotExists = async ({
  module_id,
  user_id,
  session_id,
}: {
  module_id: string;
  user_id: string;
  session_id: string;
}) => {
  const supabaseAdmin = getSupabaseServer();

  const new_int_module_reln = supabaseWrap(
    await supabaseAdmin
      .from('interview_module_relation')
      .select()
      .eq('user_id', user_id)
      .eq('module_id', module_id)
      .single(),
  );
  const sesnReln = supabaseWrap(
    await supabaseAdmin
      .from('interview_session_relation')
      .select()
      .eq('interview_module_relation_id', new_int_module_reln.id),
    false,
  );

  if (!sesnReln) {
    supabaseWrap(
      await supabaseAdmin.from('interview_session_relation').insert({
        interview_module_relation_id: new_int_module_reln.id,
        is_confirmed: false,
        session_id,
        training_type: 'qualified',
        interviewer_type: 'qualified',
      }),
    );
  }
};

export default createPageApiPostRoute(
  schema_update_meeting_ints,
  updateMeetingInterviewers,
);
