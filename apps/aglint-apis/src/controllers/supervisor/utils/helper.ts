/* eslint-disable prefer-template */
import {HumanMessage} from '@langchain/core/messages';
import {ChatPromptTemplate, MessagesPlaceholder} from '@langchain/core/prompts';
import {Runnable} from '@langchain/core/runnables';
import {StructuredTool} from '@langchain/core/tools';
import {ChatOpenAI} from '@langchain/openai';
import {AgentExecutor, createOpenAIToolsAgent} from 'langchain/agents';
import {JsonOutputToolsParser} from 'langchain/output_parsers';
import {TeamState} from './state';

export async function createAgent(
  llm: ChatOpenAI,
  tools: StructuredTool[],
  systemPrompt: string
) {
  const combinedPrompt = systemPrompt;
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
  const agent = await createOpenAIToolsAgent({
    llm,
    tools,
    prompt,
  });
  return new AgentExecutor({agent, tools, returnIntermediateSteps: true});
}

export async function runAgentNode(params: {
  state: TeamState;
  agent: Runnable;
  name: string;
}) {
  const {state, agent, name} = params;
  const result = await agent.invoke(state);

  return {
    messages: [
      new HumanMessage({
        content: result.output,
        name,
        tool: result?.intermediateSteps[0]?.action?.tool,
      }),
    ],
  };
}

export async function createTeamSupervisor(
  llm: ChatOpenAI,
  systemPrompt: string,
  members: string[]
): Promise<Runnable> {
  const options = ['FINISH', ...members];
  const functionDef = {
    name: 'route',
    description: 'Select the next role.',
    parameters: {
      title: 'routeSchema',
      type: 'object',
      properties: {
        next: {
          title: 'Next',
          anyOf: [{enum: options}],
        },
      },
      required: ['next'],
    },
  };
  const toolDef = {
    type: 'function' as const,
    function: functionDef,
  };
  let prompt = await ChatPromptTemplate.fromMessages([
    ['system', systemPrompt],
    new MessagesPlaceholder('messages'),
    [
      'system',
      'Given the conversation above, who should act next? Or should we FINISH? Select one of: {options}',
    ],
  ]);

  prompt = await prompt.partial({
    options: options.join(', '),
    team_members: members.join(', '),
  });

  const supervisor = prompt
    .pipe(
      llm.bind({
        tools: [toolDef],
        tool_choice: {type: 'function', function: {name: 'route'}},
      })
    )
    .pipe(new JsonOutputToolsParser())
    // select the first one
    .pipe(x => ({
      next: x[0].args.next,
      instructions: x[0].args.instructions,
    }));

  return supervisor;
}
