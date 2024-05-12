import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { CustomDatabase } from '@/src/types/customSchema';

import { API_get_scheduling_reason } from './types';

const supabase = createClient<CustomDatabase>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { id } =
        req.body as unknown as API_get_scheduling_reason['request'];
      if (!id) {
        return res
          .status(400)
          .send(
            getResponse({ error: 'Invalid request. Required props missing.' }),
          );
      }
      const scheduling_reason = await getSchedulingReason(id);
      return res.status(200).send(
        getResponse({
          data: scheduling_reason,
        }),
      );
    } catch (error) {
      return res.status(200).send(
        getResponse({
          error: error || 'Internal Server Error.',
        }),
      );
    }
  }
}

const getResponse = (data: Partial<API_get_scheduling_reason['response']>) => {
  return { data: false, error: null, ...data };
};

const getSchedulingReason = (id: string) => {
  return supabase
    .from('recruiter')
    .select('scheduling_reason')
    .eq('id', id)
    .single()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data.scheduling_reason;
    });
};
