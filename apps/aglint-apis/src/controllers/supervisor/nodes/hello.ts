import {RunnableConfig} from '@langchain/core/runnables';
import {HumanMessage} from 'langchain/schema';
import {createAgent} from '../utils/createagent';
import {AgentStateChannels} from '../utils/initiate';
import {llm} from '../utils/llm';

import {DynamicStructuredTool} from '@langchain/core/tools';
import z from 'zod';

const getWordLengthTool = new DynamicStructuredTool({
  name: 'get_word_length',
  description: 'Returns the length of a word.',
  schema: z.object({
    word: z.string(),
  }),
  func: async ({word}) => word.length.toString(),
});

const tools = [getWordLengthTool];

export const getWorkLengthNode = async (
  state: AgentStateChannels,
  config?: RunnableConfig
) => {
  const getWorkLengthAgent = await createAgent(llm, [tools], 'Get word length');

  const result = await getWorkLengthAgent.invoke(state, config);
  return {
    messages: [
      new HumanMessage({content: result.output, name: 'get_word_length'}),
    ],
  };
};
