type SelectedEmailSlackTypes =
  | 'candidateBook_slack_interviewerForConfirmation'
  | 'interviewStart_slack_interviewers'
  | 'interviewEnd_slack_interviewerForFeedback'
  | 'onQualified_slack_approver'
  | 'onQualified_slack_trainee'
  | 'onRShadowComplete_slack_trainee'
  | 'onShadowComplete_slack_trainee';

export const slackEndPoints: {
  [key in SelectedEmailSlackTypes]: key;
} = {
  candidateBook_slack_interviewerForConfirmation:
    'candidateBook_slack_interviewerForConfirmation',
  interviewStart_slack_interviewers: 'interviewStart_slack_interviewers',
  interviewEnd_slack_interviewerForFeedback:
    'interviewEnd_slack_interviewerForFeedback',
  onQualified_slack_approver: 'onQualified_slack_approver',
  onQualified_slack_trainee: 'onQualified_slack_trainee',
  onRShadowComplete_slack_trainee: 'onRShadowComplete_slack_trainee',
  onShadowComplete_slack_trainee: 'onShadowComplete_slack_trainee',
};
