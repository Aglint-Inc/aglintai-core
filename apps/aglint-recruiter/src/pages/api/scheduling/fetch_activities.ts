import { type DB, SupabaseType } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export type ApiResponseActivities =
  | {
      data: Awaited<ReturnType<typeof fetchAllActivities>>;
      error: null;
    }
  | {
      data: null;
      error: string | null;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      const { application_id, session_id } = req.body;
      if (application_id) {
        const resActivities = await fetchAllActivities({
          application_id,
          supabase,
          session_id,
        });
        return res.send({
          data: resActivities,
          error: null,
        } as ApiResponseActivities);
      } else {
        return res.send({
          data: null,
          error: 'missing requierd fields',
        } as ApiResponseActivities);
      }
    }
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed!');
  } catch (err) {
    return res.status(500).send({
      data: null,
      error: err,
    } as ApiResponseActivities);
  }
}

export const fetchAllActivities = async ({
  application_id,
  supabase,
  session_id,
}: {
  application_id: string;
  supabase: SupabaseType;
  session_id?: string;
}) => {
  const query = supabase
    .from('application_logs')
    .select(
      '*,applications(id,candidates(first_name,last_name,avatar)),recruiter_user(*)',
    )
    .eq('application_id', application_id)
    .eq('module', 'scheduler');

  if (session_id) {
    const { data } = await supabase
      .from('new_tasks')
      .select('*,task_session_relation(id)')
      .eq('task_session_relation.session_id', session_id)
      .not('task_session_relation', 'is', null);

    if (data.length === 0) {
      return [];
    } else {
      const taskIds = [...new Set(data.map((item) => item.id))];
      query.in('new_tasks.id', taskIds).not('new_tasks', 'is', null);
    }
  }

  const { data } = await query.throwOnError();

  return data;
};
