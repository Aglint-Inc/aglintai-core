import {zodToJsonSchema} from 'zod-to-json-schema';

import {ChatOpenAI} from 'langchain/chat_models/openai';
import {PromptTemplate} from 'langchain/prompts';
import {JsonOutputFunctionsParser} from 'langchain/output_parsers';
import {schema} from './schema';
import z from 'zod';

const TEMPLATE = `Extract the requested fields from the input text only.
Do not add or generate extra information use only given text.
The field "entity" refers to the first mentioned entity in the input.
Input:
{input}`;

export const parseJson = async (currentMessageContent: string) => {
  let totalCompletionTokens = 0;
  let totalPromptTokens = 0;
  let totalExecutionTokens = 0;
  const prompt = PromptTemplate.fromTemplate(TEMPLATE);
  const model = new ChatOpenAI({
    callbacks: [
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        handleLLMEnd: (output, runId, parentRunId?, tags?) => {
          const {completionTokens, promptTokens, totalTokens} = output.llmOutput
            ?.tokenUsage || {
            completionTokens: 0,
            promptTokens: 0,
            totalTokens: 0,
          };
          totalCompletionTokens += completionTokens;
          totalPromptTokens += promptTokens;
          totalExecutionTokens += totalTokens;
        },
      },
    ],
    temperature: 0.5,
    modelName: 'gpt-3.5-turbo-1106',
    timeout: 100 * 1000, //30sec
  });
  const functionCallingModel = model.bind({
    functions: [
      {
        name: 'output_formatter',
        description: 'Should always be used to properly format output',
        parameters: zodToJsonSchema(schema),
      },
    ],
    function_call: {name: 'output_formatter'},
  });

  /**
   * Returns a chain with the function calling model.
   */
  const chain = prompt
    .pipe(functionCallingModel)
    .pipe(data => {
      // JSON.parse(data.lc_kwargs.additional_kwargs.function_call);
      return data;
    })
    .pipe(new JsonOutputFunctionsParser());

  const result = (await chain.invoke({
    input: currentMessageContent,
  })) as z.infer<typeof schema>;
  return {
    result,
    token: {totalCompletionTokens, totalPromptTokens, totalExecutionTokens},
  };
};
