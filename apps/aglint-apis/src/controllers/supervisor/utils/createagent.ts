import {ChatPromptTemplate, MessagesPlaceholder} from '@langchain/core/prompts';
import {Runnable} from '@langchain/core/runnables';
import {ChatOpenAI} from '@langchain/openai';
import {AgentExecutor, createOpenAIToolsAgent} from 'langchain/agents';
import {StructuredTool} from 'langchain/tools';

export async function createAgent(
  llm: ChatOpenAI,
  tools: StructuredTool[],
  systemPrompt: string
): Promise<Runnable> {
  const combinedPrompt =
    systemPrompt +
    '\nWork autonomously according to your specialty, using the tools available to you.' +
    ' Do not ask for clarification.' +
    ' Your other team members (and other teams) will collaborate with you with their own specialties.' +
    ' You are chosen for a reason! You are one of the following members: {members}.';
  const toolNames = tools.map(t => t.name).join(', ');
  const prompt = await ChatPromptTemplate.fromMessages([
    ['system', combinedPrompt],
    new MessagesPlaceholder('messages'),
    new MessagesPlaceholder('agent_scratchpad'),
    [
      'system',
      [
        'Supervisor instructions: {instructions}\n' +
          `Remember, you individually can only use these tools: ${toolNames}` +
          '\n\nEnd if you have already completed the requested task. Communicate the work completed.',
      ].join('\n'),
    ],
  ]);
  const agent = await createOpenAIToolsAgent({llm, tools, prompt});
  return new AgentExecutor({agent, tools});
}
