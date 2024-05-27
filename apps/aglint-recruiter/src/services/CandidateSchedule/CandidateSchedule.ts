/* eslint-disable security/detect-object-injection */
import {
  AllSessionIntDetails,
  APIOptions,
  CalendarEvent,
  CompServiceKeyCred,
  ConflictReason,
  holidayType,
  InterDetailsType,
  InterviewerMeetingScheduled,
  InterviewModuleRelationType,
  InterviewSessionApiRespType,
  PlanCombinationRespType,
  schedulingSettingType,
  SessionCombinationRespType,
  SessionInterviewerApiRespType,
  SessionInterviewerType,
  SessionsCombType,
  SessionSlotType,
  TimeDurationDayjsType,
  TimeDurationType,
} from '@aglint/shared-types';
import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import { schema_find_availability_payload } from '@/src/types/scheduling/schema_find_availability_payload';
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
    ses_with_ints: InterviewSessionApiRespType[];
    all_inters: SessionInterviewerType[];
    comp_schedule_setting: schedulingSettingType;
    int_meetings: InterviewerMeetingScheduled[];
    ints_schd_meetings: Map<string, UserMeetingDetails[]>;
    all_session_int_details: AllSessionIntDetails;
  };
  private check_next_minutes = 30;
  private api_payload: ApiPayload;
  public intervs_details_with_events: InterDetailsType[];
  private schedule_dates: {
    user_start_date_js: Dayjs;
    user_end_date_js: Dayjs;
  };
  private api_options: APIOptions;

  constructor(
    _api_payload: ApiPayload,
    _schedule_dates?: {
      start_date_js: Dayjs;
      end_date_js: Dayjs;
    },
    _api_options?: z.infer<typeof schema_find_availability_payload>['options'],
  ) {
    this.api_payload = _api_payload;
    if (_schedule_dates) {
      this.schedule_dates = {
        user_start_date_js: _schedule_dates.start_date_js,
        user_end_date_js: _schedule_dates.end_date_js,
      };
    }
    this.api_options = {
      check_next_minutes: _api_options.check_next_minutes,
      include_free_time: _api_options.include_free_time,
      make_training_optional: _api_options.make_training_optional,
      use_recruiting_blocks: _api_options.use_recruiting_blocks,
      include_conflicting_slots: {
        calender_not_connected:
          _api_options.include_conflicting_slots.calender_not_connected,
        day_off: _api_options.include_conflicting_slots.day_off,
        holiday: _api_options.include_conflicting_slots.holiday,
        interviewer_pause:
          _api_options.include_conflicting_slots.interviewer_pause,
        interviewers_load:
          _api_options.include_conflicting_slots.interviewers_load,
        out_of_office: _api_options.include_conflicting_slots.out_of_office,
        override_working_hours: {
          start:
            _api_options.include_conflicting_slots.override_working_hours.start,
          end: _api_options.include_conflicting_slots.override_working_hours
            .end,
        },
        show_conflicts_events:
          _api_options.include_conflicting_slots.show_conflicts_events,
        show_soft_conflicts:
          _api_options.include_conflicting_slots.show_soft_conflicts,
      },
    };
  }

  // getters and setters
  public setSchedulingDates(_start_date_js: Dayjs, _end_date_js: Dayjs) {
    this.schedule_dates = {
      user_start_date_js: _start_date_js,
      user_end_date_js: _end_date_js,
    };
  }

  // NOTE: start of the public apis
  /**
   * fetches necessay details from supabse db for finding the slots
   */
  public async fetchDetails() {
    const meeting_date = {
      start: null,
      end: null,
    };
    // per week load balancer
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

      int_meetings,
      ints_schd_meetings,
      all_session_int_details,
      api_sess_ints,
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
      ses_with_ints: api_sess_ints,
      int_meetings,
      ints_schd_meetings,
      all_session_int_details,
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

  /**
   * find calender events for each interviewer
   */
  public async fetchInterviewrsCalEvents() {
    const ints_meta: InterDetailsType[] = this.db_details.all_inters.map(
      (i) => ({
        email: i.email,
        interviewer_id: i.user_id,
        name: getFullName(i.first_name, i.last_name),
        profile_img: i.profile_image,
        shedule_settings: i.scheduling_settings,
        tokens: i.schedule_auth as any,
        events: [],
        freeTimes: [],
        int_schedule_setting: i.scheduling_settings,
        isCalenderConnected: false,
      }),
    );
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

    const findMultiDayPlanUtil = (
      final_combs: PlanCombinationRespType[],
      curr_date: Dayjs,
      curr_day_idx: number,
    ): PlanCombinationRespType[] => {
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

      const combs = this.findFixedBreakSessionCombs(
        cloneDeep(session_rounds[curr_day_idx]),
        interv_curr_day_free_time,
        curr_date,
      );
      if (combs.length === 0) {
        return [];
      }
      if (final_combs.length === 0) {
        final_combs = cloneDeep(combs);
      } else {
        const temp_combs: PlanCombinationRespType[] = [];
        const next_day_combs: PlanCombinationRespType[] = cloneDeep(combs);
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
      all_combs = [...all_combs, ...combs];
      curr_date = this.getNextWorkingDay(curr_date);
    }
    return all_combs;
  }

  public findCandSlotsForDateRange() {
    const { findAllDayPlans } = this.findMultiDaySlots();
    return findAllDayPlans();
  }

  public findCandSlotForTheDay() {
    const { findCurrentDayPlan } = this.findMultiDaySlots();
    return findCurrentDayPlan();
  }

  //NOTE: end of the public apis

  //NOTE: start of private functions
  /**
   * organize sessions according to their order of days
   * @returns
   */
  private getSessionRounds() {
    let session_rounds: InterviewSessionApiRespType[][] = [[]];
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

  /**
   * @param ints_details
   * @param start_date
   * @param end_date
   * @param current_int_slot
   * @returns returns array of free time chunks for each interviewer for every given date bw the daterange
   */
  private findEachInterviewerFreeTimes = (
    ints_details: InterDetailsType[],
    start_date: string,
    end_date: string,
    current_int_slot: InterviewSessionApiRespType[],
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
      const { int_schedule_setting, email: interv_email } = interv;
      let curr_user_time = userTzDayjs().tz(
        int_schedule_setting.timeZone.tzCode,
      );
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
      const work_day = int_schedule_setting.workingHours.find(
        (day) => current_day.format('dddd').toLowerCase() === day.day,
      );
      // is day week off
      if (!work_day.isWorkDay) {
        return null;
      }

      if (
        !this.isIntervLoadPassed(
          current_day.format(),
          current_int_slot,
          interv.int_schedule_setting,
          interv_email,
        )
      ) {
        return null;
      }

      let work_hour = {
        startTime: this.chageTimeInDay(
          current_day.format(),
          work_day.timeRange.startTime,
          int_schedule_setting.timeZone.tzCode,
        ).format(),
        endTime: this.chageTimeInDay(
          current_day.format(),
          work_day.timeRange.endTime,
          int_schedule_setting.timeZone.tzCode,
        ).format(),
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
      const int_timezone = interviewer.int_schedule_setting.timeZone.tzCode;
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
        interviewer.int_schedule_setting.timeZone.tzCode,
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
  @param interview_sessions - particualar day sessions with fixed breaks
  @param interv_free_time - free time of interviewers of given session in a particalar day
**/
  private findFixedBreakSessionCombs = (
    interview_sessions: InterviewSessionApiRespType[],
    interv_free_time: InterDetailsType[],
    currDay: Dayjs,
  ) => {
    const cached_free_time = new Map<string, TimeDurationType[]>();
    let all_schedule_combs: PlanCombinationRespType[] = [];

    const interviewrs_sesn_comb =
      this.calcInterversCombsForSesson(interview_sessions);
    const exploreSessionCombs = (
      current_comb: InterviewSessionApiRespType[],
      session_idx,
    ) => {
      if (session_idx === interviewrs_sesn_comb.length) {
        const combs = calcMeetingCombinsForPlan(current_comb);
        all_schedule_combs = [...all_schedule_combs, ...combs];
        return;
      }
      for (let module_comb of interviewrs_sesn_comb[Number(session_idx)]) {
        current_comb.push(module_comb);
        exploreSessionCombs(current_comb, session_idx + 1);
        current_comb.pop();
      }
    };

    /**
     * @param plan_comb single interview plan with assigned interviewers
     * @returns all possible slots for that day
     */
    const calcMeetingCombinsForPlan = (
      plan_comb: InterviewSessionApiRespType[],
    ) => {
      // main variable
      const schedule_combs: PlanCombinationRespType[] = [];

      /**
       * @param curr_session
       * @returns merges the session interviewers free times
       */
      const getInterviewersCommonTime = (
        curr_session: InterviewSessionApiRespType,
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
            interviewer_pause:
              this.db_details.all_session_int_details[curr_session.session_id]
                .interviewers[s.user_id].pause_json,
          })),
        );
        cached_free_time.set(map_key.join('_'), common_time_range);
        return common_time_range;
      };

      const isAnySessIntsCalDisConnected = () => {
        const all_inters: SessionInterviewerApiRespType[] = plan_comb.reduce(
          (curr_ints, sess) => [
            ...curr_ints,
            ...sess.qualifiedIntervs,
            ...sess.trainingIntervs,
          ],
          [],
        );
        return all_inters.some((int) => {
          return (
            interv_free_time.find((i) => i.interviewer_id === int.user_id)
              .isCalenderConnected === false
          );
        });
      };
      const isAnySessIntsPausedManually = () => {
        for (const sess of plan_comb) {
          const inters = [...sess.qualifiedIntervs, ...sess.trainingIntervs];

          for (const int of inters) {
            const int_pause =
              this.db_details.all_session_int_details[sess.session_id]
                .interviewers[int.user_id].pause_json;
            if (int_pause && int_pause.isManual) {
              return true;
            }
          }
        }
        return false;
      };

      if (
        this.disabled_overrides.calender_not_connected &&
        isAnySessIntsCalDisConnected()
      )
        return [];
      if (
        this.disabled_overrides.interviewer_pause &&
        isAnySessIntsPausedManually()
      ) {
        return [];
      }

      const getOutOfWorkHrsMeetAttendees = (
        curr_sess: InterviewSessionApiRespType,
        slot_start_time: string,
        slot_end_time: string,
      ) => {
        const holidays = this.db_details.comp_schedule_setting.totalDaysOff;
        const all_ints: SessionInterviewerApiRespType[] = [
          ...curr_sess.qualifiedIntervs,
          ...curr_sess.trainingIntervs,
        ];

        const ints: SessionInterviewerApiRespType[] = [];

        for (let int of all_ints) {
          const int_sched_sett =
            this.db_details.all_session_int_details[curr_sess.session_id]
              .interviewers[int.user_id].scheduling_settings;
          const int_tz = int_sched_sett.timeZone.tzCode;
          const curr_day = userTzDayjs(slot_start_time)
            .tz(int_tz)
            .format('dddd');
          const working_hrs = int_sched_sett.workingHours.find(
            (day) => day.day.toLowerCase() === curr_day.toLowerCase(),
          );

          // NOTE: condition for checking whether today is not working day
          if (
            holidays.find((holiday: holidayType) =>
              userTzDayjs(slot_start_time)
                .tz(int_tz)
                .isSame(userTzDayjs(holiday.date, 'DD MMM YYYY'), 'date'),
            ) ||
            !working_hrs.isWorkDay
          ) {
            ints.push({
              ...int,
            });
          }
          if (
            !isTimeChunksOverLapps(
              {
                startTime: this.chageTimeInDay(
                  slot_start_time,
                  working_hrs.timeRange.startTime,
                  int_tz,
                ),
                endTime: this.chageTimeInDay(
                  slot_start_time,
                  working_hrs.timeRange.endTime,
                  int_tz,
                ),
              },
              {
                startTime: userTzDayjs(slot_start_time).tz(int_tz),
                endTime: userTzDayjs(slot_end_time).tz(int_tz),
              },
            )
          ) {
            ints.push({
              ...int,
            });
          }
        }
        return ints;
      };
      const getPausedMeetAttendees = (
        curr_sess: InterviewSessionApiRespType,
        slot_start_time: string,
        slot_end_time: string,
      ) => {
        const attendes = [
          ...curr_sess.qualifiedIntervs,
          ...curr_sess.trainingIntervs,
        ].filter((int) => {
          const pause_json =
            this.db_details.all_session_int_details[curr_sess.session_id]
              .interviewers[int.user_id].pause_json;
          if (pause_json && !pause_json.isManual) {
            return isTimeChunksEnclosed(
              {
                startTime: this.getTimeInCandTimeZone(pause_json.start_date),
                endTime: this.getTimeInCandTimeZone(pause_json.end_date),
              },
              {
                startTime: this.getTimeInCandTimeZone(slot_start_time),
                endTime: this.getTimeInCandTimeZone(slot_end_time),
              },
            );
          }
          return false;
        });
        return attendes;
      };

      /**
       * checking  conflicts
       * soft conflicts with key words,
       * hard conflicts any meeting,
       * out of office,
       * interviewer paused
       * calender disconnected
       * interviewer load  TODO: later
       * @param sess_slot
       * @returns
       */
      const getConflictsInSession = (sess_slot: SessionCombinationRespType) => {
        const upd_sess_slot: SessionCombinationRespType = { ...sess_slot };
        const session_attendees: SessionInterviewerApiRespType[] = [
          ...upd_sess_slot.qualifiedIntervs,
          ...upd_sess_slot.trainingIntervs,
        ];
        const getCalEventType = (
          scheduling_settings: schedulingSettingType,
          cal_event: CalendarEvent,
        ): ConflictReason['conflict_type'] => {
          const soft_conf_key_words =
            scheduling_settings.schedulingKeyWords.SoftConflicts.map((str) =>
              str.toLowerCase(),
            );
          const out_of_office_key_words =
            scheduling_settings.schedulingKeyWords.outOfOffice.map((str) =>
              str.toLowerCase(),
            );

          const is_soft_conflict = soft_conf_key_words.some((key_word) =>
            cal_event.summary.toLowerCase().includes(key_word),
          );
          if (is_soft_conflict) return 'soft';
          const is_ooo_conflict = out_of_office_key_words.some((key_word) =>
            cal_event.summary.toLowerCase().includes(key_word),
          );
          if (is_ooo_conflict) return 'ooo';

          return 'cal_event';
        };
        for (const attendee of session_attendees) {
          const conflict_reasons: ConflictReason[] = [];
          const attendee_pause_info =
            this.db_details.all_session_int_details[sess_slot.session_id]
              .interviewers[attendee.user_id].pause_json;
          if (attendee_pause_info) {
            if (attendee_pause_info.isManual) {
              conflict_reasons.push({
                conflict_event: null,
                conflict_type: 'interviewer_paused',
                end_time: null,
                start_time: null,
              });
            } else {
              if (
                isTimeChunksEnclosed(
                  {
                    startTime: this.getTimeInCandTimeZone(
                      attendee_pause_info.start_date,
                    ),
                    endTime: this.getTimeInCandTimeZone(
                      attendee_pause_info.end_date,
                    ),
                  },
                  {
                    startTime: this.getTimeInCandTimeZone(sess_slot.start_time),
                    endTime: this.getTimeInCandTimeZone(sess_slot.end_time),
                  },
                )
              ) {
                conflict_reasons.push({
                  conflict_type: 'interviewer_paused',
                  conflict_event: null,
                  start_time: attendee_pause_info.start_date,
                  end_time: attendee_pause_info.end_date,
                });
              }
            }
          }

          const int_with_events = this.intervs_details_with_events.find(
            (int) => int.interviewer_id === attendee.user_id,
          );
          if (!int_with_events.isCalenderConnected) {
            conflict_reasons.push({
              conflict_event: '',
              conflict_type: 'calender_diconnected',
              start_time: '',
              end_time: '',
            });
          }
          const conflicting_events = int_with_events.events.filter(
            (cal_event) => {
              return isTimeChunksOverLapps(
                {
                  startTime: this.getTimeInCandTimeZone(
                    cal_event.start.dateTime,
                  ),
                  endTime: this.getTimeInCandTimeZone(cal_event.end.dateTime),
                },
                {
                  startTime: this.getTimeInCandTimeZone(
                    upd_sess_slot.start_time,
                  ),
                  endTime: this.getTimeInCandTimeZone(upd_sess_slot.end_time),
                },
              );
            },
          );
          conflicting_events.forEach((conf_ev) => {
            const ev_type = getCalEventType(
              this.db_details.comp_schedule_setting,
              conf_ev,
            );
            conflict_reasons.push({
              conflict_type: ev_type,
              conflict_event: conf_ev.summary,
              end_time: conf_ev.end.dateTime,
              start_time: conf_ev.start.dateTime,
            });
          });
          if (conflict_reasons.length > 0) {
            upd_sess_slot.ints_conflicts.push({
              interviewer: {
                user_id: attendee.user_id,
              },
              conflict_reasons: conflict_reasons,
            });
          }
        }

        return upd_sess_slot;
      };

      const getSessionsAvailability = (
        session_idx: number,
        session_start_time: string,
      ): SessionCombinationRespType[] => {
        const curr_session = plan_comb[session_idx];
        const curr_sess_start_time =
          this.getTimeInCandTimeZone(session_start_time);

        const curr_sess_end_time = this.getTimeInCandTimeZone(
          session_start_time,
        ).add(curr_session.duration, 'minutes');

        const not_avail_ints = getOutOfWorkHrsMeetAttendees(
          curr_session,
          curr_sess_start_time.format(),
          curr_sess_end_time.format(),
        );

        const paused_inters = getPausedMeetAttendees(
          curr_session,
          session_start_time,
          curr_sess_end_time.format(),
        );
        //TODO: can we include reason ??
        if (not_avail_ints.length > 0) {
          return [];
        }
        if (
          this.disabled_overrides.interviewer_pause &&
          paused_inters.length > 0
        ) {
          return [];
        }

        const common_time = getInterviewersCommonTime(curr_session);
        const is_slot_free = common_time.some((free_time_chunk) => {
          return isTimeChunksEnclosed(
            {
              startTime: userTzDayjs(free_time_chunk.startTime),
              endTime: userTzDayjs(free_time_chunk.endTime),
            },
            {
              startTime: userTzDayjs(curr_sess_start_time),
              endTime: userTzDayjs(curr_sess_end_time),
            },
          );
        });

        let session_slot: SessionCombinationRespType = {
          ...curr_session,
          start_time: curr_sess_start_time.format(),
          end_time: curr_sess_end_time.format(),
          ints_conflicts: [],
          is_conflict: false,
        };

        if (!is_slot_free) {
          session_slot = getConflictsInSession(session_slot);
          session_slot.is_conflict = true;
        }

        if (session_idx + 1 === plan_comb.length) {
          return [session_slot];
        }
        const upcoming_sessn_slots = getSessionsAvailability(
          session_idx + 1,
          curr_sess_end_time.add(curr_session.break_duration).format(),
        );

        return [session_slot, ...upcoming_sessn_slots];
      };

      const day_start = currDay.startOf('day');
      const day_end = currDay.add(1, 'day').startOf('day');
      let curr_time = this.getFlooredNearestCurrentTime(); //NOTE: take current time 60 minutes later
      if (curr_time.isAfter(day_end, 'minutes')) {
        return [];
      }
      if (curr_time.isBefore(day_start, 'seconds')) {
        curr_time = day_start;
      }
      while (curr_time.isBefore(day_end)) {
        const session_comb = getSessionsAvailability(0, curr_time.format());
        if (session_comb.length !== 0) {
          schedule_combs.push({
            plan_comb_id: nanoid(),
            sessions: [...session_comb],
          });
        }
        curr_time = curr_time.add(this.check_next_minutes, 'minutes');
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
    //TODO: rewrite the merging function for beeter understanding

    //NOTE: its a place we can do  optimize
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
   * @param sessions interview session full details
   * @returns all combination of session with all possible interviewers
   */

  private calcInterversCombsForSesson = (
    sessions: InterviewSessionApiRespType[],
  ) => {
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
      session: InterviewSessionApiRespType,
      comb: number,
    ) => {
      let session_combs: InterviewSessionApiRespType[] = [];
      const combs = findCombinationOfStrings(
        [...session.qualifiedIntervs.map((int) => int.user_id)],
        comb,
      );
      for (let comb of combs) {
        const qualifiedIntervs = comb.map((id) => {
          const inter = session.qualifiedIntervs.find((i) => i.user_id === id);
          return {
            ...inter,
          };
        });
        // NOTE: optional trining ints
        if (session.trainingIntervs.length > 0) {
          session_combs.push({
            ...session,
            trainingIntervs: [],
            qualifiedIntervs: [...qualifiedIntervs],
          });
        }
        session_combs.push({
          ...session,
          qualifiedIntervs: [...qualifiedIntervs],
        });
      }
      return session_combs;
    };

    let total_combs: InterviewSessionApiRespType[][] = [];

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
      final_combs: PlanCombinationRespType[][],
      curr_date: Dayjs,
      curr_day_idx: number,
    ): PlanCombinationRespType[][] => {
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
      const combs = this.findFixedBreakSessionCombs(
        cloneDeep(session_rounds[curr_day_idx]),
        interv_curr_day_free_time,
        curr_date,
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

    const combineSlots = (plan_combs: PlanCombinationRespType[][]) => {
      const convertCombsToTimeSlot = (
        all_plan_combs: PlanCombinationRespType[],
      ) => {
        const convertSessionCombToSlot = (
          session_comb: SessionCombinationRespType,
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
            meeting_id: session_comb.meeting_id,
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

  private chageTimeInDay = (
    current_day: string,
    time: string, // scheduling settign time eg .. '09:00'
    timeZone: string,
  ) => {
    const [hours, minutes] = time.split(':');
    let userTime = userTzDayjs(current_day).tz(timeZone);
    userTime = userTime.set('hour', Number(hours));
    userTime = userTime.set('minutes', Number(minutes));

    return userTime;
  };

  private getFlooredNearestCurrentTime = () => {
    const curr_time = userTzDayjs()
      .add(60)
      .set('second', 0)
      .set('millisecond', 0);

    let minutes_to_set = curr_time.get('minutes');
    if (minutes_to_set % 5 !== 0) {
      minutes_to_set += 5 - (minutes_to_set % 5);
    }
    minutes_to_set += 30;
    return curr_time.set('minutes', minutes_to_set);
  };

  //TODO: should handle multi day slots
  private isIntervLoadPassed = (
    current_day_str: string,
    current_int_slot: InterviewSessionApiRespType[],
    int_schedule_setting: schedulingSettingType,
    interviewer_email: string,
  ) => {
    const current_day = userTzDayjs(current_day_str).tz(
      int_schedule_setting.timeZone.tzCode,
    );
    const curr_week_start_day = current_day.startOf('week');
    const curr_week_end_day = current_day.endOf('week');
    const int_meetings =
      this.db_details.ints_schd_meetings.get(interviewer_email);
    const curr_week_meetings = int_meetings.filter((meet) => {
      const meet_date = userTzDayjs(meet.meeting_date).tz(
        int_schedule_setting.timeZone.tzCode,
      );
      return (
        meet_date.isSameOrAfter(curr_week_start_day, 'date') &&
        meet_date.isSameOrBefore(curr_week_end_day, 'date')
      );
    });

    const slot_int_sessions = current_int_slot.filter((sess) =>
      sess.qualifiedIntervs.find((int) => int.email === interviewer_email),
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
        int_schedule_setting.timeZone.tzCode,
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
    const week_limit = int_schedule_setting.interviewLoad.weeklyLimit;
    const day_limit = int_schedule_setting.interviewLoad.dailyLimit;
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

  // NOTE: end of private functions

  // NOTE:  static util functions
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

//TODO:
/***check next working day
 * training people optional
 * pause and load check
 * is company holiday
 * is company day_off
 */
