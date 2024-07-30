import { DatabaseEnums, EmailTemplateAPi } from '@aglint/shared-types';
import { ApiError } from '@aglint/shared-utils';
import axios from 'axios';

export const mailSender = async <T extends DatabaseEnums['email_slack_types']>({
  target_api,
  payload,
}: {
  target_api: T;
  payload: EmailTemplateAPi<T>['api_payload'];
}) => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_MAIL_HOST}/api/${target_api}`, {
      ...payload,
    });
  } catch (err) {
    throw new ApiError('MAIL', err.message);
  }
};
