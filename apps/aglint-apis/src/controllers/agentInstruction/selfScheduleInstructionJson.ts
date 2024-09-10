import {ChatOpenAI} from '@langchain/openai';
import {JsonOutputFunctionsParser} from 'langchain/output_parsers';
import {HumanMessage} from '@langchain/core/messages';
import {DynamicStructuredTool} from 'langchain/tools';
import {AiResponseSchema} from './schema';
import {convertToOpenAIFunction} from '@langchain/core/utils/function_calling';
import {envConfig} from 'src/config';
import {dayjsLocal} from '@aglint/shared-utils';

export const extractSelfScheduleJson = async ({
  company_tz,
  inputStr,
}: {
  inputStr: string;
  company_tz: string;
}) => {
  // Instantiate the parser
  const parser = new JsonOutputFunctionsParser();

  // Instantiate the ChatOpenAI class
  const model = new ChatOpenAI({
    model: 'gpt-4',
    apiKey: envConfig.OPENAI_APIKEY,
  });

  const runnable = model
    .bind({
      functions: [extractionTool].map(t =>
        convertToOpenAIFunction(t({company_tz}))
      ),
      function_call: {name: 'extractor'},
    })
    .pipe(parser);

  const result = await runnable.invoke([new HumanMessage(inputStr)]);

  return result;
};

export const extractionTool = ({company_tz}: {company_tz: string}) => {
  return new DynamicStructuredTool({
    name: 'extractor',
    description: `Extracts fields from the input. current date time is ${dayjsLocal().tz(company_tz).format('DD MMM YYYY HH:mm')}`,
    schema: AiResponseSchema,
    func: async args => {
      return JSON.stringify(args);
    },
  });
};
