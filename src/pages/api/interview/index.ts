import OpenAI from 'openai';

import {
  buildAllResumeFeedbackPrompts,
  INTERVIEW_FEEDBACK_PARAMETERS,
} from './functions';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export default async function handler(req, res) {
  const { interviewData } = req.body;
  const prompts = buildAllResumeFeedbackPrompts(interviewData);
  const promises = prompts.map((prompt) => {
    return openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0613',
      messages:
        prompt.messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
      functions: prompt.functions,
      temperature: prompt.temperature,
    });
  });
  const responses = await Promise.allSettled([...promises]);
  const feedbackSections = new Set(
    Object.keys(INTERVIEW_FEEDBACK_PARAMETERS).map((entry) =>
      entry.toLowerCase(),
    ),
  );
  const results = await responses.reduce(
    (acc, curr) => {
      if (
        curr.status === 'fulfilled' &&
        curr.value.choices[0].message.function_call
      ) {
        const name = curr.value.choices[0].message.function_call.name;
        const args = JSON.parse(
          curr.value.choices[0].message.function_call.arguments,
        );
        acc.results.push({
          [name]: args,
        });
        acc.tokens += curr.value.usage.total_tokens;
        feedbackSections.delete(name);
      }
      return acc;
    },
    { results: [], tokens: 0 },
  );
  res.status(200).json({ data: results, error: [...feedbackSections] });
}
