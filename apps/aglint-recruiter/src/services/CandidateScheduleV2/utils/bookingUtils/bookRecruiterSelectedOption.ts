import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import {
  type APICandScheduleMailThankYou,
  type APIConfirmRecruiterSelectedOption,
  type PlanCombinationRespType,
} from '@aglint/shared-types';
import axios from 'axios';

import { type CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';

import { confirmInterviewers } from './confirmInterviewers';
import { createMeetingEvents } from './createMeetingEvents';
import { sendMailsToOrganizer } from './sendMailsToOrganizer';
import { type FetchedCandAvailType, type ScheduleDBDetails } from './types';
import { updateMeetingEventDetails } from './updateMeetingInfo';
import { updateTrainingStatus } from './updateTrainingStatus';

export const bookRecruiterSelectedOption = async (
  req_body: APIConfirmRecruiterSelectedOption,
  cand_schedule: CandidatesSchedulingV2,
  verified_slot: PlanCombinationRespType,
  fetched_cand_details: FetchedCandAvailType,
) => {
  const db_details: ScheduleDBDetails = {
    application: {
      id: fetched_cand_details.application.id,
    },
    candidate: {
      first_name: fetched_cand_details.application.candidates.first_name,
      last_name: fetched_cand_details.application.candidates.last_name,
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
  await sendMailsToOrganizer(db_details, booked_meeting_details);
  const payload: APICandScheduleMailThankYou = {
    cand_tz: fetched_cand_details.cand_tz,
    filter_id: null,
    application_id: fetched_cand_details.application.id,
    session_ids: fetched_cand_details.session_ids,
    availability_request_id: req_body.availability_req_id,
    is_debreif: false,
  };
  axios.post(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/application/mailthankyou`,
    payload,
  );
  return booked_meeting_details;
};
