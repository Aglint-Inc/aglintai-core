/* eslint-disable security/detect-object-injection */
import {
  CompServiceKeyCred,
  holidayType,
  InterDetailsType,
  IntervCntApp,
  InterviewerMeetingScheduled,
  InterviewModuleRelationType,
  InterviewSessionApiType,
  IntervMeta,
  PlanCombinationRespType,
  PlanCombinationType,
  schedulingSettingType,
  SessionCombinationRespType,
  SessionCombinationType,
  SessionInterviewerApiRespType,
  SessionInterviewerType,
  SessionsCombType,
  SessionSlotType,
  TimeDurationDayjsType,
  TimeDurationType,
} from '@aglint/shared-types';
import { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';

import { SINGLE_DAY_TIME } from '@/src/utils/integrations/constants';
import { getFullName } from '@/src/utils/jsonResume';

import { GoogleCalender } from '../GoogleCalender/google-calender';
import {
  fetch_details_from_db,
  UserMeetingDetails,
} from './utils/fetch_details_from_db';
import { getInterviewerBlockedTimes } from './utils/isEventFreeTime';
import {
  dayjsMax,
  isTimeChunksEnclosed,
  isTimeChunksLeftOverlapped,
  isTimeChunksOverLapps,
} from './utils/time_range_utils';
import { userTzDayjs } from './utils/userTzDayjs';
userTzDayjs.extend(isSameOrAfter);
userTzDayjs.extend(isSameOrBefore);

type ApiPayload = {
  user_tz: string;
  session_ids: string[];
  company_id: string;
};

type FuncParams = {
  inter_id: string;
  time_ranges: TimeDurationType[];
  interviewer_pause: InterviewModuleRelationType['pause_json'] | null;
}[];

type DayjsTimeRange = {
  inter_id: string;
  time_ranges: TimeDurationDayjsType[];
};

export class CandidatesScheduling {
  public db_details: {
    company_cred: CompServiceKeyCred;
    ses_with_ints: InterviewSessionApiType[];
    all_inters: SessionInterviewerType[];
    comp_schedule_setting: schedulingSettingType;
    int_meetings: InterviewerMeetingScheduled[];
    ints_schd_meetings: Map<string, UserMeetingDetails[]>;
  };
  private api_payload: ApiPayload;
  public intervs_details_with_events: InterDetailsType[];
  private schedule_dates: {
    user_start_date_js: Dayjs;
    user_end_date_js: Dayjs;
  };

  constructor(
    _api_payload: ApiPayload,
    _schedule_dates?: {
      start_date_js: Dayjs;
      end_date_js: Dayjs;
    },
  ) {
    this.api_payload = _api_payload;
    if (_schedule_dates) {
      this.schedule_dates = {
        user_start_date_js: _schedule_dates.start_date_js,
        user_end_date_js: _schedule_dates.end_date_js,
      };
    }
  }

  // getters and setters
  public setSchedulingDates(_start_date_js: Dayjs, _end_date_js: Dayjs) {
    this.schedule_dates = {
      user_start_date_js: _start_date_js,
      user_end_date_js: _end_date_js,
    };
  }

  // fetches required details from DB
  //   start of api funcs
  async fetchDetails() {
    const meeting_date = {
      start: null,
      end: null,
    };
    if (this.schedule_dates) {
      const meet_start_date = this.schedule_dates.user_start_date_js.subtract(
        7,
        'day',
      );
      meeting_date.start = meet_start_date.format();
      const meet_end_date = this.schedule_dates.user_end_date_js.add(7, 'day');
      meeting_date.end = meet_end_date.format();
    }
    const {
      all_inters,
      comp_schedule_setting,
      company_cred,
      ses_with_ints,
      int_meetings,
      ints_schd_meetings,
    } = await fetch_details_from_db(
      this.api_payload.session_ids,
      this.api_payload.company_id,
      {
        start: meeting_date.start,
        end: meeting_date.end,
      },
    );
    this.db_details = {
      all_inters,
      comp_schedule_setting,
      company_cred,
      ses_with_ints,
      int_meetings,
      ints_schd_meetings,
    };
  }

  /**
   * filter training people from session from finding combs
   * used when when trying to find alternative interviewer in same time of interviewer
   */
  public async ignoreTrainee() {
    this.db_details.ses_with_ints = this.db_details.ses_with_ints.map((s) => ({
      ...s,
      trainingIntervs: [],
    }));
    this.db_details.all_inters = this.db_details.all_inters.filter(
      (i) => i.interviewer_type !== 'training',
    );
    //
  }

  // start_date and end date format DD/MM/YYYY
  public async fetchInterviewrsCalEvents() {
    const ints_meta: IntervMeta[] = this.db_details.all_inters.map((i) => ({
      email: i.email,
      interviewer_id: i.user_id,
      name: getFullName(i.first_name, i.last_name),
      profile_img: i.profile_image,
      shedule_settings: i.scheduling_settings,
      tokens: i.schedule_auth as any,
    }));
    const promiseArr = ints_meta.map(async (int) => {
      let newInt: InterDetailsType = {
        ...int,
        events: [],
        freeTimes: [],
        isCalenderConnected: false,
      };
      try {
        const google_cal = new GoogleCalender(
          {
            recruiter: {
              email: int.email,
              schedule_auth: int.tokens,
              user_id: int.interviewer_id,
            },
            company_cred: this.db_details.company_cred,
          },
          null,
        );
        await google_cal.authorizeUser();
        newInt.events = await google_cal.getAllCalenderEvents(
          this.schedule_dates.user_start_date_js.format(),
          this.schedule_dates.user_end_date_js.format(),
        );
        newInt.isCalenderConnected = true;
      } catch (error) {
        newInt.isCalenderConnected = false;
      }
      return newInt;
    });

    let intervs_details_with_events = await Promise.all(promiseArr);
    this.intervs_details_with_events = intervs_details_with_events;
  }

  public findMultiDayComb() {
    let session_rounds = this.getSessionRounds();

    let dayjs_start_date: Dayjs = this.schedule_dates.user_start_date_js;
    let dayjs_end_date: Dayjs = this.schedule_dates.user_end_date_js;

    const convertIntToResp = (inters: SessionInterviewerType[]) => {
      const r: SessionInterviewerApiRespType[] = inters.map((i) => ({
        email: i.email,
        first_name: i.first_name,
        last_name: i.last_name,
        profile_image: i.profile_image,
        training_type: i.training_type,
        interviewer_type: i.interviewer_type,
        interview_module_relation_id: i.interview_module_relation_id,
      }));

      return r;
    };
    const findMultiDayPlanUtil = (
      final_combs: PlanCombinationType[],
      curr_date: Dayjs,
      curr_day_idx: number,
    ): PlanCombinationType[] => {
      if (curr_day_idx === session_rounds.length) {
        return final_combs;
      }

      if (userTzDayjs(curr_date).isAfter(dayjs_end_date, 'date')) {
        return [];
      }

      const curr_day_start_time = curr_date
        .tz(this.api_payload.user_tz)
        .startOf('day')
        .format();
      const curr_day_end_time = curr_date
        .tz(this.api_payload.user_tz)
        .endOf('day')
        .format();

      const interv_curr_day_free_time = this.findEachInterviewerFreeTimes(
        this.intervs_details_with_events,
        curr_day_start_time,
        curr_day_end_time,
        cloneDeep(session_rounds[curr_day_idx]),
      );

      const combs = this.findFixedTimeCombs(
        cloneDeep(session_rounds[curr_day_idx]),
        interv_curr_day_free_time,
      );
      if (combs.length === 0) {
        return [];
      }
      if (final_combs.length === 0) {
        final_combs = cloneDeep(combs);
      } else {
        const temp_combs: PlanCombinationType[] = [];
        const next_day_combs: PlanCombinationType[] = cloneDeep(combs);
        for (let final_slot of final_combs) {
          for (let nextdaySlot of next_day_combs) {
            temp_combs.push({
              plan_comb_id: nanoid(),
              sessions: [...final_slot.sessions, ...nextdaySlot.sessions],
            });
          }
        }
        final_combs = cloneDeep(temp_combs);
      }

      const days_gap = Math.floor(
        session_rounds[curr_day_idx][session_rounds[curr_day_idx].length - 1]
          .break_duration / SINGLE_DAY_TIME,
      );

      const next_day = this.getNextWorkingDay(curr_date, days_gap);
      return findMultiDayPlanUtil(final_combs, next_day, ++curr_day_idx);
    };

    let curr_date = dayjs_start_date;
    let all_combs: PlanCombinationRespType[] = [];
    while (curr_date.isSameOrBefore(dayjs_end_date)) {
      let combs = findMultiDayPlanUtil([], curr_date, 0);
      const tra_combs = combs.map((c) => {
        const sessions: SessionCombinationRespType[] = c.sessions.map((s) => {
          let sess: SessionCombinationRespType = {
            break_duration: s.break_duration,
            duration: s.duration,
            interviewer_cnt: s.interviewer_cnt,
            module_name: s.module_name,
            schedule_type: s.schedule_type,
            session_id: s.session_id,
            session_name: s.session_name,
            session_order: s.session_order,
            session_type: s.session_type,
            qualifiedIntervs: convertIntToResp(s.qualifiedIntervs),
            trainingIntervs: convertIntToResp(s.trainingIntervs),
            end_time: s.end_time,
            start_time: s.start_time,
          };

          return sess;
        });
        const p: PlanCombinationRespType = {
          plan_comb_id: nanoid(),
          sessions: sessions,
        };
        return p;
      });
      all_combs = [...all_combs, ...tra_combs];
      curr_date = this.getNextWorkingDay(curr_date);
    }
    return all_combs;
  }

  public findCandSlotForTheDay() {
    const { findCurrentDayPlan } = this.findMultiDaySlots();
    return findCurrentDayPlan();
  }

  public findCandSlotsForDateRange() {
    const { findAllDayPlans } = this.findMultiDaySlots();
    return findAllDayPlans();
  }

  public test() {
    const s = this.findEachInterviewerFreeTimes(
      this.intervs_details_with_events.slice(0, 1),
      this.schedule_dates.user_start_date_js.format(),
      this.schedule_dates.user_end_date_js.format(),
      [],
    );
    return { email: s[0].email, free_times: s[0].freeTimes };
  }
  //   end of api funcs

  // private util functions

  //
  private getSessionRounds() {
    let session_rounds: InterviewSessionApiType[][] = [[]];
    let curr_round = 0;
    for (let sess of this.db_details.ses_with_ints) {
      session_rounds[curr_round].push({ ...sess });
      if (sess.break_duration >= SINGLE_DAY_TIME) {
        session_rounds.push([]);
        curr_round++;
      }
    }
    session_rounds = session_rounds.filter((s) => s.length > 0);
    return session_rounds;
  }

  private findEachInterviewerFreeTimes = (
    ints_details: InterDetailsType[],
    start_date: string,
    end_date: string,
    current_int_slot: InterviewSessionApiType[],
  ) => {
    // one interview free time
    const findInterviewerFreeTime = (
      interviewer: InterDetailsType,
      start_date: Dayjs,
      end_date: Dayjs,
    ) => {
      let free_times: TimeDurationType[] = [];
      let current_date = start_date;

      while (!current_date.isAfter(end_date, 'day')) {
        let curr_day_free_times = findFreeTimeForTheDay(
          interviewer,
          current_date,
        );
        free_times = [...free_times, ...curr_day_free_times];
        current_date = current_date.add(1, 'day');
      }

      return free_times;
    };

    const chageTimeInDay = (
      current_day: Dayjs,
      time: string,
      timeZone: string,
    ) => {
      const [hours, minutes] = time.split(':');
      let userTime = current_day.tz(timeZone);
      userTime = userTime.set('hour', Number(hours));
      userTime = userTime.set('minutes', Number(minutes));

      return userTime.format();
    };

    /**
     *
     * @param current_day
     * @param int_schedule_setting
     * @returns current day working hours also considers load set to the interviewer
     */
    const getCurrDayWorkingHours = (
      current_day: Dayjs,
      interv: InterDetailsType,
    ): TimeDurationType => {
      const { shedule_settings, email } = interv;
      let curr_user_time = userTzDayjs().tz(shedule_settings.timeZone.tzCode);
      // current day is before actual curr day
      if (current_day.isBefore(curr_user_time, 'day')) {
        return null;
      }
      const is_holiday =
        this.db_details.comp_schedule_setting.totalDaysOff.find(
          (holiday: holidayType) =>
            current_day.isSame(
              userTzDayjs(holiday.date, 'DD MMM YYYY').tz(
                this.db_details.comp_schedule_setting.timeZone.tzCode,
              ),
              'date',
            ),
        );

      if (is_holiday) return null;
      const work_day = shedule_settings.workingHours.find(
        (day) => current_day.format('dddd').toLowerCase() === day.day,
      );
      // is day week off
      if (!work_day.isWorkDay) {
        return null;
      }

      const isIntervLoadPassed = () => {
        const curr_week_start_day = current_day.startOf('week');
        const curr_week_end_day = current_day.endOf('week');
        const int_meetings = this.db_details.ints_schd_meetings.get(email);
        const curr_week_meetings = int_meetings.filter((meet) => {
          const meet_date = userTzDayjs(meet.meeting_date).tz(
            shedule_settings.timeZone.tzCode,
          );
          return (
            meet_date.isSameOrAfter(curr_week_start_day, 'date') &&
            meet_date.isSameOrBefore(curr_week_end_day, 'date')
          );
        });

        const slot_int_sessions = current_int_slot.filter((sess) =>
          sess.qualifiedIntervs.find((int) => int.email === email),
        );
        const curr_slot_load = {
          total_interview: slot_int_sessions.length,
          total_duration: slot_int_sessions.reduce((sum, curr) => {
            return sum + curr.duration;
          }, 0),
        };
        const weekly_load = {
          total_interview: curr_week_meetings.reduce((sum, curr) => {
            return sum + curr.meeting_cnt;
          }, 0),
          total_duration: curr_week_meetings.reduce((sum, curr) => {
            return sum + curr.meeting_duration;
          }, 0),
        };
        const curr_day_meetings = int_meetings.filter((meet) => {
          const meet_date = userTzDayjs(meet.meeting_date).tz(
            shedule_settings.timeZone.tzCode,
          );
          return meet_date.isSame(current_day, 'day');
        });
        const day_load = {
          total_interview: curr_day_meetings.reduce((sum, curr) => {
            return sum + curr.meeting_cnt;
          }, 0),
          total_duration: curr_day_meetings.reduce((sum, curr) => {
            return sum + curr.meeting_duration;
          }, 0),
        };

        // add current slot slot to both weekly load and day load
        weekly_load.total_interview += curr_slot_load.total_interview;
        weekly_load.total_duration += curr_slot_load.total_duration;
        day_load.total_interview += curr_slot_load.total_interview;
        day_load.total_duration += curr_slot_load.total_duration;
        const week_limit = shedule_settings.interviewLoad.weeklyLimit;
        const day_limit = shedule_settings.interviewLoad.dailyLimit;
        if (week_limit.type === 'Hours') {
          if (week_limit.value * 60 >= weekly_load.total_duration) {
            if (day_limit.type === 'Hours') {
              return day_limit.value * 60 >= day_load.total_duration;
            } else {
              return day_limit.value >= day_load.total_interview;
            }
          } else {
            return false;
          }
        } else if (week_limit.type === 'Interviews') {
          if (week_limit.value >= weekly_load.total_interview) {
            if (day_limit.type === 'Hours') {
              return day_limit.value * 60 >= day_load.total_duration;
            } else {
              return day_limit.value >= day_load.total_interview;
            }
          } else {
            return false;
          }
        }
      };

      if (!isIntervLoadPassed()) {
        return null;
      }

      let work_hour = {
        startTime: chageTimeInDay(
          current_day,
          work_day.timeRange.startTime,
          shedule_settings.timeZone.tzCode,
        ),
        endTime: chageTimeInDay(
          current_day,
          work_day.timeRange.endTime,
          shedule_settings.timeZone.tzCode,
        ),
      };

      return work_hour;
    };

    const getWorkHourFromIntAvil = (
      int_work_hour: TimeDurationDayjsType,
      int_avail: TimeDurationDayjsType,
    ): TimeDurationType => {
      return {
        startTime: int_work_hour.startTime.isSameOrAfter(int_avail.startTime)
          ? int_work_hour.startTime.format()
          : int_avail.startTime.format(),
        endTime: int_work_hour.endTime.isSameOrBefore(int_avail.endTime)
          ? int_work_hour.endTime.format()
          : int_avail.endTime.format(),
      };
    };
    const stepToMinute = (curr_time: Dayjs) => {
      let minutes = curr_time.get('minutes');
      if (minutes % 5 !== 0) {
        minutes += 5 - (minutes % 5);
      }
      minutes += 30; // show slots 30 minutes from now (to avoid failing booking api)
      curr_time = curr_time.set('minutes', minutes).set('seconds', 0);
      return curr_time;
    };

    const findFreeTimeForTheDay = (
      interviewer: InterDetailsType,
      current_day: Dayjs,
    ): TimeDurationType[] => {
      const int_timezone = interviewer.shedule_settings.timeZone.tzCode;
      const day1_interviewer_time: TimeDurationDayjsType & { day: string } = {
        startTime: userTzDayjs(current_day.startOf('day').toISOString()).tz(
          int_timezone,
        ),
        endTime: userTzDayjs(current_day.startOf('day').toISOString())
          .tz(int_timezone)
          .endOf('day'),
        day: userTzDayjs(current_day.startOf('day').format())
          .tz(int_timezone)
          .format('dddd'),
      };

      const day2_interviewer_time: TimeDurationDayjsType & { day: string } = {
        startTime: userTzDayjs(current_day.endOf('day').toISOString())
          .tz(int_timezone)
          .startOf('day'),
        endTime: userTzDayjs(current_day.endOf('day').toISOString()).tz(
          int_timezone,
        ),
        day: userTzDayjs(current_day.endOf('day').format())
          .tz(int_timezone)
          .format('dddd'),
      };

      let work_time_duration: TimeDurationType[] = [];
      let day1_work_hours = getCurrDayWorkingHours(
        day1_interviewer_time.startTime,
        interviewer,
      );
      let day2_work_hours = getCurrDayWorkingHours(
        day2_interviewer_time.startTime,
        interviewer,
      );

      if (!day1_work_hours && !day2_work_hours) {
        return [];
      }
      if (day1_work_hours) {
        work_time_duration.push({
          ...getWorkHourFromIntAvil(
            {
              startTime: userTzDayjs(day1_work_hours.startTime).tz(
                int_timezone,
              ),
              endTime: userTzDayjs(day1_work_hours.endTime).tz(int_timezone),
            },
            day1_interviewer_time,
          ),
        });
      }

      // if candidate and interviewr are in same time zone
      if (
        day1_interviewer_time.day !== day2_interviewer_time.day &&
        day2_work_hours
      ) {
        work_time_duration.push({
          ...getWorkHourFromIntAvil(
            {
              startTime: userTzDayjs(day2_work_hours.startTime).tz(
                int_timezone,
              ),
              endTime: userTzDayjs(day2_work_hours.endTime).tz(int_timezone),
            },
            day2_interviewer_time,
          ),
        });
      }

      let current_day_blocked_times = getInterviewerBlockedTimes(
        this.db_details.comp_schedule_setting,
        interviewer.events,
        this.api_payload.user_tz,
      );
      let curr_user_time = userTzDayjs().tz(
        interviewer.shedule_settings.timeZone.tzCode,
      );
      const stepped_time = stepToMinute(curr_user_time);
      if (current_day.isSame(stepped_time, 'day')) {
        current_day_blocked_times.push({
          startTime: userTzDayjs(current_day),
          endTime: userTzDayjs(stepped_time),
        });
      }

      let day_free_times: TimeDurationType[] = [];
      day_free_times = minusBlockedTimeInWorkHours(
        work_time_duration,
        current_day_blocked_times,
      );
      return day_free_times;
    };
    const minusBlockedTimeInWorkHours = (
      work_hours_range: TimeDurationType[],
      curr_day_blocked_times: TimeDurationDayjsType[],
    ): TimeDurationType[] => {
      const sorted_blocked_times: TimeDurationDayjsType[] =
        curr_day_blocked_times.sort((e1, e2) => {
          return e1.startTime.diff(e2.startTime);
        });

      const getFreeTimeChunkForWorkHrChunk = (
        workhr_chunk: TimeDurationDayjsType,
      ): TimeDurationDayjsType[] => {
        const curr_blocked_times = sorted_blocked_times.filter(
          (blocked_chunk) => {
            return isTimeChunksOverLapps(blocked_chunk, workhr_chunk);
          },
        );

        if (curr_blocked_times.length === 0) {
          return [{ ...workhr_chunk }];
        }

        let prev_blocked_chunk: TimeDurationDayjsType = {
          startTime: curr_blocked_times[0].startTime,
          endTime: curr_blocked_times[0].endTime,
        };

        let free_time_chunks: TimeDurationDayjsType[] = [];

        if (
          prev_blocked_chunk.startTime.isAfter(
            workhr_chunk.startTime,
            'minutes',
          )
        ) {
          free_time_chunks.push({
            startTime: workhr_chunk.startTime,
            endTime: prev_blocked_chunk.startTime,
          });
        }
        for (let curr_blocked_chunk of curr_blocked_times.slice(1)) {
          if (!isTimeChunksOverLapps(prev_blocked_chunk, curr_blocked_chunk)) {
            free_time_chunks.push({
              startTime: prev_blocked_chunk.endTime,
              endTime: curr_blocked_chunk.startTime,
            });

            prev_blocked_chunk = {
              ...curr_blocked_chunk,
            };
          } else if (
            isTimeChunksLeftOverlapped(prev_blocked_chunk, curr_blocked_chunk)
          ) {
            prev_blocked_chunk.endTime = dayjsMax(
              prev_blocked_chunk.endTime,
              curr_blocked_chunk.endTime,
            );
          } else if (
            isTimeChunksEnclosed(prev_blocked_chunk, curr_blocked_chunk)
          ) {
            // nothing to do
          }
        }
        if (
          prev_blocked_chunk.endTime.isBefore(workhr_chunk.endTime, 'minutes')
        ) {
          free_time_chunks.push({
            startTime: prev_blocked_chunk.endTime,
            endTime: workhr_chunk.endTime,
          });
        }

        return free_time_chunks;
      };

      const work_hr_chunks: TimeDurationDayjsType[] = work_hours_range
        .map((work) => {
          return {
            startTime: userTzDayjs(work.startTime).tz(this.api_payload.user_tz),
            endTime: userTzDayjs(work.endTime).tz(this.api_payload.user_tz),
          };
        })
        .sort((e1, e2) => {
          return e1.startTime.diff(e2.startTime);
        });

      let free_times_dayjs: TimeDurationDayjsType[] = [];

      for (let workhr_chunk of work_hr_chunks) {
        const curr_free_chunks = getFreeTimeChunkForWorkHrChunk(workhr_chunk);
        free_times_dayjs = [...free_times_dayjs, ...curr_free_chunks];
      }

      const free_times: TimeDurationType[] = free_times_dayjs.map((chunk) => ({
        startTime: chunk.startTime.format(),
        endTime: chunk.endTime.format(),
      }));

      return free_times;
    };

    const updated_intervs_details = cloneDeep(ints_details);
    for (let interv of updated_intervs_details) {
      if (!interv.isCalenderConnected) {
        interv.freeTimes = [];
      } else {
        interv.freeTimes = findInterviewerFreeTime(
          interv,
          userTzDayjs(start_date).tz(this.api_payload.user_tz).startOf('day'),
          userTzDayjs(end_date).tz(this.api_payload.user_tz).endOf('day'),
        );
      }
    }
    return updated_intervs_details;
  };

  /**
  @returns combination of slots in a paricular day
  @param interview_sessions - interview sessions of a particaulr day with fixed time break ( like 30, 45, 60 minutes)
  @param interv_free_time - free time of interviewers of given session in a particalar day
**/
  private findFixedTimeCombs = (
    interview_sessions: InterviewSessionApiType[],
    interv_free_time: InterDetailsType[],
  ) => {
    const cached_free_time = new Map<string, TimeDurationType[]>();
    let all_schedule_combs: PlanCombinationType[] = [];

    const module_combs = this.calcIntervCombsForModule(interview_sessions);
    const exploreSessionCombs = (
      current_comb: InterviewSessionApiType[],
      module_idx,
    ) => {
      if (module_idx === module_combs.length) {
        const combs = calcMeetingCombinsForPlan(current_comb);
        all_schedule_combs = [...all_schedule_combs, ...combs];
        return;
      }

      for (let module_comb of module_combs[Number(module_idx)]) {
        current_comb.push(module_comb);
        exploreSessionCombs(current_comb, module_idx + 1);
        current_comb.pop();
      }
    };

    /**
     * @param plan_comb single interview plan
     * @returns given one combination of plan find all possible times for that plan
     */
    const calcMeetingCombinsForPlan = (
      plan_comb: InterviewSessionApiType[],
    ) => {
      const schedule_combs: PlanCombinationType[] = [];
      const getInterviewersCommonTime = (
        curr_session: InterviewSessionApiType,
      ) => {
        const all_int_attendees = [
          ...curr_session.qualifiedIntervs,
          ...curr_session.trainingIntervs,
        ];
        let map_key: string[] = [
          curr_session.session_id,
          ...all_int_attendees.map((s) => s.user_id),
        ];
        map_key = map_key.sort();
        if (cached_free_time.has(map_key.join('_'))) {
          return cached_free_time.get(map_key.join('_'));
        }

        const common_time_range = this.findCommonTimeRange(
          all_int_attendees.map((s) => ({
            inter_id: s.user_id,
            time_ranges: interv_free_time.find(
              (i) => i.interviewer_id === s.user_id,
            ).freeTimes,
            interviewer_pause: s.pause_json,
          })),
        );
        cached_free_time.set(map_key.join('_'), common_time_range);
        return common_time_range;
      };

      const findIsSessionAvailable = (
        module_idx: number,
        prev_time_range: TimeDurationType,
        shedule_comb: PlanCombinationType,
      ) => {
        if (module_idx === plan_comb.length) {
          return true;
        }
        const prev_session = plan_comb[Number(module_idx - 1)];
        const curr_session = plan_comb[Number(module_idx)];

        const break_duration = prev_session.break_duration;
        let required_time: TimeDurationType = {
          startTime: userTzDayjs(prev_time_range.endTime)
            .add(break_duration, 'minutes')
            .tz(this.api_payload.user_tz)
            .format(),
          endTime: userTzDayjs(prev_time_range.endTime)
            .add(curr_session.duration + break_duration, 'minutes')
            .tz(this.api_payload.user_tz)
            .format(),
        };
        const plan_session = plan_comb[Number(module_idx)];
        const common_time = getInterviewersCommonTime(plan_session);

        for (let free_time of common_time) {
          if (
            userTzDayjs(free_time.startTime).unix() <=
              userTzDayjs(required_time.startTime).unix() &&
            userTzDayjs(free_time.endTime).unix() >=
              userTzDayjs(required_time.endTime).unix()
          ) {
            shedule_comb.sessions.push({
              ...plan_session,
              start_time: required_time.startTime,
              end_time: required_time.endTime,
            });
            return findIsSessionAvailable(
              module_idx + 1,
              required_time,
              shedule_comb,
            );
          }
        }

        return false;
        // const required_time_range = userTzDayjs
      };

      const isPlanPossible = () => {
        let flag = true;
        let mp = new Map<string, IntervCntApp>();
        for (let mod of plan_comb) {
          let all_ints = [...mod.qualifiedIntervs, ...mod.trainingIntervs];
          for (const int of all_ints) {
            let int_cnt = mp.get(int.user_id);
            if (int_cnt) {
              int_cnt.meet_cnt += 1;
              int_cnt.dur_cnt += mod.duration;
            } else {
              int_cnt = {
                meet_cnt: 1,
                dur_cnt: mod.duration,
              };
              mp.set(int.user_id, int_cnt);
            }
          }
        }

        for (let [int_id, int_cnt] of mp) {
          const int_setting = interv_free_time.find(
            (i) => i.interviewer_id === int_id,
          );
          let load = int_setting.shedule_settings.interviewLoad.dailyLimit;
          if (load.type === 'Interviews' && load.value < int_cnt.meet_cnt) {
            flag = false;
          } else if (
            load.type === 'Hours' &&
            load.value * 60 < int_cnt.dur_cnt
          ) {
            flag = false;
          }
          if (!flag) break;
        }
        return flag;
      };

      // check for load balance setting
      if (!isPlanPossible()) return schedule_combs;
      const first_session = plan_comb[0];
      const first_sesn_comon_time = getInterviewersCommonTime(first_session);
      for (let time_range of first_sesn_comon_time) {
        const curr_time_range: TimeDurationType = {
          startTime: this.getTimeInCandTimeZone(time_range.startTime).format(),
          endTime: this.getTimeInCandTimeZone(
            userTzDayjs(time_range.startTime).add(
              first_session.duration,
              'minutes',
            ),
          ).format(),
        };

        while (
          userTzDayjs(curr_time_range.startTime).unix() <
            userTzDayjs(time_range.endTime).unix() &&
          userTzDayjs(curr_time_range.endTime).unix() <=
            userTzDayjs(time_range.endTime).unix()
        ) {
          let session_comb: PlanCombinationType = {
            plan_comb_id: nanoid(),
            sessions: [
              {
                ...first_session,
                start_time: curr_time_range.startTime,
                end_time: curr_time_range.endTime,
              },
            ],
          };

          if (findIsSessionAvailable(1, curr_time_range, session_comb)) {
            schedule_combs.push(session_comb);
          }

          // check for next 30 minutes
          curr_time_range.startTime = userTzDayjs(curr_time_range.startTime)
            .add(30, 'minutes')
            .tz(this.api_payload.user_tz)
            .format();
          curr_time_range.endTime = userTzDayjs(curr_time_range.endTime)
            .add(30, 'minutes')
            .tz(this.api_payload.user_tz)
            .format();
        }
      }
      return schedule_combs;
    };

    exploreSessionCombs([], 0);

    // sorting slots
    all_schedule_combs = all_schedule_combs.sort((slot1, slot2) => {
      return (
        userTzDayjs(slot1.sessions[0].start_time).unix() -
        userTzDayjs(slot2.sessions[0].start_time).unix()
      );
    });
    return all_schedule_combs;
  };

  private findCommonTimeRange = (ints_meta: FuncParams): TimeDurationType[] => {
    //pausing interviewers
    // disjoint

    // its a place we can do  optimize
    const subtractpauseTimeFromFreeTimeRange = (inters: FuncParams) => {
      const updInters = cloneDeep(inters);
      for (const int of updInters) {
        if (!int.interviewer_pause || int.time_ranges.length === 0) continue;
        if (int.interviewer_pause.isManual) {
          int.time_ranges = [];
        } else {
          int.time_ranges = int.time_ranges.filter((t) => {
            const flag =
              userTzDayjs(t.endTime).isBefore(
                int.interviewer_pause.start_date,
                'date',
              ) ||
              userTzDayjs(t.startTime).isAfter(
                int.interviewer_pause.end_date,
                'date',
              );
            return flag;
          });
        }
      }

      return updInters;
    };
    const inters = subtractpauseTimeFromFreeTimeRange(ints_meta);

    if (inters.find((i) => i.time_ranges.length === 0)) return [];
    const int_sorted_range: DayjsTimeRange[] = inters.map((i) => ({
      inter_id: i.inter_id,
      time_ranges: i.time_ranges
        .sort((time1, time2) => {
          return (
            userTzDayjs(time1.startTime).unix() -
            userTzDayjs(time2.startTime).unix()
          );
        })
        .map((t) => ({
          startTime: userTzDayjs(t.startTime),
          endTime: userTzDayjs(t.endTime),
        })),
    }));

    let curr_intersection: TimeDurationDayjsType[] =
      int_sorted_range[0].time_ranges;

    for (let i = 1; i < int_sorted_range.length; ++i) {
      let current_time_ranges = [...int_sorted_range[Number(i)].time_ranges];
      let new_intersection: TimeDurationDayjsType[] = [];
      let j = 0,
        k = 0;
      while (j < curr_intersection.length && k < current_time_ranges.length) {
        if (
          curr_intersection[j].startTime.isSameOrBefore(
            current_time_ranges[k].startTime,
            'minutes',
          ) &&
          curr_intersection[j].endTime.isSameOrAfter(
            current_time_ranges[k].endTime,
            'minutes',
          )
        ) {
          new_intersection.push({
            startTime: current_time_ranges[k].startTime,
            endTime: current_time_ranges[k].endTime,
          });
          k++;
          continue;
        }

        if (
          current_time_ranges[k].startTime.isSameOrBefore(
            curr_intersection[j].startTime,
            'minutes',
          ) &&
          current_time_ranges[k].endTime.isSameOrAfter(
            curr_intersection[j].endTime,
            'minutes',
          )
        ) {
          new_intersection.push({
            startTime: curr_intersection[j].startTime,
            endTime: curr_intersection[j].endTime,
          });
          j++;
          continue;
        }

        if (
          current_time_ranges[k].endTime.isSameOrBefore(
            curr_intersection[j].startTime,
            'minutes',
          )
        ) {
          // disjoint case 1
          k++;
        }
        // disjoint case 2
        else if (
          curr_intersection[j].endTime.isSameOrBefore(
            current_time_ranges[k].startTime,
            'minutes',
          )
        ) {
          j++;
          continue;
        }

        //non disjoint case 1
        else if (
          current_time_ranges[k].endTime.isSameOrBefore(
            curr_intersection[j].endTime,
            'minutes',
          )
        ) {
          new_intersection.push({
            startTime: userTzDayjs(
              Math.max(
                current_time_ranges[k].startTime.unix(),
                curr_intersection[j].startTime.unix(),
              ) * 1000,
            ),
            endTime: current_time_ranges[k].endTime,
          });
          k++;
          continue;
        } else if (
          current_time_ranges[k].startTime.isSameOrBefore(
            curr_intersection[j].endTime,
            'minutes',
          )
        ) {
          new_intersection.push({
            startTime: current_time_ranges[k].startTime,
            endTime: userTzDayjs(
              Math.min(
                current_time_ranges[k].endTime.unix(),
                curr_intersection[j].endTime.unix(),
              ) * 1000,
            ),
          });
          j++;
        } else {
          // console.log('fnkewjjkfewnkj');
        }
      }

      curr_intersection = [...new_intersection];
    }
    return curr_intersection.map((t) => ({
      startTime: userTzDayjs(t.startTime).tz(this.api_payload.user_tz).format(),
      endTime: userTzDayjs(t.endTime).tz(this.api_payload.user_tz).format(),
    }));
  };

  /**
   *
   * @param sessions interview session full details
   * @returns all combination of interviewers for the sessions
   */

  private calcIntervCombsForModule = (sessions: InterviewSessionApiType[]) => {
    const findCombinationOfStrings = (str_arr: string[], comb: number) => {
      let total_combs: string[][] = [];

      const findCombinationUtil = (
        arr: string[],
        single_comb: string[],
        start: number,
        end: number,
        index: number,
        r: number,
      ) => {
        if (index === r) {
          total_combs.push([...single_comb]);
          return;
        }

        for (let i = start; i <= end && end - i + 1 >= r - index; ++i) {
          single_comb[Number(index)] = arr[Number(i)];
          findCombinationUtil(arr, single_comb, i + 1, end, index + 1, r);
        }
      };
      let temp_arr = Array(comb).fill('');
      findCombinationUtil(str_arr, temp_arr, 0, str_arr.length - 1, 0, comb);

      return total_combs;
    };

    /**
     *
     * @param session session details
     * @param comb - number of interviewer needed  in the session
     * @returns combination of sessions with possible interviewers
     */
    const calcSingleSessionCombinations = (
      session: InterviewSessionApiType,
      comb: number,
    ) => {
      let session_combs: InterviewSessionApiType[] = [];
      const combs = findCombinationOfStrings(
        [...session.qualifiedIntervs.map((int) => int.user_id)],
        comb,
      );
      for (let comb of combs) {
        session_combs.push({
          ...session,
          qualifiedIntervs: comb.map((id) => {
            const inter = session.qualifiedIntervs.find(
              (i) => i.user_id === id,
            );
            return {
              ...inter,
            };
          }),
        });
      }
      return session_combs;
    };

    let total_combs: InterviewSessionApiType[][] = [];

    for (const session of sessions) {
      const combs = calcSingleSessionCombinations(
        session,
        session.interviewer_cnt,
      );
      total_combs.push(combs);
    }

    return total_combs;
  };

  private getNextWorkingDay = (curr_day: Dayjs, day_gap = 1) => {
    let nxt_day = curr_day.add(day_gap, 'day');

    let flag = true;
    while (flag) {
      // is curr day holiday
      if (
        this.db_details.comp_schedule_setting.totalDaysOff.find(
          (holiday: holidayType) =>
            nxt_day.isSame(userTzDayjs(holiday.date, 'DD MMM YYYY'), 'date'),
        )
      ) {
        nxt_day = nxt_day.add(1, 'day');
        continue;
      }
      const work_day = this.db_details.comp_schedule_setting.workingHours.find(
        (day) => nxt_day.format('dddd').toLowerCase() === day.day,
      );
      // is day week off
      if (!work_day.isWorkDay) {
        nxt_day = nxt_day.add(1, 'day');
        continue;
      }
      break;
    }
    return nxt_day;
  };

  private findMultiDaySlots = () => {
    let session_rounds = this.getSessionRounds();
    const findMultiDaySlotsUtil = (
      final_combs: PlanCombinationType[][],
      curr_date: Dayjs,
      curr_day_idx: number,
    ): PlanCombinationType[][] => {
      if (curr_day_idx === session_rounds.length) {
        return final_combs;
      }

      let curr_day_start_time = curr_date.startOf('day').format();
      let curr_day_end_time = curr_date.endOf('day').format();

      const interv_curr_day_free_time = this.findEachInterviewerFreeTimes(
        this.intervs_details_with_events,
        curr_day_start_time,
        curr_day_end_time,
        cloneDeep(session_rounds[curr_day_idx]),
      );

      const combs = this.findFixedTimeCombs(
        cloneDeep(session_rounds[curr_day_idx]),
        interv_curr_day_free_time,
      );

      if (combs.length === 0) {
        return [];
      }

      final_combs.push([...cloneDeep(combs)]);

      const days_gap = Math.floor(
        session_rounds[curr_day_idx][session_rounds[curr_day_idx].length - 1]
          .break_duration / SINGLE_DAY_TIME,
      );

      const next_day = this.getNextWorkingDay(curr_date, days_gap);
      return findMultiDaySlotsUtil(final_combs, next_day, ++curr_day_idx);
    };

    const findCurrentDayPlan = () => {
      let current_day = this.schedule_dates.user_start_date_js;
      const plan_combs = findMultiDaySlotsUtil([], current_day, 0);

      return plan_combs;
    };

    const combineSlots = (plan_combs: PlanCombinationType[][]) => {
      const convertCombsToTimeSlot = (
        all_plan_combs: PlanCombinationType[],
      ) => {
        const convertSessionCombToSlot = (
          session_comb: SessionCombinationType,
        ) => {
          const session_slot: SessionSlotType = {
            break_duration: session_comb.break_duration,
            duration: session_comb.duration,
            interviewer_cnt: session_comb.interviewer_cnt,
            location: session_comb.location,
            module_name: session_comb.module_name,
            schedule_type: session_comb.schedule_type,
            session_id: session_comb.session_id,
            session_name: session_comb.session_name,
            session_order: session_comb.session_order,
            session_type: session_comb.session_type,
            start_time: session_comb.start_time,
            end_time: session_comb.end_time,
          };
          return session_slot;
        };

        let mp = new Map<string, SessionsCombType>();
        for (const plan_comb of all_plan_combs) {
          const slot_start_time = plan_comb.sessions[0].start_time;
          const slot = mp.get(slot_start_time);
          if (slot) {
            slot.slot_cnt += 1;
            mp.set(slot_start_time, slot);
          } else {
            mp.set(slot_start_time, {
              slot_comb_id: nanoid(),
              sessions: plan_comb.sessions.map((s) =>
                convertSessionCombToSlot(s),
              ),
              slot_cnt: 1,
            });
          }
        }

        return Array.from(mp.values());
      };

      const multi_day_slots: SessionsCombType[][] = [];
      for (const curr_comb of plan_combs) {
        const curr_day_session_slots = convertCombsToTimeSlot(curr_comb);
        multi_day_slots.push(curr_day_session_slots);
      }
      return multi_day_slots;
    };

    const findAllDayPlans = () => {
      let dayjs_start_date = this.schedule_dates.user_start_date_js;
      let dayjs_end_date = this.schedule_dates.user_end_date_js;

      let curr_date = dayjs_start_date;
      let all_combs: SessionsCombType[][][] = [];
      while (curr_date.isSameOrBefore(dayjs_end_date)) {
        const plan_combs = findMultiDaySlotsUtil([], curr_date, 0);
        const session_combs = combineSlots(plan_combs);
        all_combs = [...all_combs, session_combs];
        curr_date = this.getNextWorkingDay(curr_date);
      }
      return all_combs;
    };

    return { findCurrentDayPlan, findAllDayPlans };
  };

  private getTimeInCandTimeZone = (time: string | Dayjs) => {
    return userTzDayjs(time).tz(this.api_payload.user_tz);
  };

  // static util functions
  static convertDateFormatToDayjs = (
    user_date,
    user_tz: string,
    is_start_day = true,
  ) => {
    const [day, month, year] = user_date.split('/');
    if (!day || !month || !year) {
      throw new Error(`Date should in the format DD/MM/YYYY`);
    }
    let user_dayjs = userTzDayjs.tz(`${year}-${month}-${day} 12:00`, user_tz);
    if (is_start_day) {
      user_dayjs = user_dayjs.startOf('day');
    } else {
      user_dayjs = user_dayjs.endOf('day');
    }
    return user_dayjs;
  };
}
