/* eslint-disable no-console */
import { dayjsLocal } from '@aglint/shared-utils';

import { report_seed_candidate_tz } from '../constant';
import { type getJobScheduleRequests } from './getJobScheduleRequests';
import { scheduleSingleRequest } from './scheduleSingleRequest';

export const scheduleRequests = async ({
  allRequests,
  company_id,
}: {
  allRequests: Awaited<
    ReturnType<typeof getJobScheduleRequests>
  >['allRequests'];
  company_id: string;
}) => {
  for (let idx = 0; idx < allRequests.length; idx += 1) {
    const req = allRequests[idx];
    const working_day = pickWorkingDay({
      start_date: req.schedule_start_date,
      end_date: req.schedule_end_date,
    });
    try {
      await scheduleSingleRequest({
        request: req,
        dateRange: {
          start_date: dayjsLocal(working_day).format('DD/MM/YYYY'),
          end_date: dayjsLocal(working_day).format('DD/MM/YYYY'),
        },
        company_id,
      });
    } catch (err) {
      console.log(err);
      console.log('Error in scheduling request', req.title);
    }
  }
};

const pickWorkingDay = ({
  end_date,
  start_date,
}: {
  start_date: string;
  end_date: string;
}) => {
  let curr_day = dayjsLocal(start_date).tz(report_seed_candidate_tz);
  let working_day: string = start_date;
  while (
    curr_day.isSameOrBefore(
      dayjsLocal(end_date).tz(report_seed_candidate_tz),
      'day',
    )
  ) {
    if (curr_day.day() > 0 && curr_day.day() < 6) {
      working_day = curr_day.format();
    }
    curr_day = curr_day.add(1, 'day');
  }
  return working_day;
};
