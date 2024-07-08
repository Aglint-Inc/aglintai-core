CREATE OR REPLACE FUNCTION public.insert_company_email_templates(p_recruiter_id uuid)
RETURNS void
LANGUAGE plpgsql
AS $function$
BEGIN
INSERT INTO
    public.company_email_template (subject, body, from_name, type, recruiter_id)
VALUES
   (
    'Interview reminder',
    '<p><strong>Scheduled with candidate :</strong><br><a target="_blank" rel="noopener noreferrer" class="c-link" href="https://dev.aglinthq.com/scheduling/view?meeting_id=5ad7e0df-be62-4461-a069-33e884b70c4f&amp;tab=candidate_details"><strong>Ashis Sarthak Singh - Staff Frontend Engineer</strong></a></p><p><strong>Meeting Place :</strong> In Person Meeting<br><strong>Meeting Time :</strong> July 15 03:30 AM - 04:00 AM IST<br><strong>Duration :</strong> 30 Minute      </p>',
    '',
    'interviewStart_slack_interviewers',
    p_recruiter_id
),
(
    '<p>Interview Confirmation for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="organizerFirstName">{{organizerFirstName}}</span> </p><p>Please find the details for the interview below:</p><p><strong>Job:</strong> <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span></p><p><strong>Candidate name:</strong> <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> <br></p><p>Thank you,</p><p>Aglint AI Team</p>',
    'Aglint Ai',
    'confInterview_email_organizer',
    p_recruiter_id
),
(
    '<p>Reschedule Request from <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Interview</p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> ,</p><p></p><p><span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> is requesting to reschedule their interview between <span class="temp-variable" data-type="temp-variable" data-id="startDate">{{startDate}}</span> and <span class="temp-variable" data-type="temp-variable" data-id="endDate">{{endDate}}</span> stating the reason: <span class="temp-variable" data-type="temp-variable" data-id="rescheduleReason">{{rescheduleReason}}</span>.</p><p></p><p>Additional notes from <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span>: <span class="temp-variable" data-type="temp-variable" data-id="additionalRescheduleNotes">{{additionalRescheduleNotes}}</span>.</p><p></p><p>Please review the request and take the necessary steps from here.</p><p>Here is the link to reschedule: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p>Here is the link to cancel: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p></p><p>Thank you,</p><p>Aglint AI Team</p>',
    'Aglint Ai',
    'interReschedReq_email_recruiter',
    p_recruiter_id
),
(
    '<p>Reminder: Provide Your Availability for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p style="text-align: start">I hope this message finds you well.</p><p style="text-align: start">I am writing to follow up on my previous email regarding the interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>. We are very interested in discussing your application and learning more about your experiences.</p><p style="text-align: start">If you could please click on the link below to select your availability for an interview, it would be greatly appreciated:</p><p style="text-align: start"><span class="temp-variable" data-type="temp-variable" data-id="availabilityReqLink">{{availabilityReqLink}}</span></p><p style="text-align: start">If you have any questions or need further information, please feel free to reach out.</p><p style="text-align: start">Thank you, and I look forward to hearing from you soon.</p><p style="text-align: start"></p><p style="text-align: start">Best regards,</p><p style="text-align: start"><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'sendAvailReqReminder_email_applicant',
    p_recruiter_id
),
(
    '<p>Your Interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> is Confirmed</p>',
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>We are pleased to confirm your interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position. Please find the details of your interview below.</p><p></p><p>Regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'confirmInterview_email_applicant',
    p_recruiter_id
),
(
    '<p>Interview Reminder: <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> ,</p><p></p><p>This is a friendly reminder about your upcoming interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>Please ensure you are prepared and join the interview on time. We are excited to learn more about your experiences and insights.</p><p></p><p>Please find the details of your interview below.</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p><pre><code class="language-yaml"></code></pre>',
    '{{organizerName}}',
    'interviewStart_email_applicant',
    p_recruiter_id
),
(
    'Invitation to a Phone Screening Session for {{firstName}} - {{jobTitle}} Position at {{companyName}}',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="recruiterName">{{recruiterName}}</span>,</p><p></p><p>Please find the details for the interview below:</p><p>Candidate name: <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> from job <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> <br></p><p>Thank you</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span></p>',
    '{{recruiterName}}',
    'phoneScreen_email_candidate',
    p_recruiter_id
),
(
    '<p><span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> Accepted Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span></p>',
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> ,</p><p></p><p>We are pleased to inform you that the <span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> has accepted the interview request for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>View Schedule details <span class="temp-variable" data-type="temp-variable" data-id="meetingDetailsLink">{{meetingDetailsLink}}</span></p><p></p><p>Best regards,</p><p>Aglint AI</p>',
    'Aglint Ai',
    'meetingAccepted_email_organizer',
    p_recruiter_id
),
(
    '<p>Provide Availability for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>Thank you for applying for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>. We have reviewed your application and are impressed with your qualifications and experiences. We would like to invite you to participate in an interview to further discuss how your skills and experiences align with our needs.</p><p></p><p>To streamline the scheduling process, please click on the link below to select your availability for an interview:</p><p><span class="temp-variable" data-type="temp-variable" data-id="availabilityReqLink">{{availabilityReqLink}}</span></p><p>Looking forward to your response.</p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{companyName}}',
    'sendAvailabilityRequest_email_applicant',
    p_recruiter_id
),
(
    '<p>Cancellation Request from <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Interview</p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p></p><p>We have received a request from <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> <span class="temp-variable" data-type="temp-variable" data-id="candidateLastName">{{candidateLastName}}</span> to reschedule their interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position.</p><p></p><p>Cancel Reason: <span class="temp-variable" data-type="temp-variable" data-id="cancelReason">{{cancelReason}}</span></p><p>Adittional Note: <span class="temp-variable" data-type="temp-variable" data-id="additionalRescheduleNotes">{{additionalRescheduleNotes}}</span></p><p></p><p>Please review the request and take the necessary steps from here.</p><p>Here is the link to reschedule: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p>Here is the link to cancel: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p></p><p>Thank you,<br>Agllint AI Team</p><p></p><p></p>',
    'Aglint Ai',
    'InterviewCancelReq_email_recruiter',
    p_recruiter_id
),
(
    '<p>Invitation to Debrief Session for <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> ''s Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="interviewerFirstName">{{interviewerFirstName}}</span> ,</p><p></p><p>Please join the debrief session to discuss <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> ''s interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> . Your insights are valuable to the selection process.</p><p>Thanks,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'debrief_email_interviewer',
    p_recruiter_id
),
(
    '<p>Interview Cancellation: <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position</p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span>,</p><p></p><p>I regret to inform you that we need to cancel your scheduled interview session at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> .</p><p>We apologize for any inconvenience caused and will be in touch soon to reschedule.</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span><br><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p><p></p>',
    '{{organizerName}}',
    'interviewCancel_email_applicant',
    p_recruiter_id
),
(
    '<p>Reminder: Feedback Required for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Interview </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="interviewerFirstName">{{interviewerFirstName}}</span>,</p><p>This is a friendly reminder to provide your feedback for the recent interview you conducted with <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span>  for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> .</p><p></p><p>Please submit your feedback at your earliest convenience.</p><p>Thank you for your time and assistance.</p><p>Best regards,</p><p>Aglint AI Team</p>',
    'Aglint Ai',
    'candidateBook_email_interviewerForFeedback',
    p_recruiter_id
),
(
    '',
    '',
    '',
    'interviewEnd_slack_interviewerForFeedback',
    p_recruiter_id
),
(
    '',
    '',
    '',
    'interviewEnd_slack_interviewers',
    p_recruiter_id
),
(
    '',
    '',
    '',
    'interviewerConfirmation_slack_interviewers',
    p_recruiter_id
),
(
    '<p>Schedule Your Interview with <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> - Important Next Step</p>',
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>   </p><p></p><p>Congratulations! You have been selected for an interview at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position. Your qualifications are impressive, and we are excited to meet you and discuss them further.</p><p>Please let me know your availability within the following date range: <span class="temp-variable" data-type="temp-variable" data-id="dateRange">{{dateRange}}</span> . Optionally you can let me know your location to find the slots in your preffered region .</p><p>to find suitable slots.</p><p>Alternatively you can use the following link to schedule your interview: <span class="temp-variable" data-type="temp-variable" data-id="selfScheduleLink">{{selfScheduleLink}}</span></p><p></p><p>Looking forward to connecting with you</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span></p>',
    'Aglint Ai',
    'agent_email_candidate',
    p_recruiter_id
),
(
    '<p>Reminder: Upcoming Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="organizerFirstName">{{organizerFirstName}}</span> ,</p><p></p><p>This is a friendly reminder about the upcoming interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>.</p><p></p><p>Please ensure everything is set for a smooth interview process.</p><p>Please find the details of your interview below:</p><p></p><p>Best regards,</p><p>Aglint AI Team</p>',
    'Aglint Ai',
    'interviewStart_email_organizer',
    p_recruiter_id
),
(
    '<p>Interview Confirmation for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> </p>',
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> ,</p><p></p><p>Please find the interview details below:</p><p><strong>Schedule:</strong></p><p>Find detailed schedule: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p></p><p><strong>Candidate Profile:</strong></p><p>Review candidate profile, resume, and score: <span class="temp-variable" data-type="temp-variable" data-id="candidateProfileLink">{{candidateProfileLink}}</span></p><p></p><p><strong>Interview Instructions:</strong></p><p>Please review the interview instructions: <span class="temp-variable" data-type="temp-variable" data-id="interviewInstructionLink">{{interviewInstructionLink}}</span></p><p></p><p><strong>Feedback Link:</strong></p><p>After the interview, kindly provide your feedback: <span class="temp-variable" data-type="temp-variable" data-id="interviewFeedbackLink">{{interviewFeedbackLink}}</span></p><p></p><p><strong>Reschedule or Cancel:</strong></p><p>If you need to reschedule or cancel this meeting, please use the following link: <span class="temp-variable" data-type="temp-variable" data-id="candidateScheduleLink">{{candidateScheduleLink}}</span></p><p></p><p>Thank you,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span><br><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'interviewDetails_calender_interviewer',
    p_recruiter_id
),
(
    '<p>Availability Re Request</p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p>I hope this message finds you well.</p><p>I am writing to follow up regarding the availability check for your upcoming interview. It appears that the initial link we sent to confirm your availability might not have been received or may have encountered an issue.</p><p>To ensure we can schedule your interview at a convenient time, please find the link below to select your preferred time slots:</p><p><span class="temp-variable" data-type="temp-variable" data-id="availabilityReqLink">{{availabilityReqLink}}</span></p><h4></h4><p>We apologize for any inconvenience this may have caused and appreciate your understanding.</p><p></p><p>Thank you for your cooperation. We look forward to speaking with you soon.<br></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p><p></p><p></p>',
    '{{companyName}}',
    'availabilityReqResend_email_candidate',
    p_recruiter_id
),
(
    '<p>Reminder: Feedback Required for <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span>''s Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position</p>',
    '<p><span class="temp-variable" data-type="temp-variable" data-id="interviewerFirstName">{{interviewerFirstName}}</span>,</p><p>This is a friendly reminder to provide your feedback for the recent interview you conducted with {{candidateName}} for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>Your feedback is crucial in helping us make informed decisions. Please submit your feedback at your earliest convenience using the following link:</p><p><span class="temp-variable" data-type="temp-variable" data-id="interviewFeedbackLink">{{interviewFeedbackLink}}</span> </p><p>Thank you for your time and assistance.</p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'interviewEnd_email_interviewerForFeedback',
    p_recruiter_id
),
(
    '',
    '',
    '',
    'candidateBook_slack_interviewerForConfirmation',
    p_recruiter_id
),
(
    '<p>Scheduling Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p style="text-align: start">Thank you for submitting your application for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>. We are pleased to announce that you have been selected for an assessment.</p><p style="text-align: start"></p><p style="text-align: start">You are welcome to choose an assessment time that suits your schedule.</p><p style="text-align: start"><span class="temp-variable" data-type="temp-variable" data-id="selfScheduleLink">{{selfScheduleLink}}</span></p><p style="text-align: start"></p><p style="text-align: start">We wish you the best of luck and are eager to hear your insights!</p><p style="text-align: start"></p><p style="text-align: start">Best regards,</p><p style="text-align: start"><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'sendSelfScheduleRequest_email_applicant',
    p_recruiter_id
),
(
    '<p>Reminder: Schedule Your Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> </p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>This is a friendly reminder about the self-schedule interview request you received for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>Please use the following link to schedule your interview: <span class="temp-variable" data-type="temp-variable" data-id="selfScheduleLink">{{selfScheduleLink}}</span></p><p>Looking forward to connecting with you!</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'selfScheduleReminder_email_applicant',
    p_recruiter_id
),
(
    '<p>Re-requesting Interview Scheduling for  <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> Position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span></p>',
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>,</p><p></p><p>We hope this message finds you well. Recently, we sent you an invitation to schedule your assessment for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>We noticed that you haven''t had the chance to select a time yet.</p><p>To ensure the process moves smoothly, we kindly ask you to choose an assessment time that suits your schedule at your earliest convenience.</p><p><span class="temp-variable" data-type="temp-variable" data-id="selfScheduleLink">{{selfScheduleLink}}</span></p><p></p><p>We wish you the best of luck and look forward to hearing your insights!</p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>',
    '{{organizerName}}',
    'rescheduleSelfSchedule_email_applicant',
    p_recruiter_id
),
(
    '<p><span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> Declined Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span></p>',
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> ,</p><p></p><p>We regret to inform you that the <span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> has declined the interview request for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>Please arrange for an alternative interviewer or reschedule as needed.</p><p>Change Interviewer <span class="temp-variable" data-type="temp-variable" data-id="meetingDetailsLink">{{meetingDetailsLink}}</span></p><p>Rescedule <span class="temp-variable" data-type="temp-variable" data-id="meetingDetailsLink">{{meetingDetailsLink}}</span></p><p></p><p>Best regards,</p><p>Aglint Ai</p><p></p>',
    'Aglint Ai',
    'meetingDeclined_email_organizer',
    p_recruiter_id
),
(
    '<p>Reminder</p>',
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="interviewerFirstName">{{interviewerFirstName}}</span> ,</p><p></p><p>This is a friendly reminder about the upcoming interview you will be conducting for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> .</p><p></p><p>Please be prepared to join the interview on time.</p><p></p><p>Please find the interview details bellow.</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p><pre><code class="language-markdown"></code></pre>',
    '{{organizerName}}',
    'interviewStart_email_interviewers',
    p_recruiter_id
);
END;
$function$
;