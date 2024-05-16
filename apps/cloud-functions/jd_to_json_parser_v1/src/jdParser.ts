import OpenAI from 'openai';
import { schema } from './schema';
import zodToJsonSchema from 'zod-to-json-schema';

import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { JsonOutputFunctionsParser } from 'langchain/output_parsers';

export const openai = new OpenAI({
  apiKey: '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',
});

// export const parseJdToJson = async (jd: { [key: string]: any }) => {
//   const chat_completion = await openai.chat.completions.create({
//     messages: [
//       {
//         role: 'system',
//         content: `you are a job description parsing system. you extract the information described job description and map to json schema: ${zodToJsonSchema(
//           schema
//         )} . please follow instruction described in schema description.`,
//         // you also analyze the given jd ad return suggested_education, suggested_certification, suggested_experience, and suggested_skills.
//       },
//       {
//         role: 'user',
//         content: `job description:'''${JSON.stringify(jd)}'''`,
//       },
//     ],
//     model: 'gpt-3.5-turbo-1106',
//     // functions: outputSchema,
//     // function_call: 'auto',
//     temperature: 0.8,
//     response_format: {
//       type: 'json_object',
//     },
//   });
//   const token = chat_completion.usage || {
//     completion_tokens: 0,
//     prompt_tokens: 0,
//     total_tokens: 0,
//   };
//   console.log(chat_completion.choices[0].message.content);
//   return {
//     ...JSON.parse(chat_completion.choices[0].message.content || '{}'),
//     token,
//     tokenUsed: token.total_tokens,
//   };
// };

const TEMPLATE = `Extract the requested fields from the input text only.
Do not add or generate extra information use only given text.
The field "entity" refers to the first mentioned entity in the input.
Input:

{input}`;

export const parseJdToJson = async (
  jd: { [key: string]: any },
  retry: number = 0
) => {
  let completion_tokens = 0;
  let prompt_tokens = 0;
  let total_tokens = 0;
  const prompt = PromptTemplate.fromTemplate(TEMPLATE);
  const model = new ChatOpenAI({
    callbacks: [
      {
        handleLLMEnd: (output, runId, parentRunId?, tags?) => {
          const { completionTokens, promptTokens, totalTokens } =
            output.llmOutput?.tokenUsage;
          completion_tokens += completionTokens ?? 0;
          prompt_tokens += promptTokens ?? 0;
          total_tokens += totalTokens ?? 0;
        },
      },
    ],
    temperature: 0.5,
    modelName: 'gpt-3.5-turbo-1106',
    // tokens.length < 1000 ? "gpt-3.5-turbo-0613" : "gpt-3.5-turbo-16k-0613",
    // verbose: true,
    timeout: retry === 0 ? 50000 : 30000, //30sec
  });
  const functionCallingModel = model.bind({
    functions: [
      {
        name: 'output_formatter',
        description: 'Should always be used to properly format output',
        parameters: zodToJsonSchema(schema),
      },
    ],
    function_call: { name: 'output_formatter' },
  });

  /**
   * Returns a chain with the function calling model.
   */
  const chain = prompt
    .pipe(functionCallingModel)
    .pipe(new JsonOutputFunctionsParser());

  const result = schema.parse(
    await chain.invoke({
      input: JSON.stringify({
        title: jd.job_title,
        description: jd.job_description,
      }),
    })
  );

  return {
    result: {
      ...result,
      skills: [...jd.skills, ...[...(result?.skills || [])]],
    },
    token: { completion_tokens, prompt_tokens, total_tokens },
  };
};
