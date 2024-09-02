import { extractJson } from '../addNewJob';
import { type MessageType } from '../types';

export const similarJobs = async (jobroles: string[]) => {
  const prompt = [
    {
      role: 'system',
      content: `
       * your given a list of job roles your job is to generate a 5 list of jobs that are closely related to the given.
       * only repond in the json format following the schema
        {
          related_jobs: string[],
        }
       `,
    },
    {
      role: 'user',
      content: `here are the job roles : ${jobroles.join(' ')}`,
    },
  ] as MessageType[];

  const resp = await extractJson(prompt);
  return JSON.parse(resp);
};
