import { type MessageType } from '../types';
import { getAIResponse } from '.';

export type JDGenParams = {
  companyOverview?: string;
  compnayValues?: string;
  benifits?: string;
  jobTitle: string;
  company: string;
  workPlaceType: string;
  location: string;
  jobType: string;
};

export const generateJobDescription = async ({
  benifits,
  company,
  companyOverview,
  compnayValues,
  jobTitle,
  jobType,
  location,
  workPlaceType,
}: JDGenParams) => {
  let userPrompt = '';

  if (companyOverview)
    userPrompt = `
Company Overview : 
${companyOverview}

------
`;

  if (compnayValues) {
    userPrompt += `

Company Values :
${compnayValues}

------
`;
  }

  if (benifits) {
    userPrompt += `

Company Benifits : 
${benifits}

------

`;
  }

  userPrompt += `

Here is the jobtitle : ${jobTitle},
Company name : ${company},
Workplace Type : ${workPlaceType},
Work Location : ${location},
job type : ${jobType},


`;

  const prompt = [
    {
      role: 'system',
      content: `
Your a Helpfull Assistant.

Your'e given a details about a job post in a company.

* Generate Job description in html( use h5 tag for section heading, and bullet points for each section description ).
* job description should include fields exactly in the given order
  - Company overview, 
  - Responsibilities,
  - Qualification,
  - Benifits
  - Company Values

* Donot include Job Description title in the top.
`,
    },
    {
      role: 'user',
      content: userPrompt,
    },
  ] as MessageType[];

  const resp = await getAIResponse(prompt);
  return resp;
};
