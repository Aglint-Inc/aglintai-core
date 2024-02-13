import { createClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import {
  AvalabilitySlotType,
  InterviewerAvailabliity,
} from '@/src/components/Scheduling/Availability/availability.types';
import { Database } from '@/src/types/schema';
import { findAvailableTimeSlots } from '@/src/utils/schedule-utils/findAvailableSlots';
import {
  getBlockedSlots,
  getGroupTimeSlots,
  getRecruiterAuthTokens,
  getSavedAvailabilities,
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

    const slots = await getSavedAvailabilities(
      timeDuration,
      dayjs(currentMonth),
      record.slot_availability,
    );
    if (slots) return res.status(200).json(slots);

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

    let saved_slot_availability =
      record.slot_availability as InterviewerAvailabliity[];
    await save(
      saved_slot_availability,
      recruiterId,
      timeDuration,
      groupedTimeSlots,
    );
    return res.status(200).json(groupedTimeSlots);
  } catch (error) {
    // console.log(error);
    res.status(500).send(error.message);
  }
};

export default handler;

const save = async (
  saved_slot_availability: InterviewerAvailabliity[],
  userId: string,
  timeDuration: number,
  avail: Record<string, AvalabilitySlotType[]>,
) => {
  let updated_slot_avails: InterviewerAvailabliity[] = [];

  if (!saved_slot_availability || saved_slot_availability.length === 0) {
    updated_slot_avails = [
      {
        timeDuration: timeDuration,
        availability: avail,
        cntConfirmed: 0,
        cntRequested: 0,
      },
    ];
  } else {
    if (saved_slot_availability.find((s) => s.timeDuration === timeDuration)) {
      updated_slot_avails = saved_slot_availability.map((slot) => {
        if (slot.timeDuration === timeDuration) {
          slot.availability = {
            ...slot.availability,
            ...avail,
          };
        }
        return slot;
      });
    } else {
      updated_slot_avails = [
        ...saved_slot_availability,
        {
          timeDuration: timeDuration,
          availability: {
            ...avail,
          },
          cntConfirmed: 0,
          cntRequested: 0,
        },
      ];
    }
  }

  supabaseWrap(
    await supabaseAdmin
      .from('interview_availabilties')
      .update({
        slot_availability: updated_slot_avails as any,
        user_id: userId,
      })
      .eq('user_id', userId),
  );
};
