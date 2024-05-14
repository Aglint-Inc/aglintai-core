export type TwilioCallDetails = {
  Called: string;
  ToState: string;
  CallerCountry: string;
  Direction: string;
  CallerState: string;
  ToZip: string;
  CallSid: string;
  To: string;
  CallerZip: string;
  ToCountry: string;
  CalledZip: string;
  ApiVersion: string;
  CalledCity: string;
  CallStatus: string;
  From: string;
  AccountSid: string;
  CalledCountry: string;
  CallerCity: string;
  ToCity: string;
  FromCountry: string;
  Caller: string;
  FromCity: string;
  CalledState: string;
  FromZip: string;
  FromState: string;
};

export type logType = {
  api_status: 'failed' | 'success';
  error: string;
};

// web hook payload
export interface TwilioCallInfo {
  Called: string;
  ToState: string;
  CallerCountry: string;
  Direction: string;
  Timestamp: string;
  CallbackSource: string;
  SipResponseCode: string;
  CallerState: string;
  ToZip: string;
  SequenceNumber: string;
  CallSid: string;
  To: string;
  CallerZip: string;
  ToCountry: string;
  CalledZip: string;
  ApiVersion: string;
  CalledCity: string;
  CallStatus: 'busy' | 'failed' | 'no-answer' | 'in-progress' | undefined;
  Duration: string;
  From: string;
  CallDuration: string;
  AccountSid: string;
  CalledCountry: string;
  CallerCity: string;
  ToCity: string;
  FromCountry: string;
  Caller: string;
  FromCity: string;
  CalledState: string;
  FromZip: string;
  FromState: string;
}
