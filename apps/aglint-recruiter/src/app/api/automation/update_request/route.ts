import { supabaseWrap } from '@aglint/shared-utils';
import { z } from 'zod';

import { createPostRoute } from '@/apiUtils/createPostRoute';
import { executeRequestWorkflow } from '@/services/requests/executeRequestWorkflow';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const schema = z.object({
  assignee_id: z.string(),
  count: z.number(),
  type: z.any(),
});

const exececteReq = async (parsed_body: z.output<typeof schema>) => {
  const supabaseAdmin = getSupabaseServer();
  const requests = supabaseWrap(
    await supabaseAdmin
      .from('request')
      .select()
      .eq('type', parsed_body.type)
      .or(
        `assignee_id.eq.${parsed_body.assignee_id}, assigner_id.eq.${parsed_body.assignee_id}`,
      ),
    false,
  );
  const trigggerReqs = requests.slice(0, parsed_body.count);
  const promises = trigggerReqs.map(async (request) => {
    await executeRequestWorkflow({ request_id: request.id });
  });

  await Promise.all(promises);
  return trigggerReqs;
};

export const POST = createPostRoute(schema, exececteReq);
