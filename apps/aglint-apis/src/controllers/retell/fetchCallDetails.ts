import {Request, Response} from 'express';
import {retellClient} from '../../services/retell/retellClient';
import {supabaseAdmin} from '../../services/supabase/SupabaseAdmin';
import {PhoneAgentId, supabaseWrap} from '@aglint/shared-utils';

export const fetchCallDetails = async (req: Request, res: Response) => {
  const {call_id, task_progress_id, candidate_id} = req.body;
  if (!call_id || !task_progress_id || !candidate_id)
    return res.status(400).send('missing fields');
  try {
    const resp = await retellClient.getCall(call_id);
    const call_detail = resp.callDetail;
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
    supabaseWrap(
      await supabaseAdmin
        .from('new_tasks_progress')
        .update({
          jsonb_data: {
            transcript: transf_script,
            audio_url: call_detail.recordingUrl,
            retell_call_id: call_id,
          },
        })
        .eq('id', task_progress_id)
    );
    return res.status(200).json('ok');
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
};
