import { NextApiRequest, NextApiResponse } from 'next';

import { findAvailableTimeSlots } from '@/src/utils/schedule-utils/findAvailableSlots';
import {
  getBlockedSlots,
  getGroupTimeSlots,
  getRecruiterAuthTokens,
} from '@/src/utils/schedule-utils/utils';

export type BodyParams = {
  recruiterId: string;
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
  let { recruiterId, endDate, startDate, timeDuration, working_hours } =
    req.body as BodyParams;

  if (!recruiterId || !endDate || !startDate || !timeDuration || !working_hours)
    return res.status(400).send('Missing required fields');

  if (!working_hours) {
    working_hours = {
      startTime: '2024-02-19T05:00:05.548Z',
      endTime: '2024-02-19T13:00:05.548Z',
    };
  }
  try {
    let tokenInfo = await getRecruiterAuthTokens(recruiterId);

    let userEvents = {
      userId: recruiterId,
      blockedTimings: await getBlockedSlots(
        tokenInfo.access_token,
        tokenInfo.refresh_token,
        startDate,
        endDate,
      ),
    };

    const availableSlots = findAvailableTimeSlots(
      userEvents.blockedTimings,
      timeDuration,
      new Date(startDate),
      new Date(endDate),
      working_hours,
    );
    const groupedSlots = getGroupTimeSlots(availableSlots);
    return res.status(200).json(groupedSlots);
  } catch (error) {
    // console.log(error);
    res.status(500).send(error.message);
  }
};

export default handler;
