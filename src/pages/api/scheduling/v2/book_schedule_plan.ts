/* eslint-disable no-console */
import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { NextApiRequest, NextApiResponse } from 'next';

import { InterviewPlanScheduleDbType } from '@/src/components/JobInterviewPlan/types';
import {
  bookIndividualModule,
  getAllIntsFromPlan
} from '@/src/utils/event_book/book_schedule_plan';

type BodyParams = {
  plan: InterviewPlanScheduleDbType;
  candidate_email: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { plan, candidate_email } = req.body as BodyParams;
    const { company_cred, recruiters_info } = await getAllIntsFromPlan(
      plan.plan
    );
    const promises = plan.plan
      .filter((i) => !i.isBreak)
      .map(async (int_module) => {
        const organizer = int_module.attended_inters[0];
        const interviewers = int_module.attended_inters.slice(1);

        return await bookIndividualModule({
          candidate_email,
          company_cred,
          end_time: int_module.end_time,
          start_time: int_module.start_time,
          interviewers: interviewers.map((int) => ({
            email: int.email,
            schedule_auth: recruiters_info.find((r) => r.user_id === int.id)
              ?.schedule_auth as any,
            user_id: int.id
          })),
          organizer: {
            email: organizer.email,
            schedule_auth: recruiters_info.find(
              (r) => r.user_id === organizer.id
            )?.schedule_auth as any,
            user_id: organizer.id
          },
          schedule_name: int_module.module_name
        });
      });

    const events = await Promise.all(promises);
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default handler;
