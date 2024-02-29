import { NextApiRequest, NextApiResponse } from 'next';

import { get_merged_available_events } from '@/src/utils/list-availabilities-util';

export type BodyParams = {
  recruiter_ids: string[];
  startDate: string;
  endDate: string;
  timeDuration: number;
  working_hours: {
    startTime: string;
    endTime: string;
  };
};

//get availability of particular time slot for an interviewer
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { recruiter_ids, endDate, startDate, timeDuration, working_hours } =
    req.body as BodyParams;

  if (
    !recruiter_ids ||
    !endDate ||
    !startDate ||
    !timeDuration ||
    !working_hours
  )
    return res.status(400).send('Missing required fields');

  try {
    const interviewers = await get_merged_available_events(
      recruiter_ids,
      timeDuration,
      {
        start: startDate,
        end: endDate,
      },
      {
        start: working_hours.startTime,
        end: working_hours.endTime,
      },
    );
    // const mergedSlots = convertToMergedData(interviewers);
    return res.status(200).json(interviewers);
  } catch (error) {
    // console.log(error);
    res.status(500).send(error.message);
  }
};

export default handler;

export type InterviewSlot = {
  startTime: string;
  endTime: string;
  interviewerId: string;
  interviewerName: string;
  profileImg: string;
  status: string;
  email: string;
};

export type InterviewSchedule = {
  [date: string]: {
    [timeRange: string]: InterviewSlot[];
  };
};
