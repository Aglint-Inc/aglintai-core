import { type ChatCompletion, type ChatCompletionMessageParam } from 'openai/resources';

import { type AssessmentResponse } from '../../../pages/api/assessment-result/result';
import { openai } from '../config';
import { type AssessmentAnalysisResult } from '.';

const GET_QNA_SYSTEM_PROMPT_HEADER = (expectedAnswer: string) => {
  return expectedAnswer
    ? `You are an assisting AI, tasked  with comparing a candidates's answer and with an expected answer and determine if the candidate's answer is similar to the expected answer. Provide a response as the JSON format provided:`
    : `You are an assisting AI, tasked  with analyzing a candidates's answer and to a question and determine if the candidate's answer is valid or not. Provide a response as the JSON format provided:`;
};

const GET_QNA_PROMPT = (response: AssessmentResponse) => {
  if (response.type !== 'qna') return null;
  const expectedAnswer =
    (response?.response?.label ?? null) && response.answer.label.trim() !== ''
      ? response.answer.label
      : null;
  return {
    system: `${GET_QNA_SYSTEM_PROMPT_HEADER(expectedAnswer)}
-----
{
    rating: number, # A rating number between 0 through 10
    analysis: string # An explanation/analysis for the given rating
} 
-----
`,
    user: `-----

Question: ${response.question.label}

-----

Candidate's answer: ${response.response.label}

-----
${
  expectedAnswer
    ? `

Expected answer: ${expectedAnswer}

-----`
    : ''
}
`,
  };
};

export const getQnaPrompt = async (
  response: AssessmentResponse,
): Promise<AssessmentAnalysisResult> => {
  const prompt = GET_QNA_PROMPT(response);
  const messages = Object.entries(prompt).reduce((acc, [key, value]) => {
    acc.push({ role: key as 'system' | 'user', content: value });
    return acc;
  }, [] as ChatCompletionMessageParam[]);
  const result = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    seed: 777,
    messages,
    temperature: 0.4,
    response_format: { type: 'json_object' },
  });
  return resultFormatter(result);
};

const resultFormatter = (result: ChatCompletion) => {
  return JSON.parse(
    result.choices[0].message.content,
  ) as any as AssessmentAnalysisResult;
};
