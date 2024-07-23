import {DAYJS_FORMATS, getFullName, supabaseWrap} from '@aglint/shared-utils';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import {googleCalenderLogo} from 'src/utils/assests';
import {dayjsLocal} from 'src/utils/dayjsLocal/dayjsLocal';
import {getUserIdByEmail} from 'src/utils/slack';

export async function getMeetingStatusOrganizer(req: Request, res: Response) {
  try {
    const {session_id} = req.body;
    if (!session_id) {
      return res.status(400).send('missing session_id in req body');
    }

    const [data] = supabaseWrap(
      await supabaseAdmin
        .from('meeting_details')
        .select(
          '*,recruiter_user(first_name,last_name,email,scheduling_settings),applications(candidates(first_name,last_name,recruiter_id))'
        )
        .eq('session_id', session_id)
    );

    const organizer = data.recruiter_user;
    const candidate = data.applications.candidates;
    const org_tz = organizer.scheduling_settings.timeZone.tzCode;
    const start_time = data.start_time;

    const userId = await getUserIdByEmail('chandra@aglinthq.com');
    // const userId = await getUserIdByEmail(organizer.email);

    await slackWeb.chat.postMessage({
      channel: userId,
      metadata: {
        event_type: 'meeting_status_organizer',
        event_payload: {name: 'meeting_status_organizer', meeting_id: data.id},
      },
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hi ${getFullName(organizer.first_name, organizer.last_name)},\n Could you please confirm the status of the interview meeting scheduled for ${getFullName(candidate.first_name, candidate.last_name)} on ${dayjsLocal(start_time).tz(org_tz).format(DAYJS_FORMATS.DATE_FORMATZ)} at ${dayjsLocal(start_time).tz(org_tz).format(DAYJS_FORMATS.STAR_TIME_FORMAT)}.\n Your prompt response will help us ensure a smooth and efficient process for everyone involved.`,
          },
          accessory: {
            type: 'image',
            image_url: googleCalenderLogo,
            alt_text: 'Calender',
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
    return res.status(200).json({message: 'message sucessfully sended'});
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
}
