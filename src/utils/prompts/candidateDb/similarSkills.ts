import { extractJson } from '../addNewJob';
import { MessageType } from '../types';
import { requestJson } from '../utils';

export const similarSkills = async (skills: string[]) => {
  const prompt = [
    {
      role: 'system',
      content: `
       * your given a set skills your job is to generate additional 5 skills closely related to the given.
       `,
    },
    {
      role: 'user',
      content: requestJson(`here is the skills`, { related_skills: skills }),
    },
  ] as MessageType[];

  const resp = await extractJson(prompt);
  return JSON.parse(resp);
};
