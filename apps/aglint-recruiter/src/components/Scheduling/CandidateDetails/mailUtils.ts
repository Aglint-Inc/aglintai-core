/* eslint-disable no-console */
import { EmailTemplateAPi } from '@aglint/shared-types';
import axios from 'axios';

export const selfScheduleMailToCandidate = async ({
  filter_id,
  organizer_id,
  task_id,
}: {
  filter_id: string;
  organizer_id: string;
  task_id: string;
}) => {
  try {
    const bodyParams: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['api_payload'] =
      {
        filter_json_id: filter_id,
        organizer_id,
        task_id,
      };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/emails/sendSelfScheduleRequest_email_applicant`,
      {
        meta: bodyParams,
      },
    );
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

export const selfScheduleReminderMailToCandidate = async ({
  filter_id,
  task_id,
}: {
  filter_id: string;
  task_id?: string;
}) => {
  try {
    const bodyParams: EmailTemplateAPi<'selfScheduleReminder_email_applicant'>['api_payload'] =
      {
        filter_id: filter_id,
        task_id: task_id,
      };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/emails/selfScheduleReminder_email_applicant`,
      {
        meta: bodyParams,
      },
    );
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

export const cancelMailHandler = async ({
  application_id,
  session_ids,
}: {
  application_id: string;
  session_ids: string[];
}) => {
  try {
    const bodyParams: EmailTemplateAPi<'interviewCancel_email_applicant'>['api_payload'] =
      { application_id, session_ids };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/emails/interviewCancel_email_applicant`,
      {
        meta: bodyParams,
      },
    );

    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};
