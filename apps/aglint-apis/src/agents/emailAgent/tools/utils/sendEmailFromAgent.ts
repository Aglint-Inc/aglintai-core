import axios from 'axios';
import {envConfig} from '../../../../config';
import {appLogger} from '../../../../services/logger';

export type EmailSenderType = {
  candidate_email: string;
  from_name: string;
  mail_body: string;
  headers: any;
  company_name: string;
  subject: string;
};

export const sendEmailFromAgent = async (
  payload: EmailSenderType
): Promise<void> => {
  let agent_email;
  if (envConfig.NODE_ENV === 'staging') {
    agent_email = 'agent@ai.aglinthq.com';
  } else if (envConfig.NODE_ENV === 'production') {
    agent_email = 'scheduler@agent.aglint.ai';
  } else if (envConfig.NODE_ENV === 'development') {
    agent_email = 'agent@ai.aglinthq.com';
  } else if (envConfig.NODE_ENV === 'development.local') {
    agent_email = 'agent@parse.aglinthq.com';
  }
  if (!agent_email) {
    throw new Error('agent email not set');
  }
  appLogger.info(agent_email);
  await axios.post(`${envConfig.CLIENT_APP_URL}/api/sendgrid`, {
    email: payload.candidate_email,
    fromEmail: agent_email,
    fromName: payload.from_name,
    subject: payload.subject,
    text: payload.mail_body,
    headers: payload.headers,
  });
};
