import {getFullName} from '@aglint/shared-utils';
import {DynamicStructuredTool} from 'langchain/tools';
import z from 'zod';

export const checkCandidateNameInDb = () => {
  return new DynamicStructuredTool({
    name: 'check-candidate-name-in-database',
    description:
      'return array of candidate full name that matches the given candidate name for the given job',
    schema: z.object({
      first_name: z.string(),
      last_name: z.string().optional(),
      job_title: z.string(),
    }),
    func: async payload => {
      return [getFullName(payload.first_name, payload.last_name)].toString();
    },
  });
};
