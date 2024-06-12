import {supabaseWrap} from '@aglint/shared-utils';
import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';

export const listForInteractions = async (req: Request, res: Response) => {
  try {
    const {payload} = req.body;

    // const interaction_data = JSON.parse(payload) as SlackInteractionPayload;
    const interaction_data = JSON.parse(payload);
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
    } else if (action.value === 'feedBack_submit') {
      let rating;
      const feedback_text =
        interaction_data.state.values.input_block.feedback_text.value;

      for (const rate in interaction_data.state.values) {
        for (const r in interaction_data.state.values[rate]) {
          rating =
            interaction_data.state.values[rate][r]?.selected_option?.value;

          break;
        }
        break;
      }
      if (
        rating &&
        typeof feedback_text === 'string' &&
        feedback_text.length >= 20
      ) {
        supabaseWrap(
          await supabaseAdmin
            .from('interview_session_relation')
            .update({
              feedback: {
                objective: feedback_text,
                recommendation: rating,
              },
            })
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
                      text: `Rating : ${rating}\n`,
                    },
                    {
                      type: 'text',
                      text: `Feedback : ${feedback_text}\n`,
                    },
                    {
                      type: 'text',
                      text: '\nThanks 🥰 for Feedback,\n ',
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
      } else {
        if (
          typeof interaction_data.message.blocks[4]?.text?.text === 'string'
        ) {
          // eslint-disable-next-line prettier/prettier
          let err_msg;
          if (typeof feedback_text === 'string') {
            if (feedback_text.length < 20 && !rating)
              err_msg = 'Feedback must be have 20 letters and select rating';
            else if (feedback_text.length >= 20 && rating)
              err_msg = 'select rating';
          } else {
            if (rating) err_msg = 'Please fill feedback';
            else if (!rating) err_msg = 'Please fill the all column';
          }
          await slackWeb.chat.update({
            channel: channel_id,
            ts: interaction_data.message.ts,
            text: 'Thanks for confirmation',
            blocks: [
              interaction_data.message.blocks[0],
              interaction_data.message.blocks[1],
              interaction_data.message.blocks[2],
              interaction_data.message.blocks[3],
              {
                type: 'section',
                text: {
                  type: 'plain_text',
                  text: err_msg,
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
                      text: 'Submit',
                    },
                    style: 'primary',
                    value: 'feedBack_submit',
                  },
                ],
              },
            ],
          });
        } else {
          await slackWeb.chat.update({
            channel: channel_id,
            ts: interaction_data.message.ts,
            text: 'Thanks for confirmation',
            blocks: [
              interaction_data.message.blocks[0],
              interaction_data.message.blocks[1],
              interaction_data.message.blocks[2],
              interaction_data.message.blocks[3],
              {
                type: 'section',
                text: {
                  type: 'plain_text',
                  text: 'Please fill the all column and sumbit',
                },
              },
              interaction_data.message.blocks[4],
            ],
          });
        }
      }
    }

    return res.status(200).send('ok');
  } catch (error: any) {
    console.error('error : ', error.message);
  }
};
