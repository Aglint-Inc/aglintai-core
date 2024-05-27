import {
  APIFindAvailability,
  APIOptions,
  InterDetailsType,
} from '@aglint/shared-types';
import { Dayjs } from 'dayjs';
import { z } from 'zod';

import { schema_find_availability_payload } from '@/src/types/scheduling/schema_find_availability_payload';

import { ScheduleUtils } from './ScheduleUtils';
import { DBDetailsType } from './types';
import { fetch_details_from_db } from './utils/fetch_details_from_db';
import { fetchIntsCalEventsDetails } from './utils/fetchIntsCalEventsDetails';

export class CandidatesSchedulingV2 {
  public db_details: DBDetailsType;
  private api_options: APIOptions;
  private api_payload: APIFindAvailability;
  public intervs_details_map: Map<string, InterDetailsType>;
  private schedule_dates: {
    user_start_date_js: Dayjs;
    user_end_date_js: Dayjs;
  };

  constructor(
    _api_payload: Omit<APIFindAvailability, 'options'>,
    _api_options: z.infer<typeof schema_find_availability_payload>['options'],
  ) {
    this.api_payload = _api_payload;
    this.schedule_dates = {
      user_start_date_js: ScheduleUtils.convertDateFormatToDayjs(
        _api_payload.start_date_str,
        _api_payload.candidate_tz,
        true,
      ),
      user_end_date_js: ScheduleUtils.convertDateFormatToDayjs(
        _api_payload.start_date_str,
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
      this.api_payload.recruiter_id,
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
   * find calender events for each interviewer
   */
  public async fetchInterviewrsCalEvents() {
    this.intervs_details_map = await fetchIntsCalEventsDetails(
      this.db_details.all_inters,
      this.db_details.company_cred,
      this.schedule_dates.user_start_date_js.format(),
      this.schedule_dates.user_end_date_js.format(),
    );
    console.log(this.intervs_details_map);
  }
}
