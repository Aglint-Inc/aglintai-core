import {getFullName, supabaseWrap} from '@aglint/shared-utils';
import dayjs from 'dayjs';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import {meetingPlatform} from 'src/utils/platform';
import {getUserIdByEmail} from 'src/utils/slack';

export async function interviewerAttentedConfirmation(
  req: Request,
  res: Response
) {
  const {recruiter_user_id, interview_meeting_id, session_id} = req.body;

  if (!recruiter_user_id || !interview_meeting_id || !session_id) {
    return res
      .status(400)
      .json('recruiter_user_id, interview_meeting_id, session_id required');
  }

  try {
    const [interviewer] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .select('first_name,last_name,email')
        .eq('user_id', recruiter_user_id)
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
        .select(
          'name,session_duration,schedule_type,interview_meeting(start_time,end_time)'
        )
        .eq('id', session_id)
    );

    const userId = await getUserIdByEmail(interviewer.email);

    const organizer = interviewMeeting.recruiter_user;
    const candidate =
      interviewMeeting.interview_schedule.applications.candidates;
    const job =
      interviewMeeting.interview_schedule.applications.public_jobs.job_title;

    await slackWeb.chat.postMessage({
      channel: userId,
      metadata: {
        event_type: 'interviewer_attend_comfirmation',
        event_payload: {name: 'interviewer_attend_comfirmation'},
      },
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hi ${getFullName(interviewer.first_name, interviewer.last_name)},\nWe have an ${session.name} scheduled with ${getFullName(candidate.first_name, candidate.last_name)} for ${job}.\n\n*Place* : ${meetingPlatform(session.schedule_type)}\n*Time* : ${dayjs(session.interview_meeting.start_time).format('MMMM DD hh:mm A')} - ${dayjs(session.interview_meeting.end_time).format('hh:mm A')} \n*Duration* : ${session.session_duration} minutes`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '\n\nPlease let us know if you can attend or if you need to decline.',
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
                text: 'Accept',
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
                text: 'Decline',
              },
              style: 'danger',
              value: 'decline',
              action_id: 'decline',
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Thanks,\n${getFullName(organizer.first_name, organizer.last_name)}`,
          },
        },
      ],
    });

    res.status(200).json({message: 'message sucessfully sended'});
  } catch (err: any) {
    console.error('some thing went wrong:', err);
    res.status(500).json(err.message);
  }
}
