// import privateChannelMessage from '@/controllers/slack/privateChannelMessage';
import {groupMessage} from '@/controllers/slack/groupMessage';
import {notifyInterviewConfirmation} from '@/controllers/slack/notifyInterviewConfirmation';
import {rsvp} from '@/controllers/slack/rsvp';
import {sendDirectMessage} from '@/controllers/slack/sendDirectMessage';
import express from 'express';

const slackRoutes = express.Router();

slackRoutes.post('/send-direct-message', sendDirectMessage);
slackRoutes.post('/rsvp', rsvp);
slackRoutes.post('/group-message', groupMessage);
slackRoutes.post('/notify-interview-confirmation', notifyInterviewConfirmation);

export default slackRoutes;
