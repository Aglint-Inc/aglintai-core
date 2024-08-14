/* eslint-disable security/detect-object-injection */
import {
  APIOptions,
  CalConflictType,
  CandReqSlotsType,
  ConflictReason,
  CurrRoundCandidateAvailReq,
  DatabaseTable,
  DateRangePlansType,
  InterviewSessionApiRespType,
  PauseJson,
  PlanCombinationRespType,
  SessionCombinationRespType,
  SessionInterviewerApiRespType,
  SessionsCombType,
} from '@aglint/shared-types';
import {
  getFullName,
  ScheduleUtils,
  scheduling_options_schema,
  SINGLE_DAY_TIME,
} from '@aglint/shared-utils';
import { Dayjs } from 'dayjs';
import { isEqual } from 'lodash';
import { nanoid } from 'nanoid';
import * as v from 'valibot';

import {
  IntervsWorkHrsEventMapType,
  IntervsWorkHrsEventType,
  ScheduleApiDetails,
  ScheduleDBDetailsParams,
} from './types';
import { calcEachIntsAPIDetails } from './utils/calcEachIntsAPIDetails';
import { dbFetchScheduleApiDetails } from './utils/dbFetchScheduleApiDetails';
import { fetchIntsCalEventsDetails } from './utils/fetchIntsCalEventsDetails';
import { calcIntsCombsForEachSessionRound } from './utils/interviewersCombsForSession';
import { isIntervLoadPassed } from './utils/isInterviewerLoadPassed';
import { planCombineSlots } from './utils/planCombine';
import {
  convertTimeDurStrToDayjsChunk,
  isTimeChunksEnclosed,
  isTimeChunksOverLapps,
} from './utils/time_range_utils';
import { userTzDayjs } from './utils/userTzDayjs';

export class CandidatesSchedulingV2 {
  public db_details: ScheduleApiDetails;
  private api_options: APIOptions;
  public intervs_details_map: IntervsWorkHrsEventMapType;

  constructor(_api_options: v.InferInput<typeof scheduling_options_schema>) {
    // scheduling_options_schema;
    const parsed_api_options = v.parse(scheduling_options_schema, {
      ...(_api_options ?? {}),
      include_conflicting_slots: _api_options?.include_conflicting_slots ?? {},
    });
    this.api_options = { ...parsed_api_options };
    this.intervs_details_map = new Map();
  }

  private setIntervsDetailsMap(
    _intervs_details_map: IntervsWorkHrsEventMapType,
  ) {
    this.intervs_details_map = _intervs_details_map;
  }

  private setDbDetails(_api_details: ScheduleApiDetails) {
    this.db_details = { ..._api_details };
  }

  //NOTE: publicly exposed apis
  /**
   * find calender events for each interviewer
   */
  public async fetchDetails(params: ScheduleDBDetailsParams) {
    const db_details = await dbFetchScheduleApiDetails(params);
    const int_with_events = await fetchIntsCalEventsDetails(db_details);

    const inter_details = calcEachIntsAPIDetails(
      int_with_events,
      this.api_options,
      db_details,
    );
    const intervs_map: IntervsWorkHrsEventMapType = new Map();
    for (let inter of inter_details) {
      const details: IntervsWorkHrsEventType = {
        email: inter.email,
        freeTimes: inter.freeTimes,
        work_hours: inter.work_hours,
        day_off: inter.day_off,
        holiday: inter.holiday,
        isCalenderConnected: inter.isCalenderConnected,
        cal_date_events: inter.cal_date_events,
        interviewer_tz: inter.int_schedule_setting.timeZone.tzCode,
        int_schedule_setting: inter.int_schedule_setting,
      };
      intervs_map.set(inter.interviewer_id, details);
    }

    this.setDbDetails(db_details);
    this.setIntervsDetailsMap(intervs_map);
  }

  // find slots for the day
  public findCandSlotForTheDay() {
    const { findCurrentDayPlan } = this.findMultiDaySlots();
    return findCurrentDayPlan();
  }

  public findAvailabilitySlotsDateRange() {
    const { findAvailabilitySlots } = this.findMultiDaySlots();
    return findAvailabilitySlots();
  }

  // find slots for the date range
  public findCandSlotsForDateRange() {
    const { findAllDayPlans } = this.findMultiDaySlots();
    return findAllDayPlans();
  }

  public verifyIntSelectedSlots = (
    selected_slots: PlanCombinationRespType[],
  ) => {
    const verified_slots: PlanCombinationRespType[] = [];
    for (const comb of selected_slots) {
      const session_rounds: SessionCombinationRespType[][] =
        ScheduleUtils.getSessionRounds(
          comb.sessions.map((s) => ({
            ...s,
            break_duration: s.break_duration,
            session_duration: s.duration,
            session_order: s.session_order,
          })),
        ) as unknown as SessionCombinationRespType[][];
      let is_option_verified = true;
      for (const curr_round_sess of session_rounds) {
        const cand_date = userTzDayjs(curr_round_sess[0].start_time)
          .tz(this.db_details.req_user_tz)
          .startOf('day');
        const { verifyCurrDaySlot } = this.calcMeetingCombinsForPlan(
          cand_date,
          curr_round_sess,
        );
        if (!verifyCurrDaySlot(curr_round_sess)) {
          is_option_verified = false;
          break;
        }
      }
      if (is_option_verified) {
        verified_slots.push(comb);
      }
    }
    return verified_slots;
  };

  public getCandidateSelectedSlots = (
    cand_selected_slots: DatabaseTable['candidate_request_availability']['slots'],
  ) => {
    const session_rounds = this.getSessionRounds();
    let ints_combs_for_each_round = calcIntsCombsForEachSessionRound(
      session_rounds,
      this.api_options.make_training_optional,
    );
    let all_combs: CandReqSlotsType[] = [];
    for (
      let curr_round_idx = 0;
      curr_round_idx < session_rounds.length;
      ++curr_round_idx
    ) {
      const current_round_int_combs = ints_combs_for_each_round[curr_round_idx];
      const current_round_combs: DateRangePlansType['interview_rounds'] = [];
      for (let curr_date_slots of cand_selected_slots[curr_round_idx].dates) {
        const cand_date = userTzDayjs(curr_date_slots.curr_day).tz(
          this.db_details.req_user_tz,
        );

        const curr_day_slots = this.findFixedBreakSessionCombs(
          current_round_int_combs,
          cand_date,
        );
        const curr_day_combs: PlanCombinationRespType[] = [];
        curr_date_slots.slots.forEach((slot_time) => {
          const comb = curr_day_slots.find(
            (c) => c.sessions[0].start_time === slot_time.startTime,
          );
          if (comb) {
            curr_day_combs.push({ ...comb });
          }
        });
        current_round_combs.push({
          curr_date: cand_date.format(),
          plans: [...curr_day_combs],
        });
      }

      all_combs.push({
        current_round: curr_round_idx + 1,
        selected_dates: [...current_round_combs],
      });
    }
    return all_combs;
  };

  public ignoreTrainee() {
    this.db_details.ses_with_ints = this.db_details.ses_with_ints.map((s) => ({
      ...s,
      trainingIntervs: [],
    }));
    this.db_details.all_inters = this.db_details.all_inters.filter(
      (i) => i.interviewer_type !== 'training',
    );
  }
  public ignoreInterviewer(inter_id: string) {
    this.db_details.ses_with_ints = this.db_details.ses_with_ints.map((s) => ({
      ...s,
      trainingIntervs: [],
    }));
    this.db_details.all_inters = this.db_details.all_inters.filter(
      (i) => i.user_id !== inter_id,
    );
  }

  // single round slots with suggesting slots
  public candavailabilityWithSuggestion() {
    const session_rounds = this.getSessionRounds();
    const first_round_sessions = session_rounds[0];
    let ints_combs_for_each_round = calcIntsCombsForEachSessionRound(
      session_rounds,
      this.api_options.make_training_optional,
    );
    const dayjs_start_date = this.db_details.schedule_dates.user_start_date_js;
    const dayjs_end_date = this.db_details.schedule_dates.user_end_date_js;

    const getCurrDaySlots = (
      curr_day: Dayjs,
      curr_round_duration: number,
    ): CurrRoundCandidateAvailReq['slots'] => {
      const curr_day_sugg_slots: CurrRoundCandidateAvailReq['slots'] = [];
      const plans_start_times = new Set<string>();
      const curr_day_plans = this.findFixedBreakSessionCombs(
        ints_combs_for_each_round[0],
        curr_day,
      );
      curr_day_plans.forEach((plan) => {
        plans_start_times.add(plan.sessions[0].start_time);
      });

      const curr_time = ScheduleUtils.getNearestCurrTime(
        this.db_details.req_user_tz,
      );
      let cand_start_time = curr_day.set(
        'hours',
        this.api_options.cand_start_time,
      );
      const cand_end_time = curr_day.set(
        'hours',
        this.api_options.cand_end_time,
      );
      if (curr_time.isSame(cand_start_time, 'day')) {
        if (curr_time.isSameOrAfter(cand_end_time, 'hours')) return [];
        cand_start_time = curr_time;
      }

      let curr_start_time = cand_start_time;

      while (curr_start_time.isBefore(cand_end_time, 'hour')) {
        curr_day_sugg_slots.push({
          start_time: curr_start_time.format(),
          end_time: curr_start_time
            .add(curr_round_duration, 'minutes')
            .format(),
          is_slot_available: plans_start_times.has(curr_start_time.format()),
        });
        curr_start_time = curr_start_time.add(curr_round_duration, 'minutes');
      }
      return curr_day_sugg_slots;
    };
    let curr_round_sugg_slots: CurrRoundCandidateAvailReq[] = [];
    const curr_round_options: CurrRoundCandidateAvailReq[] = [];

    let curr_round_duration = 0;
    first_round_sessions.forEach((sesn, idx) => {
      if (first_round_sessions.length - 1 !== idx) {
        curr_round_duration += sesn.break_duration;
      }
      curr_round_duration += sesn.duration;
    });
    let curr_day = dayjs_start_date;
    while (curr_day.isSameOrBefore(dayjs_end_date, 'day')) {
      const curr_day_sugg_slots = getCurrDaySlots(
        curr_day,
        curr_round_duration,
      );
      curr_round_options.push({
        curr_interview_day: curr_day.format(),
        slots: [...curr_day_sugg_slots],
      });
      curr_day = curr_day.add(1, 'day');
    }
    curr_round_sugg_slots = [...curr_round_sugg_slots, ...curr_round_options];
    return curr_round_sugg_slots;
  }

  //NOTE: private funcs
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
  @returns combination of slots in a paricular day
  @param interview_sessions - particualar day sessions with fixed breaks
  @param interv_free_time - free time of interviewers of given session in a particalar day
**/
  private findFixedBreakSessionCombs = (
    interviewrs_sesn_comb: InterviewSessionApiRespType[][],
    curr_day: Dayjs, // cand time zone
  ) => {
    let all_schedule_combs: PlanCombinationRespType[] = [];
    const exploreSessionCombs = (
      current_comb: InterviewSessionApiRespType[],
      session_idx,
    ) => {
      if (session_idx === interviewrs_sesn_comb.length) {
        const combs = this.calcMeetingCombinsForPlan(
          curr_day,
          current_comb,
        ).generateSlotsForCurrDay();
        all_schedule_combs = [...all_schedule_combs, ...combs];
        return;
      }
      for (let module_comb of interviewrs_sesn_comb[Number(session_idx)]) {
        current_comb.push(module_comb);
        exploreSessionCombs(current_comb, session_idx + 1);
        current_comb.pop();
      }
    };

    exploreSessionCombs([], 0);

    if (
      all_schedule_combs.length > 0 &&
      all_schedule_combs.every((s) => s.no_slot_reasons.length > 0)
    ) {
      const single_comb_reason: PlanCombinationRespType = {
        plan_comb_id: nanoid(),
        sessions: [],
        no_slot_reasons: [],
      };
      all_schedule_combs.forEach((plan) => {
        single_comb_reason.no_slot_reasons = [
          ...single_comb_reason.no_slot_reasons,
          ...plan.no_slot_reasons,
        ];
      });
      return [single_comb_reason];
    } else {
      return all_schedule_combs
        .filter((comb) => {
          return comb.sessions.length > 0;
        })
        .sort((slot1, slot2) => {
          return (
            userTzDayjs(slot1.sessions[0].start_time).unix() -
            userTzDayjs(slot2.sessions[0].start_time).unix()
          );
        });
    }
  };

  private findMultiDaySlots = () => {
    let session_rounds = this.getSessionRounds();
    let ints_combs_for_each_round = calcIntsCombsForEachSessionRound(
      session_rounds,
      this.api_options.make_training_optional,
    );
    const findMultiDaySlotsUtil = (
      final_combs: DateRangePlansType['interview_rounds'],
      curr_date: Dayjs,
      curr_round_idx: number,
    ): DateRangePlansType['interview_rounds'] => {
      if (curr_round_idx === session_rounds.length) {
        return final_combs;
      }

      let combs: PlanCombinationRespType[] = [];
      while (
        combs.length === 0 &&
        curr_date.isSameOrBefore(
          this.db_details.schedule_dates.user_end_date_js,
          'day',
        )
      ) {
        combs = this.findFixedBreakSessionCombs(
          ints_combs_for_each_round[curr_round_idx],
          curr_date.startOf('day'),
        );
        if (combs.length === 0) {
          if (curr_round_idx === 0) {
            break;
          } else {
            curr_date = curr_date.add(1, 'day');
          }
        }
      }
      if (combs.length === 0) {
        return [];
      }

      final_combs.push({
        curr_date: curr_date.format(),
        plans: [...combs],
      });

      const days_gap = Math.floor(
        session_rounds[curr_round_idx][
          session_rounds[curr_round_idx].length - 1
        ].break_duration / SINGLE_DAY_TIME,
      );

      const next_day = curr_date.add(days_gap, 'day');
      return findMultiDaySlotsUtil(final_combs, next_day, ++curr_round_idx);
    };

    const findCurrentDayPlan = () => {
      let current_day = this.db_details.schedule_dates.user_start_date_js;
      const plan_combs = findMultiDaySlotsUtil([], current_day, 0);

      return plan_combs;
    };

    const findAllDayPlans = () => {
      let dayjs_start_date = this.db_details.schedule_dates.user_start_date_js;
      let dayjs_end_date = this.db_details.schedule_dates.user_end_date_js;

      let curr_date = dayjs_start_date;
      let all_combs: SessionsCombType[][][] = [];
      while (curr_date.isSameOrBefore(dayjs_end_date)) {
        const plan_combs = findMultiDaySlotsUtil([], curr_date, 0);
        if (plan_combs.length > 0) {
          const session_combs = planCombineSlots(plan_combs);
          all_combs = [...all_combs, session_combs];
        }
        curr_date = curr_date.add(1, 'day');
      }
      return all_combs;
    };
    const findAvailabilitySlots = () => {
      let dayjs_start_date = this.db_details.schedule_dates.user_start_date_js;
      let dayjs_end_date = this.db_details.schedule_dates.user_end_date_js;

      let curr_date = dayjs_start_date;
      const all_combs: DateRangePlansType[] = [];
      while (curr_date.isSameOrBefore(dayjs_end_date)) {
        const plan_combs = findMultiDaySlotsUtil([], curr_date, 0);
        if (plan_combs.length > 0) {
          const session_combs = plan_combs;
          all_combs.push({
            interview_start_day: curr_date.format(),
            interview_rounds: [...session_combs],
          });
        }
        curr_date = curr_date.add(1, 'day');
      }
      return all_combs;
    };
    return { findCurrentDayPlan, findAllDayPlans, findAvailabilitySlots };
  };

  private getTimeInCandTimeZone = (time: string | Dayjs) => {
    return userTzDayjs(time).tz(this.db_details.req_user_tz);
  };
  private getTimeIntTimeZone = (
    time_str: string,
    session_id: string,
    interview_id: string,
  ) => {
    return userTzDayjs(time_str).tz(
      this.db_details.all_session_int_details[session_id].interviewers[
        interview_id
      ].scheduling_settings.timeZone.tzCode,
    );
  };
  private getIntPauseJson(session_id: string, user_id: string) {
    return this.db_details.all_session_int_details[session_id].interviewers[
      user_id
    ].pause_json;
  }
  /**
   * @param plan_comb single interview plan with assigned interviewers
   * @returns all possible slots for that day
   */
  private calcMeetingCombinsForPlan = (
    curr_day_js: Dayjs,
    plan_comb: InterviewSessionApiRespType[],
  ) => {
    let curr_day_str = curr_day_js.startOf('day').format();

    const cacheCurrPlanCalc = () => {
      const indef_paused_inters: {
        session_id: string;
        inters: (Pick<
          SessionInterviewerApiRespType,
          'user_id' | 'first_name' | 'last_name'
        > & {
          pause_json: PauseJson;
        })[];
      }[] = [];
      const curr_day_paused_inters: {
        session_id: string;
        inters: (Pick<
          SessionInterviewerApiRespType,
          'user_id' | 'first_name' | 'last_name'
        > & {
          pause_json: PauseJson;
        })[];
      }[] = [];
      const cal_disc_inters: {
        session_id: string;
        inters: Pick<
          SessionInterviewerApiRespType,
          'user_id' | 'first_name' | 'last_name'
        >[];
      }[] = [];
      const load_reached_ints: {
        session_id: string;
        inters: (Pick<
          SessionInterviewerApiRespType,
          'user_id' | 'first_name' | 'last_name'
        > & {
          type: CalConflictType;
        })[];
      }[] = [];
      const day_off_ints: {
        session_id: string;
        inters: Pick<
          SessionInterviewerApiRespType,
          'user_id' | 'first_name' | 'last_name'
        >[];
      }[] = [];

      const holiday_ints: {
        session_id: string;
        inters: Pick<
          SessionInterviewerApiRespType,
          'user_id' | 'first_name' | 'last_name'
        >[];
      }[] = [];

      let slot_week_load_density = 0;
      let slot_day_load_density = 0;

      for (let sess_idx = 0; sess_idx < plan_comb.length; ++sess_idx) {
        const curr_sess = plan_comb[sess_idx];
        const session_attendees: SessionInterviewerApiRespType[] = [
          ...curr_sess.qualifiedIntervs,
          ...curr_sess.trainingIntervs,
        ];
        indef_paused_inters.push({
          session_id: curr_sess.session_id,
          inters: [],
        });
        curr_day_paused_inters.push({
          session_id: curr_sess.session_id,
          inters: [],
        });
        cal_disc_inters.push({
          session_id: curr_sess.session_id,
          inters: [],
        });
        load_reached_ints.push({
          session_id: curr_sess.session_id,
          inters: [],
        });
        day_off_ints.push({
          session_id: curr_sess.session_id,
          inters: [],
        });
        holiday_ints.push({
          session_id: curr_sess.session_id,
          inters: [],
        });

        let cnt_qualified_ints = 0;

        session_attendees.forEach((attendee) => {
          const attendee_details = this.intervs_details_map.get(
            attendee.user_id,
          );

          if (
            !this.intervs_details_map.get(attendee.user_id).isCalenderConnected
          ) {
            cal_disc_inters[sess_idx].inters.push({
              user_id: attendee.user_id,
              first_name: attendee.first_name,
              last_name: attendee.last_name,
            });
          }
          let is_day_off = false;
          let is_holiday_off = false;
          attendee_details.holiday[curr_day_str].forEach((t) => {
            if (
              t.startTime === curr_day_js.startOf('date').format() &&
              t.endTime === curr_day_js.endOf('date').format()
            ) {
              is_holiday_off = true;
            }
          });
          attendee_details.day_off[curr_day_str].forEach((t) => {
            if (
              t.startTime === curr_day_js.startOf('date').format() &&
              t.endTime === curr_day_js.endOf('date').format()
            ) {
              is_day_off = true;
            }
          });
          if (is_day_off) {
            day_off_ints[sess_idx].inters.push({
              first_name: attendee.first_name,
              last_name: attendee.last_name,
              user_id: attendee.user_id,
            });
          }
          if (is_holiday_off) {
            holiday_ints[sess_idx].inters.push({
              first_name: attendee.first_name,
              last_name: attendee.last_name,
              user_id: attendee.user_id,
            });
          }
          if (is_day_off || is_holiday_off) {
            return;
          }
          const interviewer_pause_json = this.getIntPauseJson(
            curr_sess.session_id,
            attendee.user_id,
          );
          if (interviewer_pause_json) {
            if (interviewer_pause_json.isManual) {
              indef_paused_inters[sess_idx].inters.push({
                user_id: attendee.user_id,
                first_name: attendee.first_name,
                last_name: attendee.last_name,
                pause_json: interviewer_pause_json,
              });
            } else {
              const last_paused_date = this.getTimeIntTimeZone(
                interviewer_pause_json.end_date,
                curr_sess.session_id,
                attendee.user_id,
              );
              if (
                isTimeChunksOverLapps(
                  {
                    startTime: last_paused_date
                      .startOf('day')
                      .tz(this.db_details.req_user_tz),
                    endTime: last_paused_date
                      .endOf('day')
                      .tz(this.db_details.req_user_tz),
                  },
                  {
                    startTime:
                      this.getTimeInCandTimeZone(curr_day_js).startOf('day'),
                    endTime: this.getTimeInCandTimeZone(
                      curr_day_js.endOf('day'),
                    ),
                  },
                )
              ) {
                curr_day_paused_inters[sess_idx].inters.push({
                  user_id: attendee.user_id,
                  first_name: attendee.first_name,
                  last_name: attendee.last_name,
                  pause_json: interviewer_pause_json,
                });
              }
            }
          }

          if (attendee.training_type === 'qualified') {
            cnt_qualified_ints++;
            const { is_passed, type, day_load_density, week_load_density } =
              isIntervLoadPassed(
                curr_day_js,
                this.db_details,
                attendee.user_id,
                this.intervs_details_map.get(attendee.user_id)
                  .int_schedule_setting,
                plan_comb,
              );

            slot_day_load_density += day_load_density;
            slot_week_load_density += week_load_density;

            if (!is_passed) {
              load_reached_ints[sess_idx].inters.push({
                user_id: attendee.user_id,
                first_name: attendee.first_name,
                last_name: attendee.last_name,
                type,
              });
            }
          }
        });
        slot_day_load_density = slot_day_load_density / cnt_qualified_ints;
        slot_week_load_density = slot_week_load_density / cnt_qualified_ints;
      }
      return {
        holiday_ints,
        day_off_ints,
        indef_paused_inters,
        curr_day_paused_inters,
        cal_disc_inters,
        load_reached_ints,
        slot_day_load_density,
        slot_week_load_density,
      };
    };
    const {
      day_off_ints,
      holiday_ints,
      cal_disc_inters,
      curr_day_paused_inters,
      indef_paused_inters,
      load_reached_ints,
      slot_day_load_density,
      slot_week_load_density,
    } = cacheCurrPlanCalc();

    /**
     * checking  conflicts
     * calender disconnected
     * interviewer load
     * soft conflicts with key words,
     * hard conflicts any meeting,
     * interviewer paused
     * out of office etc..,
     * @param sess_slot
     * @returns null or sesn_slot with conflicts
     */
    const verifyForConflicts = (
      sesn_slot: SessionCombinationRespType,
      sessn_idx: number,
    ) => {
      const upd_sess_slot: SessionCombinationRespType = { ...sesn_slot };
      const curr_sess_cal_dic_ints = cal_disc_inters[sessn_idx].inters;
      const curr_sess_indef_paused_ints = indef_paused_inters[sessn_idx].inters;
      const curr_sess_curr_day_paused_ints =
        curr_day_paused_inters[sessn_idx].inters;
      // const curr_sess_common_time = session_ints_common_time[sessn_idx];
      upd_sess_slot.day_load_den = slot_day_load_density;
      upd_sess_slot.week_load_den = slot_week_load_density;
      const session_attendees: SessionInterviewerApiRespType[] = [
        ...upd_sess_slot.qualifiedIntervs,
        ...upd_sess_slot.trainingIntervs,
      ];

      for (const attendee of session_attendees) {
        const attendee_details = this.intervs_details_map.get(attendee.user_id);
        const int_conflic_reasons: ConflictReason[] = [];
        // cal disconnected conflict
        if (
          curr_sess_cal_dic_ints.find((s) => s.user_id === attendee.user_id)
        ) {
          int_conflic_reasons.push({
            conflict_type: 'calender_diconnected',
            conflict_event: null,
            start_time: null,
            end_time: null,
          });
        }
        const attendee_load = load_reached_ints[sessn_idx].inters.find(
          (s) => s.user_id === attendee.user_id,
        );
        if (attendee_load) {
          int_conflic_reasons.push({
            conflict_type: attendee_load.type,
            conflict_event: null,
            end_time: null,
            start_time: null,
          });
        }

        // indefenetly paused inters
        if (
          curr_sess_indef_paused_ints.some(
            (s) => s.user_id === attendee.user_id,
          )
        ) {
          int_conflic_reasons.push({
            conflict_type: 'interviewer_paused',
            conflict_event: null,
            start_time: null,
            end_time: null,
          });
        }

        //TEST:
        const curr_day_paused_inter = curr_sess_curr_day_paused_ints.find(
          (s) => s.user_id === attendee.user_id,
        );

        //curr_day paused ints
        if (curr_day_paused_inter) {
          const last_paused_date = this.getTimeIntTimeZone(
            curr_day_paused_inter.pause_json.end_date,
            upd_sess_slot.session_id,
            attendee.user_id,
          );
          const is_time_overlapps = isTimeChunksOverLapps(
            {
              startTime: last_paused_date
                .startOf('day')
                .tz(this.db_details.req_user_tz),
              endTime: last_paused_date
                .endOf('day')
                .tz(this.db_details.req_user_tz),
            },
            {
              startTime: this.getTimeInCandTimeZone(upd_sess_slot.start_time),
              endTime: this.getTimeInCandTimeZone(upd_sess_slot.start_time),
            },
          );
          if (is_time_overlapps) {
            if (this.api_options.include_conflicting_slots.interviewer_pause) {
              int_conflic_reasons.push({
                conflict_type: 'interviewer_paused',
                conflict_event: null,
                start_time: curr_day_paused_inter.pause_json.start_date,
                end_time: curr_day_paused_inter.pause_json.end_date,
              });
            } else {
              return null;
            }
          }
        }
        let is_slot_day_off = false;
        attendee_details.day_off[curr_day_str].forEach((t) => {
          is_slot_day_off = isTimeChunksOverLapps(
            convertTimeDurStrToDayjsChunk(t, this.db_details.req_user_tz),
            {
              startTime: userTzDayjs(upd_sess_slot.start_time).tz(
                this.db_details.req_user_tz,
              ),
              endTime: userTzDayjs(upd_sess_slot.end_time).tz(
                this.db_details.req_user_tz,
              ),
            },
          );

          if (is_slot_day_off) {
            if (this.api_options.include_conflicting_slots.day_off) {
              int_conflic_reasons.push({
                conflict_type: 'day_off',
                conflict_event: 'Day Off',
                start_time: t.startTime,
                end_time: t.endTime,
              });
            }
          }
        });
        if (
          is_slot_day_off &&
          !this.api_options.include_conflicting_slots.day_off
        ) {
          return null;
        }

        let is_slot_holiday = false;
        attendee_details.holiday[curr_day_str].forEach((t) => {
          let flag = isTimeChunksOverLapps(
            convertTimeDurStrToDayjsChunk(t, this.db_details.req_user_tz),
            {
              startTime: userTzDayjs(upd_sess_slot.start_time).tz(
                this.db_details.req_user_tz,
              ),
              endTime: userTzDayjs(upd_sess_slot.end_time).tz(
                this.db_details.req_user_tz,
              ),
            },
          );
          if (flag) {
            is_slot_holiday = true;
            int_conflic_reasons.push({
              conflict_type: 'holiday',
              conflict_event: 'Holiday',
              start_time: t.startTime,
              end_time: t.endTime,
            });
          }
        });

        if (
          is_slot_holiday &&
          !this.api_options.include_conflicting_slots.holiday
        ) {
          return null;
        }

        let is_slot_out_of_work_hrs = !attendee_details.work_hours[
          curr_day_str
        ].some((t) => {
          return isTimeChunksEnclosed(
            convertTimeDurStrToDayjsChunk(t, this.db_details.req_user_tz),
            {
              startTime: userTzDayjs(upd_sess_slot.start_time).tz(
                this.db_details.req_user_tz,
              ),
              endTime: userTzDayjs(upd_sess_slot.end_time).tz(
                this.db_details.req_user_tz,
              ),
            },
          );
        });
        if (is_slot_out_of_work_hrs) {
          if (this.api_options.include_conflicting_slots.out_of_working_hrs) {
            int_conflic_reasons.push({
              conflict_type: 'out_of_working_hours',
              conflict_event: '',
              end_time: '',
              start_time: '',
            });
          } else {
            return null;
          }
        }

        const conflicting_events = this.intervs_details_map
          .get(attendee.user_id)
          .cal_date_events[curr_day_str].filter((cal_event) => {
            if (
              cal_event.cal_type === 'recruiting_blocks' &&
              this.api_options.use_recruiting_blocks
            ) {
              return false;
            }

            if (
              cal_event.cal_type === 'free_time' &&
              this.api_options.include_free_time
            ) {
              return false;
            }
            return isTimeChunksOverLapps(
              {
                startTime: this.getTimeInCandTimeZone(cal_event.start.dateTime),
                endTime: this.getTimeInCandTimeZone(cal_event.end.dateTime),
              },
              {
                startTime: this.getTimeInCandTimeZone(upd_sess_slot.start_time),
                endTime: this.getTimeInCandTimeZone(upd_sess_slot.end_time),
              },
            );
          });
        //conflicting events
        for (let conf_event of conflicting_events) {
          const ev_type = conf_event.cal_type;
          if (
            ev_type === 'soft' &&
            !this.api_options.include_conflicting_slots.show_soft_conflicts
          ) {
            return null;
          }
          if (
            ev_type === 'cal_event' &&
            !this.api_options.include_conflicting_slots.show_conflicts_events
          ) {
            return null;
          }
          if (
            ev_type === 'ooo' &&
            !this.api_options.include_conflicting_slots.out_of_office
          ) {
            return null;
          }
          int_conflic_reasons.push({
            conflict_type: ev_type,
            conflict_event: conf_event.summary,
            end_time: conf_event.end.dateTime,
            start_time: conf_event.start.dateTime,
          });
        }

        if (int_conflic_reasons.length > 0) {
          upd_sess_slot.ints_conflicts.push({
            interviewer: {
              user_id: attendee.user_id,
            },
            conflict_reasons: [...int_conflic_reasons],
          });
        }
      }

      const curr_time = ScheduleUtils.getNearestCurrTime(
        this.db_details.req_user_tz,
      );
      if (
        curr_time.isSameOrAfter(
          userTzDayjs(upd_sess_slot.start_time).tz(this.db_details.req_user_tz),
          'day',
        )
      ) {
        upd_sess_slot.conflict_types.push('day_passed');
      }
      const unique_conflicts = new Set<ConflictReason['conflict_type']>();
      upd_sess_slot.ints_conflicts.forEach((int) => {
        for (let intr of int.conflict_reasons) {
          unique_conflicts.add(intr.conflict_type);
        }
      });
      upd_sess_slot.is_conflict = upd_sess_slot.ints_conflicts.length > 0;
      upd_sess_slot.conflict_types = [...Array.from(unique_conflicts)];

      return upd_sess_slot;
    };

    // this is recursion function
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

      let session_slot: SessionCombinationRespType = {
        ...curr_session,
        start_time: curr_sess_start_time.format(),
        end_time: curr_sess_end_time.format(),
        ints_conflicts: [],
        is_conflict: false,
        conflict_types: [],
      };

      let slot_with_conflicts = verifyForConflicts(session_slot, session_idx);
      if (!slot_with_conflicts) {
        return [];
      } else {
        session_slot = {
          ...slot_with_conflicts,
        };
      }

      if (session_idx + 1 === plan_comb.length) {
        return [{ ...session_slot }];
      }
      const upcoming_sessn_slots = getSessionsAvailability(
        session_idx + 1,
        curr_sess_end_time.add(curr_session.break_duration).format(),
      );
      if (upcoming_sessn_slots.length === 0) {
        return [];
      } else {
        return [session_slot, ...upcoming_sessn_slots];
      }
    };

    const slotDayConflictsReasons = () => {
      const zerodaySlotsReasons: PlanCombinationRespType = {
        no_slot_reasons: [],
        plan_comb_id: nanoid(),
        sessions: [],
      };
      const ints_reasons: Record<
        string,
        { type: ConflictReason['conflict_type']; str_reason: string }[]
      > = {};
      if (!this.api_options.include_conflicting_slots.calender_not_connected) {
        cal_disc_inters.forEach((s) => {
          s.inters.forEach((inter) => {
            if (!ints_reasons[inter.user_id]) {
              ints_reasons[inter.user_id] = [];
            }
            ints_reasons[inter.user_id].push({
              type: 'calender_diconnected',
              str_reason: `${getFullName(inter.first_name, inter.last_name)} calender not connected`,
            });
          });
        });
      }

      if (!this.api_options.include_conflicting_slots.holiday) {
        holiday_ints.forEach((s) => {
          s.inters.forEach((inter) => {
            if (!ints_reasons[inter.user_id]) {
              ints_reasons[inter.user_id] = [];
            }
            ints_reasons[inter.user_id].push({
              type: 'holiday',
              str_reason: `${getFullName(inter.first_name, inter.last_name)} is on holiday`,
            });
          });
        });
      }
      if (!this.api_options.include_conflicting_slots.day_off) {
        day_off_ints.forEach((s) => {
          s.inters.forEach((inter) => {
            if (!ints_reasons[inter.user_id]) {
              ints_reasons[inter.user_id] = [];
            }
            ints_reasons[inter.user_id].push({
              type: 'day_off',
              str_reason: `${getFullName(inter.first_name, inter.last_name)} is on Day off`,
            });
          });
        });
      }
      if (!this.api_options.include_conflicting_slots.interviewer_pause) {
        curr_day_paused_inters.forEach((s) => {
          s.inters.forEach((inter) => {
            if (!ints_reasons[inter.user_id]) {
              ints_reasons[inter.user_id] = [];
            }
            ints_reasons[inter.user_id].push({
              type: 'interviewer_paused',
              str_reason: `${getFullName(inter.first_name, inter.last_name)} is paused`,
            });
          });
        });

        indef_paused_inters.forEach((s) => {
          s.inters.forEach((inter) => {
            if (!ints_reasons[inter.user_id]) {
              ints_reasons[inter.user_id] = [];
            }
            ints_reasons[inter.user_id].push({
              type: 'interviewer_paused',
              str_reason: `${getFullName(inter.first_name, inter.last_name)} is paused indefinetly`,
            });
          });
        });
      }
      if (!this.api_options.include_conflicting_slots.interviewers_load) {
        load_reached_ints.forEach((s) => {
          s.inters.forEach((inter) => {
            if (!ints_reasons[inter.user_id]) {
              ints_reasons[inter.user_id] = [];
            }
            ints_reasons[inter.user_id].push({
              type: inter.type,
              str_reason: `${getFullName(inter.first_name, inter.last_name)}'s ${inter.type === 'day_load_reached' ? 'day' : 'week'} load reached`,
            });
          });
        });
      }

      for (let v of Object.values(ints_reasons)) {
        let p1_conflict = v.find((c) => c.type == 'calender_diconnected');
        const p2_conflict = v.find(
          (c) => c.type == 'day_off' || c.type === 'holiday',
        );
        const p3_conflict = v.find(
          (c) =>
            c.type == 'interviewer_paused' ||
            c.type === 'day_load_reached' ||
            c.type === 'week_load_reached',
        );
        if (p1_conflict) {
          zerodaySlotsReasons.no_slot_reasons.push({
            reason: p1_conflict.str_reason,
          });
        } else if (p2_conflict) {
          zerodaySlotsReasons.no_slot_reasons.push({
            reason: p2_conflict.str_reason,
          });
        } else if (p3_conflict) {
          zerodaySlotsReasons.no_slot_reasons.push({
            reason: p3_conflict.str_reason,
          });
        }
      }
      return zerodaySlotsReasons;
    };

    const generateSlotsForCurrDay = (): PlanCombinationRespType[] => {
      const dayConflictsReasons = slotDayConflictsReasons();
      if (dayConflictsReasons.no_slot_reasons.length > 0) {
        return this.api_options.return_empty_slots_err
          ? [dayConflictsReasons]
          : [];
      }
      const schedule_combs: PlanCombinationRespType[] = [];

      const curr_time = ScheduleUtils.getNearestCurrTime(
        this.db_details.req_user_tz,
      );
      const cand_start_time = curr_day_js.set(
        'hours',
        this.api_options.cand_start_time,
      );
      const cand_end_time = curr_day_js.set(
        'hours',
        this.api_options.cand_end_time,
      );
      // TODO: flag
      let cand_time = cand_start_time;
      if (
        !this.api_options.include_conflicting_slots.day_passed &&
        curr_time.isAfter(cand_time, 'day')
      ) {
        return [];
      }
      if (
        !this.api_options.include_conflicting_slots.day_passed &&
        curr_time.isSame(cand_time, 'day')
      ) {
        cand_time = curr_time;
      }

      while (cand_time.isBefore(cand_end_time, 'minutes')) {
        const slot_comb = getSessionsAvailability(0, cand_time.format());
        if (slot_comb.length > 0) {
          schedule_combs.push({
            plan_comb_id: nanoid(),
            sessions: [...slot_comb],
            no_slot_reasons: [],
          });
        }
        cand_time = cand_time.add(
          this.api_options.check_next_minutes,
          'minutes',
        );
      }

      return schedule_combs;
    };

    const verifyCurrDaySlot = (slot: SessionCombinationRespType[]) => {
      const slot_start_time = userTzDayjs(slot[0].start_time).tz(
        this.db_details.req_user_tz,
      );
      const slot_comb_conflicts = getSessionsAvailability(
        0,
        slot_start_time.format(),
      );
      let are_conflict_same = true;
      if (slot_comb_conflicts.length === 0) {
        return false;
      }
      for (let sesn_idx = 0; sesn_idx < slot.length; ++sesn_idx) {
        if (
          !isEqual(
            slot_comb_conflicts[sesn_idx].ints_conflicts,
            slot[sesn_idx].ints_conflicts,
          )
        ) {
          are_conflict_same = false;
          break;
        }
      }
      return are_conflict_same;
    };
    return { generateSlotsForCurrDay, verifyCurrDaySlot };
  };
}
