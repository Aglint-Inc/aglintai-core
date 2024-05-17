import {slackWeb} from '@/services/slack/slackWeb';
import {Request, Response} from 'express';

export const sendDirectMessage = async (req: Request, res: Response) => {
  const {} = req.body;
  try {
    return res.status(200).send();
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
