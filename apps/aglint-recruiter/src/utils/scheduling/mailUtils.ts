/* eslint-disable no-console */
import { type TargetApiPayloadType } from '@aglint/shared-types';

import { mailSender } from '../mailSender';

export const selfScheduleMailToCandidate = async ({
  filter_id,
  organizer_id,
}: {
  filter_id: string;
  organizer_id: string;
}) => {
  try {
    const bodyParams: TargetApiPayloadType<'sendSelfScheduleRequest_email_applicant'> =
      {
        filter_json_id: filter_id,
        organizer_id,
      };
    await mailSender({
      target_api: 'sendSelfScheduleRequest_email_applicant',
      payload: bodyParams,
    });

    return true;
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
    const bodyParams: TargetApiPayloadType<'interviewCancel_email_applicant'> =
      { application_id, session_ids };

    await mailSender({
      target_api: 'interviewCancel_email_applicant',
      payload: bodyParams,
    });
  } catch (e) {
    console.log(e);
  }
};
