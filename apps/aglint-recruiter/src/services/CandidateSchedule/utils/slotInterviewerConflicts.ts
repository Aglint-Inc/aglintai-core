import {
  type ConflictReason,
  type SessionCombinationRespType,
  type SessionInterviewerApiRespType,
} from '@aglint/shared-types';
import { CApiError, dayjsLocal, ScheduleUtils } from '@aglint/shared-utils';

import { type CandidatesScheduling } from '../CandidatesScheduling';
import { type cacheCurrPlanCalc } from './cacheCurrPlanCalc';
import {
  convertTimeDurStrToDayjsChunk,
  isTimeChunksEnclosed,
  isTimeChunksOverLapps,
} from './time_range_utils';

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
export const slotInterviewerConflicts = ({
  sessn_idx,
  cand_schedule,
  ints_calc_cache,
  curr_day_str,
  sesn_slot,
}: {
  sessn_idx: number;
  cand_schedule: CandidatesScheduling;
  ints_calc_cache: ReturnType<typeof cacheCurrPlanCalc>;
  curr_day_str: string;
  sesn_slot: SessionCombinationRespType;
}) => {
  if (!cand_schedule.db_details) {
    throw new CApiError('SERVER_ERROR', 'DB details not set');
  }
  const { slot_day_load_density, slot_week_load_density } = ints_calc_cache;

  const upd_sess_slot: SessionCombinationRespType = { ...sesn_slot };

  // const curr_sess_common_time = session_ints_common_time[sessn_idx];
  upd_sess_slot.day_load_den = slot_day_load_density;
  upd_sess_slot.week_load_den = slot_week_load_density;
  const session_attendees: SessionInterviewerApiRespType[] = [
    ...upd_sess_slot.qualifiedIntervs,
    ...upd_sess_slot.trainingIntervs,
  ];

  for (const attendee of session_attendees) {
    const int_conflic_reasons = getSlotAtttendeeConflicts({
      sessn_idx,
      cand_schedule,
      ints_calc_cache,
      curr_day_str,
      sesn_slot,
      attendee,
    });
    if (!int_conflic_reasons) {
      return null;
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
    cand_schedule.db_details.req_user_tz,
  );
  if (
    curr_time.isSameOrAfter(
      dayjsLocal(upd_sess_slot.start_time).tz(
        cand_schedule.db_details.req_user_tz,
      ),
      'day',
    )
  ) {
    upd_sess_slot.conflict_types.push('day_passed');
  }
  const unique_conflicts = new Set<ConflictReason['conflict_type']>();
  upd_sess_slot.ints_conflicts.forEach((int) => {
    for (const intr of int.conflict_reasons) {
      unique_conflicts.add(intr.conflict_type);
    }
  });
  upd_sess_slot.is_conflict = upd_sess_slot.ints_conflicts.length > 0;
  upd_sess_slot.conflict_types = [...Array.from(unique_conflicts)];

  return upd_sess_slot;
};

export const getSlotAtttendeeConflicts = ({
  sessn_idx,
  cand_schedule,
  ints_calc_cache,
  curr_day_str,
  sesn_slot,
  attendee,
}: {
  sessn_idx: number;
  cand_schedule: CandidatesScheduling;
  ints_calc_cache: ReturnType<typeof cacheCurrPlanCalc>;
  curr_day_str: string;
  sesn_slot: Pick<
    SessionCombinationRespType,
    'start_time' | 'end_time' | 'session_id'
  >;
  attendee: SessionInterviewerApiRespType;
}) => {
  if (!cand_schedule.db_details) {
    throw new CApiError('SERVER_ERROR', 'missing db details');
  }
  const attendee_details = cand_schedule.intervs_details_map.get(
    attendee.user_id,
  );
  if (!attendee_details) {
    throw new CApiError('SERVER_ERROR', 'Interviewer not found');
  }
  const {
    cal_disc_inters,
    indef_paused_inters,
    curr_day_paused_inters,
    load_reached_ints,
  } = ints_calc_cache;

  const curr_sess_cal_dic_ints = cal_disc_inters[sessn_idx].inters;
  const curr_sess_indef_paused_ints = indef_paused_inters[sessn_idx].inters;
  const curr_sess_curr_day_paused_ints =
    curr_day_paused_inters[sessn_idx].inters;

  const int_conflic_reasons: ConflictReason[] = [];
  // cal disconnected conflict
  if (curr_sess_cal_dic_ints.find((s) => s.user_id === attendee.user_id)) {
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
  if (curr_sess_indef_paused_ints.some((s) => s.user_id === attendee.user_id)) {
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
    const last_paused_date = cand_schedule.getTimeIntTimeZone(
      curr_day_paused_inter.pause_json.end_date,
      sesn_slot.session_id,
      attendee.user_id,
    );
    const is_time_overlapps = isTimeChunksOverLapps(
      {
        startTime: last_paused_date
          .startOf('day')
          .tz(cand_schedule.db_details.req_user_tz),
        endTime: last_paused_date
          .endOf('day')
          .tz(cand_schedule.db_details.req_user_tz),
      },
      {
        startTime: cand_schedule.getTimeInCandTimeZone(sesn_slot.start_time),
        endTime: cand_schedule.getTimeInCandTimeZone(sesn_slot.start_time),
      },
    );
    if (is_time_overlapps) {
      if (
        cand_schedule.api_options.include_conflicting_slots.interviewer_pause
      ) {
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
    if (!cand_schedule.db_details) {
      throw new CApiError('SERVER_ERROR', 'DB details not set');
    }
    is_slot_day_off = isTimeChunksOverLapps(
      convertTimeDurStrToDayjsChunk(t, cand_schedule.db_details.req_user_tz),
      {
        startTime: dayjsLocal(sesn_slot.start_time).tz(
          cand_schedule.db_details.req_user_tz,
        ),
        endTime: dayjsLocal(sesn_slot.end_time).tz(
          cand_schedule.db_details.req_user_tz,
        ),
      },
    );

    if (is_slot_day_off) {
      if (cand_schedule.api_options.include_conflicting_slots.day_off) {
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
    !cand_schedule.api_options.include_conflicting_slots.day_off
  ) {
    return null;
  }

  let is_slot_holiday = false;
  attendee_details.holiday[curr_day_str].forEach((t) => {
    if (!cand_schedule.db_details) {
      throw new CApiError('SERVER_ERROR', 'DB details not set');
    }
    const flag = isTimeChunksOverLapps(
      convertTimeDurStrToDayjsChunk(t, cand_schedule.db_details.req_user_tz),
      {
        startTime: dayjsLocal(sesn_slot.start_time).tz(
          cand_schedule.db_details.req_user_tz,
        ),
        endTime: dayjsLocal(sesn_slot.end_time).tz(
          cand_schedule.db_details.req_user_tz,
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
    !cand_schedule.api_options.include_conflicting_slots.holiday
  ) {
    return null;
  }

  const is_slot_out_of_work_hrs = !attendee_details.work_hours[
    curr_day_str
  ].some((t) => {
    if (!cand_schedule.db_details) {
      throw new CApiError('SERVER_ERROR', 'DB details not set');
    }
    return isTimeChunksEnclosed(
      convertTimeDurStrToDayjsChunk(t, cand_schedule.db_details.req_user_tz),
      {
        startTime: dayjsLocal(sesn_slot.start_time).tz(
          cand_schedule.db_details.req_user_tz,
        ),
        endTime: dayjsLocal(sesn_slot.end_time).tz(
          cand_schedule.db_details.req_user_tz,
        ),
      },
    );
  });
  if (is_slot_out_of_work_hrs) {
    if (
      cand_schedule.api_options.include_conflicting_slots.out_of_working_hrs
    ) {
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
  const conflicting_events = attendee_details.cal_date_events[
    curr_day_str
  ].filter((cal_event) => {
    if (
      cal_event.cal_type === 'recruiting_blocks' &&
      cand_schedule.api_options.use_recruiting_blocks
    ) {
      return false;
    }

    if (
      cal_event.cal_type === 'free_time' &&
      cand_schedule.api_options.include_free_time
    ) {
      return false;
    }
    return isTimeChunksOverLapps(
      {
        startTime: cand_schedule.getTimeInCandTimeZone(
          cal_event.start.dateTime,
        ),
        endTime: cand_schedule.getTimeInCandTimeZone(cal_event.end.dateTime),
      },
      {
        startTime: cand_schedule.getTimeInCandTimeZone(sesn_slot.start_time),
        endTime: cand_schedule.getTimeInCandTimeZone(sesn_slot.end_time),
      },
    );
  });
  //conflicting events
  for (const conf_event of conflicting_events) {
    const ev_type = conf_event.cal_type;
    if (
      ev_type === 'soft' &&
      !cand_schedule.api_options.include_conflicting_slots.show_soft_conflicts
    ) {
      return null;
    }
    if (
      ev_type === 'cal_event' &&
      !cand_schedule.api_options.include_conflicting_slots.show_conflicts_events
    ) {
      return null;
    }
    if (
      ev_type === 'ooo' &&
      !cand_schedule.api_options.include_conflicting_slots.out_of_office
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

  return int_conflic_reasons;
};
