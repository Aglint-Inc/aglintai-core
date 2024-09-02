import axios from 'axios';

import { type MessageType } from '../types';

export const generatejdToScoreJson = async (jdText: string) => {
  const prompts: MessageType[] = [
    {
      role: 'system',
      content: `
You're an helpful assistant. You're given a job description, 
Analyze the job description provided and categorize the roles,responsibilities, requirements, skills, education into "must-have" and "preferred".

You're given a job description, and your task is to extract and return the information in the following JSON format:

export type JsonItemType = {
  field: string;
  isMustHave: boolean;  // If the field is absolutely necessary, then the value is true; otherwise, it's false.
};

export type JdJson = {
  roles: JsonItemType[]; // previous roles and number of years.
  responsibilities: JsonItemType[]; // responsibilities mentioned in job description.
  requirements: JsonItemType[]; // requirements ( exclude degree or skill mentioned in the requirements ) .
  jobLevel:enum // 'Fresher-level', 'Associate-level', 'Mid-level', 'Senior-level', 'Executive-level',
  skills: JsonItemType[]; // Each Skill mentioned in roles, reponsibilities and requirements and whether they are a must-have.
  educations: JsonItemType[]; // Each Education degree mentioned in roles, reponsibilities and requirements and whether they are a must-have .
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
