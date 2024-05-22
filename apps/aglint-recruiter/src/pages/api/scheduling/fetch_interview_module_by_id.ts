import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { fetchInterviewModuleByIdApi } from '@/src/components/Scheduling/InterviewTypes/queries/utils';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export type ApiResponseInterviewModuleById = Awaited<
  ReturnType<typeof fetchInterviewModuleByIdApi>
>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { module_id } = req.body;
    if (module_id) {
      const { data, error } = await fetchInterviewModuleByIdApi(
        module_id,
        supabase,
      );
      return res.send({
        data: data,
        error: error,
      } as ApiResponseInterviewModuleById);
    } else {
      return res.send({
        data: null,
        error: 'missing requierd fields',
      } as ApiResponseInterviewModuleById);
    }
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed!');
}
