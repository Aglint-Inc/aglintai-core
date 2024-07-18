import {getFullName, supabaseWrap} from '@aglint/shared-utils';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import {getUserIdByEmail} from 'src/utils/slack';

export async function onQualifiedApprover(req: Request, res: Response) {
  const {interview_module_relation_id, approver_id, organizer_id} = req.body;

  if (!interview_module_relation_id || !approver_id) {
    return res
      .status(400)
      .json({error: 'interview_module_relation_id and approver_id required'});
  }

  try {
    const [data] = supabaseWrap(
      await supabaseAdmin
        .from('interview_module_relation')
        .select('recruiter_user(first_name,last_name),interview_module(name)')
        .eq('id', interview_module_relation_id)
    );

    const {interview_module, recruiter_user: trainee} = data;

    const [approver] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .select('first_name,last_name,email')
        .eq('user_id', approver_id)
    );

    const [organizer] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .select('first_name,last_name,email')
        .eq('user_id', organizer_id)
    );

    const userId = await getUserIdByEmail(approver.email);

    await slackWeb.chat.postMessage({
      channel: userId,
      metadata: {
        event_type: 'approver_qualified_confirmation',
        event_payload: {name: 'approver_qualified_confirmation'},
      },
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hi ${getFullName(approver.first_name, approver.last_name)},\n${getFullName(trainee.first_name, trainee.last_name)} has completed [# number] shadow sessions and [# number] reverse shadow sessions. Please review and approve ${getFullName(trainee.first_name, trainee.last_name)} to become qualified for conducting ${interview_module.name} interviews.\n\nThanks,\n${getFullName(organizer.first_name, organizer.last_name)}`,
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'Accept',
              },
              style: 'primary',
              value: 'accept',
              action_id: 'accept',
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'Decline',
              },
              style: 'danger',
              value: 'decline',
              action_id: 'decline',
            },
          ],
        },
      ],
    });

    res.status(200).json({message: 'message sucessfully sended'});
  } catch (err: any) {
    console.error('some thing went wrong:', err);
    res.status(500).json(err.message);
  }
}
