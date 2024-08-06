/* eslint-disable no-console */
import {Request, Response} from 'express';
import {agentChain} from './graph';

import {HumanMessage} from '@langchain/core/messages';
import {CallBackPayload} from './types';

type Message = {
  value: string;
  type: 'user' | 'assistant';
};

export type ApiBodyAgentSupervisor = {
  recruiter_id: 'string';
  history: Message[];
};

export async function agentSupervisor(req: Request, res: Response) {
  const {recruiter_id, history} = req.body;
  const results = [];

  let payloadCallback: CallBackPayload = null;

  const callback = (x: CallBackPayload) => {
    payloadCallback = x;
  };

  const resultStream = (await agentChain({recruiter_id, callback})).stream(
    {
      messages: history.map(
        (item: {type: 'user' | 'assistant'; value: string}) =>
          item.type === 'user'
            ? new HumanMessage(item.value)
            : new HumanMessage(item.value)
      ),
    },
    {recursionLimit: 10}
  );

  for await (const step of await resultStream) {
    if (!step.__end__) {
      results.push(step);
      // console.log(JSON.stringify(step, null, 2));
    }
  }

  const alterResults = results
    .map(item => {
      const key = Object.keys(item).find(key => key !== 'supervisor');

      if (key) {
        const tool_name = item[key]?.messages[0]?.lc_kwargs?.tool;
        let payload = null;

        if (tool_name) {
          if (payloadCallback?.function_name === tool_name) {
            payload = payloadCallback.payload;
          }
        }
        return {
          team: key,
          message: item[key].messages[0]?.content,
          function: tool_name || null,
          payload,
        };
      }
      return null;
    })
    .filter(Boolean);

  return res.status(200).json({
    display: alterResults,
  });
}
