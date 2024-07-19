import {envConfig} from '../../config';
import {ChatPromptTemplate, MessagesPlaceholder} from '@langchain/core/prompts';
import {ChatOpenAI} from '@langchain/openai';
import {AgentExecutor} from 'langchain/agents';
import {formatToOpenAIFunctionMessages} from 'langchain/agents/format_scratchpad';
import {OpenAIFunctionsAgentOutputParser} from 'langchain/agents/openai/output_parser';
import {RunnableSequence} from '@langchain/core/runnables';

import {AIMessage, HumanMessage} from 'langchain/schema';
import {agentPrompt} from './agentPrompt';
import {convertToOpenAIFunction} from '@langchain/core/utils/function_calling';
import {sendSelfSchedulingLink} from './tools/sendSelfSchedulingLink';
import {findCandidateInSystem} from './tools/findCandidateInSystem';
const MEMORY_KEY = 'chat_history';

export async function agentHandler(payload: {
  msg: string;
  history: {type: 'user' | 'agent'; value: string}[];
}) {
  const llm = new ChatOpenAI({
    // modelName: 'gpt-3.5-turbo-0125',
    modelName: 'gpt-4o',
    temperature: 0.7,
    verbose: true,
    apiKey: envConfig.OPENAI_APIKEY,
    streaming: true,
  });

  const chat_history = payload.history.map(message => {
    if (message.type === 'user') {
      return new HumanMessage(message.value);
    } else {
      return new AIMessage(message.value);
    }
  });
  const memoryPrompt = ChatPromptTemplate.fromMessages([
    ['system', agentPrompt()],
    new MessagesPlaceholder(MEMORY_KEY),
    ['user', '{input}'],
    new MessagesPlaceholder('agent_scratchpad'),
  ]);

  const tools = [findCandidateInSystem(), sendSelfSchedulingLink()];

  const modelWithFunctions = llm.bind({
    functions: tools.map(tool => convertToOpenAIFunction(tool)),
  });

  const agentWithMemory = RunnableSequence.from([
    {
      agent_scratchpad: i => formatToOpenAIFunctionMessages(i.steps),
      input: i => i.input,
      chat_history: i => i.chat_history,
    },
    memoryPrompt,
    modelWithFunctions,
    new OpenAIFunctionsAgentOutputParser(),
  ]);

  const executorWithMemory = AgentExecutor.fromAgentAndTools({
    agent: agentWithMemory,
    verbose: false,
    tools,
  });

  const result = await executorWithMemory.invoke({
    input: payload.msg,
    chat_history,
  });

  chat_history.push(new HumanMessage(payload.msg));
  chat_history.push(new AIMessage(result.output));

  const new_history = [];

  for (const chat of chat_history) {
    if (chat instanceof AIMessage) {
      new_history.push({
        type: 'assistant',
        value: chat.content,
      });
    } else if (chat instanceof HumanMessage) {
      new_history.push({
        type: 'user',
        value: chat.content,
      });
    }
  }

  return {new_history};
}
