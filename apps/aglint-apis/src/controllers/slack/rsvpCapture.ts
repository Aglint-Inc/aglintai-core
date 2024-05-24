import {Request, Response} from 'express';
import {slackWeb} from 'src/services/slack/slackWeb';

const slackSigningSecret = 'YOUR_SLACK_SIGNING_SECRET';

export async function rsvpCapture(req: Request, res: Response) {
  const {session_id} = req.body.payload;
  if (!session_id) {
    return res.status(400).json({error: 'Session id required'});
  }
  try {
    res.status(200).json({message: 'message sucessfully sended'});
  } catch (error) {
    console.error('some thing went wrong:', error);
    res.status(500).json({error: 'Failed to start group discussion'});
  }
}
