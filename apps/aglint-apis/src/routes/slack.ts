import {DatabaseEnums} from '@aglint/shared-types';
import express from 'express';
import {feedback} from 'src/controllers/slack/feedBack';
import {groupMessage} from 'src/controllers/slack/groupMessage';
import {interviewReminder} from 'src/controllers/slack/interviewReminder';
import {listForInteractions} from 'src/controllers/slack/listForInteractions';
import {notifyInterviewConfirmation} from 'src/controllers/slack/notifyInterviewConfirmation';
import {sendDirectMessage} from 'src/controllers/slack/sendDirectMessage';

const slackRoutes = express.Router();

const interviewerConfirmationRoute: DatabaseEnums['email_slack_types'] =
  'candidateBook_slack_interviewerForFeedback';
const interview_reminder_route: DatabaseEnums['email_slack_types'] =
  'interviewStart_slack_interviewers';

const interviewer_feedback_route: DatabaseEnums['email_slack_types'] =
  'interviewEnd_slack_interviewers';

slackRoutes.post(
  `/${interviewerConfirmationRoute}`,
  notifyInterviewConfirmation
);
slackRoutes.post(`/${interview_reminder_route}`, interviewReminder);
slackRoutes.post(`/${interviewer_feedback_route}`, feedback);

slackRoutes.post('/send-direct-message', sendDirectMessage);
slackRoutes.post('/group-message', groupMessage);
slackRoutes.post('/interactions', listForInteractions);

export default slackRoutes;
