import {
  type CalConflictType,
  type InterviewSessionApiRespType,
  type PauseJson,
  type SessionInterviewerApiRespType,
} from '@aglint/shared-types';
import { CApiError } from '@aglint/shared-utils';
import { type Dayjs } from 'dayjs';

import { type CandidatesScheduling } from '../CandidatesScheduling';
import { isIntervLoadPassed } from './isInterviewerLoadPassed';
import { isTimeChunksOverLapps } from './time_range_utils';

export type InterviewSessionApiRespTypeFullInts = Omit<
  InterviewSessionApiRespType,
  'qualifiedIntervs' | 'trainingIntervs'
> & {
  all_qualified_ints: SessionInterviewerApiRespType[];
  all_training_ints: SessionInterviewerApiRespType[];
};

export const cacheCurrPlanCalc = ({
  cand_schedule,
  plan_comb,
  curr_day_str,
  curr_day_js,
}: {
  cand_schedule: CandidatesScheduling;
  plan_comb: InterviewSessionApiRespTypeFullInts[];
  curr_day_str: string;
  curr_day_js: Dayjs;
}) => {
  if (!cand_schedule.db_details) {
    throw new CApiError('SERVER_ERROR', 'DB details not set');
  }
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
      ...curr_sess.all_qualified_ints,
      ...curr_sess.all_training_ints,
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
      if (!cand_schedule.db_details) {
        throw new CApiError('SERVER_ERROR', 'DB details not set');
      }
      const attendee_details = cand_schedule.intervs_details_map.get(
        attendee.user_id,
      );
      if (!attendee_details) {
        throw new CApiError('SERVER_ERROR', 'Interviewer not found');
      }
      if (!attendee_details.isCalenderConnected) {
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
      const interviewer_pause_json = cand_schedule.getIntPauseJson(
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
          const last_paused_date = cand_schedule.getTimeIntTimeZone(
            interviewer_pause_json.end_date,
            curr_sess.session_id,
            attendee.user_id,
          );
          if (
            isTimeChunksOverLapps(
              {
                startTime: last_paused_date
                  .startOf('day')
                  .tz(cand_schedule.db_details.req_user_tz),
                endTime: last_paused_date
                  .endOf('day')
                  .tz(cand_schedule.db_details.req_user_tz),
              },
              {
                startTime: cand_schedule
                  .getTimeInCandTimeZone(curr_day_js)
                  .startOf('day'),
                endTime: cand_schedule.getTimeInCandTimeZone(
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
        const trainee_details = cand_schedule.intervs_details_map.get(
          attendee.user_id,
        );
        if (!trainee_details) {
          throw new CApiError('SERVER_ERROR', 'Trainee not found');
        }

        const { is_passed, type, day_load_density, week_load_density } =
          isIntervLoadPassed(
            curr_day_js,
            cand_schedule.db_details,
            attendee.user_id,
            trainee_details.int_schedule_setting,
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
