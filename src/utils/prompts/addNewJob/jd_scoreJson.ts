import axios from 'axios';

import { MessageType } from '../types';

export const generatejdToScoreJson = async (jdText: string) => {
  const prompts: MessageType[] = [
    {
      role: 'system',
      content: `
You're given a job description, and your task is to extract and return the information in the following JSON format:

export type JsonItemType = {
  field: string;
  isMustHave: boolean;  // If the field is absolutely necessary, then the value is true; otherwise, it's false.
};

export type JdJson = {
  responsibilities: JsonItemType[]; // Responsibilities mentioned in the job description and whether they are a must-have.
  roles: JsonItemType[]; // Roles mentioned in the job description and whether they are a must-have.
  requirements: JsonItemType[]; // Requirements mentioned in the job description and whether they are a must-have.
  skills: JsonItemType[]; // Skills mentioned in roles,reponsibilities and requirements and whether they are a must-have.
  educations: JsonItemType[]; // Educations mentioned in the job description and whether they are a must-have.
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
