import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import {
  type APICandidateConfirmSlotNoConflict,
  type APICandScheduleMailThankYou,
  type PlanCombinationRespType,
} from '@aglint/shared-types';
import axios from 'axios';

import { type CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';

import { confirmInterviewers } from './confirmInterviewers';
import { createMeetingEvents } from './createMeetingEvents';
import { sendMailsToOrganizer } from './sendMailsToOrganizer';
import { type FetchDBScheduleDetails, type ScheduleDBDetails } from './types';
import { updateConfirmTime } from './updateConfirmTime';
import { updateMeetingEventDetails } from './updateMeetingInfo';
import { updateTrainingStatus } from './updateTrainingStatus';

export const confirmSlotNoConflict = async (
  parsed_body: APICandidateConfirmSlotNoConflict,
  cand_schedule: CandidatesSchedulingV2,
  verified_slot: PlanCombinationRespType,
  fetched_cand_details: FetchDBScheduleDetails,
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
  };
  // create calender events for all sessions
  const booked_meeting_details = await createMeetingEvents(
    cand_schedule,
    verified_slot.sessions,
    db_details,
  );

  await updateTrainingStatus(booked_meeting_details);
  await confirmInterviewers(booked_meeting_details, false);
  await updateMeetingEventDetails(booked_meeting_details);
  await updateConfirmTime(parsed_body.filter_id);
  await sendMailsToOrganizer(db_details, booked_meeting_details);
  const payload: APICandScheduleMailThankYou = {
    cand_tz: parsed_body.cand_tz,
    filter_id: parsed_body.filter_id,
    application_id: fetched_cand_details.application_id,
    session_ids: fetched_cand_details.filter_json_data.session_ids,
    availability_request_id: null,
    is_debreif: false,
    booking_request_from: parsed_body.agent_type,
  };
  await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/application/mailthankyou`,
    payload,
  );
  return booked_meeting_details;
};
