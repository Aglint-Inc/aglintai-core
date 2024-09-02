import { type MessageType } from '../types';
import { requestJson } from '../utils';
import { getAIResponse } from '.';

export const generateInterviewQns = async (
  prevQns: string[],
  jobDescription,
  filter: string,
  skills?: string[],
) => {
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
        `
  Your a Helpfull Assistant.
  You're given job description, 
  Craft 5  ${filter} based interview questions`,
        { interviewQns },
      ),
    },
    {
      role: 'user',
      content: `

      Here is the Job Description : 
      ----------
     
      ${jobDescription}


      ${
        skills &&
        `* Required Skills :
          * ${skills.join(', ')}`
      }
`,
    },
  ] as MessageType[];

  if (prevQns.length !== 0) {
    const prevQnPrompt: MessageType[] = [
      {
        role: 'assistant',
        content: JSON.stringify({ interviewQns: prevQns }),
      },
      {
        role: 'user',
        content: 'generate 5 more question',
      },
    ];
    prompt.push(prevQnPrompt[0]);
    prompt.push(prevQnPrompt[1]);
  }

  const resp = await getAIResponse(prompt);
  const jsonData = JSON.parse(resp) as { interviewQns: string[] };
  return jsonData.interviewQns;
};
