import {WebClient} from '@slack/web-api';

export default async (req, res) => {
  const token = process.env.SLACK_BOT_TOKEN;
  const web = new WebClient(token);

  const {email, message} = req.body;

  try {
    const userResponse = await web.users.lookupByEmail({email});
    const userId = userResponse.user.id;

    const result = await web.chat.postMessage({
      channel: userId,
      text: message,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${message}`,
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Confirm',
              },
              style: 'primary',
              value: 'confirm_training',
              action_id: 'confirm_training',
            },
          ],
        },
      ],
    });

    res.status(200).json({
      status: 'Training confirmation request sent successfully',
      result,
    });
  } catch (error) {
    console.error('Error sending training confirmation request:', error);
    res
      .status(500)
      .json({error: 'Error sending training confirmation request'});
  }
};
