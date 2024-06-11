import {supabaseWrap} from '@aglint/shared-utils';
import dayjs from 'dayjs';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';

export async function feedback(req: Request, res: Response) {
  const {session_id} = req.body;

  if (!session_id) {
    return res.status(400).json({error: 'Session id required'});
  }
  try {
    // get metting details by session_id
    const [data] = supabaseWrap(
      await supabaseAdmin
        .from('meeting_details')
        .select()
        .eq('session_id', session_id)
    );

    if (!data) {
      throw new Error('failed to fetch a meeting details');
    }
    const {
      session_name,
      start_time,
      end_time,
      interview_schedule_id,
      organizer_id,
    } = data;

    // get job title and candidate details using interview_schedule_id
    const [can_app] = supabaseWrap(
      await supabaseAdmin
        .from('interview_schedule')
        .select('applications(public_jobs(job_title), candidates(*))')
        .eq('id', interview_schedule_id)
    );
    if (!can_app) {
      throw new Error('failed to fetch a candidate and application details');
    }

    const interviewers = supabaseWrap(
      await supabaseAdmin
        .from('meeting_interviewers')
        .select('email,session_relation_id')
        .eq('session_id', session_id)
    );
    if (!interviewers) {
      throw new Error('failed to fetch a interviewers detail');
    }
    const [organizer] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .select('email')
        .eq('user_id', organizer_id)
    );

    if (!organizer) {
      throw new Error('failed to fetch a recruiter detail');
    }

    const interviewersWithoutOrganizer = interviewers.filter(
      interviewer => interviewer.email !== organizer.email
    );

    const job_title = can_app.applications.public_jobs.job_title;
    const candidate_name = `${can_app.applications.candidates.first_name} ${can_app.applications.candidates.first_name}`;

    for (const interviewer of interviewersWithoutOrganizer) {
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
              text: `*${session_name}* with candidate :\n *${candidate_name}* - ${job_title}`,
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Meeting Time :* ${dayjs(start_time).format('MMMM DD hh:mm A')} - ${dayjs(end_time).format('hh:mm A')} IST`,
            },
          },
          {
            type: 'section',
            block_id: 'rating_block',
            text: {
              type: 'mrkdwn',
              text: 'Rate ⭐ your experience:',
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
    }
    res.status(200).json({message: 'message sucessfully sended'});
  } catch (err) {
    res.status(500).json({error: 'Failed to send a message'});
  }
}

// {
//   "session_id":"5e7953c5-3e56-4d89-9857-29c34b55ce9d"
// }

// session_id -> got interview confirmation from interviewers and organizer

// const interviewersWithoutOrganizer = [
//   {
//     email: 'chandra@aglinthq.com',
//     session_relation_id: 'd232ef5b-0002-4813-82f7-b8246bb696f7',
//   },
// ];
