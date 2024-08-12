/* eslint-disable no-console */
import {Request, Response} from 'express';
import {agentChain} from './graph';

import {AIMessage, HumanMessage} from '@langchain/core/messages';
import {handleResults, saveToDB} from './utils/savetodb';
import {ApiBodyAgentSupervisor, CallBackAll} from '@aglint/shared-types';

export async function agentSupervisor(req: Request, res: Response) {
  const {
    recruiter_id,
    history,
    user_id,
    jobs,
    is_test = false,
  } = req.body as ApiBodyAgentSupervisor;
  const results = [];
  try {
    let payloadCallback: CallBackAll[] = [];
    const callback = (x: CallBackAll) => {
      payloadCallback = [...payloadCallback, x];
    };

    const resultStream = (
      await agentChain({recruiter_id, callback, user_id, job_id: jobs[0]?.id})
    ).stream(
      {
        messages: history.map(
          (item: {type: 'user' | 'assistant'; content: string}) =>
            item.type === 'user'
              ? new HumanMessage(item.content)
              : new AIMessage(item.content, {
                  additional_kwargs: {} as AIMessage['additional_kwargs'],
                })
        ),
      },
      {recursionLimit: 10}
    );

    for await (const step of await resultStream) {
      if (!step.__end__) {
        // console.log(JSON.stringify(step, null, 2));
        results.push(step);
      }
    }

    const alterResults = results
      .map(item => {
        const key = Object.keys(item).find(key => key !== 'supervisor');
        if (key) {
          const tool_name = item[key]?.messages[0]?.lc_kwargs?.tool;
          let payload = null;

          if (tool_name) {
            if (payloadCallback.length > 0) {
              payload = payloadCallback;
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

    const resSave = await handleResults({alterResults, is_test, user_id});
    return res.status(200).json(resSave);
  } catch (e) {
    console.error(e);
    await saveToDB({
      content: 'Unable to process the request',
      user_id,
      function_name: null,
      metadata: null,
    });
    return res.status(200).json({
      user_id,
      content: 'Unable to process the request',
      created_at: new Date().toISOString(),
      id: crypto.randomUUID(),
      type: 'agent',
      function: null,
      metadata: null,
    });
  }
}
