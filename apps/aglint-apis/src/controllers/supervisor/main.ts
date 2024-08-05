/* eslint-disable no-console */
import {Request, Response} from 'express';
import {candidateAvailabilityRequestAgentChain} from './teams/scheduling/graph';

import {HumanMessage} from '@langchain/core/messages';
import {AIMessage} from 'langchain/schema';

export async function agentSupervisor(req: Request, res: Response) {
  const {msg, recruiter_id, aihistory} = req.body;
  const results = [];

  const resultStream = (
    await candidateAvailabilityRequestAgentChain({recruiter_id})
  ).stream(
    {
      messages: aihistory.map(
        (item: {type: 'user' | 'assistant'; value: string}) =>
          item.type === 'user'
            ? new HumanMessage(item.value)
            : new AIMessage(item.value)
      ),
    },
    {recursionLimit: 10}
  );

  for await (const step of await resultStream) {
    if (!step.__end__) {
      results.push(step);
      console.log(JSON.stringify(step, null, 2));
    }
  }

  let aiMessages;
  const alterResults = results
    .map(item => {
      const key = Object.keys(item).find(key => key !== 'supervisor');
      if (key) {
        aiMessages = item[key].messages[0];
        return {
          team: key,
          message: item[key].messages[0].content,
          function: item[key].messages[0].name,
        };
      }
      return null;
    })
    .filter(Boolean);

  return res.status(200).json({
    aihistory: [new HumanMessage(msg), aiMessages],
    display: alterResults,
  });
}
