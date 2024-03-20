import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { ApplicationList } from '@/src/components/Scheduling/AllSchedules/store';
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

    if (errSch) {
      res.status(400).send(errSch.message);
      return;
    }

    const { data, error } = await supabase.rpc(
      'fetch_interview_data_by_application_id',
      {
        app_id: sch[0].application_id as string,
      },
    );

    if (!error && data.length > 0) {
      const application = data[0] as unknown as ApplicationList;

      const { data: rec } = await supabase
        .from('recruiter')
        .select('id,logo,name')
        .eq('id', application.public_jobs.recruiter_id);

      let allModules = [];
      const moduleIds = application?.public_jobs?.interview_plan?.plan
        ?.filter((plan) => !plan.isBreak)
        ?.map((plan) => plan.module_id);

      if (moduleIds?.length > 0) {
        const { data: modules, error: moduleError } = await supabase
          .from('interview_module')
          .select('*')
          .in('id', moduleIds);
        if (!moduleError) {
          allModules = modules;
        }
      }
      let userIds = [];
      application?.public_jobs?.interview_plan?.plan.map((plan) => {
        plan.selectedIntervs.map((interv) => {
          userIds.push(interv.interv_id);
        });
      });

      const resMem = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/fetchdbusers`,
        {
          user_ids: userIds,
        },
      );

      if (sch[0].status == 'pending') {
        const resSchOpt = await axios.post(
          `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v2/find_availability`,
          sch[0].filter_json,
        );

        return res.status(200).json({
          job: application.public_jobs,
          modules: allModules,
          members: resMem.data,
          schedule: sch[0],
          schedulingOptions: resSchOpt.data,
          candidate: application.candidates,
          recruiter: rec[0],
          meetings: [],
        });
      } else {
        const { data: meetings } = await supabase
          .from('interview_meeting')
          .select('*')
          .eq('interview_schedule_id', sch[0].id);
        return res.status(200).json({
          job: application.public_jobs,
          modules: allModules,
          members: resMem.data,
          schedulingOptions: [],
          schedule: sch[0],
          candidate: application.candidates,
          recruiter: rec[0],
          meetings: meetings,
        });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;
