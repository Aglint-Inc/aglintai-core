import { getAIResponse } from '.';
import { MessageType } from '../types';

export const generateJobDescription = async (
  jobTitle: string,
  company: string,
  workPlaceType: string,
  location: string,
  jobType: string,
) => {
  const prompt = [
    {
      role: 'system',
      content: `
Your a Helpfull Assistant.

Your'e given a details about a job post in a company.

Generate Job description in html( donot use h1 , h2 tags ).

job description should include fields exactly in the given order
  - overview, 
  - Company details,
  - Responsibilities,
  - Qualification,
  - Skills,
  - Benifits
`,
    },
    {
      role: 'user',
      content: `
Here is the jobtitle : ${jobTitle},
Company name : ${company},
Workplace Type : ${workPlaceType},
Work Location : ${location},
job type : ${jobType},
`,
    },
  ] as MessageType[];

  const resp = await getAIResponse(prompt);
  return resp;
};
