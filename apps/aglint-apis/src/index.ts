import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import phoneAgentRoutes, {mountScheduleAgentWs} from '@routes/scheduleAgent';
import screenignAgentRouter from '@routes/screeningAgent';
import {twilioClient} from '@services/twilio';
import emailAgentRouter from '@routes/emailAgent';
import twilioRouter from '@routes/twilio';
import {appLogger} from '@services/logger';
import errorHandler from '@/middlewares/middleware';
import retellRoutes from '@/routes/retell';
import {envConfig} from '@/config';
import slackRoutes from '@routes/slack';

const PORT = envConfig.PORT;

const app = expressWs(express()).app;
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://preprod.aglinthq.com',
      'https://app.aglinthq.com',
    ],
  })
);
app.use(express.urlencoded({extended: true}));

// routes
twilioClient.ListenTwilioVoiceWebhook(app);
app.get('/health', (req, res) => {
  res.status(200).send('server running');
});
app.use('/api/schedule-agent', phoneAgentRoutes);
app.use('/api/screening-agent', screenignAgentRouter);
app.use('/api/email-agent', emailAgentRouter);
app.use('/api/twilio', twilioRouter);
app.use('/api/retell', retellRoutes);
app.use('/api/slack', slackRoutes);
app.use(errorHandler);
mountScheduleAgentWs();

app.listen(PORT, () => {
  appLogger.info(`server started on port ${PORT}`);
});
