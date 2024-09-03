import axios from 'axios';

import { type MessageType } from '../types';

export const resolveAiCmd = async (
  candidateOverview,
  companyOverview,
  aiprompt,
) => {
  if (process.env.NODE_ENV === 'development') return aiprompt;
  const prompt1: MessageType[] = [
    {
      role: 'system',
      content: `
here is the candidate overview

${candidateOverview}.

here is the company overview

${companyOverview}

here is the AI COMMAND 
AI Command : ${aiprompt} .


TASK AND OUTPUT
resolve the AI COMMAND in 2 sentence max.
`,
    },
  ];

  const { data: resolvedCmd } = await axios.post('/api/ai/gpt3-5-turbo', {
    prompts: prompt1,
  });

  const prompt2: MessageType[] = [
    {
      role: 'system',
      content: `
${resolvedCmd}

take this sentence convert this to second person speech
`,
    },
  ];

  let { data: firstPersonResp } = (await axios.post('/api/ai/gpt3-5-turbo', {
    prompts: prompt2,
  })) as { data: string };

  firstPersonResp = firstPersonResp.replaceAll(`"`, '');
  return firstPersonResp;
};
