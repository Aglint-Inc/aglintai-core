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
      description: 'Greet the user with a message.',
      schema: z.object({}),
      func: async () => {
        return 'Hello! How can I help you today?';
      },
    }),
  ];

  const greetingAgent = await createAgent(
    llm,
    tools,
    'You are an greeting assistant. ' +
      'Call greetings tool when user sya hi or hello . \n\n'
  );
  return runAgentNode({
    state,
    agent: greetingAgent,
    name: 'greetingAgent',
  });
};
