/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { EmailAgentId, PhoneAgentId } from '@/src/components/Tasks/utils';
import { SubTaskProgress } from '@/src/types/data.types';

import { supabaseAdmin } from '../../phone-screening/get-application-info';

export type LoggerType = (
  log_msg: string,
  progress_type?: SubTaskProgress['progress_type'],
  transcript?: any[],
) => Promise<void>;

export const getCandidateLogger = (
  task_id: string,
  candidate_name: string,
  agent_type: 'self' | 'email' | 'phone',
  candidate_id?: string,
) => {
  const logger: LoggerType = async (
    log_msg,
    progress_type: SubTaskProgress['progress_type'],
    transcript?: any[],
  ) => {
    log_msg = log_msg.replace(
      '{candidate}',
      `<span class="mention">@${candidate_name}</span>`,
    );
    try {
      console.log('Log :', log_msg);
      if (!task_id) return;
      let created_by = {
        id: candidate_id,
        name: 'Candidate',
      };
      if (agent_type === 'email') {
        created_by.id = EmailAgentId;
        created_by.name = 'Email Agent';
      } else if (agent_type === 'phone') {
        created_by.id = PhoneAgentId;
        created_by.name = 'Phone Agent';
      }
      supabaseWrap(
        await supabaseAdmin
          .from('new_tasks_progress')
          .insert({
            created_by: {
              id: created_by.id,
              name: created_by.name,
            },
            title: log_msg,
            jsonb_data: transcript ?? null,
            task_id: task_id,
            progress_type: progress_type,
          })
          .select(),
      );
    } catch (error) {
      // console.log(error);
    }
  };
  return logger;
};
