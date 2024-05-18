import dayjs from 'dayjs';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseWrap, supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';

export async function notifyInterviewConfirmation(req: Request, res: Response) {
  const {session_id} = req.body;

  if (!session_id) {
    return res.status(400).json({error: 'Session id required'});
  }
  try {
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
    } = data;

    const [can_app] = supabaseWrap(
      await supabaseAdmin
        .from('interview_schedule')
        .select('applications(public_jobs(job_title), candidates(*))')
        .eq('id', interview_schedule_id)
    );

    // const emails = supabaseWrap(
    //   await supabaseAdmin
    //     .from('meeting_interviewers')
    //     .select('email')
    //     .eq('session_id', session_id)
    // );

    const emails = [
      {email: 'chandra@aglinthq.com'},
      {email: 'dileep@aglinthq.com'},
    ];
    const job_title = can_app.applications.public_jobs.job_title;
    const candidate_name = `${can_app.applications.candidates.first_name} ${can_app.applications.candidates.first_name}`;

    for (const emailobj of emails) {
      const userResponse = await slackWeb.users.lookupByEmail({
        email: emailobj.email,
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
              text: `<google.com | ${session_name}> sheduled with candidate :\n*<google.com|${candidate_name} - ${job_title}>*`,
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Meeting Place :* ${schedule_type}\n*Meeting Time :* ${dayjs(start_time).format('MMMM DD hh:mm A')} - ${dayjs(end_time).format('hh:mm A')} IST\n *Duration :* ${session_duration} Minutes\n`,
            },
            accessory: {
              type: 'image',
              image_url:
                'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/google-calendar%201.png',
              alt_text: 'google calender',
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
                  text: 'Available',
                },
                style: 'primary',
                value: 'available',
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  emoji: true,
                  text: 'Not Available',
                },
                style: 'danger',
                value: 'not_available',
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
