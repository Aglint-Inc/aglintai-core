/* eslint-disable no-console */
import {HumanMessage} from '@langchain/core/messages';
import {Request, Response} from 'express';
import {superGraphChainFunction} from './supergraph';
import {scheduleInterviewChainFunction} from './teams/scheduling/graph';

export async function agentSupervisor(req: Request, res: Response) {
  const {msg, recruiter_id} = req.body;
  const results = [];
  const resultStream = (
    await scheduleInterviewChainFunction({recruiter_id})
  ).stream(
    {
      messages: [new HumanMessage(msg)],
    },
    {recursionLimit: 5}
  );

  for await (const step of await resultStream) {
    if (!step.__end__) {
      results.push(step);
      console.log(JSON.stringify(step, null, 2));
      // const key = Object.keys(step).find(key => key !== 'supervisor');
      // if (key) {
      //   console.log(JSON.stringify(step));
      // }
    }
  }
  const alterResults = results
    .map(item => {
      const key = Object.keys(item).find(key => key !== 'supervisor');
      if (key) {
        return {
          team: key,
          message: item[key].messages[0].content,
          function: item[key].messages[0].name,
        };
      }
      return null;
    })
    .filter(Boolean);

  return res.status(200).json(alterResults);
}
