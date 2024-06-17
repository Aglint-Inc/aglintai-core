import {envConfig} from '../../config';
import {ChatPromptTemplate, MessagesPlaceholder} from '@langchain/core/prompts';
import {convertToOpenAIFunction} from '@langchain/core/utils/function_calling';
import {ChatOpenAI} from '@langchain/openai';
import {AgentExecutor} from 'langchain/agents';
import {formatToOpenAIFunctionMessages} from 'langchain/agents/format_scratchpad';
import {OpenAIFunctionsAgentOutputParser} from 'langchain/agents/openai/output_parser';
import {RunnableSequence} from '@langchain/core/runnables';

import {AIMessage, HumanMessage} from 'langchain/schema';
import {EmailAgentPayload} from '../../types/email_agent/apiPayload.types';
import {emailAgentPrompt} from './emailAgentPrompt';
import {findSlots} from './tools/findSlots';
import {bookInterviewSlot} from './tools/bookInterviewSlot';
import {cancelInterviewSlot} from './tools/cancelInterview';
import {convertAgentResponseToEmailTemplate} from './tools/utils';
const MEMORY_KEY = 'chat_history';

import {LoggerType} from '../../utils/scheduling_utils/getCandidateLogger';
import {findTimeZone} from './tools/find-time-zone';
import {getJobDescription} from './tools/getJobDescription';

export async function emailAgentHandler(
  {history, payload}: EmailAgentPayload,
  candLogger: LoggerType
) {
  const llm = new ChatOpenAI({
    // modelName: 'gpt-3.5-turbo-0125',
    modelName: 'gpt-4-turbo-preview',
    temperature: 0.7,
    verbose: envConfig.NODE_ENV === 'development.local',
    apiKey: envConfig.OPENAI_APIKEY,
  });

  const chat_history = history.map(message => {
    if (message.type === 'user') {
      return new HumanMessage(message.value);
    } else {
      return new AIMessage(message.value);
    }
  });
  const memoryPrompt = ChatPromptTemplate.fromMessages([
    ['system', emailAgentPrompt(payload)],
    new MessagesPlaceholder(MEMORY_KEY),
    ['user', '{input}'],
    new MessagesPlaceholder('agent_scratchpad'),
  ]);

  const tools = [
    findSlots(payload, candLogger),
    bookInterviewSlot(payload, candLogger),
    cancelInterviewSlot(payload, candLogger),
    findTimeZone(payload, candLogger),
    getJobDescription(payload),
  ];

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
    tools,
    verbose: false,
  });

  const result = await executorWithMemory.invoke({
    input: payload.new_cand_msg,
    chat_history,
  });

  chat_history.push(new HumanMessage(payload.new_cand_msg));
  chat_history.push(
    new AIMessage(convertAgentResponseToEmailTemplate(result.output))
  );

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
