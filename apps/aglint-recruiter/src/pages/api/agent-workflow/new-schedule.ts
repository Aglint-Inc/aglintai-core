import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import {
  addErrorHandlerWrap,
  ApiError,
  candidate_new_schedule_schema,
  supabaseWrap,
} from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { filterSchedulingOptionsArray } from '@/src/components/Scheduling/CandidateDetails/SchedulingDrawer/BodyDrawer/StepScheduleFilter/utils';
import { candidateAvailRequest } from '@/src/services/api-schedulings/candidateAvailRequest';
import { candidateSelfSchedule } from '@/src/services/api-schedulings/candidateSelfSchedule';
import { selfScheduleAgent } from '@/src/services/api-schedulings/selfScheduleAgent';
import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { getOrganizerId } from '@/src/utils/scheduling/getOrganizerId';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
import { createRequestProgressLogger } from '@/src/services/api-schedulings/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    api_options,
    application_id,
    session_ids,
    target_api,
    recruiter_id,
    request_id,
  } = v.parse(candidate_new_schedule_schema, req.body);
  const req_progress_logger = createRequestProgressLogger(request_id);
  let date_range = {
    start_date_str: dayjsLocal().format('DD/MM/YYYY'),
    end_date_str: dayjsLocal().add(7, 'day').format('DD/MM/YYYY'),
  };
  const api_target = target_api as DatabaseEnums['email_slack_types'];
  const organizer_id = await getOrganizerId(application_id, supabaseAdmin);
  const meeting_details = supabaseWrap(
    await supabaseAdmin
      .from('meeting_details')
      .select()
      .in('session_id', session_ids),
  );
  let schedule_id = meeting_details[0].interview_schedule_id;
  if (meeting_details.length === 0) {
    throw new ApiError('SERVER_ERROR', 'invalid session id');
  }
  const cand_schedule = new CandidatesSchedulingV2(api_options);
  await cand_schedule.fetchDetails({
    company_id: recruiter_id,
    start_date_str: date_range.start_date_str,
    end_date_str: date_range.end_date_str,
    req_user_tz: 'Asia/Calcutta', //TODO:
    session_ids: session_ids,
  });
  const slots = cand_schedule.findAvailabilitySlotsDateRange();
  const filtered_slot_info = filterSchedulingOptionsArray({
    schedulingOptions: slots,
    filters: {
      isHardConflicts: false,
      isNoConflicts: true,
      isOutSideWorkHours:
        api_options.include_conflicting_slots.out_of_working_hrs,
      isSoftConflicts:
        api_options.include_conflicting_slots.show_soft_conflicts,
      isWorkLoad: true,
      preferredDateRanges: [],
      preferredInterviewers: [],
    },
  });
  const plans = filtered_slot_info.combs.flatMap((c) => c.plans);

  let meeting_flow: DatabaseTable['interview_meeting']['meeting_flow'] =
    'self_scheduling';
  await req_progress_logger({
    event_type: 'FIND_CURR_AVAIL_SLOTS',
    log: `Found ${plans.length} slots`,
    log_type: 'heading',
    status: 'completed',
    meta: null,
  });
  if (api_target === 'onSelfScheduleReqAgent_EmailLink_SelfSchedule') {
    meeting_flow = 'self_scheduling';
    await candidateSelfSchedule(
      req.body,
      session_ids,
      organizer_id,
      schedule_id,
      plans,
      date_range.start_date_str,
      date_range.end_date_str,
      request_id,
    );
  } else if (api_target === 'onSelfScheduleReqAgent_PhoneAgent_SelfSchedule') {
    await selfScheduleAgent({
      req_body: req.body,
      agent_assigned_user_id: organizer_id,
      agent_type: 'phone',
      cloned_sessn_ids: session_ids,
      schedule_id: schedule_id,
      start_date_str: date_range.start_date_str,
      end_date_str: date_range.end_date_str,
    });
  } else if (api_target === 'onSelfScheduleReqAgent_EmailAgent_SelfSchedule') {
    await selfScheduleAgent({
      req_body: req.body,
      agent_assigned_user_id: organizer_id,
      agent_type: 'email',
      cloned_sessn_ids: session_ids,
      schedule_id: schedule_id,
      start_date_str: date_range.start_date_str,
      end_date_str: date_range.end_date_str,
    });
  } else if (
    api_target === 'onAvailReqAgent_emailLink_getCandidateAvailability'
  ) {
    await candidateAvailRequest(
      req.body,
      organizer_id,
      session_ids,
      date_range.start_date_str,
      date_range.end_date_str,
      request_id,
      req_progress_logger,
    );
  } else {
    throw new ApiError('SERVER', 'new-schedule not found');
  }

  supabaseWrap(
    await supabaseAdmin
      .from('interview_meeting')
      .update({
        meeting_flow,
        status: 'waiting',
        organizer_id,
      })
      .in(
        'id',
        meeting_details.map((m) => m.id),
      ),
  );

  return res.status(204).end();
};

export default addErrorHandlerWrap(handler);
