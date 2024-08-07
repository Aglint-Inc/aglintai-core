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
    new DynamicStructuredTool({
      name: 'capability',
      description: 'capability of assistant',
      schema: z.object({}),
      func: async () => {
        return (
          'I can help you list interview types. \n\n' +
          'I can also help you list upcoming or unconfirmed scheduled interviews.\n\n' +
          'I can also help you list all jobs for a user.\n\n' +
          'I can also help you list all users or interviewers inside an interview type.\n\n' +
          'I can also help you get hiring team of a given job.\n\n'
        );
      },
    }),
  ];

  const greetingAgent = await createAgent(
    llm,
    tools,
    'You are an greeting assistant. ' +
      'Call greetings tool when user sya hi or hello . \n\n' +
      ' Call capability tool if user wants to know the capability of assistant. \n\n'
  );
  return runAgentNode({
    state,
    agent: greetingAgent,
    name: 'greetingAgent',
  });
};
