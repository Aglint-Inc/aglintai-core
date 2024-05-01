import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { fetchInterviewModuleByIdApi } from '@/src/components/Scheduling/Modules/queries/utils';
import { CustomDatabase } from '@/src/types/customSchema';

const supabase = createClient<CustomDatabase>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { module_id } = req.body;
    if (module_id) {
      const resIntMod = await fetchInterviewModuleByIdApi(module_id, supabase);
      return res.send(resIntMod);
    } else {
      return res.send([]); // do error handling
    }
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed!');
}
