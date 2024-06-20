import {PhoneAgentId} from '@aglint/shared-utils';
import {LoggerType} from './scheduling_utils/getCandidateLogger';
import {fetchTranascript} from './scheduling_utils/retell_transcript';

export async function transcript_update(
  callId: string,
  sub_task_id: string,
  candidate_id: string,
  logger: LoggerType,
  retell_call_id: string
) {
  // const res = await this.retellClient.getCall(callId);
  const call_detail = await fetchTranascript(callId);
  if (call_detail) {
    try {
      if (call_detail.transcript) {
        const transf_script = call_detail.transcript
          .split('\n')
          .filter(s => s.length > 0)
          .map(s => {
            if (s.startsWith('User:')) {
              return {
                id: candidate_id,
                message: s.replace('User:', ''),
              };
            } else if (s.startsWith('Agent:')) {
              return {
                id: PhoneAgentId,
                message: s.replace('Agent:', ''),
              };
            }
          });

        await logger('call Completed', {}, 'phone_agent', 'call_completed', {
          transcript: transf_script,
          audio_url: call_detail.recordingUrl,
          retell_call_id,
        });
      }
    } catch (error) {
      // console.log(error);
    }
  }
}
