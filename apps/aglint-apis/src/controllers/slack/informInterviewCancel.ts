import {supabaseWrap} from '@aglint/shared-utils';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
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
      const meeting_ints = supabaseWrap(
        await supabaseAdmin
          .from('meeting_interviewers')
          .select()
          .eq('id', meeting_detail.id)
      );
      const [organizer] = supabaseWrap(
        await supabaseAdmin
          .from('recruiter_user')
          .select()
          .eq('user_id', meeting_detail.organizer_id)
      );
      //   const emails = [...meeting_ints.map(int => int.email), organizer.email];
      const emails = ['dileep@aglinthq.com'];
      const userIds = await Promise.all(
        emails.map((email: string) => getUserIdByEmail(email))
      );

      const response = await slackWeb.conversations.open({
        users: userIds.join(','),
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
                text: 'Hi team,\n\nThe interview with *[Candidate Name]* scheduled for *[Date] at [Time]* has been cancelled.\n\nPlease reach out if you have any questions.\n\nThank you!',
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
