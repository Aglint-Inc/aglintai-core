import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {getChannelIdByName} from 'src/utils/slack';

export default async function channelMessage(req: Request, res: Response) {
  if (req.method === 'POST') {
    const {channelName, text} = req.body;

    if (!channelName || !text) {
      return res
        .status(400)
        .json({error: 'Channel name and text are required'});
    }

    try {
      const channelId = await getChannelIdByName(channelName);

      if (channelId) {
        await slackWeb.chat.postMessage({
          channel: channelId,
          text,
        });

        res.status(200).json({message: 'Message sent successfully'});
      } else {
        res.status(404).json({error: 'Channel not found'});
      }
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({error: 'Failed to send message'});
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Example POST /api/slack/send-to-channel
//  {
//     "channelName": "general",
//     "text": "This is a message from general channel"
//   }
