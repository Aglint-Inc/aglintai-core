import { getAIResponse } from '.';
import { MessageType } from '../types';
import { requestJson } from '../utils';

export const generateInterviewQns = async (jobDescription, filter: string) => {
  const interviewQns = [
    'Sample Question 1',
    'Sample Question 2',
    'Sample Question 3',
    'Sample Question 4',
    'Sample Question 5',
  ];

  const prompt = [
    {
      role: 'system',
      content: requestJson(
        `Your a Helpfull Assistant. Create 5 ${filter} fit interview questions from the given job description`,
        { interviewQns },
      ),
    },
    {
      role: 'system',
      content: `

      Here is the Job Description : 
      ----------
     
      ${jobDescription}

`,
    },
  ] as MessageType[];
  const resp = await getAIResponse(prompt);
  const jsonData = JSON.parse(resp) as { interviewQns: string[] };
  return jsonData.interviewQns;
};
