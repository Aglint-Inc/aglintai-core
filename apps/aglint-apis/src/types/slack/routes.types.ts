import {DatabaseEnums} from '@aglint/shared-types';

type SelectedEmailSlackTypes = Extract<
  DatabaseEnums['email_slack_types'],
  | 'candidateBook_slack_interviewerForConfirmation'
  | 'interviewStart_slack_interviewers'
  | 'interviewEnd_slack_interviewerForFeedback'
  | 'onTrainingComplete_slack_approverForTraineeMeetingQualification'
  | 'onQualified_slack_trainee'
  | 'interviewEnd_slack_rShadowTraineeForMeetingAttendence'
  | 'interviewEnd_slack_shadowTraineeForMeetingAttendence'
  | 'interviewer_attend_comfirmation'
  | 'interviewEnd_slack_organizerForMeetingStatus'
>;

export const slackEndPoints: {
  [key in SelectedEmailSlackTypes]: key;
} = {
  candidateBook_slack_interviewerForConfirmation:
    'candidateBook_slack_interviewerForConfirmation',
  interviewStart_slack_interviewers: 'interviewStart_slack_interviewers',
  interviewEnd_slack_interviewerForFeedback:
    'interviewEnd_slack_interviewerForFeedback',
  onTrainingComplete_slack_approverForTraineeMeetingQualification:
    'onTrainingComplete_slack_approverForTraineeMeetingQualification',
  onQualified_slack_trainee: 'onQualified_slack_trainee',
  interviewEnd_slack_rShadowTraineeForMeetingAttendence:
    'interviewEnd_slack_rShadowTraineeForMeetingAttendence',
  interviewEnd_slack_shadowTraineeForMeetingAttendence:
    'interviewEnd_slack_shadowTraineeForMeetingAttendence',
  interviewEnd_slack_organizerForMeetingStatus:
    'interviewEnd_slack_organizerForMeetingStatus',
};
