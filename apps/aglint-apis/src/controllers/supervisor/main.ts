/* eslint-disable no-console */
import {Request, Response} from 'express';
import {agentChain} from './graph';

import {HumanMessage} from '@langchain/core/messages';
import {CallBackPayload} from './types';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import {ApiBodyAgentSupervisor} from '@aglint/shared-utils';
import {FunctionNames} from '@aglint/shared-types';

export async function agentSupervisor(req: Request, res: Response) {
  const {recruiter_id, history, user_id} = req.body as ApiBodyAgentSupervisor;
  const results = [];

  let payloadCallback: CallBackPayload = null;
  const callback = (x: CallBackPayload) => {
    payloadCallback = x;
  };
  const resultStream = (await agentChain({recruiter_id, callback})).stream(
    {
      messages: history.map(
        (item: {type: 'user' | 'assistant'; content: string}) =>
          item.type === 'user'
            ? new HumanMessage(item.content)
            : new HumanMessage(item.content)
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

  if (alterResults.length === 0) {
    const resSave = await saveToDB({
      content: 'Sorry unable to process your request. Please try again later.',
      user_id,
      function_name: null,
      metadata: null,
    });

    return res.status(200).json(resSave);
  } else {
    const lastMessage = alterResults[alterResults.length - 1];
    const resSave = await saveToDB({
      content: lastMessage.message,
      user_id,
      function_name: lastMessage.function,
      metadata: lastMessage.payload,
    });
    return res.status(200).json(resSave);
  }
}

const saveToDB = async ({
  content,
  user_id,
  function_name,
  metadata,
}: {
  content: string;
  user_id: string;
  function_name: FunctionNames;
  metadata: string;
}) => {
  return (
    await supabaseAdmin
      .from('user_chat')
      .insert({
        type: 'agent',
        content,
        user_id,
        function: function_name,
        metadata,
      })
      .select()
      .throwOnError()
  ).data[0];
};
