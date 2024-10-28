/* eslint-disable no-console */
/* eslint-disable security/detect-object-injection */
import {
  type InterviewModuleType,
  type NewCalenderEvent,
  type SchedulingSettingType,
} from '@aglint/shared-types';
import { type CustomSchedulingSettingsUser } from '@aglint/shared-types/src/db/tables/recruiter_user.types';
import { dayjsLocal, supabaseWrap } from '@aglint/shared-utils';

import { type GoogleCalender } from '@/services/GoogleCalender/google-calender';

import { getSupabaseServer } from '../supabase/supabaseAdmin';
import {
  type MeetingLimit,
  type MeetingLimitsConfig,
  MeetingTypeEnum,
  type RandMeetingType,
} from './types';

// 4. free times 10% per per month 8
// 6. recruiter blocks 10% per month 12
// 1 other meetings 30 % per day max 3
// 2. interivewer meetings 30% per day 3
// 3. ooo 10% per month 8
// 5. soft conflicts 10% per day 2
// 7. no meeting 3
//
//
const max_occurence: Record<MeetingTypeEnum, MeetingLimit> = {
  [MeetingTypeEnum.OtherMeetings]: {
    maxOccurrences: 2,
    period: 'day',
  },
  [MeetingTypeEnum.Interview]: {
    maxOccurrences: 2,
    period: 'day',
  },
  [MeetingTypeEnum.OOO]: {
    maxOccurrences: 5,
    period: 'month',
  },
  [MeetingTypeEnum.FreeTime]: {
    maxOccurrences: 5,
    period: 'month',
  },
  [MeetingTypeEnum.SoftConflicts]: {
    maxOccurrences: 2,
    period: 'day',
  },
  [MeetingTypeEnum.RecruiterBlock]: {
    maxOccurrences: 2,
    period: 'day',
  },
  [MeetingTypeEnum.NOMeeting]: {
    maxOccurrences: 2,
    period: 'day',
  },
};

export const seedCalendersUtil = (
  cal_start_date: string,
  // eslint-disable-next-line no-unused-vars
  cal_end_date: string,
) => {
  const supabaseAdmin = getSupabaseServer();

  let interview_modules: InterviewModuleType[] | null;
  const fetchDetails = async (company_id: string) => {
    const rec_details = supabaseWrap(
      await supabaseAdmin
        .from('recruiter')
        .select('scheduling_settings,integrations(*)')
        .eq('id', company_id)
        .single(),
    );

    interview_modules = supabaseWrap(
      await supabaseAdmin
        .from('interview_module')
        .select()
        .eq('recruiter_id', company_id),
    );

    const interviewers = supabaseWrap(
      await supabaseAdmin
        .from('interview_module_relation')
        .select(
          '*,recruiter_user(schedule_auth,scheduling_settings,user_id,email)',
        )
        .in(
          'module_id',
          interview_modules.map((i) => i.id),
        ),
    );

    const uniq_inters = Array.from(new Set(interviewers.map((i) => i.user_id)));

    return {
      company_cred_hash_str: rec_details.integrations
        ? rec_details.integrations.service_json
        : null,
      companyScheduleSettings: rec_details.scheduling_settings,
      interview_type_details: interviewers,
      uniq_inters,
    };
  };
  const deleteAllMeetings = async (google_cal: GoogleCalender) => {
    const cal_events = await google_cal.getAllCalenderEvents(
      dayjsLocal(cal_start_date).toISOString(),
      dayjsLocal(cal_end_date).toISOString(),
    );
    console.log('found', cal_events.length);

    for (const evt of cal_events) {
      console.log('deleting', evt.summary);
      await google_cal.updateEventStatus(evt.id, 'cancelled');
    }
    // Add a 100ms delay to simulate processing time
    console.log(cal_events.length, 'deleted');
  };
  const getRandMeetingType = (): RandMeetingType => {
    function generateMeetingDuration() {
      const minDuration = 30; // Minimum duration in minutes
      const maxDuration = 120; // Maximum duration in minutes
      const step = 10; // Duration step divisible by 10

      // Calculate the number of possible steps within the range
      const steps = Math.floor((maxDuration - minDuration) / step + 1);

      // Generate a random index for the step
      const randomStep = Math.floor(Math.random() * steps);

      // Calculate the actual duration
      const duration = minDuration + randomStep * step;
      return duration;
    }
    const randNum = Math.ceil(Math.random() * 10);
    if (randNum <= 2) {
      return {
        type: MeetingTypeEnum.OtherMeetings,
        duration: generateMeetingDuration(),
      };
    }
    if (randNum <= 4) {
      return {
        type: MeetingTypeEnum.Interview,
        duration: generateMeetingDuration(),
      };
    }
    if (randNum <= 6) {
      return {
        type: MeetingTypeEnum.NOMeeting,
        duration: generateMeetingDuration(),
      };
    }
    if (randNum === 7) {
      return {
        type: MeetingTypeEnum.OOO,
        duration: generateMeetingDuration(),
      };
    }
    if (randNum === 8) {
      return {
        type: MeetingTypeEnum.FreeTime,
        duration: generateMeetingDuration(),
      };
    }
    if (randNum === 9) {
      return {
        type: MeetingTypeEnum.SoftConflicts,
        duration: generateMeetingDuration(),
      };
    }
    if (randNum === 10) {
      return {
        type: MeetingTypeEnum.RecruiterBlock,
        duration: generateMeetingDuration(),
      };
    }
    throw new Error('Invalid random number');
  };

  const getSeedEvent = (
    meeting_type: MeetingTypeEnum,
    companyScheduleSettings: SchedulingSettingType,
  ) => {
    if (!interview_modules) {
      throw new Error('No interview modules found');
    }
    const getRandomArrayIdx = (arr_length: number): number => {
      return Math.floor(Math.random() * arr_length);
    };
    const new_cal_event: NewCalenderEvent = {
      summary: '',
      description: 'SEED DATA',
      start: {
        dateTime: '',
        timeZone: undefined,
      },
      end: {
        dateTime: '',
        timeZone: undefined,
      },
      attendees: [],
      conferenceData: {},
      reminders: null,
      location: null,
    };

    const key_words = companyScheduleSettings.schedulingKeyWords;
    if (meeting_type === MeetingTypeEnum.FreeTime) {
      new_cal_event.summary =
        key_words.free[getRandomArrayIdx(key_words.free.length)];
    } else if (meeting_type === MeetingTypeEnum.OOO) {
      new_cal_event.summary =
        key_words.outOfOffice[getRandomArrayIdx(key_words.outOfOffice.length)];
    } else if (meeting_type === MeetingTypeEnum.SoftConflicts) {
      new_cal_event.summary =
        key_words.SoftConflicts[
          getRandomArrayIdx(key_words.SoftConflicts.length)
        ];
    } else if (meeting_type === MeetingTypeEnum.RecruiterBlock) {
      new_cal_event.summary =
        key_words.recruitingBlocks[
          getRandomArrayIdx(key_words.recruitingBlocks.length)
        ];
    } else if (meeting_type === MeetingTypeEnum.Interview) {
      new_cal_event.summary = `${interview_modules[getRandomArrayIdx(interview_modules.length)].name} with candidate ${'scheldon cooper'}`;
    } else if (meeting_type === MeetingTypeEnum.OtherMeetings) {
      new_cal_event.summary = `Business Meeting`;
    } else {
      return null;
    }
    return new_cal_event;
  };

  const fillEventsForTheDay = async (
    curr_day: string,
    google_cal: GoogleCalender,
    int_schd_sett: CustomSchedulingSettingsUser,
    monthly_interviewer_config: MeetingLimitsConfig,
    companyScheduleSettings: SchedulingSettingType,
  ) => {
    const day_interviewer_config: MeetingLimitsConfig = {
      [MeetingTypeEnum.OtherMeetings]: { occ_cnt: 0 },
      [MeetingTypeEnum.Interview]: { occ_cnt: 0 },
      [MeetingTypeEnum.OOO]: { occ_cnt: 0 },
      [MeetingTypeEnum.FreeTime]: { occ_cnt: 0 },
      [MeetingTypeEnum.SoftConflicts]: { occ_cnt: 0 },
      [MeetingTypeEnum.RecruiterBlock]: { occ_cnt: 0 },
      [MeetingTypeEnum.NOMeeting]: { occ_cnt: 0 },
    };
    let curr_time = dayjsLocal(curr_day)
      .tz(int_schd_sett.timeZone.tzCode)
      .startOf('day')
      .set('hours', 9);
    console.log(curr_time.format('dddd').toLowerCase());
    if (
      curr_time.format('dddd').toLowerCase() === 'saturday' ||
      curr_time.format('dddd').toLowerCase() === 'sunday'
    ) {
      return;
    }
    const work_end_time = dayjsLocal(curr_day)
      .tz(int_schd_sett.timeZone.tzCode)
      .startOf('day')
      .set('hours', 17);
    while (curr_time.isBefore(work_end_time, 'minutes')) {
      const { type, duration } = getRandMeetingType();
      // console.log(type, duration);
      const seed_cal_event = getSeedEvent(type, companyScheduleSettings);
      if (seed_cal_event) {
        seed_cal_event.start.dateTime = curr_time.format();
        seed_cal_event.end.dateTime = curr_time
          .add(duration, 'minutes')
          .format();
        seed_cal_event.start.timeZone = int_schd_sett.timeZone.tzCode;
        seed_cal_event.end.timeZone = int_schd_sett.timeZone.tzCode;
      }
      if (seed_cal_event) {
        await google_cal.createCalenderEvent(seed_cal_event);
      }
      if (max_occurence[type].period == 'day') {
        if (
          day_interviewer_config[type].occ_cnt <
          max_occurence[type].maxOccurrences
        ) {
          day_interviewer_config[type].occ_cnt += 1;
          monthly_interviewer_config[type].occ_cnt += 1;
        }
      } else {
        if (
          monthly_interviewer_config[type].occ_cnt <
          max_occurence[type].maxOccurrences
        ) {
          monthly_interviewer_config[type].occ_cnt += 1;
        }
      }
      curr_time = curr_time.add(duration, 'minutes');
    }
  };

  return {
    fetchDetails,
    deleteAllMeetings,
    fillEventsForTheDay,
    getSeedEvent,
  };
};
