export interface SchedulePhoneAgentApi {
  begin_sentence_template: string;
  interviewer_name: string;
  to_phone_no: string;
  filter_json_id: string;
  phone_agent_type: 'scheduling';
  cand_email: string;
  task_id: string;
}
