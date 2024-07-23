/* eslint-disable no-console */
import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import phoneAgentRoutes, {mountScheduleAgentWs} from './routes/scheduleAgent';
import screenignAgentRouter from './routes/screeningAgent';

import slackRoutes from './routes/slack';
import errorHandler from './middlewares/errorHandler';
import emailAgentRouter from './routes/emailAgent';
import retellRoutes from './routes/retell';
import twilioRouter from './routes/twilio';

import {envConfig} from './config';
import {twilioClient} from './services/twilio/index';
import {appLogger} from './services/logger/index';
import {redisClient} from './services/cache/redis-cache';
import aglintAgentRouter from './routes/testAgent';

const PORT = envConfig.PORT;

const app = expressWs(express()).app;
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://dev.aglinthq.com',
      'https://app.aglinthq.com',
    ],
  })
);
app.use(express.urlencoded({extended: true}));

// routes
twilioClient.ListenTwilioVoiceWebhook(app);
app.get('/health', (req, res) => {
  res.status(200).send('server running v 1.0.1');
});
app.use('/api/schedule-agent', phoneAgentRoutes);
app.use('/api/screening-agent', screenignAgentRouter);
app.use('/api/email-agent', emailAgentRouter);
app.use('/api/twilio', twilioRouter);
app.use('/api/retell', retellRoutes);
app.use('/api/slack', slackRoutes);
app.use('/api', aglintAgentRouter);
app.get('/redis', async (req, res) => {
  console.time('verify-redis');
  await redisClient.set('foo', 'bar');
  const d = await redisClient.get('foo');
  console.timeEnd('verify-redis');
  return res.status(200).send(d);
});
app.use(errorHandler);
mountScheduleAgentWs();

app.listen(PORT, () => {
  appLogger.info(`server started on port ${PORT}`);
});
