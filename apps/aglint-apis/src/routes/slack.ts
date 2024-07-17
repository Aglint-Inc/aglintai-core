import {DatabaseEnums} from '@aglint/shared-types';
import express from 'express';
import {feedback} from 'src/controllers/slack/feedBack';
import {groupMessage} from 'src/controllers/slack/groupMessage';
import {interviewReminder} from 'src/controllers/slack/interviewReminder';
import {listForInteractions} from 'src/controllers/slack/listForInteractions';
import {notifyInterviewConfirmation} from 'src/controllers/slack/notifyInterviewConfirmation';
import {sendDirectMessage} from 'src/controllers/slack/sendDirectMessage';
import {slackEndPoints} from 'src/types/slack/routes.types';

const slackRoutes = express.Router();

slackRoutes.post(
  slackEndPoints.candidateBook_slack_interviewerForConfirmation,
  notifyInterviewConfirmation
);
slackRoutes.post(
  slackEndPoints.interviewStart_slack_interviewers,
  interviewReminder
);
slackRoutes.post(
  slackEndPoints.interviewEnd_slack_interviewerForFeedback,
  feedback
);

slackRoutes.post('/send-direct-message', sendDirectMessage);
slackRoutes.post('/group-message', groupMessage);
slackRoutes.post('/interactions', listForInteractions);

export default slackRoutes;
