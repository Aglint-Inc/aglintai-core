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
  const {session_ids, request_id, event_run_id} = req.body;
  if (!session_ids || !request_id) {
    return res.status(400).send('missing either session_ids or request_id');
  }
  supabaseWrap(
    await supabaseAdmin
      .from('request_progress')
      .delete()
      .eq('event_type', 'MEETING_CANCEL_INFORM_INTERVIEWER_ORGANIZER')
      .eq('request_id', request_id)
  );
  const [curr_prog] = supabaseWrap(
    await supabaseAdmin
      .from('request_progress')
      .insert({
        event_type: 'MEETING_CANCEL_INFORM_INTERVIEWER_ORGANIZER',
        request_id,
        is_progress_step: false,
        status: 'in_progress',
        meta: {
          event_run_id,
        },
      })
      .select()
  );
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
    supabaseWrap(
      await supabaseAdmin
        .from('request_progress')
        .update({
          event_type: 'MEETING_CANCEL_INFORM_INTERVIEWER_ORGANIZER',
          request_id,
          is_progress_step: false,
          status: 'completed',
          meta: {
            event_run_id,
          },
        })
        .eq('id', curr_prog.id)
        .select()
    );
    res.status(200).json({message: 'message sucessfully sended'});
  } catch (err: any) {
    console.error('some thing went wrong:', err);
    supabaseWrap(
      await supabaseAdmin
        .from('request_progress')
        .insert({
          event_type: 'MEETING_CANCEL_INFORM_INTERVIEWER_ORGANIZER',
          request_id,
          log: 'Something went wrong',
          is_progress_step: true,
          status: 'failed',
          meta: {
            event_run_id,
          },
        })
        .select()
    );
    supabaseWrap(
      await supabaseAdmin
        .from('request_progress')
        .update({
          id: curr_prog.id,
          event_type: 'MEETING_CANCEL_INFORM_INTERVIEWER_ORGANIZER',
          request_id,
          is_progress_step: false,
          status: 'failed',
          meta: {
            event_run_id,
          },
        })
        .select()
    );
    res.status(500).json(err.message);
  }
};
