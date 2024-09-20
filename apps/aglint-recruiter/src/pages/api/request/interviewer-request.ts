import { type DatabaseFunctions } from '@aglint/shared-types';
import {
  createInterviewerRequestSchema,
  getFullName,
  supabaseWrap,
} from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';
import * as v from 'valibot';

import { supabaseAdmin } from '@/utils/supabase/supabaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const parsed = v.parse(createInterviewerRequestSchema, req.body);
    const [int_sesn_cancel] = supabaseWrap(
      await supabaseAdmin
        .from('interview_session_cancel')
        .select()
        .eq('id', parsed.interview_cancel_id),
    );
    const [meeting_details] = supabaseWrap(
      await supabaseAdmin
        .from('meeting_details')
        .select()
        .eq('session_id', parsed.session_id),
    );
    const [request_details] = supabaseWrap(
      await supabaseAdmin
        .from('request')
        .select()
        .eq('id', meeting_details.schedule_request_id),
    );
    const [application] = supabaseWrap(
      await supabaseAdmin
        .from('applications')
        .select('*,candidates(*)')
        .eq('id', meeting_details.application_id),
    );
    const [interviewer] = supabaseWrap(
      await supabaseAdmin
        .from('meeting_interviewers')
        .select()
        .eq('session_relation_id', int_sesn_cancel.session_relation_id),
    );

    const details: DatabaseFunctions['create_session_request']['Args'] = {
      application: meeting_details.application_id,
      request: {
        assignee_id: request_details.assignee_id,
        assigner_id: request_details.assigner_id,
        priority: 'urgent',
        schedule_start_date:
          int_sesn_cancel.other_details?.dateRange?.start ||
          new Date().toISOString(),
        schedule_end_date:
          int_sesn_cancel.other_details?.dateRange?.end ||
          new Date().toISOString(),
        status: 'to_do',
        title: `${getFullName(interviewer.first_name, interviewer.last_name)} Declined ${meeting_details.session_name} with candidate ${getFullName(application.candidates.first_name, application.candidates.last_name)}  Request`,
        type: 'decline_request',
        note: null,
      },
      sessions: [parsed.session_id],
    };

    const id = supabaseWrap(
      await supabaseAdmin.rpc('create_session_request', details),
    ) as string;

    supabaseWrap(
      await supabaseAdmin
        .from('interview_session_cancel')
        .update({
          request_id: id,
        })
        .eq('id', parsed.interview_cancel_id),
    );
    return res.status(201).send('OK');
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
}
