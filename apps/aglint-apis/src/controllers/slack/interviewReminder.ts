import dayjs from 'dayjs';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin, supabaseWrap} from 'src/services/supabase/SupabaseAdmin';

export async function interviewReminder(req: Request, res: Response) {
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

    const {
      session_name,
      session_duration,
      start_time,
      end_time,
      schedule_type,
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

    // const interviewer_emails = supabaseWrap(
    //   await supabaseAdmin
    //     .from('meeting_interviewers')
    //     .select('email')
    //     .eq('session_id', session_id)
    // );

    const [organizer_email] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .select('email')
        .eq('user_id', organizer_id)
    );
    // Unique emails
    const interviewer_emails = [
      {email: 'chandra@aglinthq.com'},
      {email: 'dileep@aglinthq.com'},
    ];
    const emails = [
      ...new Set([organizer_email, ...interviewer_emails].map(e => e.email)),
    ];

    const job_title = can_app.applications.public_jobs.job_title;
    const candidate_name = `${can_app.applications.candidates.first_name} ${can_app.applications.candidates.first_name}`;

    for (const email of emails) {
      const userResponse = await slackWeb.users.lookupByEmail({
        email: email,
      });
      const userId = userResponse.user.id;

      await slackWeb.chat.postMessage({
        channel: userId,
        // text: message,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '*<www.goole.com|HR Meeting>* with candidate :\n*Dileep *- SDE 2',
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '*Meeting Time :* Aug 10 10:00 AM - 10:30 AM IST',
            },
          },
          {
            type: 'input',
            element: {
              type: 'plain_text_input',
              multiline: true,
              action_id: 'plain_text_input-action',
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
                value: 'submit',
              },
            ],
          },
        ],
      });
    }
    res.status(200).json({message: 'message sucessfully sended'});
  } catch (err) {
    console.error('some thing went wrong:', err);
    res.status(500).json({error: 'Failed to start group discussion'});
  }
}

// {
//   "session_id":"d232ef5b-0002-4813-82f7-b8246bb696f7",
// }

// session_id -> got interview confirmation from interviewers and organizer
