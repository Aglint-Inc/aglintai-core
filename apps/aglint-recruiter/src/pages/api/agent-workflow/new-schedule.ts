import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import {
  candidate_new_schedule_schema,
  CApiError,
  createRequestProgressLogger,
  executeWorkflowAction,
  ProgressLoggerType,
  supabaseWrap,
} from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { candidateAvailRequest } from '@/src/services/api-schedulings/candidateAvailRequest';
import { candidateAvailReRequest } from '@/src/services/api-schedulings/candidateAvailReRequest';
import { candidateSelfSchedule } from '@/src/services/api-schedulings/candidateSelfSchedule';
import { findPlanCombs } from '@/src/services/api-schedulings/findPlanCombs';
import { getOrganizerId } from '@/src/utils/scheduling/getOrganizerId';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
const TIME_ZONE = 'Asia/Colombo';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
    request_id: req.body.request_id,
    supabaseAdmin,
    event_run_id: req.body.event_run_id,
    target_api: req.body.target_api,
  });

  try {
    const {
      api_options,
      application_id,
      session_ids,
      target_api,
      recruiter_id,
      request_id,
    } = v.parse(candidate_new_schedule_schema, req.body);
    const [request_rec] = supabaseWrap(
      await supabaseAdmin.from('request').select().eq('id', request_id),
    );
    let date_range = {
      start_date_str: dayjsLocal().format('DD/MM/YYYY'),
      end_date_str: dayjsLocal().add(7, 'day').format('DD/MM/YYYY'),
    };
    if (request_rec.schedule_start_date && request_rec.schedule_end_date) {
      date_range.start_date_str = dayjsLocal(request_rec.schedule_start_date)
        .tz(TIME_ZONE)
        .format('DD/MM/YYYY');
      date_range.end_date_str = dayjsLocal(request_rec.schedule_end_date)
        .tz(TIME_ZONE)
        .format('DD/MM/YYYY');
    }
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
      throw new CApiError('SERVER_ERROR', 'invalid session id');
    }
    const plans = await executeWorkflowAction(
      findPlanCombs,
      {
        api_options,
        date_range: date_range,
        recruiter_id,
        session_ids,
        reqProgressLogger,
      },
      reqProgressLogger,
      {
        event_type: 'FIND_CURR_AVAIL_SLOTS',
      },
    );

    let meeting_flow: DatabaseTable['interview_meeting']['meeting_flow'] =
      'self_scheduling';

    // fix lint
    if (api_target === 'onRequestSchedule_emailLink_sendSelfSchedulingLink') {
      meeting_flow = 'self_scheduling';
      await executeWorkflowAction(
        candidateSelfSchedule,
        {
          cloned_sessn_ids: session_ids,
          schedule_id: schedule_id,
          start_date_str: date_range.start_date_str,
          end_date_str: date_range.end_date_str,
          organizer_id,
          plans,
          request_id,
          reqProgressLogger,
        },
        reqProgressLogger,
        { event_type: 'SELF_SCHEDULE_LINK' }, //TODO: mention
      );
    } else if (
      api_target === 'onRequestSchedule_emailLink_getCandidateAvailability'
    ) {
      await executeWorkflowAction(
        candidateAvailRequest,
        {
          req_body: req.body,
          cloned_sessn_ids: session_ids,
          start_date_str: date_range.start_date_str,
          end_date_str: date_range.end_date_str,
          organizer_id: organizer_id,
          request_id: request_id,
        },
        reqProgressLogger,
        {
          event_type: 'REQ_CAND_AVAIL_EMAIL_LINK',
        },
      );
    } else if (
      api_target === 'onRequestReschedule_emailLink_resendAvailRequest'
    ) {
      await executeWorkflowAction(
        candidateAvailReRequest,
        {
          req_body: req.body,
          cloned_sessn_ids: session_ids,
          start_date_str: date_range.start_date_str,
          end_date_str: date_range.end_date_str,
          organizer_id: organizer_id,
          request_id: request_id,
        },
        reqProgressLogger,
        {
          event_type: 'RESEND_CAND_AVAIL_EMAIL_LINK',
        },
      );
      meeting_flow = 'candidate_request';
    } else {
      throw new CApiError('SERVER_ERROR', 'new-schedule not found');
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

    return res.status(200).send('OK');
  } catch (err: any) {
    console.error(err);

    if (err instanceof CApiError) {
      return res.status(500).json({
        type: err.type,
        message: err.message,
      });
    }

    console.error(err.message);

    return res.status(500).json({
      type: err.name,
      message: err.message,
    });
  }
};

export default handler;
