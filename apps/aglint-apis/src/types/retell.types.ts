export interface Utterance {
  role: 'agent' | 'user';
  content: string;
}

export interface RetellRequest {
  response_id?: number;
  transcript: Utterance[];
  interaction_type: 'update_only' | 'response_required' | 'reminder_required';
}

export interface RetellResponse {
  response_id: number;
  content: string;
  content_complete: boolean;
  end_call: boolean;
}
export interface ScreeningPhoneTypes {
  begin_message: string;
  company_name: string;
  from: string;
  to: string;
  agent: string;
  candidate_id: string;
  resume: any;
  new_job_title: string;
  details: string;
  candidate_email: string;
  mail_body: any;
}

//
export interface CustomLlmRequest {
  interaction_type:
    | 'update_only'
    | 'response_required'
    | 'reminder_required'
    | 'pingpong'
    | 'call_details';
  response_id?: number;
  transcript?: Utterance[];
  content?: any;
}
export interface CustomLlmResponse {
  response_type: 'response' | 'config' | 'pingpong';
  response_id: number;
  content?: any;
  content_complete?: boolean;
  end_call?: boolean;
}

export interface FunctionCall {
  id: string;
  funcName: string;
  arguments: Record<string, any>;
  result?: string;
}
