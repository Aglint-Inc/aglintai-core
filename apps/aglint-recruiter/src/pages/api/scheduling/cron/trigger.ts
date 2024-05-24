/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { TaskTypeDb } from '@aglint/shared-types';
import { DB } from '@aglint/shared-types';
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY || '';

const supabase = createClient<DB>(supabaseUrl, supabaseAnonKey);

const agent_url = `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/application/schedulewithagent`;
const debrief_url = `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/debrief/schedule_individual`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data, error } = await supabase
      .from('new_tasks')
      .select(
        '*,applications(id,candidates(first_name),public_jobs(id,recruiter!public_jobs_recruiter_id_fkey(id,name))),recruiter_user(user_id,first_name,last_name,email,phone),interview_filter_json(*)',
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
                axios.post(agent_url, {
                  application_id: task.application_id,
                  dateRange: task.schedule_date_range,
                  recruiter_id: task.applications.public_jobs.recruiter.id,
                  recruiter_user_name: getFullName(
                    task.recruiter_user.first_name,
                    task.recruiter_user.last_name,
                  ),
                  session_ids: task.interview_filter_json.session_ids,
                  task_id: task.id,
                  type: task.assignee.includes(EmailAgentId)
                    ? 'email_agent'
                    : task.assignee.includes(EmailAgentId)
                      ? 'phone_agent'
                      : '',
                  candidate_name: task.applications.candidates.first_name,
                  company_name: task.applications.public_jobs.recruiter.name,
                  rec_user_phone: task.recruiter_user.phone,
                  rec_user_id: task.recruiter_user.user_id,
                  user_tz: 'Asia/Calcutta',
                } as ApiBodyParamsScheduleAgent);
              }
            } catch (error) {
              console.error('Error for application:', error.message);
            }
          }),
        );

        const { error } = await supabase.from('new_tasks').upsert(
          data.map((task) => {
            return {
              id: task.id,
              status: 'in_progress',
              agent: task.agent,
              application_id: task.application_id,
              assignee: task.assignee,
              name: task.name,
              created_at: task.created_at,
              created_by: task.created_by,
              due_date: task.due_date,
              filter_id: task.filter_id,
              priority: task.priority,
              recruiter_id: task.recruiter_id,
              schedule_date_range: task.schedule_date_range,
              session_ids: task.session_ids,
              start_date: task.start_date,
              task_owner: task.task_owner,
              trigger_count: task.trigger_count + 1,
              type: task.type,
            } as TaskTypeDb;
          }),
        );

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
