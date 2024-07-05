import {getFullName, supabaseWrap} from '@aglint/shared-utils';
import dayjs from 'dayjs';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';

export async function feedback(req: Request, res: Response) {
  const {session_id, recruiter_user_id, application_id} = req.body;

  if (!session_id || !recruiter_user_id || !application_id) {
    return res
      .status(400)
      .json({error: 'Session id, Recruiter user id, Application id required'});
  }
  try {
    const [session_details] = supabaseWrap(
      await supabaseAdmin
        .from('meeting_details')
        .select()
        .eq('session_id', session_id)
    );

    const [interviewer] = supabaseWrap(
      await supabaseAdmin
        .from('meeting_interviewers')
        .select()
        .eq('session_id', session_id)
        .eq('user_id', recruiter_user_id)
    );
    const [application] = supabaseWrap(
      await supabaseAdmin
        .from('applications')
        .select('candidates(*),public_jobs(job_title)')
        .eq('id', application_id)
    );
    const candidate = application.candidates;
    const userResponse = await slackWeb.users.lookupByEmail({
      email: interviewer.email,
    });
    const userId = userResponse.user.id;

    await slackWeb.chat.postMessage({
      channel: userId,
      // text: message,
      metadata: {
        event_type: 'candidate_confirm_slot',
        event_payload: {
          email: interviewer.email,
          session_relation_id: interviewer.session_relation_id,
        },
      },
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${session_details.session_name}* with candidate :\n *${getFullName(candidate.first_name, candidate.last_name)}* - ${application.public_jobs.job_title}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Meeting Time :* ${dayjs(session_details.start_time).format('MMMM DD hh:mm A')} - ${dayjs(session_details.end_time).format('hh:mm A')} IST`,
          },
        },
        {
          type: 'section',
          block_id: 'rating_block',
          text: {
            type: 'mrkdwn',
            text: 'Rate your experience:',
          },
          accessory: {
            type: 'static_select',
            placeholder: {
              type: 'plain_text',
              text: 'Select a rating',
              emoji: true,
            },
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: '1',
                  emoji: true,
                },
                value: '1',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '2',
                  emoji: true,
                },
                value: '2',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '3',
                  emoji: true,
                },
                value: '3',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '4',
                  emoji: true,
                },
                value: '4',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '5',
                  emoji: true,
                },
                value: '5',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '6',
                  emoji: true,
                },
                value: '6',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '7',
                  emoji: true,
                },
                value: '7',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '8',
                  emoji: true,
                },
                value: '8',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '9',
                  emoji: true,
                },
                value: '9',
              },
              {
                text: {
                  type: 'plain_text',
                  text: '10',
                  emoji: true,
                },
                value: '10',
              },
            ],
          },
        },
        {
          type: 'input',
          block_id: 'input_block',
          element: {
            type: 'plain_text_input',
            multiline: true,
            action_id: 'feedback_text',
          },
          label: {
            type: 'plain_text',
            text: 'Please put your feedback',
            emoji: true,
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
                text: 'Submit',
              },
              style: 'primary',
              value: 'feedBack_submit',
            },
          ],
        },
      ],
    });
    res.status(200).json({message: 'message sucessfully sended'});
  } catch (err) {
    res.status(500).json({error: 'message not sent'});
  }
}

// {
//   "session_id": "78670a52-bc33-4a11-9615-2dec793d7d5a",
//   "recruiter_user_id":"3521d240-eb11-4ae5-ac27-d4f4e2ac5ea5",
//   "application_id":"3608fe82-bef4-4085-bec0-6fe82620240f"
// }
