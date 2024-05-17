import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';

export const rsvp = async (req: Request, res: Response) => {
  const {email, message} = req.body;

  if (!email || !message) {
    return res.status(400).json({error: 'email and message are required'});
  }
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
            text: '<google.com | HR Meeting> sheduled with candidate :\n*<google.com|Fred Enriquez - SDE 2>*',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Meeting Place :* Zoom\n*Meeting Time :* Aug 10 10:00 AM - 10:30 AM IST\n *Duration :* 30 Minutes\n',
          },
          accessory: {
            type: 'image',
            image_url:
              'https://api.slack.com/img/blocks/bkb_template_images/approvalsNewDevice.png',
            alt_text: 'google calender',
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
                text: 'Available',
              },
              style: 'primary',
              value: 'click_me_123',
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'Not Available',
              },
              style: 'danger',
              value: 'click_me_123',
            },
          ],
        },
      ],
    });

    res.status(200).json({status: 'RSVP request sent successfully', result});
  } catch (error: any) {
    console.error('Error sending message:', error);
    res.status(500).json({error: 'Failed to send message'});
  }
};

// {
//   "email":"chandra@aglinthq.com",
//   "message":"Hi"
// }
