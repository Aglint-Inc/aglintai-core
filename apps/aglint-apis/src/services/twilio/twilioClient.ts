import {envConfig} from '../../config';
import {Request, Response} from 'express';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import expressWs from 'express-ws';
import twilio, {Twilio} from 'twilio';
import {RetellClient} from 'retell-sdk';
import {
  AudioWebsocketProtocol,
  AudioEncoding,
} from 'retell-sdk/models/components';
import {addCallerToCache} from '../cache/cache-db';
import {appLogger} from '../logger';

export class TwilioClient {
  private twilio: Twilio;
  private retellClient: RetellClient;
  constructor() {
    this.twilio = twilio(
      envConfig.TWILIO_ACCOUNT_ID,
      envConfig.TWILIO_AUTH_TOKEN
    );
    this.retellClient = new RetellClient({
      apiKey: envConfig.RETELL_API_KEY ?? '',
    });
  }

  // Create a new phone number and route it to use this server.
  public CreatePhoneNumber = async (areaCode: number, agentId: string) => {
    try {
      const localNumber = await this.twilio
        .availablePhoneNumbers('US')
        .local.list({areaCode: areaCode, limit: 1});
      if (!localNumber || localNumber[0] === null)
        throw 'No phone numbers of this area code.';

      const phoneNumberObject = await this.twilio.incomingPhoneNumbers.create({
        phoneNumber: localNumber[0].phoneNumber,
        voiceUrl: `${envConfig.NGROK_IP_ADDRESS}/twilio-voice-webhook/${agentId}`,
      });
      return phoneNumberObject;
    } catch (err) {
      console.error('Create phone number API: ', err);
    }
  };

  // Update this phone number to use provided agent id. Also updates voice URL address.
  RegisterPhoneAgent = async (number: string, agentId: string) => {
    try {
      const phoneNumberObjects = await this.twilio.incomingPhoneNumbers.list();
      let numberSid = null;
      for (const phoneNumberObject of phoneNumberObjects) {
        if (phoneNumberObject.phoneNumber === number) {
          numberSid = phoneNumberObject.sid;
        }
      }
      if (numberSid === null) {
        return console.error(
          'Unable to locate this number in your Twilio account, is the number you used in BCP 47 format?'
        );
      }
      await this.twilio.incomingPhoneNumbers(numberSid).update({
        voiceUrl: `${envConfig.NGROK_IP_ADDRESS}/twilio-voice-webhook/${agentId}`,
      });
    } catch (error: any) {
      console.error('failer to retrieve caller information: ', error);
    }
  };

  // Release a phone number
  DeletePhoneNumber = async (phoneNumberKey: string) => {
    await this.twilio.incomingPhoneNumbers(phoneNumberKey).remove();
  };

  // Create an outbound call
  CreatePhoneCall = async (from: string, to: string, agent: string) => {
    const fromNumber = from;
    const toNumber = to;
    const agentId = agent;
    try {
      const r = await this.twilio.calls.create({
        machineDetection: 'Enable', // detects if the other party is IVR
        machineDetectionTimeout: 8,
        asyncAmd: 'true', // call webhook when determined whether it is machine
        asyncAmdStatusCallback: `${envConfig.NGROK_IP_ADDRESS}/twilio-voice-webhook/${agentId}`, // Webhook url for machine detection
        url: `${envConfig.NGROK_IP_ADDRESS}/twilio-voice-webhook/${agentId}`, // Webhook url for registering call
        to: toNumber,
        from: fromNumber,
        statusCallback: `${envConfig.NGROK_IP_ADDRESS}/api/twilio/call-status`,
        statusCallbackMethod: 'POST',
      });
      appLogger.info(`Call from: ${fromNumber} to: ${toNumber}`);
    } catch (error: any) {
      console.error('failer to retrieve caller information: ', error);
    }
  };

  public getCall = async (sid: string) => {
    const resp = await this.twilio.calls.get(sid);
    return resp;
  };

  // Use LLM function calling or some kind of parsing to determine when to let AI end the call
  EndCall = async (sid: string) => {
    try {
      const call = await this.twilio.calls(sid).update({
        twiml: '<Response><Hangup></Hangup></Response>',
      });
    } catch (error) {
      console.error('Twilio end error: ', error);
    }
  };

  // Use LLM function calling or some kind of parsing to determine when to transfer away this call
  TransferCall = async (sid: string, transferTo: string) => {
    try {
      const call = await this.twilio.calls(sid).update({
        twiml: `<Response><Dial>${transferTo}</Dial></Response>`,
      });
      appLogger.info('Transfer phone call: ', call);
    } catch (error) {
      console.error('Twilio transfer error: ', error);
    }
  };

  // Twilio voice webhook
  ListenTwilioVoiceWebhook = (app: expressWs.Application) => {
    app.post(
      '/twilio-voice-webhook/:agent_id',
      async (req: Request, res: Response) => {
        const agentId = req.params.agent_id;
        const answeredBy = req.body.AnsweredBy;
        try {
          // Respond with TwiML to hang up the call if its machine
          // if (answeredBy && answeredBy === "machine_start") {
          // this.EndCall(req.body.CallSid);
          //   console.log("machine answer");
          //   return;
          // } else if (answeredBy) {
          //   return;
          // }

          const callResponse = await this.retellClient.registerCall({
            agentId: agentId,
            audioWebsocketProtocol: AudioWebsocketProtocol.Twilio,
            audioEncoding: AudioEncoding.Mulaw,
            sampleRate: 8000,
          });
          if (callResponse.callDetail) {
            await addCallerToCache(callResponse.callDetail.callId, req.body);
            // Start phone call websocket
            const response = new VoiceResponse();
            const start = response.connect() as any;
            const stream = start.stream({
              url: `wss://api.retellai.com/audio-websocket/${callResponse.callDetail.callId}`,
              statusCallback: `${envConfig.NGROK_IP_ADDRESS}/api/twilio/call-status`,
              statusCallbackMethod: 'POST',
              // StatusCallbackEvent: ['initiated','ringin'],
            });
            res.set('Content-Type', 'text/xml');
            res.send(response.toString());
          }
        } catch (err) {
          console.error('Error in twilio voice webhook:', err);
          res.status(500).send();
        }
      }
    );
  };
}
