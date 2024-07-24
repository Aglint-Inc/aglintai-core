import express from 'express';
import {feedback} from 'src/controllers/slack/feedBack';
import {getMeetingStatusOrganizer} from 'src/controllers/slack/getMeetingStatusOrganizer';
import {interviewReminder} from 'src/controllers/slack/interviewReminder';
import {listForInteractions} from 'src/controllers/slack/listForInteractions';
import {notifyInterviewConfirmation} from 'src/controllers/slack/notifyInterviewConfirmation';
import {onQualifiedApprover} from 'src/controllers/slack/onQualifiedApprover';
import {onQualifiedTrainee} from 'src/controllers/slack/onQualifiedTrainee';
import {onRShadowCompleteTrainee} from 'src/controllers/slack/onRShadowCompleteTrainee';
import {onShadowCompleteTrainee} from 'src/controllers/slack/onShadowCompleteTrainee';
import {slackEndPoints} from 'src/types/slack/routes.types';

const slackRoutes = express.Router();

slackRoutes.post(
  `/${slackEndPoints.candidateBook_slack_interviewerForConfirmation}`,
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
  `/${slackEndPoints.interviewEnd_slack_shadowTraineeForMeetingAttendence}`,
  onShadowCompleteTrainee
);
slackRoutes.post(
  `/${slackEndPoints.interviewEnd_slack_rShadowTraineeForMeetingAttendence}`,
  onRShadowCompleteTrainee
);
slackRoutes.post(
  `/${slackEndPoints.onQualified_slack_trainee}`,
  onQualifiedTrainee
);
slackRoutes.post(
  `/${slackEndPoints.onTrainingComplete_slack_approverForTraineeMeetingQualification}`,
  onQualifiedApprover
);

slackRoutes.post(
  `/${slackEndPoints.interviewEnd_slack_organizerForMeetingStatus}`,
  getMeetingStatusOrganizer
);

// slackRoutes.post(
//   `/${slackEndPoints.interviewer_attend_comfirmation}`,
//   interviewerAttentedConfirmation
// );

slackRoutes.post('/interactions', listForInteractions);

export default slackRoutes;
