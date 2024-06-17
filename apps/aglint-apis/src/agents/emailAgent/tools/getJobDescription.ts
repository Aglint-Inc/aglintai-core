import {DynamicStructuredTool} from 'langchain/tools';
import {z} from 'zod';
import {EmailAgentPayload} from '../../../types/email_agent/apiPayload.types';

export const getJobDescription = (cand_info: EmailAgentPayload['payload']) => {
  return new DynamicStructuredTool({
    name: 'get-job-description',
    description: 'fetches job description',
    schema: z.object({}),
    func: async () => {
      return cand_info.job_description;
    },
  });
};
