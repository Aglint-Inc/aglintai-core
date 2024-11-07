/* eslint-disable security/detect-object-injection */
import {
  type APIOptions,
  type APIRespFindReplaceMentInts,
  type CandReqSlotsType,
  type ConflictReason,
  type CurrRoundCandidateAvailReq,
  type DatabaseTable,
  type DateRangePlansType,
  type InterviewSessionApiRespType,
  type PlanCombinationRespType,
  type SessionCombinationRespType,
  type SessionsCombType,
} from '@aglint/shared-types';
import {
  CApiError,
  dayjsLocal,
  getFullName,
  ScheduleUtils,
  scheduling_options_schema,
  SINGLE_DAY_TIME,
} from '@aglint/shared-utils';
import { type Dayjs } from 'dayjs';
import { isEqual } from 'lodash';
import { v4 } from 'uuid';
import { type z } from 'zod';

import {
  type DbFetchScheduleApiDetailsParams,
  type IntervsWorkHrsEventMapType,
  type IntervsWorkHrsEventType,
  type ScheduleApiDetails,
} from './types';
import {
  cacheCurrPlanCalc,
  type InterviewSessionApiRespTypeFullInts,
} from './utils/cacheCurrPlanCalc';
import { calcEachIntsAPIDetails } from './utils/calcEachIntsAPIDetails';
import { dbFetchScheduleApiDetails } from './utils/dbFetchScheduleApiDetails';
import { fetchIntsCalEventsDetails } from './utils/fetchIntsCalEventsDetails';
import { calcIntsCombsForEachSessionRound } from './utils/interviewersCombsForSession';
import { planCombineSlots } from './utils/planCombine';
import {
  getSlotAtttendeeConflicts,
  slotInterviewerConflicts,
} from './utils/slotInterviewerConflicts';

export class CandidatesScheduling {
  public db_details: ScheduleApiDetails | null;
  public api_options: APIOptions;
  public intervs_details_map: IntervsWorkHrsEventMapType;
  public calendar_events:
    | Awaited<ReturnType<typeof fetchIntsCalEventsDetails>>['ints_events_map']
    | null;

  constructor(_api_options: z.input<typeof scheduling_options_schema>) {
    this.db_details = null;
    this.calendar_events = null;
    // scheduling_options_schema;
    const parsed_api_options = scheduling_options_schema.parse({
      ...(_api_options ?? {}),
      include_conflicting_slots: {
        ...(_api_options?.include_conflicting_slots ?? {}),
      },
    });
    if (!parsed_api_options) {
      throw new CApiError('CLIENT', 'invalid api options');
    }
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

  public setCalenderEvents(
    _calender_events: Awaited<
      ReturnType<typeof fetchIntsCalEventsDetails>
    >['ints_events_map'],
  ) {
    this.calendar_events = { ..._calender_events };
  }

  //NOTE: publicly exposed apis
  /**
   * find calender events for each interviewer
   */
  public async fetchDetails(params: DbFetchScheduleApiDetailsParams) {
    const db_details = await dbFetchScheduleApiDetails(params);
    const int_with_events = await fetchIntsCalEventsDetails(db_details);

    this.setCalenderEvents(Object.assign({}, int_with_events.ints_events_map));

    const inter_details = calcEachIntsAPIDetails(
      int_with_events.ints_cal_details,
      this.api_options,
      db_details,
    );
    const intervs_map: IntervsWorkHrsEventMapType = new Map();
    for (const inter of inter_details) {
      const details: IntervsWorkHrsEventType = {
        email: inter.email,
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
    if (!this.db_details) {
      throw new CApiError('SERVER_ERROR', 'DB details not set');
    }
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
        const cand_date = dayjsLocal(curr_round_sess[0].start_time)
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
    if (!this.db_details) {
      throw new CApiError('SERVER_ERROR', 'DB details not set');
    }
    if (!cand_selected_slots) {
      throw new CApiError('CLIENT', 'Invalid selected');
    }
    const session_rounds = this.getSessionRounds();
    const ints_combs_for_each_round = calcIntsCombsForEachSessionRound(
      session_rounds,
      this.api_options.make_training_optional,
    );
    const all_combs: CandReqSlotsType[] = [];
    for (
      let curr_round_idx = 0;
      curr_round_idx < session_rounds.length;
      ++curr_round_idx
    ) {
      const current_round_int_combs = ints_combs_for_each_round[curr_round_idx];
      const current_round_combs: DateRangePlansType['interview_rounds'] = [];
      for (const curr_date_slots of cand_selected_slots[curr_round_idx].dates) {
        const cand_date = dayjsLocal(curr_date_slots.curr_day).tz(
          this.db_details.req_user_tz,
        );

        const curr_day_slots = this.findFixedBreakSessionCombs(
          current_round_int_combs,
          cand_date,
        );
        const curr_day_combs: PlanCombinationRespType[] = [];
        curr_date_slots.slots.forEach((slot_time) => {
          const comb = curr_day_slots.find(
            (c) =>
              c.no_slot_reasons.length === 0 &&
              c.sessions[0].start_time === slot_time.startTime,
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
    if (!this.db_details) {
      throw new CApiError('SERVER_ERROR', 'DB details not set');
    }
    this.db_details.ses_with_ints = this.db_details.ses_with_ints.map((s) => ({
      ...s,
      trainingIntervs: [],
    }));
    this.db_details.all_inters = this.db_details.all_inters.filter(
      (i) => i.interviewer_type !== 'training',
    );
  }

  // single round slots with suggesting slots
  public candavailabilityWithSuggestion() {
    if (!this.db_details) {
      throw new CApiError('SERVER_ERROR', 'DB details not set');
    }
    const session_rounds = this.getSessionRounds();
    const first_round_sessions = session_rounds[0];
    const ints_combs_for_each_round = calcIntsCombsForEachSessionRound(
      session_rounds,
      this.api_options.make_training_optional,
    );
    const dayjs_start_date = this.db_details.schedule_dates.user_start_date_js;
    const dayjs_end_date = this.db_details.schedule_dates.user_end_date_js;

    const getCurrDaySlots = (
      curr_day: Dayjs,
      curr_round_duration: number,
    ): CurrRoundCandidateAvailReq['slots'] => {
      if (!this.db_details) {
        throw new CApiError('SERVER_ERROR', 'DB details not set');
      }
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
    if (!this.db_details) {
      throw new CApiError('SERVER_ERROR', 'DB details not set');
    }
    let session_rounds: InterviewSessionApiRespType[][] = [[]];
    let curr_round = 0;
    for (const sess of this.db_details.ses_with_ints) {
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
      session_idx: number,
    ) => {
      if (session_idx === interviewrs_sesn_comb.length) {
        const combs = this.calcMeetingCombinsForPlan(
          curr_day,
          current_comb,
        ).generateSlotsForCurrDay();
        all_schedule_combs = [...all_schedule_combs, ...combs];
        return;
      }
      for (const module_comb of interviewrs_sesn_comb[Number(session_idx)]) {
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
        plan_comb_id: v4(),
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
            dayjsLocal(slot1.sessions[0].start_time).unix() -
            dayjsLocal(slot2.sessions[0].start_time).unix()
          );
        });
    }
  };

  private findMultiDaySlots = () => {
    const session_rounds = this.getSessionRounds();
    const ints_combs_for_each_round = calcIntsCombsForEachSessionRound(
      session_rounds,
      this.api_options.make_training_optional,
    );
    const findMultiDaySlotsUtil = (
      final_combs: DateRangePlansType['interview_rounds'],
      curr_date: Dayjs,
      curr_round_idx: number,
    ): DateRangePlansType['interview_rounds'] => {
      if (!this.db_details) {
        throw new CApiError('SERVER_ERROR', 'DB details not set');
      }
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
      if (!this.db_details) {
        throw new CApiError('SERVER_ERROR', 'DB details not set');
      }
      const current_day = this.db_details.schedule_dates.user_start_date_js;
      const plan_combs = findMultiDaySlotsUtil([], current_day, 0);

      return plan_combs;
    };

    const findAllDayPlans = () => {
      if (!this.db_details) {
        throw new CApiError('SERVER_ERROR', 'DB details not set');
      }
      const dayjs_start_date =
        this.db_details.schedule_dates.user_start_date_js;
      const dayjs_end_date = this.db_details.schedule_dates.user_end_date_js;

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
      if (!this.db_details) {
        throw new CApiError('SERVER_ERROR', 'DB details not set');
      }
      const dayjs_start_date =
        this.db_details.schedule_dates.user_start_date_js;
      const dayjs_end_date = this.db_details.schedule_dates.user_end_date_js;

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

  public getTimeInCandTimeZone = (time: string | Dayjs) => {
    if (!this.db_details) {
      throw new CApiError('SERVER_ERROR', 'DB details not set');
    }
    return dayjsLocal(time).tz(this.db_details.req_user_tz);
  };
  public getTimeIntTimeZone = (
    time_str: string,
    session_id: string,
    interview_id: string,
  ) => {
    if (!this.db_details) {
      throw new CApiError('SERVER_ERROR', 'DB details not set');
    }
    return dayjsLocal(time_str).tz(
      this.db_details.all_session_int_details[session_id].interviewers[
        interview_id
      ].scheduling_settings.timeZone.tzCode,
    );
  };
  public getIntPauseJson(session_id: string, user_id: string) {
    if (!this.db_details) {
      throw new CApiError('SERVER_ERROR', 'DB details not set');
    }
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
    if (!this.db_details) {
      throw new CApiError('SERVER_ERROR', 'DB details not set');
    }
    if (!this.intervs_details_map) {
      throw new CApiError('SERVER_ERROR', 'Interviewer details not set');
    }
    const curr_day_str = curr_day_js.startOf('day').format();

    const ints_calc_cache = cacheCurrPlanCalc({
      cand_schedule: this,
      curr_day_str,
      curr_day_js,
      plan_comb: plan_comb.map((s) => ({
        ...s,
        all_qualified_ints: s.qualifiedIntervs,
        all_training_ints: s.trainingIntervs,
      })),
    });
    const {
      cal_disc_inters,
      curr_day_paused_inters,
      indef_paused_inters,
      load_reached_ints,
      day_off_ints,
      holiday_ints,
    } = ints_calc_cache;

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

    // this is recursion function
    const getSessionsAvailability = (
      session_idx: number,
      session_start_time: string,
    ): SessionCombinationRespType[] => {
      const curr_session = plan_comb[session_idx];
      let curr_sess_start_time = this.getTimeInCandTimeZone(session_start_time);
      let curr_sess_end_time = this.getTimeInCandTimeZone(
        session_start_time,
      ).add(curr_session.duration, 'minutes');

      //
      if (session_idx > 0 && plan_comb[session_idx - 1].break_duration > 0) {
        curr_sess_start_time = curr_sess_start_time.add(
          plan_comb[session_idx - 1].break_duration,
          'minutes',
        );
        curr_sess_end_time = curr_sess_end_time.add(
          plan_comb[session_idx - 1].break_duration,
          'minutes',
        );
      }

      let session_slot: SessionCombinationRespType = {
        ...curr_session,
        start_time: curr_sess_start_time.format(),
        end_time: curr_sess_end_time.format(),
        ints_conflicts: [],
        is_conflict: false,
        conflict_types: [],
      };

      const slot_with_conflicts = slotInterviewerConflicts({
        sessn_idx: session_idx,
        cand_schedule: this,
        ints_calc_cache,
        curr_day_str,
        sesn_slot: session_slot,
      });
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
        plan_comb_id: v4(),
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

      for (const v of Object.values(ints_reasons)) {
        const p1_conflict = v.find((c) => c.type == 'calender_diconnected');
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
      if (!this.db_details) {
        throw new CApiError('SERVER_ERROR', 'DB details not set');
      }
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
            plan_comb_id: v4(),
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
      if (!this.db_details) {
        throw new CApiError('SERVER_ERROR', 'DB details not set');
      }
      const slot_start_time = dayjsLocal(slot[0].start_time).tz(
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

  public findSlotAlternativeInts = ({
    curr_day_js,
    declined_int_user_id,
    slot_details,
    curr_day_str,
    confirmed_int_user_ids,
  }: {
    declined_int_user_id: string;
    slot_details: {
      start_time: string;
      end_time: string;
    };
    curr_day_js: Dayjs;
    curr_day_str: string;
    confirmed_int_user_ids: string[];
  }) => {
    if (!this.db_details) {
      throw new CApiError('SERVER_ERROR', 'DB details not set');
    }
    const session_info = this.db_details.ses_with_ints[0];
    const slot_detail: InterviewSessionApiRespTypeFullInts = {
      ...session_info,
      all_training_ints: session_info.trainingIntervs,
      all_qualified_ints: this.db_details.all_inters.filter(
        (int) =>
          !confirmed_int_user_ids.includes(int.user_id) &&
          int.interviewer_type == 'qualified',
      ),
    };
    const ints_calc_cache = cacheCurrPlanCalc({
      cand_schedule: this,
      plan_comb: [{ ...slot_detail }],
      curr_day_str: curr_day_str,
      curr_day_js: curr_day_js,
    });
    const attendees = this.db_details.all_inters.filter(
      (int) =>
        int.session_id === session_info.session_id &&
        int.user_id !== declined_int_user_id,
    );
    const attendees_conflicts: APIRespFindReplaceMentInts = [];
    for (const attendee of attendees) {
      const attendeesConflicts = getSlotAtttendeeConflicts({
        sessn_idx: 0,
        cand_schedule: this,
        ints_calc_cache,
        curr_day_str,
        sesn_slot: {
          start_time: slot_details.start_time,
          end_time: slot_details.end_time,
          session_id: session_info.session_id,
        },
        attendee: attendee,
      });
      if (!attendeesConflicts) {
        throw new CApiError(
          'SERVER_ERROR',
          'Error in getting attendees conflicts',
        );
      }
      attendees_conflicts.push({
        replacement_int: attendee,
        conflicts: attendeesConflicts,
      });
    }
    return attendees_conflicts;
  };
}
