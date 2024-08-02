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
import { getClonedSessionIds } from '@/src/utils/scheduling/getClonedSessionIds';
import { getOrganizerId } from '@/src/utils/scheduling/getOrganizerId';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { api_options, application_id, session_ids, target_api, recruiter_id } =
    v.parse(candidate_new_schedule_schema, req.body);

  let date_range = {
    start_date_str: dayjsLocal().format('DD/MM/YYYY'),
    end_date_str: dayjsLocal().add(7, 'day').format('DD/MM/YYYY'),
  };
  const api_target = target_api as DatabaseEnums['email_slack_types'];
  const organizer_id = await getOrganizerId(application_id, supabaseAdmin);
  const { cloned_sessn_data, schedule_id } = await getClonedSessionIds(
    application_id,
    session_ids,
  );
  const cand_schedule = new CandidatesSchedulingV2(api_options);
  await cand_schedule.fetchDetails({
    company_id: recruiter_id,
    start_date_str: date_range.start_date_str,
    end_date_str: date_range.end_date_str,
    req_user_tz: 'Asia/Calcutta', //TODO:
    session_ids: cloned_sessn_data.map((s) => s.id),
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

  if (api_target === 'onSelfScheduleReqAgent_EmailLink_SelfSchedule') {
    meeting_flow = 'self_scheduling';
    await candidateSelfSchedule(
      req.body,
      cloned_sessn_data.map((s) => s.id),
      organizer_id,
      schedule_id,
      plans,
    );
  } else if (api_target === 'onSelfScheduleReqAgent_PhoneAgent_SelfSchedule') {
    await selfScheduleAgent({
      req_body: req.body,
      agent_assigned_user_id: organizer_id,
      agent_type: 'phone',
      cloned_sessn_ids: session_ids,
      schedule_id: schedule_id,
    });
  } else if (api_target === 'onSelfScheduleReqAgent_EmailAgent_SelfSchedule') {
    await selfScheduleAgent({
      req_body: req.body,
      agent_assigned_user_id: organizer_id,
      agent_type: 'email',
      cloned_sessn_ids: session_ids,
      schedule_id: schedule_id,
    });
  } else if (
    api_target === 'onAvailReqAgent_emailLink_getCandidateAvailability'
  ) {
    await candidateAvailRequest(
      req.body,
      organizer_id,
      cloned_sessn_data.map((s) => s.id),
      date_range.start_date_str,
      date_range.end_date_str,
    );
  } else {
    throw new ApiError('SERVER', 'new-schedule not found');
  }

  supabaseWrap(
    await supabaseAdmin
      .from('interview_meeting')
      .update({
        meeting_flow,
      })
      .in(
        'id',
        cloned_sessn_data.map((s) => s.meeting_id),
      ),
  );

  return res.status(204).end();
};

export default addErrorHandlerWrap(handler);
