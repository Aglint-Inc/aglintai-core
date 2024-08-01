import {RunnableConfig} from '@langchain/core/runnables';
import {HumanMessage} from 'langchain/schema';
import {createAgent} from '../utils/createagent';
import {AgentStateChannels} from '../utils/initiate';
import {llm} from '../utils/llm';

import {DynamicTool} from '@langchain/core/tools';

const customTool = new DynamicTool({
  name: 'get_word_length',
  description: 'Returns the length of a word.',
  func: async (input: string) => input.length.toString(),
});

const tools = [customTool];

export const helloNode = async (
  state: AgentStateChannels,
  config?: RunnableConfig
) => {
  const wikiAgent = await createAgent(
    llm,
    [tools],
    'You have to say hello to the baby.'
  );

  const result = await wikiAgent.invoke(state, config);
  return {
    messages: [new HumanMessage({content: result.output, name: 'Hello'})],
  };
};
