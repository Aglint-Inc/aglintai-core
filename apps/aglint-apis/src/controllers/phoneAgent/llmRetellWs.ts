import {
  getCachedCandidateInfo,
  getCallerFromCache,
  removeCallerInfoCache,
  removeCandInfoCache,
} from '../../services/cache/cache-db';
import {RawData, WebSocket} from 'ws';
import {Request} from 'express';
import {CustomLlmRequest, CustomLlmResponse} from '../../types/retell.types';
import {getCandidateLogger} from '../../utils/scheduling_utils/getCandidateLogger';
import {ScheduleAgent} from '../../agents/schedule_agent/schedule_agent';
import {transcript_update} from '../../utils/transcript_update';
import {appLogger} from '../../services/logger';

export const llmRetellWs = async (ws: WebSocket, req: Request) => {
  const call_id = req.params.call_id;
  const caller_info = await getCallerFromCache(call_id);
  const caller_phone = caller_info.To;
  const cand = await getCachedCandidateInfo(caller_phone);
  if (!cand) {
    console.error('didnt get cand-info');
    ws.close();
  }
  const logger = getCandidateLogger(
    cand.req_payload.task_id,
    cand.candidate_name,
    cand.candidate_id,
    'phone_agent'
  );
  await logger('Phone conversation with candidate {candidate} initiated.', {
    '{candidate}': '',
  });
  const schedule_agent = new ScheduleAgent(
    caller_info.CallSid,
    cand.req_payload.to_phone_no,
    logger
  );
  schedule_agent.BeginMessage(ws, cand.begin_message);
  ws.on('error', async err => {
    logger('Unexpected Error while having conversation.', {});
    schedule_agent.stopAgentDrafting();
    await removeCandInfoCache(cand.req_payload.to_phone_no);
    await removeCallerInfoCache(call_id);
    setTimeout(() => {
      transcript_update(
        call_id,
        cand.req_payload.task_id,
        cand.candidate_id,
        logger,
        call_id
      );
    }, 5000);
  });
  ws.on('close', async err => {
    schedule_agent.stopAgentDrafting();
    await removeCandInfoCache(cand.req_payload.to_phone_no);
    await removeCallerInfoCache(call_id);

    setTimeout(() => {
      transcript_update(
        call_id,
        cand.req_payload.task_id,
        cand.candidate_id,
        logger,
        call_id
      );
    }, 5000);
  });

  ws.on('message', async (data: RawData, isBinary: boolean) => {
    if (isBinary) {
      ws.close(1002, 'Cannot find corresponding Retell LLM.');
    }
    try {
      const request: CustomLlmRequest = JSON.parse(data.toString());
      // There are 5 types of interaction_type: call_details, pingpong, update_only, response_required, and reminder_required.
      // Not all of them need to be handled, only response_required and reminder_required.
      if (request.interaction_type === 'pingpong') {
        ws.send(
          JSON.stringify({
            response_type: 'pingpong',
            content: request.content,
          })
        );
      } else if (request.interaction_type === 'call_details') {
        // print call detailes
      } else if (request.interaction_type === 'update_only') {
        // process live transcript update if needed
      } else if (
        request.interaction_type === 'reminder_required' ||
        request.interaction_type === 'response_required'
      ) {
        const cand_info = await getCachedCandidateInfo(
          cand.req_payload.to_phone_no
        );
        if (cand_info.tool_invocations.length === 0) {
          // eslint-disable-next-line no-console
          console.log(
            'candidate:',
            request.transcript[request.transcript.length - 1]?.content
          );
          schedule_agent.DraftResponse(ws, request);
        } else {
          const res: CustomLlmResponse = {
            response_type: 'response',
            response_id: request.response_id,
            content: 'please wait for a moment',
            content_complete: true,
            end_call: false,
          };
          ws.send(JSON.stringify(res));
          appLogger.info('tool calling in progress user utterance');
        }
      }
    } catch (err: any) {
      appLogger.error(err.message);
      ws.close(1002, 'Cannot parse incoming message.');
    }
  });
};
