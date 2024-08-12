import {
  DAYJS_FORMATS,
  getFullName,
  getShortTimeZone,
  supabaseWrap,
} from '@aglint/shared-utils';
import {Request, Response} from 'express';
import {envConfig} from 'src/config';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import {dayjsLocal} from 'src/utils/dayjsLocal/dayjsLocal';
import {getUserIdByEmail} from 'src/utils/slack';
export const informInterviewCancel = async (req: Request, res: Response) => {
  const {session_ids} = req.body;
  try {
    const meeting_details = supabaseWrap(
      await supabaseAdmin
        .from('meeting_details')
        .select()
        .in('session_id', session_ids)
    );

    const promises = meeting_details.map(async meeting_detail => {
      const [cand_application] = supabaseWrap(
        await supabaseAdmin
          .from('applications')
          .select('*,candidates(*)')
          .eq('id', meeting_detail.application_id)
      );
      const meeting_ints = supabaseWrap(
        await supabaseAdmin
          .from('meeting_interviewers')
          .select()
          .eq('meeting_id', meeting_detail.id)
      );
      const [organizer] = supabaseWrap(
        await supabaseAdmin
          .from('recruiter_user')
          .select()
          .eq('user_id', meeting_detail.organizer_id)
      );
      const emails = Array.from(
        new Set([
          ...meeting_ints.map(int => int.email),
          organizer.email,
          'dileep@aglinthq.com',
        ])
      );
      const userIds = await Promise.all(
        emails.map(async (email: string) => {
          try {
            return await getUserIdByEmail(email);
          } catch (error) {
            return null;
          }
        })
      );

      const response = await slackWeb.conversations.open({
        users: userIds.filter(u => Boolean(u)).join(','),
      });

      if (response.ok && response.channel?.id) {
        await slackWeb.chat.postMessage({
          channel: response.channel.id,

          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '🚨 *Interview Cancelled* 🚨',
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `Hi team,\n\nThe interview with *${getFullName(cand_application.candidates.first_name, cand_application.candidates.last_name)}* scheduled for *${dayjsLocal(meeting_detail.start_time).tz('Asia/Colombo').format(DAYJS_FORMATS.DATE_FORMAT)} at ${dayjsLocal(meeting_detail.start_time).tz('Asia/Colombo').format(DAYJS_FORMATS.STAR_TIME_FORMAT)} ${getShortTimeZone('Asia/Colombo')}* has been cancelled.\n\n*<${envConfig.CLIENT_APP_URL}/scheduling/view?meeting_id=${meeting_detail.id}&tab=candidate_details|View Meeting Details>*`,
              },
              accessory: {
                type: 'image',
                image_url:
                  'https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png', // Google Calendar SVG
                alt_text: 'Google Calendar',
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '🗓️ This event has been cancelled and removed from your Google Calendar.',
              },
            },
          ],
        });
      }
    });

    await Promise.all(promises);
    res.status(200).json({message: 'message sucessfully sended'});
  } catch (err: any) {
    console.error('some thing went wrong:', err);

    res.status(500).json(err.message);
  }
};
