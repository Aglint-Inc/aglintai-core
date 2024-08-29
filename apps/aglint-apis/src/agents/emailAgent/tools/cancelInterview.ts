import {envConfig} from '../../../config';
import axios from 'axios';
import {DynamicStructuredTool} from 'langchain/tools';
import {z} from 'zod';
import {EmailAgentPayload} from '../../../types/email_agent/apiPayload.types';
import {LoggerType} from '../../../utils/scheduling_utils/getCandidateLogger';
import {agent_activities} from '../../../copies/agents_activity';

export const cancelInterviewSlot = (
  cand_info: EmailAgentPayload['payload'],
  candLogger: LoggerType
) => {
  return new DynamicStructuredTool({
    name: 'cancel-interiew-slot',
    description: 'cancels already booked interview slot',
    schema: z.object({
      reason: z
        .string()
        .describe('reason from the candidate for cancelling the interview'),
    }),
    func: async ({reason}) => {
      if (!reason) return 'reason field required';
      try {
        candLogger(
          agent_activities.email_agent.tools['cancel-interiew-slot']
            .candidate_req,
          {
            '{candidate}': '',
          }
        );

        await axios.post(
          `${envConfig.CLIENT_APP_URL}/api/scheduling/v1/cancel_interview_scheduling`,
          {
            session_ids: cand_info.interview_sessions.map(s => s.id),
            cand_email: cand_info.candidate_email,
          }
        );

        candLogger(
          agent_activities.email_agent.tools['cancel-interiew-slot']
            .sucessessfull_cancel,
          {}
        );
        return 'canceled interview sucessfully';
      } catch (error: any) {
        candLogger(
          agent_activities.email_agent.tools['cancel-interiew-slot']
            .failed_cancel_interview,
          {
            '{candidate}': '',
            '{err_msg}': error.message,
          }
        );
        return 'Some thing went wrong while cancelling email';
      }
    },
  });
};
