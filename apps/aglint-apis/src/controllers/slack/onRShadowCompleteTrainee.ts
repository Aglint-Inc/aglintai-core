import {getFullName, supabaseWrap} from '@aglint/shared-utils';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import {getUserIdByEmail, numberToOrdinal} from 'src/utils/slack';

export async function onRShadowCompleteTrainee(req: Request, res: Response) {
  const {meeting_id, session_id, application_id} = req.body;

  if (!meeting_id || !session_id || !application_id) {
    return res
      .status(400)
      .json({error: 'interview_module_relation_id required'});
  }

  try {
    const training_ints = supabaseWrap(
      await supabaseAdmin
        .from('meeting_interviewers')
        .select()
        .eq('training_type', 'reverse_shadow')
        .eq('session_id', session_id),
      false
    );

    if (training_ints.length === 0) {
      return res.status(200).json('no training ints');
    }
    const [session_detail] = supabaseWrap(
      await supabaseAdmin
        .from('interview_session')
        .select(
          '*,interview_module(*), interview_meeting(*, recruiter_user(*), interview_schedule(*, applications(*, public_jobs(*),candidates(*))))'
        )
        .eq('id', session_id)
    );

    const module_relations = supabaseWrap(
      await supabaseAdmin
        .from('module_relations_view')
        .select()
        .in(
          'user_id',
          training_ints.map(int => int.user_id)
        ),
      false
    );
    const candidate =
      session_detail.interview_meeting.interview_schedule.applications
        .candidates;
    const organizer = session_detail.interview_meeting.recruiter_user;

    const job =
      session_detail.interview_meeting.interview_schedule.applications
        .public_jobs;

    for (const trainee of training_ints) {
      const trainee_data = module_relations.find(
        s => s.user_id === trainee.user_id && s.module_id === trainee.module_id
      );
      const reverseShadowCount =
        trainee_data.reverse_shadow_completed_count +
        trainee_data.reverse_shadow_confirmed_count;

      const userId = await getUserIdByEmail(trainee.email);

      await slackWeb.chat.postMessage({
        channel: userId,
        metadata: {
          event_type: 'reverse_shadow_complete_trainee_confirmation',
          event_payload: {
            name: 'shadow_complete_trainee_confirmation',
            session_relation_id: trainee.session_relation_id,
          },
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `Hi ${getFullName(trainee.first_name, trainee.last_name)},\n Could you please confirm if you've completed the ${numberToOrdinal(Number(reverseShadowCount))} reverse shadow session for ${session_detail.interview_module.name} ? You were scheduled as a shadow interviewer in the ${session_detail.name} for ${job.job_title} with ${getFullName(candidate.first_name, candidate.last_name)}\n\nFrom,\n${getFullName(organizer.first_name, organizer.last_name)}`,
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
    }

    res.status(200).json({message: 'message sucessfully sended'});
  } catch (err: any) {
    console.error('some thing went wrong:', err);
    res.status(500).json(err.message);
  }
}
