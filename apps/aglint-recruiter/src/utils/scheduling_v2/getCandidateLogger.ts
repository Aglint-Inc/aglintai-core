import { type DatabaseTable } from '@aglint/shared-types';
import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';



/* eslint-disable no-unused-vars */
type TitleAttrType = {
  '{candidate}'?: string | undefined;
  '{date_format}'?: string | undefined;
  '{time_format}'?: string | undefined;
  '{location}'?: string | undefined;
  '{err_msg}'?: string | undefined;
};
export type LoggerType = (
  log_msg: string,
  title_attr: TitleAttrType,
  created?: 'candidate' | 'phone_agent' | 'email_agent',
  progress_type?: DatabaseTable['new_tasks_progress']['progress_type'],
  transcript?: Record<string, any> | Record<string, any>[],
) => Promise<void>;

export const getCandidateLogger = (
  candidate_name: string,
  candidate_id: string,
  default_created: 'candidate' | 'phone_agent' | 'email_agent',
) => {
  const logger: LoggerType = async (
    log_msg,
    title_attr,
    created,
    progress_type,
    transcript,
  ) => {
    let created_by = null;
    if (!created) {
      created = default_created;
    }
    if (created === 'candidate') {
      created_by = {
        id: candidate_id,
        name: 'Candidate',
      };
    } else if (created === 'phone_agent') {
      created_by = {
        id: PhoneAgentId,
        name: 'Phone Agent',
      };
    } else if (created === 'email_agent') {
      created_by = {
        id: EmailAgentId,
        name: 'Email Agent',
      };
    }
    if (
      title_attr['{candidate}'] &&
      Object.keys(title_attr).includes('{candidate}')
    ) {
      title_attr['{candidate}'] = candidate_name;
    }

    // for (let key of Object.keys(title_attr)) {
    //   if (key === '{candidate}') {
    //     log_msg = log_msg.replaceAll(
    //       key,
    //       `<span class="mention">@${candidate_name}</span>`
    //     );
    //   }
    //   if (key === '{date}') {
    //     log_msg = log_msg.replaceAll(
    //       key,
    //       `<span class="progress_date_section">${title_attr[key]}</span>`
    //     );
    //   }
    // }
  };
  return logger;
};
