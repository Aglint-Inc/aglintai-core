import * as React from 'react';
import { companyLogoDummy } from '../utils/assets/common';
import { EmailContainer } from '../components/template/Container';
import { ButtonSolid } from '../components/template/Button';
import type { ReactTempPayload } from '../types/app.types';

type EmailType =
  ReactTempPayload<'interviewEnd_email_organizerForMeetingStatus'>;

export const dummy: EmailType = {
  emailBody:
    '<p><span>Dear </span><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> <span>,</span></p><p><span>We hope this message finds you well. We are reaching out to confirm the status of the interview meeting scheduled for </span><span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> <span>on </span><span class="temp-variable" data-type="temp-variable" data-id="dateRange">{{dateRange}}</span> <span>at </span><span class="temp-variable" data-type="temp-variable" data-id="time">{{time}}</span> <span>. Your prompt response will help us ensure a smooth and efficient process for all parties involved. </span></p><p><span>Click the link below to update the meeting status in our system: </span><span class="temp-variable" data-type="temp-variable" data-id="meetingStatusUpdateLink">{{meetingStatusUpdateLink}}</span></p><p><span>Thank you for your cooperation. </span></p><p></p><p><span>Best regards,</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> <span>Aglint AI Scheduling Team</span></p>',
  companyLogo: companyLogoDummy,
  subject: '',
  meetingStatusUpdateLink:
    'process.env.NEXT_PUBLIC_APP_URL/scheduling/view?meeting_id=meeting_ids&tab=candidate_details',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const interviewEndEmailOrganizerForMeetingStatus = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
  meetingStatusUpdateLink,
}: EmailType) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      <ButtonSolid buttonText="Update Status" href={meetingStatusUpdateLink} />
    </EmailContainer>
  );
};
export default interviewEndEmailOrganizerForMeetingStatus;
