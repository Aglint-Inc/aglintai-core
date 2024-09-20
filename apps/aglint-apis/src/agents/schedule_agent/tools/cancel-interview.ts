import {z} from 'zod';
import {createOpenAiTool} from './utils';
import axios from 'axios';
import {LoggerType} from '../../../utils/scheduling_utils/getCandidateLogger';
import {envConfig} from '../../../config';
import {
  getCachedCandidateInfo,
  updateCandidateInfo,
} from '../../../services/cache/cache-db';
import {appLogger} from '../../../services/logger';
import {agent_activities} from '../../../copies/agents_activity';
export const cancelInterview = () => {
  const schema = z.object({
    reason: z
      .string()
      .describe('reason from the candidate for cancelling the interview'),
  });
  const tool_def = createOpenAiTool({
    name: 'cancel-scheduled-interview',
    description: 'cancels the scheduled interview',
    schema,
  });

  const func = async (
    args: z.infer<typeof schema>,
    cand_phone: string,
    candLogger: LoggerType
  ) => {
    const cand_info = await getCachedCandidateInfo(cand_phone);
    const {reason} = args;
    if (!reason) return 'reason field required';
    try {
      await candLogger(
        agent_activities.phone_agent.tools['cancel-interview'].candidate_req,
        {
          '{candidate}': '',
        }
      );
      await axios.post(
        `${envConfig.CLIENT_APP_URL}/api/scheduling/v1/cancel_interview_scheduling`,
        {
          session_ids: cand_info.interview_sessions.map(s => s.id),
        }
      );
      cand_info.schedule_status = 'cancelled';
      await updateCandidateInfo(cand_info);
      await candLogger(
        agent_activities.phone_agent.tools['cancel-interview']
          .sucessessfull_cancel,
        {}
      );
      return 'cancelled interview sucessfully';
    } catch (error: any) {
      appLogger.error('Failed to cancel the scheduled interview', {
        error: error.message,
        task_id: cand_info.req_payload.task_id,
      });
      candLogger(
        agent_activities.phone_agent.tools['cancel-interview']
          .failed_cancel_interview,
        {
          '{err_msg}': error.message,
        }
      );
      return 'some thing went wrong while cancelling interview';
    }
  };
  return {
    tool_def,
    func,
  };
};
