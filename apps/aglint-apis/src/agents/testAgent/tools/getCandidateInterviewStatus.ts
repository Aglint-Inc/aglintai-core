import {DynamicStructuredTool} from 'langchain/tools';
import z from 'zod';

export const getCandidateInterviewStatus = () => {
  return new DynamicStructuredTool({
    name: 'candidate-interview-status',
    description: 'finds the current interview status of the candidate',
    schema: z.object({
      candidate_first_name: z.string().optional(),
      candidate_last_name: z.string().optional(),
    }),
    func: async payload => {
      try {
        return 'please confirm whether it is Dileep MK or Dileep B C.';
        // return 'completed all the interviews';
      } catch (error: any) {
        return 'Failed to perform the action';
      }
    },
  });
};
