import {getFullName, supabaseWrap} from '@aglint/shared-utils';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';

export async function onShadowCompleteTrainee(req: Request, res: Response) {
  const {interview_module_relation_id} = req.body;

  if (!interview_module_relation_id) {
    return res
      .status(400)
      .json({error: 'interview_module_relation_id required'});
  }

  try {
    const [data] = supabaseWrap(
      await supabaseAdmin
        .from('interview_module_relation')
        .select('recruiter_user(*),interview_module(*)')
        .eq('id', interview_module_relation_id)
    );

    const {interview_module, recruiter_user: trainee} = data;
    const userResponse = await slackWeb.users.lookupByEmail({
      email: trainee.email,
    });
    const userId = userResponse.user.id;

    await slackWeb.chat.postMessage({
      channel: userId,

      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hi ${getFullName(trainee.first_name, trainee.last_name)}, you have completed all the shadow interviews for the ${interview_module.name}.`,
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
