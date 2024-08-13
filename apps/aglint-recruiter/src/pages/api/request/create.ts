import { DatabaseFunctions } from '@aglint/shared-types';
import {
  createRequestSchema,
  getFullName,
  supabaseWrap,
} from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { getOrganizerId } from '@/src/utils/scheduling/getOrganizerId';
import { resetSessionRelations } from '@/src/utils/scheduling/resetSessionRelations';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const parsed = v.parse(createRequestSchema, req.body);
    const organizer_id = await getOrganizerId(
      parsed.application_id,
      supabaseAdmin,
    );
    const [cand_application] = supabaseWrap(
      await supabaseAdmin.from('applications').select('*,candidates(*)'),
    );
    const candidate_name = getFullName(
      cand_application.candidates.first_name,
      cand_application.candidates.last_name,
    );

    let details: DatabaseFunctions['create_session_request']['Args'] = {
      application: parsed.application_id,
      request: {
        assignee_id: organizer_id,
        assigner_id: organizer_id,
        priority: 'urgent',
        schedule_start_date: parsed.dates?.start,
        schedule_end_date: parsed.dates?.end,
        status: 'to_do',
        title: `${candidate_name} Requested for rescheduling Interview`,
        type: 'reschedule_request',
      },
      sessions: parsed.session_ids,
    };
    if (parsed.type === 'declined') {
      details.request.title = `${candidate_name} Requested for Cancelling Interview`;
      details.request.type = 'cancel_schedule_request';
    }
    await resetSessionRelations({
      session_ids: parsed.session_ids,
      supabase: supabaseAdmin,
    });
    supabaseWrap(await supabaseAdmin.rpc('create_session_request', details));
    return res.status(201).send('OK');
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
}
