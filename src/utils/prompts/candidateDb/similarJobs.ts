import { extractJson } from '../addNewJob';
import { MessageType } from '../types';
import { requestJson } from '../utils';

export const similarJobs = async (jobroles: string[]) => {
  const prompt = [
    {
      role: 'system',
      content: `
       * your given a list of job roles your job is to generate 5 list of jobs that are closely related to the given .
       `,
    },
    {
      role: 'user',
      content: requestJson(`here are the job roles`, {
        related_jobs: jobroles,
      }),
    },
  ] as MessageType[];

  const resp = await extractJson(prompt);
  return JSON.parse(resp);
};
