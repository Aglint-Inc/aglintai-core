import { z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { preSeedCompanyDetails } from '@/services/signup/pre-seed';

const schema = z.object({
  recruiter_id: z.string(),
});

async function preSeedHandler({ recruiter_id }: z.output<typeof schema>) {
  await preSeedCompanyDetails(recruiter_id);
  return { success: true };
}

export default createPageApiPostRoute(schema, preSeedHandler);
