import {Request, Response} from 'express';
import {slackWeb} from '@/services/slack/slackWeb';

export const sendDirectMessage = async (req: Request, res: Response) => {
  const {recipients, text} = req.body;

  if (!recipients || !text) {
    return res.status(400).json({error: 'Recipients and text are required'});
  }
  try {
    for (const recipient of recipients) {
      if (recipient.type === 'email') {
        await sendMessageToUserByEmail(recipient.value, text);
      } else if (recipient.type === 'channel') {
        await slackWeb.chat.postMessage({
          channel: recipient.value,
          text,
        });
      } else if (recipient.type === 'user_id') {
        await slackWeb.chat.postMessage({
          channel: recipient.value,
          text,
        });
      }
    }
    return res.status(200).send('Message send successfully');
  } catch (error: any) {
    console.error('Error sending message:', error);
    res.status(500).json({error: 'Failed to send message'});
  }
};

async function sendMessageToUserByEmail(email: string, text: string) {
  const user = await slackWeb.users.lookupByEmail({email});
  if (user && user.user && user.user.id) {
    await slackWeb.chat.postMessage({
      channel: user.user.id,
      text,
    });
  }
}

// {
//   "recipients":[
//       {
//           "type":"email",
//           "value":"chandra@aglinthq.com"
//       }
//   ],
//   "text":"message from api"
// }
