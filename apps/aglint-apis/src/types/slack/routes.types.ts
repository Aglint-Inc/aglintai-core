type SelectedEmailSlackTypes =
  | 'candidateBook_slack_interviewerForConfirmation'
  | 'interviewStart_slack_interviewers'
  | 'interviewEnd_slack_interviewerForFeedback'
  | 'onTrainingComplete_slack_approverForTraineeMeetingQualification'
  | 'onQualified_slack_trainee'
  | 'interviewEnd_slack_rShadowTraineeForMeetingAttendence'
  | 'interviewEnd_slack_shadowTraineeForMeetingAttendence'
  | 'interviewer_attend_comfirmation';

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
  interviewer_attend_comfirmation: 'interviewer_attend_comfirmation',
};
