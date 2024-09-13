import {
  type DatabaseEnums,
  type TargetApiPayloadType,
} from '@aglint/shared-types';
import { CApiError } from '@aglint/shared-utils';
import axios, { AxiosError } from 'axios';

export const mailSender = async <T extends DatabaseEnums['email_slack_types']>({
  target_api,
  payload,
}: {
  target_api: T;
  payload: TargetApiPayloadType<T>;
}) => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_MAIL_HOST}/api/mail`, {
      target_api: target_api,
      payload: payload,
    });
  } catch (err) {
    console.error(err);
    if (err instanceof AxiosError) {
      throw new CApiError('SERVER_ERROR', err.message);
    }
  }
};
