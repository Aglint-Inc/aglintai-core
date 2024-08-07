/* eslint-disable no-console */
import {Request, Response} from 'express';
import {agentChain} from './graph';

import {ApiBodyAgentSupervisor, CallBackAll} from '@aglint/shared-utils';
import {AIMessage, HumanMessage} from '@langchain/core/messages';
import {handleResults} from './utils/savetodb';

export async function agentSupervisor(req: Request, res: Response) {
  try {
    const {
      recruiter_id,
      history,
      user_id,
      jobs,
      is_test = false,
    } = req.body as ApiBodyAgentSupervisor;
    const results = [];

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
                  additional_kwargs: {
                    tool_calls: [],
                  } as AIMessage['additional_kwargs'],
                })
        ),
      },
      {recursionLimit: 10}
    );

    for await (const step of await resultStream) {
      console.log(JSON.stringify(step, null, 2));
      if (!step.__end__) {
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
    return res.status(500).json('Failed to perform the action');
  }
}
