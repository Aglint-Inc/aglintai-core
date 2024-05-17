import express from 'express';
import {getSession} from 'src/controllers/slack/getSessions';
import {groupMessage} from 'src/controllers/slack/groupMessage';
import {rsvp} from 'src/controllers/slack/rsvp';
import {sendDirectMessage} from 'src/controllers/slack/sendDirectMessage';

const slackRoutes = express.Router();

slackRoutes.post('/send-direct-message', sendDirectMessage);
slackRoutes.post('/rsvp', rsvp);
slackRoutes.post('/group-message', groupMessage);
slackRoutes.post('/get-session', getSession);

export default slackRoutes;
