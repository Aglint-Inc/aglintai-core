import { getAIResponse } from '.';
import { MessageType } from '../types';

export const generateJobDescription = async (jobTitle: string) => {
  const prompt = [
    {
      role: 'system',
      content:
        'Your a Helpfull Assistant. Generate 10 Skills required for the given Proffession.Each skill should be maximum of length 4 words',
    },
    {
      role: 'system',
      content: `Here is the Profession ${jobTitle}`,
    },
  ] as MessageType[];

  const resp = await getAIResponse(prompt);
  const jsonData = JSON.parse(resp) as { skills: string[] };
  return jsonData.skills;
};
