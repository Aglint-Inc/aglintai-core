import {Request, Response} from 'express';
import {TwilioCallInfo} from '../../types/twilio.types';
import {getCachedCandidateInfo} from '../../services/cache/cache-db';
import {dayjsLocal} from '../../utils/dayjsLocal/dayjsLocal';
import {scheduleCallUtil} from '../../utils/scheduleCall';
import {getCandidateLogger} from '../../utils/scheduling_utils/getCandidateLogger';
import {agent_activities} from '../../copies/agents_activity';

export const callStatus = async (req: Request, res: Response) => {
  const body = req.body as TwilioCallInfo;
  try {
    const callStatus = body.CallStatus;
    if (callStatus === 'busy' || callStatus === 'no-answer') {
      const cand_info = await getCachedCandidateInfo(body.To);
      if (cand_info.req_payload.task_id) {
        const candLogger = getCandidateLogger(
          cand_info.req_payload.task_id,
          cand_info.candidate_name,
          cand_info.candidate_id,
          'phone_agent'
        );
        const scheduled_time = dayjsLocal().add(30, 'minutes').toISOString();
        await scheduleCallUtil(cand_info.req_payload.task_id, scheduled_time);
        if (callStatus === 'busy') {
          candLogger(
            agent_activities.phone_agent.phone_call.candidate_no_answer,
            {
              '{time_format}': scheduled_time,
              '{candidate}': cand_info.candidate_name,
            },
            'phone_agent',
            'schedule'
          );
        } else if (callStatus === 'no-answer') {
          candLogger(
            agent_activities.phone_agent.phone_call.candidate_reject,
            {
              '{time_format}': scheduled_time,
              '{candidate}': cand_info.candidate_id,
            },
            'phone_agent',
            'schedule'
          );
        }
      }
    }
    return res.status(200).send('');
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};
