import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { CandidatesScheduling } from '@/src/utils/CandidateSchedule/CandidateSchedule';

export type BodyParams = {
  session_ids: string[];
  plan_id: string;
  recruiter_id: string;
  start_date: string;
  end_date: string;
  user_tz: string;
  is_debreif: boolean;
};

const required_fields = ['recruiter_id', 'start_date'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let {
      session_ids,
      recruiter_id,
      start_date,
      end_date,
      user_tz = 'Asia/colombo',
    } = req.body as BodyParams;

    required_fields.forEach((field) => {
      if (!has(req.body, field)) {
        throw new Error(`missing Field ${field}`);
      }
    });

    const s = new CandidatesScheduling(
      {
        company_id: recruiter_id,
        session_ids: session_ids,
        user_tz,
      },
      {
        start_date_js: CandidatesScheduling.convertDateFormatToDayjs(
          start_date,
          user_tz,
        ),
        end_date_js: CandidatesScheduling.convertDateFormatToDayjs(
          end_date,
          user_tz,
        ),
      },
    );
    await s.fetchDetails();
    await s.fetchInterviewrsCalEvents();
    const l = await s.test();

    return res.status(200).json(l);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;
