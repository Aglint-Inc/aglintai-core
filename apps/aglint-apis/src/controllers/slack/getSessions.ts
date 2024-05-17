import dayjs from 'dayjs';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseWrap, supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';

export async function getSession(req: Request, res: Response) {
  const {session_id, email} = req.body;

  if (!session_id) {
    return res.status(400).json({error: 'Session id required'});
  }
  try {
    const data = supabaseWrap(
      await supabaseAdmin
        .from('meeting_details')
        .select()
        .eq('session_id', session_id)
    );

    if (data) {
      const {
        session_name,
        session_duration,
        start_time,
        end_time,
        schedule_type,
        interview_schedule_id,
      } = data[0];

      const [can_app] = supabaseWrap(
        await supabaseAdmin
          .from('interview_schedule')
          .select('applications(public_jobs(job_title), candidates(*))')
          .eq('id', interview_schedule_id)
      );

      const job_title = can_app.applications.public_jobs.job_title;
      const candidate_name = `${can_app.applications.candidates.first_name} ${can_app.applications.candidates.first_name}`;
      const userResponse = await slackWeb.users.lookupByEmail({email});
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
                'https://api.slack.com/img/blocks/bkb_template_images/approvalsNewDevice.png',
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
                value: 'click_me_123',
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  emoji: true,
                  text: 'Not Available',
                },
                style: 'danger',
                value: 'click_me_123',
              },
            ],
          },
        ],
      });
      res.status(200).json({message: 'message sucessfully sended'});
    }
  } catch (err) {
    console.error('some thing went wrong:', err);
    res.status(500).json({error: 'Failed to start group discussion'});
  }
}
