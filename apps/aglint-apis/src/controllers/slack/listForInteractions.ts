/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const metadata = interaction_data.message.metadata;

    switch (metadata.event_type) {
      case 'candidate_confirm_slot':
        if (action.value === 'available')
          candidate_interview_accept(interaction_data);
        else if (action.value === 'not_available')
          candidate_interview_decline(interaction_data);
        break;

      case 'interviewer_feedback':
        if (action.value === 'feedBack_submit')
          interview_feedback_submit(interaction_data);
        break;

      case 'shadow_complete_trainee_confirmation':
        if (action.value === 'accept')
          shadow_complete_trainee_accept(interaction_data);
        else if (action.value === 'decline')
          shadow_complete_trainee_decline(interaction_data);
        break;

      case 'reverse_shadow_complete_trainee_confirmation':
        if (action.value === 'accept')
          reverse_shadow_trainee_accept(interaction_data);
        else if (action.value === 'decline')
          reverse_shadow_trainee_decline(interaction_data);
        break;
      case 'approver_qualified_confirmation':
        if (action.value === 'accept')
          qualified_approver_confirmation_accept(interaction_data);
        else if (action.value === 'decline')
          qualified_approver_confirmation_decline(interaction_data);

        break;
      case 'interviewer_attend_comfirmation':
        if (action.value === 'accept')
          interview_attent_confirmation_accept(interaction_data);
        else if (action.value === 'decline')
          interview_attent_confirmation_decline(interaction_data);
        break;
      case 'meeting_status_organizer':
        if (action.value === 'meeting_completed')
          meeting_status_organizer_accept(interaction_data);
        else if (action.value === 'meeting_not_completed')
          meeting_status_organizer_decline(interaction_data);
        break;
    }

    return res.status(200).send('ok');
  } catch (error: any) {
    console.error('error : ', error.message);
  }
};

const meeting_status_organizer_accept = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  const metadata = interaction_data.message.metadata;
  const meeting_id = metadata.event_payload.meeting_id;

  supabaseWrap(
    await supabaseAdmin
      .from('interview_meeting')
      .update({status: 'completed'})
      .eq('id', meeting_id)
  );
  await slackWeb.chat.update({
    channel: channel_id,
    ts: interaction_data.message.ts,
    text: 'Thanks for confirmation',
    blocks: [
      interaction_data.message.blocks[0],
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: '\nThank you for confirming that the interview meeting has been completed.',
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
};
const meeting_status_organizer_decline = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  const metadata = interaction_data.message.metadata;
  const meeting_id = metadata.event_payload.meeting_id;
  await slackWeb.chat.update({
    channel: channel_id,
    ts: interaction_data.message.ts,
    text: 'Thanks for confirmation',
    blocks: [
      interaction_data.message.blocks[0],
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Thank you for confirmation. please cancel the meeting and provide the reason <${process.env.NEXT_PUBLIC_APP_URL}/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details|here>`,
        },
      },
    ],
  });
};

const candidate_interview_accept = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  const metadata = interaction_data.message.metadata;
  supabaseWrap(
    await supabaseAdmin
      .from('interview_session_relation')
      .update({accepted_status: 'accepted'})
      .eq('id', metadata.event_payload.session_relation_id)
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
                text: 'Thanks for confirmation,\n ',
              },
              {
                type: 'text',
                text: 'You have selected the available option.',
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
};

const candidate_interview_decline = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  const metadata = interaction_data.message.metadata;
  supabaseWrap(
    await supabaseAdmin
      .from('interview_session_relation')
      .update({accepted_status: 'declined'})
      .eq('id', metadata.event_payload.session_relation_id)
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
                text: 'Thanks for confirmation,\n ',
              },
              {
                type: 'text',
                text: 'You have selected the unavailable option.',
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
};

const interview_feedback_submit = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  const metadata = interaction_data.message.metadata;
  let rating;
  const feedback_text =
    interaction_data.state.values.input_block.feedback_text.value;

  for (const rate in interaction_data.state.values) {
    for (const r in interaction_data.state.values[rate]) {
      rating = interaction_data.state.values[rate][r]?.selected_option?.value;

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
        .eq('id', metadata.event_payload.session_relation_id)
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
                  text: '\nThanks for Feedback,\n ',
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
    if (typeof interaction_data.message.blocks[4]?.text?.text === 'string') {
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
};

const shadow_complete_trainee_accept = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  const metadata = interaction_data.message.metadata;
  const session_relation_id = metadata.event_payload.session_relation_id;

  supabaseWrap(
    await supabaseAdmin
      .from('interview_training_progress')
      .update({is_attended: true})
      .eq('session_relation_id', session_relation_id)
  );
  await slackWeb.chat.update({
    channel: channel_id,
    ts: interaction_data.message.ts,
    text: 'Thanks for confirmation',
    blocks: [
      interaction_data.message.blocks[0],
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: '\nThank you for confirming that you were able to attend the interview.\n ',
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
};

const shadow_complete_trainee_decline = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  await slackWeb.chat.update({
    channel: channel_id,
    ts: interaction_data.message.ts,
    text: 'Thanks for confirmation',
    blocks: [
      interaction_data.message.blocks[0],
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: '\nThank you for confirming that you were unable to attend the interview.',
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
};

const reverse_shadow_trainee_accept = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  const metadata = interaction_data.message.metadata;
  const session_relation_id = metadata.event_payload.session_relation_id;

  supabaseWrap(
    await supabaseAdmin
      .from('interview_training_progress')
      .update({is_attended: true})
      .eq('session_relation_id', session_relation_id)
  );

  await slackWeb.chat.update({
    channel: channel_id,
    ts: interaction_data.message.ts,
    text: 'Thanks for confirmation',
    blocks: [
      interaction_data.message.blocks[0],
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: '\nThank you for confirming that you were able to attend the reverse shadow sessions.',
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
};

const reverse_shadow_trainee_decline = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  await slackWeb.chat.update({
    channel: channel_id,
    ts: interaction_data.message.ts,
    text: 'Thanks for confirmation',
    blocks: [
      interaction_data.message.blocks[0],
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: '\nThank you for confirming that you were unable to attend the reverse shadow sessions.',
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
};

const interview_attent_confirmation_accept = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  await slackWeb.chat.update({
    channel: channel_id,
    ts: interaction_data.message.ts,
    text: 'Thanks for confirmation',
    blocks: [
      interaction_data.message.blocks[0],
      interaction_data.message.blocks[3],
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: '\nThank you for confirming that you have attended the interview.\n ',
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
};

const interview_attent_confirmation_decline = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  await slackWeb.chat.update({
    channel: channel_id,
    ts: interaction_data.message.ts,
    text: 'Thanks for confirmation',
    blocks: [
      interaction_data.message.blocks[0],
      interaction_data.message.blocks[3],
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: '\nThank you for confirming that you were unable to attend the interview.',
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
};

const qualified_approver_confirmation_accept = async (
  interaction_data: any
) => {
  const channel_id = interaction_data.channel.id;
  await slackWeb.chat.update({
    channel: channel_id,
    ts: interaction_data.message.ts,
    text: 'Thanks for confirmation',
    blocks: [
      interaction_data.message.blocks[0],
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: '\nThank you for confirming that you have accepted the trainee as qualified.',
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
};

const qualified_approver_confirmation_decline = async (
  interaction_data: any
) => {
  const channel_id = interaction_data.channel.id;
  await slackWeb.chat.update({
    channel: channel_id,
    ts: interaction_data.message.ts,
    text: 'Thanks for confirmation',
    blocks: [
      interaction_data.message.blocks[0],
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'text',
                text: '\nThank you for confirming that you have declined to qualify the trainee.',
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
};
