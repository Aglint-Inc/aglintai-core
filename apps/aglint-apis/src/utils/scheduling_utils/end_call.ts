/* eslint-disable @typescript-eslint/no-unused-vars */
import {DynamicStructuredTool} from 'langchain/tools';
import {z} from 'zod';
import {WebSocket} from 'ws';
import {TwilioClient} from '../../services/twilio/twilioClient';
export const endCallTool = ({
  callSid,
  twilioClient,
  ws,
  condidate_info,
}: {
  twilioClient: TwilioClient;
  callSid: string;
  ws: WebSocket;
  condidate_info: unknown;
}) => {
  return new DynamicStructuredTool({
    name: 'end-call',
    description: 'Ends the ongoing call',
    schema: z.object({}),
    func: async () => {
      await twilioClient.EndCall(callSid);
      ws.close();
      return 'Call ended sucessfully';
    },
  });
};
