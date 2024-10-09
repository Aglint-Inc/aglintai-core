import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);
import {
  type APICandScheduleMailThankYou,
  type APIConfirmRecruiterSelectedOption,
  type PlanCombinationRespType,
} from '@aglint/shared-types';
import {
  createRequestProgressLogger,
  type ProgressLoggerType,
  supabaseWrap,
} from '@aglint/shared-utils';
import axios from 'axios';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { type ScheduleApiDetails } from '../../types';
import { confirmInterviewers } from './confirmInterviewers';
import { createMeetingEvents } from './createMeetingEvents';
import { sendMailsToOrganizer } from './sendMailsToOrganizer';
import { type FetchedCandAvailType, type ScheduleDBDetails } from './types';
import { updateMeetingEventDetails } from './updateMeetingInfo';
import { updateTrainingStatus } from './updateTrainingStatus';

export const bookRecruiterSelectedOption = async (
  req_body: APIConfirmRecruiterSelectedOption,
  cand_schedule_api_details: ScheduleApiDetails,
  verified_slot: PlanCombinationRespType,
  fetched_cand_details: FetchedCandAvailType,
) => {
  const supabaseAdmin = getSupabaseServer();

  const db_details: ScheduleDBDetails = {
    application: {
      id: fetched_cand_details.application_id,
    },
    candidate: {
      first_name: fetched_cand_details.candidate.first_name,
      last_name: fetched_cand_details.candidate.last_name ?? '',
    },
    company: {
      id: fetched_cand_details.company.id,
      name: fetched_cand_details.company.name,
    },
    job: {
      job_title: fetched_cand_details.job.job_title,
    },
    request_id: fetched_cand_details.request_id,
  };
  // create calender events for all sessions
  const booked_meeting_details = await createMeetingEvents(
    cand_schedule_api_details,
    verified_slot.sessions,
    db_details,
  );
  await confirmInterviewers(booked_meeting_details, false);
  await updateMeetingEventDetails(
    booked_meeting_details,
    req_body.user_tz,
    req_body.request_id,
  );
  const postScheduleActions = async () => {
    const supabaseAdmin = getSupabaseServer();
    const payload: APICandScheduleMailThankYou = {
      cand_tz: fetched_cand_details.candidate.timezone,
      filter_id: null,
      application_id: fetched_cand_details.application_id,
      session_ids: fetched_cand_details.session_ids,
      availability_request_id: req_body.availability_req_id,
      is_debreif: false,
    };
    await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/application/mailthankyou`,
      payload,
    );
    const reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
      request_id: db_details.request_id,
      supabaseAdmin,
      event_type: 'RECRUITER_SCHEDULED',
    });
    await reqProgressLogger.resetEventProgress();
    await reqProgressLogger({
      status: 'completed',
      is_progress_step: false,
    });
    await reqProgressLogger({
      status: 'completed',
      is_progress_step: true,
    });
  };

  await Promise.all([
    updateTrainingStatus(booked_meeting_details),
    sendMailsToOrganizer(db_details, booked_meeting_details),
    postScheduleActions(),
  ]);

  supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .update({ booking_confirmed: true })
      .eq('id', req_body.availability_req_id),
  );
  return booked_meeting_details;
};
