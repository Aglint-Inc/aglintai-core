import { extractJson } from '../addNewJob';
import { type MessageType } from '../types';

export const similarSkills = async (skills: string[]) => {
  const prompt = [
    {
      role: 'system',
      content: `
       * your given a set skills your job is to generate additional 5 skills closely related to the given.
       * only repond in the json format following the schema
        {
          related_skills: string[],
        }
       `,
    },
    {
      role: 'user',
      content: `here are the skills : ${skills.join(' ')}`,
    },
  ] as MessageType[];

  const resp = await extractJson(prompt);
  return JSON.parse(resp);
};
