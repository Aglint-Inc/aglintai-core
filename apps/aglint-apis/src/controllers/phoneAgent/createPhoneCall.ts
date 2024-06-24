import {envConfig} from '../../config';
import {addCandInfoToCache} from '../../services/cache/cache-db';
import {twilioClient} from '../../services/twilio';
import {fetchCandidateDetails} from '../../utils/scheduling_utils/fetchCandDetails';
import {Request, Response} from 'express';
import {getCandidateLogger} from '../../utils/scheduling_utils/getCandidateLogger';
import {agent_activities} from '../../copies/agents_activity';
import {appLogger} from '../../services/logger';
export const createPhoneCall = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const cand_info = await fetchCandidateDetails(body);
    addCandInfoToCache(cand_info.req_payload.to_phone_no, cand_info);
    await twilioClient.CreatePhoneCall(
      envConfig.TWILIO_NUMBER,
      cand_info.req_payload.to_phone_no,
      envConfig.RETELL_AGENT_ID
    );
    return res.status(200).send('call initiated');
  } catch (error: any) {
    appLogger.error(error.message, error);
    const candLogger = getCandidateLogger(body.task_id, '', '', 'phone_agent');
    candLogger(
      agent_activities.phone_agent.phone_call.failed,
      {},
      'phone_agent',
      'call_failed'
    );
    return res.status(500).send(error.message);
  }
};
