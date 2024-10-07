import { type DatabaseFunctions } from '@aglint/shared-types';
import { getFullName, supabaseWrap } from '@aglint/shared-utils';
import { z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { resetSessionRelations } from '@/utils/scheduling/resetSessionRelations';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const createScheduleRequest = z.object({
  session_ids: z.array(z.string()),
  application_id: z.string(),
  type: z.enum(['schedule']),
  dates: z.object({
    start: z.string().optional(),
    end: z.string().optional(),
  }),
  priority: z.enum(['urgent', 'standard']),
  assignee_id: z.string(),
  assigner_id: z.string(),
  session_names: z.array(z.string()),
});

export type APICreateScheduleRequest = z.infer<typeof createScheduleRequest>;

async function scheduleRequest(parsed: z.output<typeof createScheduleRequest>) {
  const supabaseAdmin = getSupabaseServer();

  const [cand_application] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select('*,candidates!inner(*)')
      .eq('id', parsed.application_id),
  );

  const candidate_name = getFullName(
    cand_application.candidates.first_name,
    cand_application.candidates.last_name,
  );

  const details: DatabaseFunctions['create_session_request']['Args'] = {
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
  return data;
}

export default createPageApiPostRoute(createScheduleRequest, scheduleRequest);
