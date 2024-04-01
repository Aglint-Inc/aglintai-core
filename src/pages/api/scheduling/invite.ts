import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { fetchInterviewDataSchedule } from '@/src/components/Scheduling/AllSchedules/SchedulingApplication/hooks';
import { ApiResponse } from '@/src/components/Scheduling/CandidateInvite/type';
import { Database } from '@/src/types/schema';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data: sch, error: errSch } = await supabase
      .from('interview_schedule')
      .select('*')
      .eq('id', req.body.id as string);


    if (errSch) throw new Error(errSch.message);

    const { data: filterJson, error: errFilterJson } = await supabase
      .from('interview_filter_json')
      .select('*')
      .eq('id', req.body.filter_id as string);

    if (errFilterJson) throw new Error(errFilterJson.message);


    const { data: app } = await supabase
      .from('applications')
      .select(
        '*, public_jobs(id,job_title,location,recruiter_id),candidates(*),candidate_files(id,file_url,candidate_id,resume_json,type)',
      )
      .eq('id', sch[0].application_id);

    const application = app[0];


    const { data: rec } = await supabase
      .from('recruiter')
      .select('id,logo,name')
      .eq('id', application.public_jobs.recruiter_id);


    const resSchOpt = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/find_availability`,
      filterJson[0].filter_json,
    );


    const resMeetings = await fetchInterviewDataSchedule(sch[0].id);

    return res.status(200).json({
      job: application.public_jobs,
      schedule: sch[0],
      schedulingOptions: resSchOpt.data,
      candidate: application.candidates,
      recruiter: rec[0],
      meetings: resMeetings,
    } as ApiResponse);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;
