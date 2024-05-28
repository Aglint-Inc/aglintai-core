/* eslint-disable security/detect-object-injection */
import {
  APIFindAvailability,
  APIOptions,
  ConflictReason,
  InterviewSessionApiRespType,
  MinCalEventDetailTypes,
  PauseJson,
  PlanCombinationRespType,
  schedulingSettingType,
  SessionCombinationRespType,
  SessionInterviewerApiRespType,
  SessionsCombType,
  SessionSlotType,
  TimeDurationDayjsType,
  TimeDurationType,
} from '@aglint/shared-types';
import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import { Dayjs } from 'dayjs';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import { schema_find_availability_payload } from '@/src/types/scheduling/schema_find_availability_payload';

import { findCommonTimeRangeUtil } from './commonTimeRanges';
import { findEachInterviewerFreeTimes } from './findEachInterFreeTime';
import { calcInterversCombsForSesson } from './interviewersCombsForSession';
import { ScheduleUtils } from './ScheduleUtils';
import {
  DBDetailsType,
  FuncParams,
  IntervsWorkHrsEventMapType,
  IntervsWorkHrsEventType,
  SlotIntDetails,
} from './types';
import { fetch_details_from_db } from './utils/fetch_details_from_db';
import { fetchIntsCalEventsDetails } from './utils/fetchIntsCalEventsDetails';
import {
  isTimeChunksEnclosed,
  isTimeChunksOverLapps,
} from './utils/time_range_utils';
import { userTzDayjs } from './utils/userTzDayjs';

export class CandidatesSchedulingV2 {
  public db_details: DBDetailsType;
  private api_options: APIOptions;
  private api_payload: Omit<APIFindAvailability, 'options'>;
  public intervs_details_map: IntervsWorkHrsEventMapType;
  private schedule_dates: {
    user_start_date_js: Dayjs;
    user_end_date_js: Dayjs;
  };

  constructor(
    _api_payload: Omit<APIFindAvailability, 'options'>,
    _api_options: z.infer<typeof schema_find_availability_payload>['options'],
  ) {
    this.api_payload = {
      candidate_tz: _api_payload.candidate_tz,
      end_date_str: _api_payload.end_date_str,
      recruiter_id: _api_payload.recruiter_id,
      session_ids: _api_payload.session_ids,
      start_date_str: _api_payload.start_date_str,
    };
    this.schedule_dates = {
      user_start_date_js: ScheduleUtils.convertDateFormatToDayjs(
        _api_payload.start_date_str,
        _api_payload.candidate_tz,
        true,
      ),
      user_end_date_js: ScheduleUtils.convertDateFormatToDayjs(
        _api_payload.end_date_str,
        _api_payload.candidate_tz,
        false,
      ),
    };
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
        override_work_hr_start:
          _api_options.include_conflicting_slots.override_work_hr_start,
        override_work_hr_end:
          _api_options.include_conflicting_slots.override_work_hr_end,
        show_conflicts_events:
          _api_options.include_conflicting_slots.show_conflicts_events,
        show_soft_conflicts:
          _api_options.include_conflicting_slots.show_soft_conflicts,
      },
    };
    this.intervs_details_map = new Map();
  }

  // getters and setters
  public setSchedulingDates(_start_date_js: Dayjs, _end_date_js: Dayjs) {
    this.schedule_dates = {
      user_start_date_js: _start_date_js.tz(),
      user_end_date_js: _end_date_js,
    };
  }

  //NOTE: publicly exposed apis
  /**
   * fetches necessay details from supabse db for finding the slots
   */
  public async fetchDetails() {
    const meeting_date = {
      start: null,
      end: null,
    };
    // for per week load balancer
    if (this.schedule_dates) {
      const meet_start_date = this.schedule_dates.user_start_date_js.subtract(
        7,
        'day',
      );
      meeting_date.start = meet_start_date.format();
      const meet_end_date = this.schedule_dates.user_end_date_js.add(7, 'day');
      meeting_date.end = meet_end_date.format();
    }
    const db_data = await fetch_details_from_db(
      this.api_payload.session_ids,
      this.api_payload.recruiter_id,
      {
        start: meeting_date.start,
        end: meeting_date.end,
      },
    );
    this.db_details = {
      all_inters: db_data.all_inters,
      comp_schedule_setting: db_data.comp_schedule_setting,
      company_cred: db_data.company_cred,
      ses_with_ints: db_data.api_sess_ints,
      int_meetings: db_data.int_meetings,
      ints_schd_meetings: db_data.ints_schd_meetings,
      all_session_int_details: db_data.all_session_int_details,
    };
  }

  /**
   * find calender events for each interviewer
   */
  public async fetchIntsEventsFreeTimeWorkHrs() {
    const int_with_events = await fetchIntsCalEventsDetails(
      this.db_details.all_inters,
      this.db_details.company_cred,
      this.schedule_dates.user_start_date_js.format(),
      this.schedule_dates.user_end_date_js.format(),
    );

    const inter_details = findEachInterviewerFreeTimes(
      int_with_events,
      this.api_payload,
      this.api_options,
      this.db_details,
      this.schedule_dates.user_start_date_js.format(),
      this.schedule_dates.user_end_date_js.format(),
    );

    for (let inter of inter_details) {
      const details: IntervsWorkHrsEventType = {
        email: inter.email,
        events: inter.events,
        freeTimes: inter.freeTimes,
        work_hours: inter.work_hours,
        isCalenderConnected: inter.isCalenderConnected,
      };
      this.intervs_details_map.set(inter.interviewer_id, details);
    }
  }

  // find slots for the day
  public findCandSlotForTheDay() {
    const { findCurrentDayPlan } = this.findMultiDaySlots();
    return findCurrentDayPlan();
  }

  // find slots for the date range
  public findCandSlotsForDateRange() {
    const { findAllDayPlans } = this.findMultiDaySlots();
    return findAllDayPlans();
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
    interview_sessions: InterviewSessionApiRespType[],
    currDay: Dayjs,
  ) => {
    const cached_free_time = new Map<string, TimeDurationType[]>();
    let all_schedule_combs: PlanCombinationRespType[] = [];

    const interviewrs_sesn_comb = calcInterversCombsForSesson(
      interview_sessions,
      this.api_options.make_training_optional,
    );
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
      const all_slot_inters: (SessionInterviewerApiRespType & {
        session_id: string;
      })[] = plan_comb.reduce(
        (curr_ints, sess) => [
          ...curr_ints,
          ...sess.qualifiedIntervs.map((i) => ({
            ...i,
            session_id: sess.session_id,
          })),
          ...sess.trainingIntervs.map((i) => ({
            ...i,
            session_id: sess.session_id,
          })),
        ],
        [],
      );

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
            time_ranges: [],
            interviewer_pause: this.db_details.all_session_int_details[
              curr_session.session_id
            ].interviewers[s.user_id].pause_json as PauseJson,
          })),
        );
        cached_free_time.set(map_key.join('_'), common_time_range);
        return common_time_range;
      };

      const isAnySessIntsCalDisConnected = () => {
        return all_slot_inters.some((int) => {
          const isCalenderConnected = this.intervs_details_map.get(
            int.user_id,
          ).isCalenderConnected;
          return !isCalenderConnected;
        });
      };
      const isAnySessIntsPausedManually = () => {
        for (const int of all_slot_inters) {
          const int_pause =
            this.db_details.all_session_int_details[int.session_id]
              .interviewers[int.user_id].pause_json;
          if (int_pause && int_pause.isManual) {
            return true;
          }
        }
        return false;
      };
      const getAllSlotInters = () => {
        let ints: SlotIntDetails[] = [];
        plan_comb.forEach((session_slot) => {
          const sess_ints = [
            ...session_slot.qualifiedIntervs,
            ...session_slot.trainingIntervs,
          ];
          const curr_sess_int_details = sess_ints.map((int) => {
            let int_tz =
              this.db_details.all_session_int_details[session_slot.session_id]
                .interviewers[int.user_id].scheduling_settings.timeZone.tzCode;
            let int_detail: SlotIntDetails = {
              ...int,
              session_id: session_slot.session_id,
              curr_day_work_hrs: this.intervs_details_map
                .get(int.user_id)
                .work_hours.find((work_day) =>
                  userTzDayjs(work_day.curr_date)
                    .tz(int_tz)
                    .isSame(currDay, 'day'),
                ).work_hrs,
            };
            return int_detail;
          });
          ints = [...ints, ...curr_sess_int_details];
        });
        return ints;
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
          cal_event: MinCalEventDetailTypes,
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

          const int_with_events = this.intervs_details_map.get(
            attendee.user_id,
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
        common_work_hrs_dayjs: TimeDurationDayjsType[],
      ): SessionCombinationRespType[] => {
        const curr_session = plan_comb[session_idx];
        const curr_sess_start_time =
          this.getTimeInCandTimeZone(session_start_time);

        const curr_sess_end_time = this.getTimeInCandTimeZone(
          session_start_time,
        ).add(curr_session.duration, 'minutes');

        const is_sesn_time_availble = common_work_hrs_dayjs.some((t) =>
          isTimeChunksEnclosed(t, {
            startTime: curr_sess_start_time,
            endTime: curr_sess_end_time,
          }),
        );
        if (!is_sesn_time_availble) {
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
          return [{ ...session_slot }];
        }
        const upcoming_sessn_slots = getSessionsAvailability(
          session_idx + 1,
          curr_sess_end_time.add(curr_session.break_duration).format(),
          common_work_hrs_dayjs,
        );

        return [session_slot, ...upcoming_sessn_slots];
      };

      const getCommonIntsWorkHrs = (all_int_work_hrs: SlotIntDetails[]) => {
        const common_work_hrs = findCommonTimeRangeUtil(
          all_int_work_hrs.map((i) => ({
            inter_id: i.user_id,
            time_ranges: i.curr_day_work_hrs,
          })),
          this.api_payload.candidate_tz,
        );
        const common_work_hrs_dayjs: TimeDurationDayjsType[] =
          common_work_hrs.map((t) => ({
            startTime: userTzDayjs(t.startTime).tz(
              this.api_payload.candidate_tz,
            ),
            endTime: userTzDayjs(t.endTime).tz(this.api_payload.candidate_tz),
          }));
        return common_work_hrs_dayjs;
      };

      if (
        !this.api_options.include_conflicting_slots.calender_not_connected &&
        isAnySessIntsCalDisConnected()
      )
        return [];
      if (
        !this.api_options.include_conflicting_slots.interviewer_pause &&
        isAnySessIntsPausedManually()
      ) {
        return [];
      }

      let all_int_work_hrs: SlotIntDetails[] = getAllSlotInters();
      let common_work_hrs_dayjs = getCommonIntsWorkHrs(all_int_work_hrs);

      for (let work_hour_duration of common_work_hrs_dayjs) {
        let curr_start_time = userTzDayjs(work_hour_duration.startTime).tz(
          this.api_payload.candidate_tz,
        );
        let curr_end_time = userTzDayjs(work_hour_duration.endTime).tz(
          this.api_payload.candidate_tz,
        );

        while (curr_start_time.isSameOrBefore(curr_end_time, 'minutes')) {
          const slot_comb = getSessionsAvailability(
            0,
            curr_start_time.format(),
            common_work_hrs_dayjs,
          );
          if (slot_comb.length > 0) {
            schedule_combs.push({
              plan_comb_id: nanoid(),
              sessions: [...slot_comb],
            });
          }
          curr_start_time = curr_start_time.add(
            this.api_options.check_next_minutes,
            'minutes',
          );
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

      let combs: PlanCombinationRespType[] = [];
      while (
        combs.length === 0 &&
        curr_date.isSameOrBefore(this.schedule_dates.user_end_date_js, 'day')
      ) {
        combs = this.findFixedBreakSessionCombs(
          cloneDeep(session_rounds[curr_day_idx]),
          curr_date,
        );
        if (combs.length === 0) {
          curr_date = curr_date.add(1, 'day');
        }
      }
      if (combs.length === 0) {
        return [];
      }

      final_combs.push([...cloneDeep(combs)]);

      const days_gap = Math.floor(
        session_rounds[curr_day_idx][session_rounds[curr_day_idx].length - 1]
          .break_duration / SINGLE_DAY_TIME,
      );

      const next_day = curr_date.add(days_gap, 'day');
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
        curr_date = curr_date.add(1, 'day');
      }
      return all_combs;
    };

    return { findCurrentDayPlan, findAllDayPlans };
  };

  /**
   * @param sessions interview session full details
   * @returns all combination of session with all possible interviewers
   */

  private findCommonTimeRange = (
    ints_meta: FuncParams[],
  ): TimeDurationType[] => {
    const common_time_range = findCommonTimeRangeUtil(
      ints_meta,
      this.api_payload.candidate_tz,
    );

    return common_time_range;
  };
  private getTimeInCandTimeZone = (time: string | Dayjs) => {
    return userTzDayjs(time).tz(this.api_payload.candidate_tz);
  };
}
