import WebSocket from 'ws';
import {z} from 'zod';
import {twilioClient} from '../../../services/twilio';
import {LoggerType} from '../../../utils/scheduling_utils/getCandidateLogger';
import {createOpenAiTool} from './utils';

export const endCall = () => {
  const schema = z.object({});
  const tool_def = createOpenAiTool({
    name: 'end-call',
    description: 'Ends the ongoing call',
    schema,
  });

  const func = async ({
    callSid,
    ws,
    logger,
  }: {
    callSid: string;
    ws: WebSocket;
    logger: LoggerType;
  }) => {
    await twilioClient.EndCall(callSid);
    ws.close();
    return 'Call ended sucessfully';
  };
  return {
    tool_def,
    func,
  };
};
