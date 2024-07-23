import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {getUserIdByEmail} from 'src/utils/slack';

export const reschedule = async (req: Request, res: Response) => {
  const {email, message} = req.body;

  try {
    const userId = await getUserIdByEmail(email);

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
                text: 'Reschedule',
              },
              style: 'primary',
              value: 'request_reschedule',
              action_id: 'request_reschedule',
            },
          ],
        },
      ],
    });

    res
      .status(200)
      .json({status: 'Reschedule request sent successfully', result});
  } catch (error) {
    console.error('Error sending reschedule request:', error);
    res.status(500).json({error: 'Error sending reschedule request'});
  }
};

// {
//     "email": "[chandra@aglinthq.com]",
//     "message":"hi I am slack bot"
// }
