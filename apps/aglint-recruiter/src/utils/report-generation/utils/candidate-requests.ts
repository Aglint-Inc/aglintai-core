/* eslint-disable no-console */
import { dayjsLocal } from '@aglint/shared-utils';

import { createCandidateRequest } from '../../../services/candidate-request';
import {
  getRandomNumInRange,
  seed_candidate_interview_cancel_reason,
  seed_candidate_interview_reschedule_reason,
} from '../constant';
import { runPromisesInBatches } from './runPromisesInBatches';
export type MeetingDetail = {
  session_id: string;
  application_id: string;
  meeting_schedule_start_time: string;
  meeting_schedule_end_time: string;
};

export const createCandidateInterviewCancelReq = async (
  meeting_details: MeetingDetail[],
) => {
  const promises = meeting_details.map(async (meeting_detail) => {
    const reason =
      seed_candidate_interview_cancel_reason[
        getRandomNumInRange(
          0,
          seed_candidate_interview_cancel_reason.length - 1,
        )
      ];
    const add_date = Math.floor(Math.random() * 7) + 1;
    await createCandidateRequest({
      application_id: meeting_detail.application_id,
      type: 'candidate_request_decline',
      reason: reason,
      session_ids: [meeting_detail.session_id],
      other_details: reason === 'Other' ? { reason: 'Report Reason' } : {},
      dates: {
        start: dayjsLocal(meeting_detail.meeting_schedule_start_time)
          .add(add_date, 'day')
          .format(),
        end: dayjsLocal(meeting_detail.meeting_schedule_start_time)
          .add(2 * add_date, 'day')
          .format(),
      },
    });
  });
  await runPromisesInBatches(promises, 3);

  console.log('Candidate Interview Cancel Request Created');
};

export const createCandidateInterviewRescheduleRequest = async (
  meeting_details: MeetingDetail[],
) => {
  const promises = meeting_details.map(async (meeting_detail) => {
    const reason =
      seed_candidate_interview_reschedule_reason[
        getRandomNumInRange(
          0,
          seed_candidate_interview_reschedule_reason.length - 1,
        )
      ];
    const add_date = Math.floor(Math.random() * 7) + 1;
    await createCandidateRequest({
      application_id: meeting_detail.application_id,
      type: 'candidate_request_reschedule',
      reason: reason,
      session_ids: [meeting_detail.session_id],
      other_details: reason === 'Other' ? { reason: 'Other Reason' } : {},
      dates: {
        start: dayjsLocal(meeting_detail.meeting_schedule_start_time)
          .add(add_date, 'day')
          .format(),
        end: dayjsLocal(meeting_detail.meeting_schedule_start_time)
          .add(2 * add_date, 'day')
          .format(),
      },
    });
  });
  await runPromisesInBatches(promises, 3);
  console.log('Candidate Interview Reschedule Request Created');
};
