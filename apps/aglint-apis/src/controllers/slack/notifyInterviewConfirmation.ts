import {supabaseWrap} from '@aglint/shared-utils';
import dayjs from 'dayjs';
import {Request, Response} from 'express';
import {envConfig} from 'src/config';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';

export async function notifyInterviewConfirmation(req: Request, res: Response) {
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
      id: metting_id,
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

    if (!can_app)
      throw new Error(
        'failed to fetching the candidate and application details'
      );

    const interviewers = supabaseWrap(
      await supabaseAdmin
        .from('meeting_interviewers')
        .select('email,session_relation_id')
        .eq('session_id', session_id)
    );
    if (!interviewers)
      throw new Error('failed to fetching the interviewers detail');

    const [organizer] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .select('email')
        .eq('user_id', organizer_id)
    );

    if (!organizer) throw new Error('failed to fetching the organizer details');

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
              text: `* ${session_name} sheduled with candidate :*\n*<${envConfig.CLIENT_APP_URL}/scheduling/view?meeting_id=${metting_id}&tab=candidate_details|${candidate_name} - ${job_title}>*`,
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
    }
    res.status(200).json({message: 'message sucessfully sended'});
  } catch (err) {
    console.error('some thing went wrong:', err);
    res.status(500).json({error: 'Failed to start group discussion'});
  }
}
