import {ChatPromptTemplate, MessagesPlaceholder} from '@langchain/core/prompts';
import {members, options} from './const';

export const formattedPrompt = async () => {
  const systemPrompt =
    'You are a supervisor tasked with managing a conversation between the' +
    ' following workers: {members}. Given the following user request,' +
    ' respond with the worker to act next. Each worker will perform a' +
    ' task and respond with their results and status. When finished,' +
    ' respond with FINISH.';

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt],
    new MessagesPlaceholder('messages'),
    [
      'system',
      'Given the conversation above, who should act next?' +
        ' Or should we FINISH? Select one of: {options}',
    ],
  ]);

  const formattedPrompt = await prompt.partial({
    options: options.join(', '),
    members: members.join(', '),
  });

  return formattedPrompt;
};
