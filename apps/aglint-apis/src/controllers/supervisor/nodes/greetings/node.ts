import {DynamicStructuredTool} from 'langchain/tools';
import {
  createAgent,
  runAgentNode,
} from 'src/controllers/supervisor/utils/helper';
import {llm} from 'src/controllers/supervisor/utils/llm';
import {TeamState} from 'src/controllers/supervisor/utils/state';
import z from 'zod';

export const greetingsNode = async ({state}: {state: TeamState}) => {
  const tools = [
    new DynamicStructuredTool({
      name: 'greetings',
      description: 'Greet the user.',
      schema: z.object({}),
      func: async () => {
        return 'Hello! How can I help you today?';
      },
    }),
    new DynamicStructuredTool({
      name: 'capability',
      description: 'capability of assistant',
      schema: z.object({}),
      func: async () => {
        return (
          'I can help you list interview types.' +
          'I can also help you list upcoming or unconfirmed scheduled interviews.'
        );
      },
    }),
  ];

  const greetingAgent = await createAgent(
    llm,
    tools,
    'You are an greeting assistant. call greetings tool to greet the user . call capability tool if user wants to know the capability of assistant.'
  );
  return runAgentNode({
    state,
    agent: greetingAgent,
    name: 'greetingAgent',
  });
};
