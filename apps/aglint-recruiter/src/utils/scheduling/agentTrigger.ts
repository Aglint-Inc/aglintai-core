/* eslint-disable no-console */
import axios from 'axios';

import { InitAgentBodyParams } from '@/src/components/ScheduleAgent/types';

export const agentTrigger = async ({
  type,
  filterJsonId,
  task_id,
  recruiter_user_name,
  candidate_name,
  company_name,
  jobRole,
  candidate_email,
  rec_user_phone = '',

  recruiter_user_id,
}: {
  type: 'email_agent' | 'phone_agent';
  filterJsonId: string;
  task_id: string;
  recruiter_user_name: string;
  candidate_name: string;
  company_name: string;
  jobRole: string;
  candidate_email: string;
  rec_user_phone: string;
  recruiter_user_id: string;
}) => {
  console.log({
    type,
    candidate_name,
    candidate_email,
    rec_user_phone: formatPhoneNumber(rec_user_phone),
  });

  if (type === 'email_agent') {
    const bodyParams: InitAgentBodyParams = {
      filter_json_id: filterJsonId,
      task_id: task_id,
      recruiter_user_id,
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/mail-agent/init-agent`,
      bodyParams,
    );

    if (res?.status === 200) {
      console.log('mail agent triggered successfully');
    } else {
      console.log('error in mail agent');
    }

    return res.status;
  } else if (type === 'phone_agent') {
    const res = await axios.post(
      // 'https://rested-logically-lynx.ngrok-free.app/api/schedule-agent/create-phone-call',
      `${process.env.NEXT_PUBLIC_AGENT_API}/api/schedule-agent/create-phone-call`,
      {
        begin_sentence_template: `Hi ${candidate_name}, this is ${recruiter_user_name} calling from ${company_name}. We wanted to schedule an interview for the position of ${jobRole}, Is this the right time to talk?`,
        interviewer_name: recruiter_user_name,
        filter_json_id: filterJsonId,
        from_phone_no: '+12512066348',
        to_phone_no: formatPhoneNumber(rec_user_phone),
        retell_agent_id: process.env.RETELL_AGENT_ID,
        cand_email: candidate_email,
        // to_phone_no: '+919482306657',
        // retell_agent_id: 'dcc1869a822931ef646f28e185e7402e',
        // cand_email: sessionsWithPlan.application.candidates.email,
        task_id: task_id,
      },
    );

    if (res?.status === 200) {
      console.log('phone agent triggered successfully');
    } else {
      console.log('error in phone agent');
    }
    return res.status;
  }
};

function formatPhoneNumber(phoneNumber) {
  // Remove all non-numeric characters except '+'
  const numericPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');

  return numericPhoneNumber;
}
