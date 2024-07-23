import {DAYJS_FORMATS, getFullName, supabaseWrap} from '@aglint/shared-utils';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import {dayjsLocal} from 'src/utils/dayjsLocal/dayjsLocal';
import {getUserIdByEmail} from 'src/utils/slack';

export async function getMeetingStatusOrganizer(req: Request, res: Response) {
  try {
    const {session_id} = req.body;
    if (!session_id) {
      return res.status(400).send('missing session_id in req body');
    }

    const [meeting_details] = supabaseWrap(
      await supabaseAdmin
        .from('meeting_details')
        .select('*, recruiter_user(*),applications(candidates(*))')
    );
    const [organizer] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .select()
        .eq('user_id', meeting_details.organizer_id)
    );

    const userId = await getUserIdByEmail('dileep@aglinthq.com');
    // const userId = await getUserIdByEmail(meeting_details.recruiter_user.email);
    console.log(meeting_details.start_time);
    const result = await slackWeb.chat.postMessage({
      channel: userId,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `:wave: Hi ${getFullName(organizer.first_name, organizer.last_name)},\n Could you please confirm the status of the interview meeting scheduled for:\n <google.com|${getFullName(meeting_details.applications.candidates.first_name, meeting_details.applications.candidates.last_name)} on ${dayjsLocal(meeting_details.start_time).tz(organizer.scheduling_settings.timeZone.tzCode).format(DAYJS_FORMATS.DATE_FORMATZ)} at ${dayjsLocal(meeting_details.start_time).tz(organizer.scheduling_settings.timeZone.tzCode).format(DAYJS_FORMATS.STAR_TIME_FORMAT)}>.\n Your prompt response will help us ensure a smooth and efficient process for everyone involved.`,
          },
          accessory: {
            type: 'image',
            image_url:
              'https://api.slack.com/img/blocks/bkb_template_images/approvalsNewDevice.png',
            alt_text: 'computer thumbnail',
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
              value: 'meeting_completed',
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'Not Completed',
              },
              style: 'danger',
              value: 'meeting_not_completed',
            },
          ],
        },
      ],
    });
    return res.status(200).json();
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
}
