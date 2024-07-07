/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { DatabaseTableInsert, DB } from '@aglint/shared-types';
import {
  EmailAgentId,
  PhoneAgentId,
  SystemAgentId,
} from '@aglint/shared-utils';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { getFullName } from '@/src/utils/jsonResume';

import { ApiBodyParamsScheduleAgent } from '../application/schedulewithagent';
import { ApiBodyParamScheduleIndividual } from '../debrief/schedule_individual';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const agent_url = `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/application/schedulewithagent`;
const debrief_url = `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/debrief/schedule_individual`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data, error } = await supabase
      .from('new_tasks')
      .select(
        '*,applications(id,candidates(first_name),public_jobs(id,recruiter!public_jobs_recruiter_id_fkey(id,name))),recruiter_user(user_id,first_name,last_name,email,phone),interview_filter_json(*),task_session_relation(*)',
      )
      .eq('status', 'scheduled')
      .or(
        `assignee.eq.{"${EmailAgentId}"},assignee.eq.{"${PhoneAgentId}"},assignee.eq.{"${SystemAgentId}"}`,
      )
      .lt('trigger_count', 2)
      .lt('start_date', new Date().toISOString())
      .order('created_by', {
        ascending: true,
      });

    if (error) {
      throw new Error(error.message);
    } else {
      if (data?.length > 0) {
        await Promise.all(
          data.map(async (task) => {
            try {
              if (task.assignee[0] === SystemAgentId) {
                const bodyParams: ApiBodyParamScheduleIndividual = {
                  application_id: task.application_id,
                  dateRange: task.schedule_date_range,
                  rec_user_id: task.recruiter_user.user_id,
                  session_id: task.interview_filter_json.session_ids[0],
                  recruiter_id: task.applications.public_jobs.recruiter.id,
                  task_id: task.id,
                  user_tz: 'Asia/Calcutta',
                  recruiter_user_name: getFullName(
                    task.recruiter_user.first_name,
                    task.recruiter_user.last_name,
                  ),
                };
                axios.post(debrief_url, bodyParams);
              } else {
                const bodyParams: ApiBodyParamsScheduleAgent = {
                  application_id: task.application_id,
                  dateRange: task.schedule_date_range,
                  recruiter_id: task.applications.public_jobs.recruiter.id,
                  recruiter_user_name: getFullName(
                    task.recruiter_user.first_name,
                    task.recruiter_user.last_name,
                  ),
                  session_ids: task.task_session_relation.map(
                    (ele) => ele.session_id,
                  ),
                  task_id: task.id,
                  type: task.assignee.includes(PhoneAgentId)
                    ? 'phone_agent'
                    : 'email_agent',
                  candidate_name: task.applications.candidates.first_name,
                  company_name: task.applications.public_jobs.recruiter.name,
                  rec_user_phone: task.recruiter_user.phone,
                  rec_user_id: task.recruiter_user.user_id,
                  user_tz: 'Asia/Calcutta',
                };

                axios.post(agent_url, bodyParams);
              }
            } catch (error) {
              console.error('Error for application:', error.message);
            }
          }),
        );

        const updateTasks: DatabaseTableInsert['new_tasks'][] = data.map(
          (task) => {
            return {
              id: task.id,
              status: 'in_progress',
              name: task.name,
              assignee: task.assignee,
              created_by: task.created_by,
            };
          },
        );

        const { error } = await supabase.from('new_tasks').upsert(updateTasks);

        console.log(error?.message, 'error progress update');

        // You might want to handle errors here
        console.log(`${data.length} applications triggered`);
        return res.status(200).send(`${data.length} applications triggered`);
      } else {
        console.log('no applications');
        return res.status(200).send('no applications');
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;
