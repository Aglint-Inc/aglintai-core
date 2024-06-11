/* eslint-disable no-console */
import { EmailTemplateAPi } from '@aglint/shared-types';
import axios from 'axios';

export const selfScheduleMailToCandidate = async ({
  filter_id,
}: {
  filter_id: string;
}) => {
  try {
    const bodyParams: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['api_payload'] =
      {
        filter_json_id: filter_id,
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

export const cancelMailHandler = async ({
  application_id,
}: {
  application_id: string;
  session_ids: string;
}) => {
  try {
    const bodyParams: EmailTemplateAPi<'interviewCancel_email_applicant'>['api_payload'] =
      { application_id };

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
