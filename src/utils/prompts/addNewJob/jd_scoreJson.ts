import axios from 'axios';

import { MessageType } from '../types';

export const generatejdToScoreJson = async (jdText: string) => {
  const prompts: MessageType[] = [
    {
      role: 'system',
      content: `Your given a job description, your job is to extract and return in this following JSON format

      export type jsonItemType = {
        field: string;
        isMustHave: boolean;
      };

      export type JdJson = {
        responsibilities: jsonItemType[];
        roles: jsonItemType[];
        skills: jsonItemType[];
        educations: jsonItemType[];
      };

`,
    },
    {
      role: 'user',
      content: `
Here is the Job Description
${jdText}
`,
    },
  ];

  const { data } = await axios.post('/api/ai/queryToJson', {
    prompts,
  });
  return JSON.parse(data);
};
