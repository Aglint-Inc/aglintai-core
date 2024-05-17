import express from 'express';

const slackRoutes = express.Router();

slackRoutes.post('/send-direct-message');
slackRoutes.post('/private-channel-message');
slackRoutes.post('/group-message');

export default slackRoutes;
