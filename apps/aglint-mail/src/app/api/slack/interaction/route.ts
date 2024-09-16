/* eslint-disable no-unreachable-loop */
import { supabaseWrap } from '@aglint/shared-utils';
import { getSlackWeb } from '../../../../slack/slackWeb';
import { getSupabaseServer } from '../../../../supabase/supabaseAdmin';
import { createPostRoute } from '../../../../utils/apiUtils/createPostRoute';

const handleInteraction = async (payload: any) => {
  const interaction_data = JSON.parse(payload);
  const action = interaction_data.actions[0];
  const metadata = interaction_data.message.metadata;

  switch (metadata.event_type) {
    case 'candidate_confirm_slot':
      if (action.value === 'available')
        await candidate_interview_accept(interaction_data);
      else if (action.value === 'not_available')
        await candidate_interview_decline(interaction_data);
      break;

    case 'interviewer_feedback':
      if (action.value === 'feedBack_submit')
        await interview_feedback_submit(interaction_data);
      break;

    case 'shadow_complete_trainee_confirmation':
      if (action.value === 'accept')
        await shadow_complete_trainee_accept(interaction_data);
      else if (action.value === 'decline')
        await shadow_complete_trainee_decline(interaction_data);
      break;

    case 'reverse_shadow_complete_trainee_confirmation':
      if (action.value === 'accept')
        await reverse_shadow_trainee_accept(interaction_data);
      else if (action.value === 'decline')
        await reverse_shadow_trainee_decline(interaction_data);
      break;
    case 'approver_qualified_confirmation':
      if (action.value === 'accept')
        await qualified_approver_confirmation_accept(interaction_data);
      else if (action.value === 'decline')
        await qualified_approver_confirmation_decline(interaction_data);

      break;
    case 'interviewer_attend_comfirmation':
      if (action.value === 'accept')
        await interview_attent_confirmation_accept(interaction_data);
      else if (action.value === 'decline')
        await interview_attent_confirmation_decline(interaction_data);
      break;
    case 'meeting_status_organizer':
      if (action.value === 'meeting_completed')
        await meeting_status_organizer_accept(interaction_data);
      else if (action.value === 'meeting_not_completed')
        await meeting_status_organizer_decline(interaction_data);
      break;
  }
};

export const POST = createPostRoute(null, handleInteraction);

const meeting_status_organizer_accept = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  const metadata = interaction_data.message.metadata;
  const meeting_id = metadata.event_payload.meeting_id;
  const supabaseAdmin = getSupabaseServer();
  const slackWeb = getSlackWeb();
  supabaseWrap(
    await supabaseAdmin
      .from('interview_meeting')
      .update({ status: 'completed' })
      .eq('id', meeting_id),
  );
  const response = await slackWeb.chat.update({
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
  if (!response.ok) {
    throw new Error(response.error);
  }
};
const meeting_status_organizer_decline = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  const metadata = interaction_data.message.metadata;
  const meeting_id = metadata.event_payload.meeting_id;
  const slackWeb = getSlackWeb();
  const response = await slackWeb.chat.update({
    channel: channel_id,
    ts: interaction_data.message.ts,
    text: 'Thanks for confirmation',
    blocks: [
      interaction_data.message.blocks[0],
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Thank you for confirmation. please cancel the meeting and provide the reason <${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details|here>`,
        },
      },
    ],
  });
  if (!response.ok) {
    throw new Error(response.error);
  }
};

const candidate_interview_accept = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  const metadata = interaction_data.message.metadata;
  const supabaseAdmin = getSupabaseServer();
  const slackWeb = getSlackWeb();
  supabaseWrap(
    await supabaseAdmin
      .from('interview_session_relation')
      .update({ accepted_status: 'accepted' })
      .eq('id', metadata.event_payload.session_relation_id),
  );
  const response = await slackWeb.chat.update({
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
  if (!response.ok) {
    throw new Error(response.error);
  }
};

const candidate_interview_decline = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  const metadata = interaction_data.message.metadata;
  const supabaseAdmin = getSupabaseServer();
  const slackWeb = getSlackWeb();
  const [rec] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session_relation')
      .update({ accepted_status: 'declined' })
      .eq('id', metadata.event_payload.session_relation_id)
      .select(),
  );

  supabaseWrap(
    await supabaseAdmin.from('interview_session_cancel').insert({
      reason: 'interview declined',
      session_id: rec.session_id,
      session_relation_id: metadata.event_payload.session_relation_id,
    }),
  );
  const response = await slackWeb.chat.update({
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
  if (!response.ok) {
    throw new Error(response.error);
  }
};

const interview_feedback_submit = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  const metadata = interaction_data.message.metadata;
  const supabaseAdmin = getSupabaseServer();
  const slackWeb = getSlackWeb();
  let rating: number;
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
        .eq('id', metadata.event_payload.session_relation_id),
    );
    const response = await slackWeb.chat.update({
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
    if (!response.ok) {
      throw new Error(response.error);
    }
  } else if (
    typeof interaction_data.message.blocks[4]?.text?.text === 'string'
  ) {
    let err_msg: string;
    if (typeof feedback_text === 'string') {
      if (feedback_text.length < 20 && !rating)
        err_msg = 'Feedback must be have 20 letters and select rating';
      else if (feedback_text.length >= 20 && rating) err_msg = 'select rating';
    } else if (rating) err_msg = 'Please fill feedback';
    else if (!rating) err_msg = 'Please fill the all column';
    const response = await slackWeb.chat.update({
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
    if (!response.ok) {
      throw new Error(response.error);
    }
  } else {
    const response = await slackWeb.chat.update({
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
    if (!response.ok) {
      throw new Error(response.error);
    }
  }
};

const shadow_complete_trainee_accept = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  const metadata = interaction_data.message.metadata;
  const session_relation_id = metadata.event_payload.session_relation_id;
  const supabaseAdmin = getSupabaseServer();
  const slackWeb = getSlackWeb();
  supabaseWrap(
    await supabaseAdmin
      .from('interview_training_progress')
      .update({ is_attended: true })
      .eq('session_relation_id', session_relation_id),
  );
  const response = await slackWeb.chat.update({
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
  if (!response.ok) {
    throw new Error(response.error);
  }
};

const shadow_complete_trainee_decline = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;

  const slackWeb = getSlackWeb();
  const response = await slackWeb.chat.update({
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
  if (!response.ok) {
    throw new Error(response.error);
  }
};

const reverse_shadow_trainee_accept = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;
  const metadata = interaction_data.message.metadata;
  const session_relation_id = metadata.event_payload.session_relation_id;
  const supabaseAdmin = getSupabaseServer();
  const slackWeb = getSlackWeb();
  supabaseWrap(
    await supabaseAdmin
      .from('interview_training_progress')
      .update({ is_attended: true })
      .eq('session_relation_id', session_relation_id),
  );

  const response = await slackWeb.chat.update({
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
  if (!response.ok) {
    throw new Error(response.error);
  }
};

const reverse_shadow_trainee_decline = async (interaction_data: any) => {
  const slackWeb = getSlackWeb();
  const channel_id = interaction_data.channel.id;
  const response = await slackWeb.chat.update({
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
  if (!response.ok) {
    throw new Error(response.error);
  }
};

const interview_attent_confirmation_accept = async (interaction_data: any) => {
  const slackWeb = getSlackWeb();
  const channel_id = interaction_data.channel.id;
  const response = await slackWeb.chat.update({
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
  if (!response.ok) {
    throw new Error(response.error);
  }
};

const interview_attent_confirmation_decline = async (interaction_data: any) => {
  const channel_id = interaction_data.channel.id;

  const slackWeb = getSlackWeb();
  const response = await slackWeb.chat.update({
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
  if (!response.ok) {
    throw new Error(response.error);
  }
};

const qualified_approver_confirmation_accept = async (
  interaction_data: any,
) => {
  const channel_id = interaction_data.channel.id;
  const slackWeb = getSlackWeb();
  const response = await slackWeb.chat.update({
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
  if (!response.ok) {
    throw new Error(response.error);
  }
};

const qualified_approver_confirmation_decline = async (
  interaction_data: any,
) => {
  const channel_id = interaction_data.channel.id;
  const slackWeb = getSlackWeb();
  const response = await slackWeb.chat.update({
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
  if (!response.ok) {
    throw new Error(response.error);
  }
};
