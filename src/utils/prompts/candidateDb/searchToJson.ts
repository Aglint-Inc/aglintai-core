import { getAIResponse } from '../addNewJob';
import { MessageType } from '../types';
import { requestJson } from '../utils';

export const searchQueryToJson = async (searchQuery: string) => {
  const schema = {
    candidatejobTitles: ['AWS Architect', 'DevOps'],
    candidateLocations: ['Las vegas', 'california'],
    candidateLanguages: ['spanish ', 'hindi '],
    candidatePreviousCompanies: ['Facebook', 'Mercedes'],
    candidateUniversities: ['Harward', 'MIT'],
  };

  const prompt = [
    {
      role: 'system',
      content: requestJson(
        `
        *Your given a candidates Search Query and a JSON Schema . 
        * your job is to extract the information from the query and respond with schema that is provided
        * if the input is not valid return with empty values.
      `,
        schema,
      ),
    },
    {
      role: 'user',
      content: `
      Here is the search Query : 
      ${searchQuery}.
      `,
    },
  ] as MessageType[];

  const resp = await getAIResponse(prompt);
  return JSON.parse(resp);
};
