import { DatabaseTable } from '@aglint/shared-types';
export const seed_email_templates: Pick<
  DatabaseTable['company_email_template'],
  'body' | 'from_name' | 'subject' | 'type'
>[] = [
  {
    type: 'interviewStart_email_organizer',
    from_name: 'Aglint Ai',
    subject:
      '<p>Reminder: Upcoming Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> </p>',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="organizerFirstName">{{organizerFirstName}}</span> ,</p><p></p><p>This is a friendly reminder about the upcoming interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>.</p><p></p><p>Please ensure everything is set for a smooth interview process.</p><p>Please find the details of your interview below:</p><p></p><p>Best regards,</p><p>Aglint AI Team</p>',
  },
  {
    type: 'interviewStart_slack_interviewers',
    from_name: '',
    subject: 'Interview reminder',
    body: '<p><strong>Scheduled with candidate :</strong><br><a target="_blank" rel="noopener noreferrer" class="c-link" href="https://dev.aglinthq.com/scheduling/view?meeting_id=5ad7e0df-be62-4461-a069-33e884b70c4f&amp;tab=candidate_details"><strong>Ashis Sarthak Singh - Staff Frontend Engineer</strong></a></p><p><strong>Meeting Place :</strong> In Person Meeting<br><strong>Meeting Time :</strong> July 15 03:30 AM - 04:00 AM IST<br><strong>Duration :</strong> 30 Minute      </p>',
  },
  {
    type: 'confInterview_email_organizer',
    from_name: 'Aglint Ai',
    subject:
      '<p>Interview Confirmation for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> </p>',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="organizerFirstName">{{organizerFirstName}}</span> </p><p>Please find the details for the interview below:</p><p><strong>Job:</strong> <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span></p><p><strong>Candidate name:</strong> <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> <br></p><p>Thank you,</p><p>Aglint AI Team</p>',
  },
  {
    type: 'interReschedReq_email_recruiter',
    from_name: 'Aglint Ai',
    subject:
      '<p>Reschedule Request from <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Interview</p>',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> ,</p><p></p><p><span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> is requesting to reschedule their interview between <span class="temp-variable" data-type="temp-variable" data-id="startDate">{{startDate}}</span> and <span class="temp-variable" data-type="temp-variable" data-id="endDate">{{endDate}}</span> stating the reason: <span class="temp-variable" data-type="temp-variable" data-id="rescheduleReason">{{rescheduleReason}}</span>.</p><p></p><p>Additional notes from <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span>: <span class="temp-variable" data-type="temp-variable" data-id="additionalRescheduleNotes">{{additionalRescheduleNotes}}</span>.</p><p></p><p>Please review the request and take the necessary steps from here.</p><p>Here is the link to reschedule: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p>Here is the link to cancel: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p></p><p>Thank you,</p><p>Aglint AI Team</p>',
  },
  {
    type: 'confirmInterview_email_applicant',
    from_name: '{{organizerName}}',
    subject:
      '<p>Your Interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> is Confirmed</p>',
    body: '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>We are pleased to confirm your interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position. Please find the details of your interview below.</p><p></p><p>Regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
  },
  {
    type: 'phoneScreen_email_candidate',
    from_name: '{{recruiterName}}',
    subject:
      'Invitation to a Phone Screening Session for {{firstName}} - {{jobTitle}} Position at {{companyName}}',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="recruiterName">{{recruiterName}}</span>,</p><p></p><p>Please find the details for the interview below:</p><p>Candidate name: <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> from job <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> <br></p><p>Thank you</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span></p>',
  },
  {
    type: 'meetingAccepted_email_organizer',
    from_name: 'Aglint Ai',
    subject:
      '<p><span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> Accepted Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span></p>',
    body: '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> ,</p><p></p><p>We are pleased to inform you that the <span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> has accepted the interview request for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>View Schedule details <span class="temp-variable" data-type="temp-variable" data-id="meetingDetailsLink">{{meetingDetailsLink}}</span></p><p></p><p>Best regards,</p><p>Aglint AI</p>',
  },
  {
    type: 'InterviewCancelReq_email_recruiter',
    from_name: 'Aglint Ai',
    subject:
      '<p>Cancellation Request from <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Interview</p>',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p></p><p>We have received a request from <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> <span class="temp-variable" data-type="temp-variable" data-id="candidateLastName">{{candidateLastName}}</span> to reschedule their interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position.</p><p></p><p>Cancel Reason: <span class="temp-variable" data-type="temp-variable" data-id="cancelReason">{{cancelReason}}</span></p><p>Adittional Note: <span class="temp-variable" data-type="temp-variable" data-id="additionalRescheduleNotes">{{additionalRescheduleNotes}}</span></p><p></p><p>Please review the request and take the necessary steps from here.</p><p>Here is the link to reschedule: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p>Here is the link to cancel: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p></p><p>Thank you,<br>Agllint AI Team</p><p></p><p></p>',
  },
  {
    type: 'debrief_email_interviewer',
    from_name: '{{organizerName}}',
    subject:
      '<p>Invitation to Debrief Session for <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> \'s Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> </p>',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="interviewerFirstName">{{interviewerFirstName}}</span> ,</p><p></p><p>Please join the debrief session to discuss <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> \'s interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> . Your insights are valuable to the selection process.</p><p>Thanks,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
  },
  {
    type: 'interviewCancel_email_applicant',
    from_name: '{{organizerName}}',
    subject:
      '<p>Interview Cancellation: <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position</p>',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span>,</p><p></p><p>I regret to inform you that we need to cancel your scheduled interview session at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> .</p><p>We apologize for any inconvenience caused and will be in touch soon to reschedule.</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span><br><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p><p></p>',
  },
  {
    type: 'candidateBook_email_interviewerForFeedback',
    from_name: 'Aglint Ai',
    subject:
      '<p>Reminder: Feedback Required for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Interview </p>',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="interviewerFirstName">{{interviewerFirstName}}</span>,</p><p>This is a friendly reminder to provide your feedback for the recent interview you conducted with <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span>  for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> .</p><p></p><p>Please submit your feedback at your earliest convenience.</p><p>Thank you for your time and assistance.</p><p>Best regards,</p><p>Aglint AI Team</p>',
  },
  {
    type: 'interviewEnd_slack_interviewerForFeedback',
    from_name: '',
    subject: '',
    body: '',
  },
  {
    type: 'interviewEnd_slack_interviewers',
    from_name: '',
    subject: '',
    body: '',
  },
  {
    type: 'interviewerConfirmation_slack_interviewers',
    from_name: '',
    subject: '',
    body: '',
  },
  {
    type: 'agent_email_candidate',
    from_name: 'Aglint Ai',
    subject:
      '<p>Schedule Your Interview with <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> - Important Next Step</p>',
    body: '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span></p><p></p><p>Congratulations! You have been selected for an interview at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position. Your qualifications are impressive, and we are excited to meet you and discuss them further.</p><p>Please let me know your availability within the following date range: <span class="temp-variable" data-type="temp-variable" data-id="dateRange">{{dateRange}}</span> . Optionally you can let me know your location to find the slots in your preffered region .</p><p>Alternatively you can use the following link to schedule your interview: <span class="temp-variable" data-type="temp-variable" data-id="selfScheduleLink">{{selfScheduleLink}}</span></p><p>Looking forward to connecting with you</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span></p>',
  },
  {
    type: 'interviewEnd_email_interviewerForFeedback',
    from_name: '{{organizerName}}',
    subject:
      '<p>Reminder: Feedback Required for <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span>\'s Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position</p>',
    body: '<p><span class="temp-variable" data-type="temp-variable" data-id="interviewerFirstName">{{interviewerFirstName}}</span>,</p><p>This is a friendly reminder to provide your feedback for the recent interview you conducted with {{candidateName}} for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>Your feedback is crucial in helping us make informed decisions. Please submit your feedback at your earliest convenience using the following link:</p><p><span class="temp-variable" data-type="temp-variable" data-id="interviewFeedbackLink">{{interviewFeedbackLink}}</span> </p><p>Thank you for your time and assistance.</p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
  },
  {
    type: 'candidateBook_slack_interviewerForConfirmation',
    from_name: '',
    subject: '',
    body: '',
  },
  {
    type: 'sendSelfScheduleRequest_email_applicant',
    from_name: '{{organizerName}}',
    subject:
      '<p>Scheduling Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p>',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p style="text-align: start">Thank you for submitting your application for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>. We are pleased to announce that you have been selected for an assessment.</p><p style="text-align: start"></p><p style="text-align: start">You are welcome to choose an assessment time that suits your schedule.</p><p style="text-align: start"></p><p style="text-align: start">We wish you the best of luck and are eager to hear your insights!</p><p style="text-align: start"></p><p style="text-align: start">Best regards,</p><p style="text-align: start"><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team.</p>',
  },
  {
    type: 'meetingDeclined_email_organizer',
    from_name: 'Aglint Ai',
    subject:
      '<p><span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> Declined Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span></p>',
    body: '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> ,</p><p></p><p>We regret to inform you that the <span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> has declined the interview request for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>Please arrange for an alternative interviewer or reschedule as needed.</p><p>Change Interviewer <span class="temp-variable" data-type="temp-variable" data-id="meetingDetailsLink">{{meetingDetailsLink}}</span></p><p>Rescedule <span class="temp-variable" data-type="temp-variable" data-id="meetingDetailsLink">{{meetingDetailsLink}}</span></p><p></p><p>Best regards,</p><p>Aglint Ai</p>',
  },
  {
    type: 'interviewStart_email_interviewers',
    from_name: '{{organizerName}}',
    subject: '<p>Reminder</p>',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="interviewerFirstName">{{interviewerFirstName}}</span> ,</p><p></p><p>This is a friendly reminder about the upcoming interview you will be conducting for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> .</p><p></p><p>Please be prepared to join the interview on time.</p><p></p><p>Please find the interview details bellow.</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p><pre><code class="language-markdown"></code></pre>',
  },
  {
    type: 'sendAvailabilityRequest_email_applicant',
    from_name: '{{companyName}}',
    subject:
      '<p>Provide Availability for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p>',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>Thank you for applying for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>. We have reviewed your application and are impressed with your qualifications and experiences. We would like to invite you to participate in an interview to further discuss how your skills and experiences align with our needs.</p><p>To streamline the scheduling process, please click on the link below to select your availability for an interview:</p><p>Looking forward to your response.</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
  },
  {
    type: 'rescheduleSelfSchedule_email_applicant',
    from_name: '{{organizerName}}',
    subject:
      '<p>Re-requesting Interview Scheduling for  <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span></p>',
    body: '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>We hope this message finds you well. Recently, we sent you an invitation to schedule your assessment for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>We noticed that you haven\'t had the chance to select a time yet.</p><p>To ensure the process moves smoothly, we kindly ask you to choose an assessment time that suits your schedule at your earliest convenience.</p><p></p><p>We wish you the best of luck and look forward to hearing your insights!</p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
  },
  {
    type: 'selfScheduleReminder_email_applicant',
    from_name: '{{organizerName}}',
    subject:
      '<p>Reminder: Schedule Your Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p>',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>This is a friendly reminder about the self-schedule interview request you received for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>Please use the below link to schedule your interview </p><p>Looking forward to connecting with you!</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
  },
  {
    type: 'interviewDetails_calender_interviewer',
    from_name: '{{organizerName}}',
    subject:
      '<p>Interview Confirmation for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> </p>',
    body: '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> ,</p><p></p><p>Please find the interview details below:</p><p><strong>Schedule:</strong></p><p>Find detailed schedule: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p></p><p><strong>Candidate Profile:</strong></p><p>Review candidate profile, resume, and score: <span class="temp-variable" data-type="temp-variable" data-id="candidateProfileLink">{{candidateProfileLink}}</span></p><p></p><p><strong>Interview Instructions:</strong></p><p>Please review the interview instructions: <span class="temp-variable" data-type="temp-variable" data-id="interviewInstructionLink">{{interviewInstructionLink}}</span></p><p></p><p><strong>Feedback Link:</strong></p><p>After the interview, kindly provide your feedback: <span class="temp-variable" data-type="temp-variable" data-id="interviewFeedbackLink">{{interviewFeedbackLink}}</span></p><p></p><p><strong>Reschedule or Cancel:</strong></p><p>If you need to reschedule or cancel this meeting, please use the following link: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p></p><p>Thank you,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span><br><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
  },
  {
    type: 'onSignup_email_admin',
    from_name: null,
    subject: 'Welcome to Aglint',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p></p><p>Thank you for registering with Aglint! we are excited to have you on board, To ensure a smooth onboarding process, please have the following information ready:</p><p>For the company setup, keep the company name, location, and departments handy.</p><p>For user onboarding, have the names and emails addresses of hiring team members, as well as the roles of interviewers who will collaborate on hiring.</p><p>For job listings, get the job descriptions ready and indentify the hiring team for each job.</p><p>For user onboarding, have the names and email addresses of hiring team members, as well as the roles of interviewers who will collaborate on hiring.</p><p>For job listings, get the job descriptions ready and identify the hiring team for each job.</p><p>Additionally, organize interview plans for each job.</p><p>For interview types, define the types of interviews you will conduct, and prepare the necessary qualifications and training data.</p><p>Choose any integrations you need, such as ATS, Google Meet, Zoom, Slack, Google Workspace, or Microsoft Outlook.</p><p>One of our customer success team members will contact you soon. We appreciate your patience. Best regards, Aglint AI Customer Success Team</p><p></p><p>Best regards,</p><p>Aglint AI Customer </p><p>Success Team</p>',
  },
  {
    type: 'availabilityReqResend_email_candidate',
    from_name: '{{companyName}}',
    subject: '<p>Availability Re Request</p>',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> ,</p><p>I hope this message finds you well.</p><p>I am writing to follow up regarding the availability check for your upcoming interview. It appears that the initial link we sent to confirm your availability might not have been received or may have encountered an issue.</p><p>To ensure we can schedule your interview at a convenient time, please find the link below to select your preferred time slots:</p><p>We apologize for any inconvenience this may have caused and appreciate your understanding.</p><p>Thank you for your cooperation. We look forward to speaking with you soon.</p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team.</p>',
  },
  {
    type: 'interviewStart_email_applicant',
    from_name: '{{organizerName}}',
    subject:
      '<p>Interview Reminder: <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p>',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> ,</p><p>This is a friendly reminder about your upcoming interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>Please ensure you are prepared and join the interview on time. We are excited to learn more about your experiences and insights.</p><p></p><p>Please find the details of your interview below.</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p><pre><code class="language-yaml"></code></pre>',
  },
  {
    type: 'sendAvailReqReminder_email_applicant',
    from_name: '{{organizerName}}',
    subject:
      '<p>Reminder: Provide Your Availability for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p>',
    body: '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p style="text-align: start">I hope this message finds you well.</p><p style="text-align: start">I am writing to follow up on my previous email regarding the interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>. We are very interested in discussing your application and learning more about your experiences.</p><p style="text-align: start">If you could please click on the link below to select your availability for an interview, it would be greatly appreciated .</p><p style="text-align: start">If you have any questions or need further information, please feel free to reach out.</p><p style="text-align: start">Thank you, and I look forward to hearing from you soon.</p><p style="text-align: start"></p><p style="text-align: start">Best regards,</p><p style="text-align: start"><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
  },
  {
    type: 'interviewEnd_slack_organizerForMeetingStatus',
    body: '',
    from_name: '',
    subject: '',
  },
  {
    type: 'interviewEnd_email_organizerForMeetingStatus',
    subject: '<p>Interview Meeting Completion Confirmation</p>',
    body: '<p>Interview Meeting Completion Confirmation</p>',
    from_name: '{{companyName}}',
  },
  {
    type: 'interviewEnd_email_shadowTraineeForMeetingAttendence',
    subject:
      '<p><span>Confirmation for </span><span class="temp-variable" data-type="temp-variable" data-id="shadowCount">{{shadowCount}}</span> <span>Shadow Session</span></p>',
    from_name: '{{companyName}}',
    body: `<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="traineeName">{{traineeName}}</span> ,</p><p></p><p>Could you please confirm if you've completed the <span class="temp-variable" data-type="temp-variable" data-id="shadowCount">{{shadowCount}}</span> shadow session for <span class="temp-variable" data-type="temp-variable" data-id="interviewType">{{interviewType}}</span>  ? You were scheduled as a shadow interviewer in the <span class="temp-variable" data-type="temp-variable" data-id="sessionName">{{sessionName}}</span> for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> .</p><p></p><p>Please click the link below to confirm: <span class="temp-variable" data-type="temp-variable" data-id="shadowConfirmLink">{{shadowConfirmLink}}</span> </p><p>From,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p>`,
  },
  {
    type: 'interviewEnd_email_rShadowTraineeForMeetingAttendence',
    body: `<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="traineeName">{{traineeName}}</span> ,</p><p></p><p>Could you please confirm if you've completed the <span class="temp-variable" data-type="temp-variable" data-id="reverseShadowCount">{{reverseShadowCount}}</span> reverse shadow session for <span class="temp-variable" data-type="temp-variable" data-id="interviewType">{{interviewType}}</span> ? You were scheduled as a shadow interviewer in the <span class="temp-variable" data-type="temp-variable" data-id="sessionName">{{sessionName}}</span> for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> .</p><p></p><p>Please click the link below to confirm: <span class="temp-variable" data-type="temp-variable" data-id="reverseShadowConfirmLink">{{reverseShadowConfirmLink}}</span></p><p>From,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p>`,
    from_name: '{{companyName}}',
    subject: `<p>Confirmation for <span class="temp-variable" data-type="temp-variable" data-id="reverseShadowCount">{{reverseShadowCount}}</span> Shadow Session</p>`,
  },
  {
    type: 'interviewEnd_slack_rShadowTraineeForMeetingAttendence',
    body: '',
    from_name: '',
    subject: '',
  },
  {
    type: 'interviewEnd_slack_shadowTraineeForMeetingAttendence',
    body: '',
    from_name: '',
    subject: '',
  },
  {
    type: 'onTrainingComplete_email_approverForTraineeMeetingQualification',
    body: '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="approverName">{{approverName}}</span> ,</p><p></p><p><span class="temp-variable" data-type="temp-variable" data-id="traineeName">{{traineeName}}</span> has completed <span class="temp-variable" data-type="temp-variable" data-id="shadowCount">{{shadowCount}}</span> shadow sessions and <span class="temp-variable" data-type="temp-variable" data-id="reverseShadowCount">{{reverseShadowCount}}</span> reverse shadow sessions. Please review and approve <span class="temp-variable" data-type="temp-variable" data-id="traineeName">{{traineeName}}</span> to become qualified for conducting <span class="temp-variable" data-type="temp-variable" data-id="interviewType">{{interviewType}}</span> interviews.</p><p></p><p>Please click the link below to confirm : <span class="temp-variable" data-type="temp-variable" data-id="qualifiedApproverConfirmLink">{{qualifiedApproverConfirmLink}}</span></p><p></p><p>Thanks,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p>',
    from_name: '{{companyName}}',
    subject:
      '<p><span>Approval Request for Interviewer Qualification</span></p>',
  },
  {
    type: 'onTrainingComplete_slack_approverForTraineeMeetingQualification',
    body: '',
    from_name: '',
    subject: '',
  },
];
