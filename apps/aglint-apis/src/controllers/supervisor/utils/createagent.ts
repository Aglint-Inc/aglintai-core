import {ChatPromptTemplate, MessagesPlaceholder} from '@langchain/core/prompts';
import {Runnable} from '@langchain/core/runnables';
import {ChatOpenAI} from '@langchain/openai';
import {AgentExecutor, createOpenAIToolsAgent} from 'langchain/agents';

export async function createAgent(
  llm: ChatOpenAI,
  tools: any[],
  systemPrompt: string
): Promise<Runnable> {
  // Each worker node will be given a name and some tools.
  const prompt = await ChatPromptTemplate.fromMessages([
    ['system', systemPrompt],
    new MessagesPlaceholder('messages'),
    new MessagesPlaceholder('agent_scratchpad'),
  ]);
  const agent = await createOpenAIToolsAgent({llm, tools, prompt});
  return new AgentExecutor({agent, tools});
}
