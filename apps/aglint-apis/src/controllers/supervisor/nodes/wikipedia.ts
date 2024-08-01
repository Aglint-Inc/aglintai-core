import {RunnableConfig} from '@langchain/core/runnables';
import {HumanMessage} from 'langchain/schema';
import {createAgent} from '../utils/createagent';
import {AgentStateChannels} from '../utils/initiate';
import {llm} from '../utils/llm';

import {WikipediaQueryRun} from '@langchain/community/tools/wikipedia_query_run';
const wikiTool = new WikipediaQueryRun({
  topKResults: 3,
  maxDocContentLength: 4000,
});

export const wikiNode = async (
  state: AgentStateChannels,
  config?: RunnableConfig
) => {
  const wikiAgent = await createAgent(
    llm,
    [wikiTool],
    'You are a wiki search. You may use the Wikipedia search engine for important information.'
  );

  const result = await wikiAgent.invoke(state, config);
  return {
    messages: [
      new HumanMessage({content: result.output, name: 'WikiSearcher'}),
    ],
  };
};
