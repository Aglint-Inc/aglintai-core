import {DatabaseEnums} from '@aglint/shared-types';
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

const interviewerConfirmationRoute: DatabaseEnums['email_slack_types'] =
  'candidateBook_slack_interviewerForConfirmation';
const interview_reminder_route: DatabaseEnums['email_slack_types'] =
  'interviewStart_slack_interviewers';

const interviewer_feedback_route: DatabaseEnums['email_slack_types'] =
  'interviewEnd_slack_interviewerForFeedback';

const onShadowComplete_trainee: DatabaseEnums['email_slack_types'] =
  'onShadowComplete_slack_trainee';
const onRShadowComplete_trainee: DatabaseEnums['email_slack_types'] =
  'onRShadowComplete_slack_trainee';
const onQualified_trainee: DatabaseEnums['email_slack_types'] =
  'onQualified_slack_trainee';
const onQualified_approver: DatabaseEnums['email_slack_types'] =
  'onQualified_slack_approver';

slackRoutes.post(
  slackEndPoints.candidateBook_slack_interviewerForConfirmation,
  notifyInterviewConfirmation
);
slackRoutes.post(`/${interview_reminder_route}`, interviewReminder);
slackRoutes.post(`/${interviewer_feedback_route}`, feedback);

slackRoutes.post(`/${onShadowComplete_trainee}`, onShadowCompleteTrainee);
slackRoutes.post(`/${onRShadowComplete_trainee}`, onRShadowCompleteTrainee);
slackRoutes.post(`/${onQualified_trainee}`, onQualifiedTrainee);
slackRoutes.post(`/${onQualified_approver}`, onQualifiedApprover);

slackRoutes.post('/send-direct-message', sendDirectMessage);
slackRoutes.post('/group-message', groupMessage);
slackRoutes.post('/interactions', listForInteractions);

export default slackRoutes;
