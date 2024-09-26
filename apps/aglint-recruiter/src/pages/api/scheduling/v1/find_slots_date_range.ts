/* eslint-disable no-console */
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);
import { schema_find_availability_payload } from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { CandidatesSchedulingV2 } from '@/services/CandidateScheduleV2/CandidatesSchedulingV2';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsedData = schema_find_availability_payload.parse({
      ...req.body,
      options: req.body.options || {
        include_conflicting_slots: {},
      },
    });

    const cand_schedule = new CandidatesSchedulingV2(parsedData.options);
    await cand_schedule.fetchDetails({
      params: {
        company_id: parsedData.recruiter_id,
        session_ids: parsedData.session_ids,
        req_user_tz: parsedData.candidate_tz,
        start_date_str: parsedData.start_date_str,
        end_date_str: parsedData.end_date_str,
      },
    });
    const all_day_plans = cand_schedule.findCandSlotsForDateRange();

    return res.status(200).json(all_day_plans);
  } catch (error) {
    console.log(error);
    return res
      .status(error.status ?? 500)
      .json({ name: error.name, message: error.message });
  }
};

export default handler;

// given n persons with there availability time_ranges in the format {startTime:string, endTime:string}[] for each person find the commn  time range which all n person are available on that
//
