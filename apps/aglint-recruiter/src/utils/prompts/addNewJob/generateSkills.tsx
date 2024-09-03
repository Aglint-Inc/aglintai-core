import { type MessageType } from '../types';
import { requestJson } from '../utils';
import { getAIResponse } from '.';

const skills = {
  skills: ['Sample skill1', 'Sample skill2', 'Sample skill3'],
};

export const generateSkills = async (jobTitle: string) => {
  const prompt = [
    {
      role: 'system',
      content: requestJson(
        'Your a Helpfull Assistant. Generate 10 Skills required for the given Proffession.Each skill should be maximum of length 4 words',
        skills,
      ),
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
