import express from 'express';
import {feedback} from 'src/controllers/slack/feedBack';
import {groupMessage} from 'src/controllers/slack/groupMessage';
import {interviewReminder} from 'src/controllers/slack/interviewReminder';
import {listForInteractions} from 'src/controllers/slack/listForInteractions';
import {notifyInterviewConfirmation} from 'src/controllers/slack/notifyInterviewConfirmation';
import {onQualifiedApprover} from 'src/controllers/slack/onQualifiedApprover';
import {onQualifiedTrainee} from 'src/controllers/slack/onQualifiedTrainee';
import {onRShadowCompleteTrainee} from 'src/controllers/slack/onRShadowCompleteTrainee';
import {onShadowCompleteTrainee} from 'src/controllers/slack/onShadowCompleteTrainee';
import {sendDirectMessage} from 'src/controllers/slack/sendDirectMessage';
import {slackEndPoints} from 'src/types/slack/routes.types';

const slackRoutes = express.Router();

slackRoutes.post(
  slackEndPoints.candidateBook_slack_interviewerForConfirmation,
  notifyInterviewConfirmation
);
slackRoutes.post(
  `/${slackEndPoints.interviewStart_slack_interviewers}`,
  interviewReminder
);
slackRoutes.post(
  `/${slackEndPoints.interviewEnd_slack_interviewerForFeedback}`,
  feedback
);

slackRoutes.post(
  `/${slackEndPoints.onShadowComplete_slack__trainee}`,
  onShadowCompleteTrainee
);
slackRoutes.post(
  `/${slackEndPoints.onRShadowComplete_slack__trainee}`,
  onRShadowCompleteTrainee
);
slackRoutes.post(
  `/${slackEndPoints.onQualified_slack__trainee}`,
  onQualifiedTrainee
);
slackRoutes.post(
  `/${slackEndPoints.onQualified_slack_approver}`,
  onQualifiedApprover
);

slackRoutes.post('/send-direct-message', sendDirectMessage);
slackRoutes.post('/group-message', groupMessage);
slackRoutes.post('/interactions', listForInteractions);

export default slackRoutes;
