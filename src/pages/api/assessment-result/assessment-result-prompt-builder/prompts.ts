import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources';

import { AssessmentResult } from '@/src/queries/assessment/types';

import { openai } from '../config';
import { AssessmentResponse } from '../result';
//enum(low, medium, high) # These are the levels of similarity.
const GET_QNA_PROMPT = (response: AssessmentResponse) => {
  if (response.type !== 'qna') return null;
  return {
    system: `You are an assisting AI, tasked  with comparing a candidates's answer and with an expected answer and determine if the candidate's answer is similar to the expected answer. Provided a response as the JSON format provided:
-----
{
    rating: number # A rating number between 0 through 10
} 
-----
`,
    user: `-----

Candidate's answer: ${response.answer.label}

-----

Expected's answer: ${response.question.answer.label}

-----
`,
  };
};

export const getQnaPrompt = async (response: AssessmentResponse) => {
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
  return (
    JSON.parse(
      result.choices[0].message.content,
    ) as any as AssessmentResult['result'][number]
  ).rating;
};
