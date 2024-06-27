/* eslint-disable security/detect-object-injection */
import dayjs, { Dayjs } from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import {
  CandReqAvailableSlots,
  InterviewSessionTypeDB,
  TimeDurationType,
} from '@aglint/shared-types';
import {
  ScheduleUtils,
  SINGLE_DAY_TIME,
  supabaseWrap,
} from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  CHECK_NEXT_MINUTES,
  DEFAULT_CANDIDATE_REQ_END_HOUR,
  DEFAULT_CANDIDATE_REQ_START_HOUR,
} from '@/src/services/CandidateScheduleV2/utils/constants';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { session_ids } = req.body as CandReqAvailableSlots;
  if (!session_ids) return res.status(400).send('missing fields');
  try {
    const { fetchDBDetails, generateSlotsForDateRange } = candReqAvailability(
      req.body,
    );
    await fetchDBDetails();
    const all_slots = generateSlotsForDateRange();
    return res.status(200).send(all_slots);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default handler;

const candReqAvailability = (payload: CandReqAvailableSlots) => {
  let session_details: InterviewSessionTypeDB[];
  const curr_cand_date = userTzDayjs().tz(payload.candidate_tz).startOf('day');
  let cand_start_date = ScheduleUtils.convertDateFormatToDayjs(
    payload.date_range_start,
    payload.candidate_tz,
    true,
  );
  if (cand_start_date.isSameOrBefore(curr_cand_date, 'day')) {
    cand_start_date = curr_cand_date.add(1, 'day');
  }
  let cand_end_date = ScheduleUtils.convertDateFormatToDayjs(
    payload.date_range_end,
    payload.candidate_tz,
    false,
  );
  const slot_start_hr =
    payload.options?.cand_start_time ?? DEFAULT_CANDIDATE_REQ_START_HOUR;
  const slot_end_hr =
    payload.options?.cand_end_time ?? DEFAULT_CANDIDATE_REQ_END_HOUR;
  const show_slots_saturday =
    payload.options?.include_conflicting_slots.holiday ?? false;
  const show_slots_sunday =
    payload.options?.include_conflicting_slots.holiday ?? false;
  const DaysOfWeek = Object.freeze({
    SUNDAY: 'Sunday',
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday',
  });
  const fetchDBDetails = async () => {
    session_details = supabaseWrap(
      await supabaseAdmin
        .from('interview_session')
        .select()
        .in('id', payload.session_ids),
    );
    session_details = session_details.sort(
      (s1, s2) => s1.session_order - s2.session_order,
    );

    // [company_details] = supabaseWrap(
    //   await supabaseAdmin
    //     .from('recruiter')
    //     .select('id,scheduling_settings')
    //     .eq('id', payload.recruiter_id),
    // );
  };

  const getSessionRounds = () => {
    let curr_round = 0;
    let session_rounds: InterviewSessionTypeDB[][] = [[]];

    for (let sess of session_details) {
      session_rounds[curr_round].push({ ...sess });
      if (sess.break_duration >= SINGLE_DAY_TIME) {
        session_rounds.push([]);
        curr_round++;
      }
    }
    session_rounds = session_rounds.filter((s) => s.length > 0);
    return session_rounds;
  };

  const generateSlotsForTheDay = (
    session_rounds: InterviewSessionTypeDB[][],
    curr_date: string,
  ) => {
    const curr_day_sessions = session_rounds[payload.current_interview_day - 1];
    let total_slot_duration = curr_day_sessions.reduce(
      (total_duration, curr_session) => {
        return (
          total_duration +
          curr_session.session_duration +
          curr_session.break_duration
        );
      },
      0,
    );
    let last_session = curr_day_sessions[curr_day_sessions.length - 1];
    total_slot_duration = total_slot_duration - last_session.break_duration;
    const cand_slots: TimeDurationType[] = [];
    let curr_slot_time = userTzDayjs(curr_date)
      .tz(payload.candidate_tz)
      .startOf('day')
      .set('hour', slot_start_hr);

    while (curr_slot_time.get('hour') < slot_end_hr) {
      cand_slots.push({
        startTime: curr_slot_time.format(),
        endTime: curr_slot_time.add(total_slot_duration, 'minutes').format(),
      });
      curr_slot_time = curr_slot_time.add(CHECK_NEXT_MINUTES, 'minutes');
    }
    return cand_slots;
  };

  const generateSlotsForDateRange = () => {
    const cand_selected_dates: Dayjs[] = [];
    const session_rounds = getSessionRounds();

    let curr_day = cand_start_date;
    while (curr_day.isSameOrBefore(cand_end_date, 'date')) {
      cand_selected_dates.push(curr_day);
      curr_day = curr_day.add(1, 'day');
    }

    const isCalcSlotsForWeekEnd = (curr_day: Dayjs) => {
      if (
        curr_day.format('dddd') === DaysOfWeek.SATURDAY &&
        !show_slots_saturday
      )
        return false;
      if (curr_day.format('dddd') === DaysOfWeek.SUNDAY && !show_slots_sunday)
        return false;

      return true;
    };

    const all_slots: DaySlots[] = cand_selected_dates.map((curr_day) => {
      const day_slots: DaySlots = {
        curr_day: curr_day.format(),
        slots: [],
      };
      if (isCalcSlotsForWeekEnd(curr_day)) {
        day_slots.slots = generateSlotsForTheDay(
          session_rounds,
          curr_day.format(),
        );
      }
      return day_slots;
    });

    return all_slots;
  };

  return {
    fetchDBDetails,
    generateSlotsForDateRange,
  };
};

type DaySlots = {
  curr_day: string;
  slots: TimeDurationType[];
};
