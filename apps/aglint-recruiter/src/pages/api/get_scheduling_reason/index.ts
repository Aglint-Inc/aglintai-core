import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export type API_get_scheduling_reason = {
  request: {
    session_ids: string[];
    application_id: string;
    recruiter_id: string;
  };
  response:
    | {
        data: {
          scheduling_reason: Awaited<ReturnType<typeof getSchedulingReason>>;
          cancel_data: Awaited<ReturnType<typeof getCancelRescheduleData>>;
        };
        error: null;
      }
    | {
        data: null;
        error: string;
      };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { recruiter_id, application_id, session_ids } =
        req.body as API_get_scheduling_reason['request'];
      if (!recruiter_id || !application_id) {
        return res
          .status(400)
          .send(
            getResponse({ error: 'Invalid request. Required props missing.' }),
          );
      }
      const scheduling_reason = await getSchedulingReason(recruiter_id);
      const cancel_data = await getCancelRescheduleData({
        session_ids,
        application_id,
      });
      return res.status(200).send(
        getResponse({
          data: {
            scheduling_reason,
            cancel_data,
          },
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

const getCancelRescheduleData = async ({
  session_ids,
  application_id,
}: {
  session_ids: string[];
  application_id: string;
}) => {
  return supabase
    .from('interview_session_cancel')
    .select('reason, session_id, type, other_details')
    .eq('is_resolved', false)
    .eq('is_ignored', false)
    .in('session_id', session_ids)
    .eq('application_id', application_id)
    .then(({ data, error }) => {
      if (error) {
        return [];
      }
      return data;
    });
};
