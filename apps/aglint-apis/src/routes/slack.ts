import express from 'express';
import channelMessage from 'src/controllers/slack/channelMessage';
import {groupMessage} from 'src/controllers/slack/groupMessage';
import {listForInteractions} from 'src/controllers/slack/listForInteractions';
import {notifyInterviewConfirmation} from 'src/controllers/slack/notifyInterviewConfirmation';
import {reschedule} from 'src/controllers/slack/reschedule';
import {rsvpCapture} from 'src/controllers/slack/rsvpCapture';
import {sendDirectMessage} from 'src/controllers/slack/sendDirectMessage';

const slackRoutes = express.Router();

slackRoutes.post('/send-direct-message', sendDirectMessage);
slackRoutes.post('/group-message', groupMessage);
slackRoutes.post('/notify-interview-confirmation', notifyInterviewConfirmation);
slackRoutes.post('/interview-reminder', notifyInterviewConfirmation);
slackRoutes.post('/interactions', listForInteractions);

export default slackRoutes;
