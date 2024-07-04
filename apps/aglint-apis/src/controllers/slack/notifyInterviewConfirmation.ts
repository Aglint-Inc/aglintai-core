import {getFullName, supabaseWrap} from '@aglint/shared-utils';
import dayjs from 'dayjs';
import {Request, Response} from 'express';
import {envConfig} from 'src/config';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';

export async function notifyInterviewConfirmation(req: Request, res: Response) {
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

    const userResponse = await slackWeb.users.lookupByEmail({
      email: 'chandra@aglinthq.com',
      // email: interviewer.email,
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
            text: `* ${session_details.session_name} sheduled with candidate :*\n*<${envConfig.CLIENT_APP_URL}/scheduling/view?meeting_id=${interviewer.meeting_id}&tab=candidate_details|${getFullName(application.candidates.first_name, application.candidates.last_name)} - ${application.public_jobs.job_title}>*`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Meeting Place :* ${session_details.schedule_type}\n*Meeting Time :* ${dayjs(session_details.start_time).format('MMMM DD hh:mm A')} - ${dayjs(session_details.end_time).format('hh:mm A')} IST\n *Duration :* ${session_details.session_duration} Minutes\n`,
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
              action_id: 'accept',
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
              action_id: 'decline',
            },
          ],
        },
      ],
    });

    res.status(200).json({message: 'message sucessfully sended'});
  } catch (err) {
    console.error('some thing went wrong:', err);
    res.status(500).json({error: 'Failed to start group discussion'});
  }
}
