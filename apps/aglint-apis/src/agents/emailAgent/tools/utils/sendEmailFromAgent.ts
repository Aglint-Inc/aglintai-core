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
  agent_email: string;
};

export const sendEmailFromAgent = async (
  payload: EmailSenderType
): Promise<void> => {
  const agent_email = payload.agent_email;

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
