import {getFullName, supabaseWrap} from '@aglint/shared-utils';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import {getUserIdByEmail, numberToOrdinal} from 'src/utils/slack';

export async function onRShadowCompleteTrainee(req: Request, res: Response) {
  const {interview_module_relation_id, interview_meeting_id, session_id} =
    req.body;

  if (!interview_module_relation_id) {
    return res
      .status(400)
      .json({error: 'interview_module_relation_id required'});
  }

  try {
    const [data] = supabaseWrap(
      await supabaseAdmin
        .from('interview_module_relation')
        .select('user_id,recruiter_user(*),interview_module(*)')
        .eq('id', interview_module_relation_id)
    );
    const [interviewMeeting] = supabaseWrap(
      await supabaseAdmin
        .from('interview_meeting')
        .select(
          'recruiter_user(first_name,last_name),interview_schedule(applications(candidates(first_name,last_name),public_jobs(job_title)))'
        )
        .eq('id', interview_meeting_id)
    );

    const [session] = supabaseWrap(
      await supabaseAdmin
        .from('interview_session')
        .select('name')
        .eq('id', session_id)
    );

    const [reverseShadow] = supabaseWrap(
      await supabaseAdmin
        .from('module_relations_view')
        .select('reverse_shadow_meeting_count')
        .eq('user_id', data.user_id)
    );

    const reverseShadowCount = reverseShadow.reverse_shadow_meeting_count;
    const {interview_module, recruiter_user: trainee} = data;

    const userId = await getUserIdByEmail(trainee.email);

    const organizer = interviewMeeting.recruiter_user;
    const candidate =
      interviewMeeting.interview_schedule.applications.candidates;
    const job =
      interviewMeeting.interview_schedule.applications.public_jobs.job_title;

    await slackWeb.chat.postMessage({
      channel: userId,
      metadata: {
        event_type: 'reverse_shadow_complete_trainee_confirmation',
        event_payload: {name: 'shadow_complete_trainee_confirmation'},
      },
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hi ${getFullName(trainee.first_name, trainee.last_name)},\n Could you please confirm if you've completed the ${numberToOrdinal(Number(reverseShadowCount))} reverse shadow session for ${interview_module.name} ? You were scheduled as a shadow interviewer in the ${session.name} for ${job} with ${getFullName(candidate.first_name, candidate.last_name)}\n\nFrom,\n${getFullName(organizer.first_name, organizer.last_name)}`,
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
                text: 'Completed',
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
                text: 'Could not attend Interview',
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
