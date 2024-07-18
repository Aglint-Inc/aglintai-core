import {DynamicStructuredTool} from 'langchain/tools';
import z from 'zod';

export const verifyCandidate = () => {
  return new DynamicStructuredTool({
    name: 'verify-the-candidate-name',
    description:
      'takes candidate first_name, last_name and verifies whether the candidate is present in the system or not',
    schema: z.object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
    }),
    func: async payload => {
      try {
        if (!payload.first_name || !payload.last_name) {
          return 'Atleast candidates first_name or last_name is required ';
        }
      } catch (error: any) {
        return 'Failed to perform the action';
      }
    },
  });
};
