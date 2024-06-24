import {supabaseWrap} from '@aglint/shared-utils';
import dayjs from 'dayjs';
import {Request, Response} from 'express';
import {envConfig} from 'src/config';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';

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

    if (!data) {
      throw new Error('failed to fetch a meeting details');
    }

    const {
      id: meeting_id,
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
    if (!can_app) {
      throw new Error('failed to fetch a candidate and application details');
    }

    const interviewer_emails = supabaseWrap(
      await supabaseAdmin
        .from('meeting_interviewers')
        .select('email')
        .eq('session_id', session_id)
    );

    if (!interviewer_emails) {
      throw new Error('failed to fetch a interviewers detail');
    }

    const [organizer_email] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .select('email')
        .eq('user_id', organizer_id)
    );
    if (!organizer_email) {
      throw new Error('failed to fetch a recruiter detail');
    }
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
              text: '*Interview 🧑‍💻 Reminder*',
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `* ${session_name} sheduled with candidate :*\n*<${envConfig.CLIENT_APP_URL}/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details|${candidate_name} - ${job_title}>*`,
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Meeting Place :* ${meetingPlatform(schedule_type)}\n*Meeting Time :* ${dayjs(start_time).format('MMMM DD hh:mm A')} - ${dayjs(end_time).format('hh:mm A')} IST\n *Duration :* ${session_duration} Minutes\n`,
            },
            accessory: {
              type: 'image',
              image_url:
                'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/google-calendar%201.png',
              alt_text: 'google calender',
            },
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

const meetingPlatform = (schedule_type: string) => {
  if (schedule_type === 'google_meet') return 'Google Meet';
  else if (schedule_type === 'in_person_meeting') return 'In Person Meeting';
  else if (schedule_type === 'phone_call') return 'Phone Call';
  else if (schedule_type === 'zoom') return 'Zoom';
};

// {
//   "session_id":"d232ef5b-0002-4813-82f7-b8246bb696f7",
// }

// session_id -> got interview confirmation from interviewers and organizer
