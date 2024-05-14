import axios from 'axios';
import dayjs from 'dayjs';
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
  condidate_info: any;
}) => {
  return new DynamicStructuredTool({
    name: 'end-call',
    description: 'Ends the ongoing call',
    schema: z.object({}),
    func: async ({}) => {
      await twilioClient.EndCall(callSid);
      ws.close();
      return 'Call ended sucessfully';
    },
  });
};
