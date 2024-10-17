import {
  type InterDetailsType,
  type ScheduleAuthType,
} from '@aglint/shared-types';

import { GoogleCalender } from '@/services/GoogleCalender/google-calender';

export const getIntCalEvents = async ({
  company_cred_hash_str,
  int,
  end_time,
  start_time,
}: {
  company_cred_hash_str: string | null;
  int: {
    email: string;
    tokens: ScheduleAuthType | null;
    user_id: string;
  };
  start_time: string;
  end_time: string;
}): Promise<InterDetailsType['all_events']> => {
  const google_cal = new GoogleCalender(company_cred_hash_str, {
    email: int.email,
    schedule_auth: int.tokens,
    user_id: int.user_id,
  });
  await google_cal.authorizeUser();
  const fetched_events = await google_cal.getAllCalenderEvents(
    start_time,
    end_time,
  );

  const mapped_events = fetched_events.map((e) => ({
    end: e.end,
    id: e.id,
    start: e.start,
    summary: e.summary,
  }));

  return mapped_events;
};
