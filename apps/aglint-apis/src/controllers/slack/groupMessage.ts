import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';
import {getUserIdByEmail} from 'src/utils/slack';

export async function groupMessage(req: Request, res: Response) {
  const {emails, text} = req.body;

  if (!emails || !text) {
    return res.status(400).json({error: 'Emails and text are required'});
  }

  try {
    const userIds = await Promise.all(
      emails.map((email: string) => getUserIdByEmail(email))
    );

    const response = await slackWeb.conversations.open({
      users: userIds.join(','),
    });

    if (response.ok && response.channel?.id) {
      await slackWeb.chat.postMessage({
        channel: response.channel.id,
        text,
      });

      res.status(200).json({message: 'Group discussion started successfully'});
    } else {
      res.status(500).json({error: 'Failed to create group discussion'});
    }
  } catch (error) {
    console.error('Error starting group discussion:', error);
    res.status(500).json({error: 'Failed to start group discussion'});
  }
}

// {
//   "emails": ["chandra@aglinthq.com", "dileep@aglinthq.com"],
//   "text": "Hello, this message from group-message endpoint "
//  }
