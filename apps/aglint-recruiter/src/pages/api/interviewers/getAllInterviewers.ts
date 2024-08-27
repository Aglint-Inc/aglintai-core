import { CalendarEvent } from '@aglint/shared-types';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type allInterviewerType = Awaited<ReturnType<typeof getAllInterviewers>>;

export type initUser = {
  isCalenderConnected: boolean;
  all_events: (CalendarEvent & { type: string })[];
} & allInterviewerType[number];

const payload_schema = v.object({
  recruiter_id: v.string(),
  start_time_param: v.string(),
  end_time_param: v.string(),
  department_ids_params: v.array(v.number()),
  office_location_ids_params: v.array(v.number()),
  job_ids_params: v.array(v.string()),
  module_ids_params: v.array(v.string()),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const {
      recruiter_id,
      start_time_param,
      end_time_param,
      department_ids_params,
      office_location_ids_params,
      job_ids_params,
      module_ids_params,
    } = v.parse(payload_schema, req.body);

    const all_interviewers = await getAllInterviewers({
      recruiter_id,
      start_time_param,
      end_time_param,
      department_ids_params,
      office_location_ids_params,
      job_ids_params,
      module_ids_params,
    });

    return res.json({ data: all_interviewers, message: 'ok', success: true });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const getAllInterviewers = async ({
  recruiter_id,
  end_time_param,
  start_time_param,
  department_ids_params,
  office_location_ids_params,
  job_ids_params,
  module_ids_params,
}: {
  recruiter_id: string;
  start_time_param: string;
  end_time_param: string;
  department_ids_params: number[];
  office_location_ids_params: number[];
  job_ids_params: string[];
  module_ids_params: string[];
}) => {
  const { data, error } = await supabaseAdmin.rpc('get_all_interviewers', {
    recruiter_id_param: recruiter_id,
    end_time_param: end_time_param,
    start_time_param: start_time_param,
    department_ids_params,
    job_ids_params,
    module_ids_params,
    office_location_ids_params,
  });
  if (error) throw new Error(error.message);
  return data;
};
