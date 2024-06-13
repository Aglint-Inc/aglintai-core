import express from 'express';
import {feedback} from 'src/controllers/slack/feedBack';
import {groupMessage} from 'src/controllers/slack/groupMessage';
import {interviewReminder} from 'src/controllers/slack/interviewReminder';
import {listForInteractions} from 'src/controllers/slack/listForInteractions';
import {notifyInterviewConfirmation} from 'src/controllers/slack/notifyInterviewConfirmation';
import {sendDirectMessage} from 'src/controllers/slack/sendDirectMessage';

const slackRoutes = express.Router();

slackRoutes.post('/send-direct-message', sendDirectMessage);
slackRoutes.post('/group-message', groupMessage);
slackRoutes.post('/notify-interview-confirmation', notifyInterviewConfirmation);
slackRoutes.post('/interview-reminder', interviewReminder);
slackRoutes.post('/interactions', listForInteractions);
slackRoutes.post('/feedback', feedback);

export default slackRoutes;
