import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { PlanCombinationRespType } from '@aglint/shared-types';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';

import { confirmInterviewers } from './confirmInterviewers';
import { createMeetingEvents } from './createMeetingEvents';
import { sendMailsToOrganizer } from './sendMailsToOrganizer';
import { ScheduleDBDetails } from './types';
import { updateMeetingEventDetails } from './updateMeetingInfo';
import { updateTrainingStatus } from './updateTrainingStatus';

// type ConfirmInt = Pick<
//   SessionInterviewerType,
//   'session_id' | 'user_id' | 'interview_module_relation_id'
// >;
export const bookInterviewPlan = async (
  cand_schedule: CandidatesSchedulingV2,
  verified_slot: PlanCombinationRespType,
  schedule_db_details: ScheduleDBDetails,
) => {
  // create calender events for all sessions
  const booked_meeting_details = await createMeetingEvents(
    cand_schedule,
    verified_slot.sessions,
    schedule_db_details,
  );

  await updateTrainingStatus(booked_meeting_details);
  await confirmInterviewers(booked_meeting_details, false);
  await updateMeetingEventDetails(booked_meeting_details);
  await sendMailsToOrganizer(schedule_db_details, booked_meeting_details);
  // db updates
  // emails
  return booked_meeting_details;
};
