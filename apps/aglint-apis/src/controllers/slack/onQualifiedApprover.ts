import {getFullName, supabaseWrap} from '@aglint/shared-utils';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import {getUserIdByEmail} from 'src/utils/slack';

export async function onQualifiedApprover(req: Request, res: Response) {
  const {session_relation_id} = req.body;

  if (!session_relation_id) {
    return res.status(400).json({error: 'session_relation_id required'});
  }

  try {
    const [sessn_reln] = supabaseWrap(
      await supabaseAdmin
        .from('interview_session_relation')
        .select(
          '*, interview_module_relation(*,interview_module(*,recruiter(*)),recruiter_user(*))'
        )
        .eq('id', session_relation_id)
    );

    const module_reln = sessn_reln.interview_module_relation;

    const [approver_reln] = supabaseWrap(
      await supabaseAdmin
        .from('interview_module_approve_users')
        .select('*, recruiter_user(*)')
        .eq('module_id', module_reln.interview_module.id)
    );
    const approver = approver_reln.recruiter_user;

    const [shadowCount] = supabaseWrap(
      await supabaseAdmin
        .from('module_relations_view')
        .select()
        .eq('user_id', module_reln.user_id)
    );

    const {interview_module, recruiter_user: trainee} = module_reln;
    const company = module_reln.interview_module.recruiter;

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
            text: `Hi ${getFullName(approver.first_name, approver.last_name)},\n${getFullName(trainee.first_name, trainee.last_name)} has completed ${shadowCount.shadow_completed_count} shadow sessions and ${shadowCount.reverse_shadow_completed_count} reverse shadow sessions. Please review and approve ${getFullName(trainee.first_name, trainee.last_name)} to become qualified for conducting ${interview_module.name} interviews.\n\nThanks,\n ${company.name}`,
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
