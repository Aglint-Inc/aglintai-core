import { preSeedCompanyDetails } from '@aglint/shared-utils';
import { z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const schema = z.object({
  recruiter_id: z.string(),
});

async function preSeedHandler({ recruiter_id }: z.output<typeof schema>) {
  const supabase = getSupabaseServer();
  await preSeedCompanyDetails(recruiter_id, supabase);
  return { success: true };
}

export default createPageApiPostRoute(schema, preSeedHandler);
