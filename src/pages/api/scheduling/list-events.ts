const { google } = require('googleapis');

import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { Database } from '@/src/types/schema';

import { refreshAccessToken } from '../email-outreach/getNewAcessToken';

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);
// Import required modules
const { OAuth2Client } = require('google-auth-library');

// Set up OAuth2 client
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_SCHEDULE_CLIENT_ID,
  process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
  process.env.GOOGLE_SCHEDULE_REDIRECT_URI,
);

type BodyParams = {
  //   access_token: string;
  //   refresh_token: string;
  recruiters: string[];
  startDate: string;
  endDate: string;
  timeDuration: number;
};

type EventType = {
  start: Date;
  end: Date;
};

type ScheduleAuthType = {
  expiry_date: number;
  access_token: string;
  refresh_token: string;
};

type TimeSlotType = {
  start: Date;
  end: Date;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { recruiters, startDate, endDate, timeDuration } =
    req.body as BodyParams;

  try {
    const promises = recruiters.map(async (recUserId) => {
      const [user] = supabaseWrap(
        await supabaseAdmin
          .from('recruiter_user')
          .select('schedule_auth')
          .eq('user_id', recUserId),
      );
      let schedule_auth = user.schedule_auth as ScheduleAuthType;
      const isDateExpired =
        (user.schedule_auth as ScheduleAuthType).expiry_date - Date.now();
      if (isDateExpired) {
        const newAccessToken = await refreshAccessToken(
          schedule_auth.refresh_token,
          process.env.GOOGLE_SCHEDULE_CLIENT_ID,
          process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
        );
        schedule_auth.access_token = newAccessToken;
        supabaseWrap(
          await supabaseAdmin
            .from('recruiter_user')
            .update({ schedule_auth: { ...schedule_auth } })
            .eq('user_id', recUserId),
        );
      }
      const tokenInfo = {
        expiry_date: schedule_auth.expiry_date,
        access_token: schedule_auth.access_token,
        refresh_token: schedule_auth.refresh_token,
      };
      let userEvents = {
        userId: recUserId,
        blockedTimings: await getBlockedSlots(
          tokenInfo.access_token,
          tokenInfo.refresh_token,
          startDate,
          endDate,
        ),
      };
      return userEvents;
    });

    const resPromises = await Promise.all(promises);
    const allBlockedSlots = mergeAllEvents(
      resPromises.reduce((tot, curr) => {
        return [...tot, ...curr.blockedTimings];
      }, []),
    );

    const availableSlots = findAvailableTimeSlots(
      allBlockedSlots,
      timeDuration,
      new Date(startDate),
      new Date(endDate),
    );

    return res.status(200).json(availableSlots);
  } catch (error) {
    // console.log(error);
    res.status(500).send(error.message);
  }
};

export default handler;

async function getBlockedSlots(
  access_token: string,
  refresh_token: string,
  startDate: string,
  endDate: string,
) {
  oAuth2Client.setCredentials({
    access_token: access_token,
    refresh_token: refresh_token,
  });
  const events = await listEvents(
    oAuth2Client,
    new Date(startDate),
    new Date(endDate),
  );

  return events;
}
async function listEvents(
  authClient,
  startDate: Date,
  endDate: Date,
): Promise<EventType[]> {
  const calendar = google.calendar({ version: 'v3', auth: authClient });
  const events = await calendar.events.list({
    calendarId: 'primary',
    timeMin: startDate.toISOString(),
    timeMax: endDate.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  //   console.log(events.data.items[0]);
  return events.data.items
    .map((e) => {
      let { start, end } = e;
      let isoStart = new Date(start.dateTime);
      let isoEnd = new Date(end.dateTime);

      return { start: isoStart, end: isoEnd };
    })
    .sort((e1, e2) => e1.start.getTime() - e2.start.getTime());
}

function mergeAllEvents(events: EventType[]) {
  events = events.sort((e1, e2) => e1.start.getTime() - e2.start.getTime());
  let ptrIdx = 0;
  const totalBlockedTimings: TimeSlotType[] = [events[ptrIdx++]];

  for (; ptrIdx < events.length; ++ptrIdx) {
    const endSumIdx = totalBlockedTimings.length - 1;

    if (
      totalBlockedTimings[Number(endSumIdx)].end >=
        events[Number(ptrIdx)].start &&
      totalBlockedTimings[Number(endSumIdx)].end < events[Number(ptrIdx)].end
    ) {
      totalBlockedTimings[Number(endSumIdx)].end = events[Number(ptrIdx)].end;
    } else if (
      totalBlockedTimings[Number(endSumIdx)].end < events[Number(ptrIdx)].start
    ) {
      totalBlockedTimings.push({ ...events[Number(ptrIdx)] });
    }
  }

  return totalBlockedTimings;
}

function findAvailableTimeSlots(
  events: { start: Date; end: Date }[],
  requiredTimeSlotInMinutes: number,
  startDate: Date,
  endDate: Date,
) {
  const availableTimeSlots = [];

  // Helper function to check if two events overlap
  //   e1.start  e2.start  e1.end e2.end
  function isOverlap(event1, event2) {
    return event1.start < event2.end && event2.start < event1.end;
  }

  // Iterate through each day between startDate and endDate
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dayStartTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      9,
    );
    const dayEndTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      17,
    );

    // Find available time slots within the current day
    let currentTime = new Date(dayStartTime);
    while (currentTime < dayEndTime) {
      const endTime = new Date(
        currentTime.getTime() + requiredTimeSlotInMinutes * 60000,
      );

      // Check if the current time slot overlaps with any event
      const overlappedEvent = events.find((event) =>
        isOverlap(event, { start: currentTime, end: endTime }),
      );

      if (overlappedEvent) {
        currentTime = overlappedEvent.end;
      } else {
        availableTimeSlots.push({
          start: currentTime,
          end: endTime,
        });
        currentTime = endTime;
      }
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return availableTimeSlots;
}
