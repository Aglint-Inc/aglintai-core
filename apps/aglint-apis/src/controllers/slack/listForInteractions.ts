import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin, supabaseWrap} from 'src/services/supabase/SupabaseAdmin';
import {SlackInteractionPayload} from 'src/types/slack/meetingConfirmationBlocks';

export const listForInteractions = async (req: Request, res: Response) => {
  try {
    const {payload} = req.body;
    const interaction_data = JSON.parse(payload) as SlackInteractionPayload;
    const action = interaction_data.actions[0];
    const channel_id = interaction_data.channel.id;
    const metadata = interaction_data.message.metadata.event_payload;
    if (action.value === 'available') {
      supabaseWrap(
        await supabaseAdmin
          .from('interview_session_relation')
          .update({accepted_status: 'accepted'})
          .eq('id', metadata.session_relation_id)
      );
      await slackWeb.chat.update({
        channel: channel_id,
        ts: interaction_data.message.ts,
        text: 'Thanks for confirmation',
        blocks: [
          interaction_data.message.blocks[0],
          interaction_data.message.blocks[1],
          {
            type: 'rich_text',
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Thanks 🥰 for confirmation,\n ',
                  },
                  {
                    type: 'text',
                    text: 'You will clicked the 🟢 available',
                    style: {
                      bold: true,
                    },
                  },
                ],
              },
            ],
          },
        ],
      });
    } else if (action.value === 'not_available') {
      supabaseWrap(
        await supabaseAdmin
          .from('interview_session_relation')
          .update({accepted_status: 'declined'})
          .eq('id', metadata.session_relation_id)
      );
      await slackWeb.chat.update({
        channel: channel_id,
        ts: interaction_data.message.ts,
        text: 'Thanks for confirmation',
        blocks: [
          interaction_data.message.blocks[0],
          interaction_data.message.blocks[1],
          {
            type: 'rich_text',
            elements: [
              {
                type: 'rich_text_section',
                elements: [
                  {
                    type: 'text',
                    text: 'Thanks 🥰 for confirmation,\n ',
                  },
                  {
                    type: 'text',
                    text: 'You will clicked the 🔴 Unavailable',
                    style: {
                      bold: true,
                    },
                  },
                ],
              },
            ],
          },
        ],
      });
    }

    return res.status(200).send('ok');
  } catch (error: any) {
    console.error('error : ', error.message);
  }
};
