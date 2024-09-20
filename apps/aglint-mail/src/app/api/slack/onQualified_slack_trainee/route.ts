// route.ts content
// route.ts content
import { getFullName, supabaseWrap } from '@aglint/shared-utils';
import type { TargetApiPayloadType } from '@aglint/shared-types';
import { TargetApiSchema } from '@aglint/shared-types';
import { createPostRoute } from '../../../../utils/apiUtils/createPostRoute';
import { getSlackWeb } from '../../../../slack/slackWeb';
import { getSupabaseServer } from '../../../../supabase/supabaseAdmin';
import { getUserIdByEmail } from '../../../../utils/slack/utils';

const func = async (
  payload: TargetApiPayloadType<'onQualified_slack_trainee'>,
) => {
  const { interview_module_relation_id, approver_id } = payload;

  const supabaseAdmin = getSupabaseServer();
  const slackWeb = getSlackWeb();
  const [data] = supabaseWrap(
    await supabaseAdmin
      .from('interview_module_relation')
      .select(
        'recruiter_user(first_name,last_name,email),interview_module(name)',
      )
      .eq('id', interview_module_relation_id),
  );

  const [approver] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name,last_name')
      .eq('user_id', approver_id),
  );

  const { interview_module, recruiter_user: trainee } = data;

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
  return 'ok';
};

export const POST = createPostRoute(
  TargetApiSchema.onQualified_slack_trainee,
  func,
);
