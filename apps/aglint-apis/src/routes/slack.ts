import express from 'express';
import {groupMessage} from 'src/controllers/slack/groupMessage';
import {listForInteractions} from 'src/controllers/slack/listForInteractions';
import {notifyInterviewConfirmation} from 'src/controllers/slack/notifyInterviewConfirmation';
import {rsvp} from 'src/controllers/slack/rsvp';
import {sendDirectMessage} from 'src/controllers/slack/sendDirectMessage';

const slackRoutes = express.Router();

slackRoutes.post('/send-direct-message', sendDirectMessage);
slackRoutes.post('/rsvp', rsvp);
slackRoutes.post('/group-message', groupMessage);
slackRoutes.post('/notify-interview-confirmation', notifyInterviewConfirmation);
slackRoutes.post('/interactions', listForInteractions);

export default slackRoutes;
