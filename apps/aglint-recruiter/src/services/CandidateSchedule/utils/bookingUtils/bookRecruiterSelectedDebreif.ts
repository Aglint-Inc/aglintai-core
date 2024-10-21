import {
  type APICandScheduleMailThankYou,
  type APIScheduleDebreif,
  type PlanCombinationRespType,
} from '@aglint/shared-types';
import { createRequestProgressLogger } from '@aglint/shared-utils';
import axios from 'axios';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { type ScheduleApiDetails } from '../../types';
import { confirmInterviewers } from './confirmInterviewers';
import { createMeetingEvents } from './createMeetingEvents';
import { sendMailsToOrganizer } from './sendMailsToOrganizer';
import { type FetchedDebreifType, type ScheduleDBDetails } from './types';
import { updateMeetingEventDetails } from './updateMeetingInfo';
import { updateTrainingStatus } from './updateTrainingStatus';

export const bookRecruiterSelectedDebreif = async (
  req_body: APIScheduleDebreif,
  cand_schedule_db_details: ScheduleApiDetails,
  verified_slot: PlanCombinationRespType,
  fetched_cand_details: FetchedDebreifType,
) => {
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

  await confirmInterviewers(booked_meeting_details, true);
  await updateMeetingEventDetails(
    booked_meeting_details,
    req_body.user_tz,
    fetched_cand_details.request_id,
  );

  const postScheduleActions = async () => {
    const payload: APICandScheduleMailThankYou = {
      cand_tz: fetched_cand_details.cand_tz,
      filter_id: null,
      application_id: db_details.application.id,
      session_ids: [req_body.session_id],
      availability_request_id: null,
      is_debreif: true,
    };
    await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/application/mailthankyou`,
      payload,
    );
    const supabaseAdmin = getSupabaseServer();
    const reqProgressLogger = createRequestProgressLogger({
      request_id: db_details.request_id,
      supabaseAdmin,
      event_type: 'RECRUITER_SCHEDULED',
    });
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
  return booked_meeting_details;
};
