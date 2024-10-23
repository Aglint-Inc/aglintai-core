import {
  type APICandScheduleMailThankYou,
  type CandidateDirectBookingType,
  type PlanCombinationRespType,
} from '@aglint/shared-types';
import {
  CApiError,
  createRequestProgressLogger,
  type ProgressLoggerType,
} from '@aglint/shared-utils';
import axios from 'axios';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { type ScheduleApiDetails } from '../../../types';
import { confirmInterviewers } from '../confirmInterviewers';
import { createMeetingEvents } from '../createMeetingEvents';
import { sendMailsToOrganizer } from '../sendMailsToOrganizer';
import { type FetchDBScheduleDetails, type ScheduleDBDetails } from '../types';
import { updateMeetingEventDetails } from '../updateMeetingInfo';
import { updateTrainingStatus } from '../updateTrainingStatus';

export const bookCandidateSelectedOption = async (
  parsed_body: CandidateDirectBookingType,
  cand_schedule_db_details: ScheduleApiDetails,
  verified_slot: PlanCombinationRespType,
  fetched_cand_details: FetchDBScheduleDetails,
) => {
  if (fetched_cand_details.request_id === null) {
    throw new CApiError('CLIENT', 'Request ID not found');
  }

  const db_details: ScheduleDBDetails = {
    application: {
      id: fetched_cand_details.application_id,
    },
    candidate: {
      first_name: fetched_cand_details.candidate.first_name,
      last_name: fetched_cand_details.candidate.last_name,
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
    cand_schedule_db_details,
    verified_slot.sessions,
    db_details,
  );

  await confirmInterviewers(booked_meeting_details, false);
  await updateMeetingEventDetails(
    booked_meeting_details,
    parsed_body.cand_tz,
    fetched_cand_details.request_id,
  );
  const postCandidateScheduleActions = async () => {
    const supabaseAdmin = getSupabaseServer();
    const payload: APICandScheduleMailThankYou = {
      cand_tz: parsed_body.cand_tz,
      filter_id: parsed_body.filter_id,
      application_id: fetched_cand_details.application_id,
      session_ids: fetched_cand_details.session_ids,
      availability_request_id: null,
      is_debreif: false,
    };
    await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/application/mailthankyou`,
      payload,
    );
    const reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
      request_id: db_details.request_id,
      supabaseAdmin,
      event_type: 'CAND_CONFIRM_SLOT',
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
    sendMailsToOrganizer(db_details, booked_meeting_details),
    updateTrainingStatus(booked_meeting_details),
    postCandidateScheduleActions(),
  ]);

  return booked_meeting_details;
};
