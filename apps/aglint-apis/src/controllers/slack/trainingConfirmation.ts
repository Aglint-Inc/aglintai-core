import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';

export default async (req: Request, res: Response) => {
  const {email, message} = req.body;

  try {
    const userResponse = await slackWeb.users.lookupByEmail({email});
    const userId = userResponse.user.id;

    const result = await slackWeb.chat.postMessage({
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
