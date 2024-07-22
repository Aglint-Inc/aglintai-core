import {getFullName, supabaseWrap} from '@aglint/shared-utils';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import {getUserIdByEmail} from 'src/utils/slack';

export async function onQualifiedTrainee(req: Request, res: Response) {
  const {interview_module_relation_id, approver_id} = req.body;

  if (!interview_module_relation_id || !approver_id) {
    return res
      .status(400)
      .json({error: 'interview_module_relation_id and approver_id required'});
  }

  try {
    const [data] = supabaseWrap(
      await supabaseAdmin
        .from('interview_module_relation')
        .select(
          'recruiter_user(first_name,last_name,email),interview_module(name)'
        )
        .eq('id', interview_module_relation_id)
    );

    const [approver] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .select('first_name,last_name')
        .eq('user_id', approver_id)
    );

    const {interview_module, recruiter_user: trainee} = data;

    const userId = await getUserIdByEmail(trainee.email);

    await slackWeb.chat.postMessage({
      channel: userId,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hi ${getFullName(trainee.first_name, trainee.last_name)},\nCongratulations, ${getFullName(trainee.first_name, trainee.last_name)} ! Now you are qualified to conduct interviews for ${interview_module.name}.\n\n From,\n${getFullName(approver.first_name, approver.last_name)}`,
          },
        },
      ],
    });

    res.status(200).json({message: 'message sucessfully sended'});
  } catch (err: any) {
    console.error('some thing went wrong:', err);
    res.status(500).json(err.message);
  }
}
