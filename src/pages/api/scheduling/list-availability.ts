import { createClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { Database } from '@/src/types/schema';
import { findAvailableTimeSlots } from '@/src/utils/schedule-utils/findAvailableSlots';
import {
  getBlockedSlots,
  getCurrentMonthAvailabilities,
  getGroupTimeSlots,
  getRecruiterAuthTokens,
  saveAvailability,
} from '@/src/utils/schedule-utils/utils';

type BodyParams = {
  recruiterId: string;
  currentMonth: string;
  timeDuration: number;
};

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { recruiterId, currentMonth, timeDuration } = req.body as BodyParams;

  try {
    const [record] = supabaseWrap(
      await supabaseAdmin
        .from('interview_availabilties')
        .select()
        .eq('user_id', recruiterId),
    );
    if (!record) throw new Error('no availability found');

    const curr_month_availability = await getCurrentMonthAvailabilities(
      timeDuration,
      dayjs(currentMonth),
      record.slot_availability,
    );
    if (curr_month_availability)
      return res.status(200).json(curr_month_availability);

    let tokenInfo = await getRecruiterAuthTokens(recruiterId);
    let monthStart = dayjs(currentMonth).startOf('month').toISOString();
    let monthEnd = dayjs(currentMonth).endOf('month').toISOString();

    let userEvents = {
      userId: recruiterId,
      blockedTimings: await getBlockedSlots(
        tokenInfo.access_token,
        tokenInfo.refresh_token,
        monthStart,
        monthEnd,
      ),
    };
    const availableSlots = findAvailableTimeSlots(
      userEvents.blockedTimings,
      timeDuration,
      new Date(monthStart),
      new Date(monthEnd),
    );
    const groupedTimeSlots = getGroupTimeSlots(availableSlots, currentMonth);

    let saved_slot_availability = await saveAvailability(
      record.slot_availability,
      recruiterId,
      timeDuration,
      groupedTimeSlots,
    );
    return res
      .status(200)
      .json(
        saved_slot_availability.find(
          (slot_avail) => slot_avail.timeDuration === timeDuration,
        ).availability,
      );
  } catch (error) {
    // console.log(error);
    res.status(500).send(error.message);
  }
};

export default handler;
