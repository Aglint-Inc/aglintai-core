import { type DatabaseFunctions } from '@aglint/shared-types';
import { getFullName, supabaseWrap } from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';
import * as v from 'valibot';

import { resetSessionRelations } from '@/src/utils/scheduling/resetSessionRelations';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type APICreateScheduleRequest = v.InferInput<
  typeof createScheduleRequest
>;

const createScheduleRequest = v.object({
  session_ids: v.array(v.string()),
  application_id: v.string(),
  type: v.picklist(['schedule']),
  dates: v.object({
    start: v.nullish(v.string()),
    end: v.nullish(v.string()),
  }),
  priority: v.picklist(['urgent', 'standard']),
  assignee_id: v.string(),
  assigner_id: v.string(),
  session_names: v.array(v.string()),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const parsed = v.parse(createScheduleRequest, req.body);

    const [cand_application] = supabaseWrap(
      await supabaseAdmin
        .from('applications')
        .select('*,candidates(*)')
        .eq('id', parsed.application_id),
    );

    const candidate_name = getFullName(
      cand_application.candidates.first_name,
      cand_application.candidates.last_name,
    );

    let details: DatabaseFunctions['create_session_request']['Args'] = {
      application: parsed.application_id,
      request: {
        assignee_id: parsed.assignee_id,
        assigner_id: parsed.assigner_id,
        priority: parsed.priority === 'urgent' ? 'urgent' : 'standard',
        schedule_start_date: parsed.dates?.start,
        schedule_end_date: parsed.dates?.end,
        status: 'to_do',
        title: `Schedule ${parsed.session_names.map((ses) => ses).join(' and ')} for ${candidate_name}`,
        type: 'schedule_request',
        note: null,
      },
      sessions: parsed.session_ids,
    };

    await resetSessionRelations({
      session_ids: parsed.session_ids,
      supabase: supabaseAdmin,
    });

    const { data } = await supabaseAdmin
      .rpc('create_session_request', details)
      .throwOnError();
    return res.status(201).send(data);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
}
