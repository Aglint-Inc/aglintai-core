import { Text } from '@react-email/components';
import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { Session } from '../components/template/Sessions';
import { companyLogoDummy } from '../utils/assets/common';
import { EmailContainer } from '../components/template/Container';

type EmailType = EmailTemplateAPi<'interReschedReq_email_recruiter'>;

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Dear {{ recruiterName }},</p><p></p><p>{{ candidateFirstName }} is requesting to reschedule their interview between {{ dateRange }} stating the reason: "{{ rescheduleReason }}".</p><p></p><p>Additional notes from {{ candidateFirstName }}: "{{ additionalRescheduleNotes }}".</p><p></p><p>Thank you,</p><p>{{ companyName }} Recruitment Team</p>',
  companyLogo: companyLogoDummy,
  meetingDetails: [
    {
      date: 'Fri, May 12, 2024',
      time: '09:00 AM - 09:30 PM PST',
      sessionType: 'Personality and cultural fit',
      platform: 'Google meet',
      duration: '45 minutes',
      sessionTypeIcon:
        'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/debrief.png',
      meetingIcon:
        'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/google_meet.png',
    },
  ],
  subject: '',
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

export const CandidateRescheduleRequest = ({
  emailBody = dummy.emailBody,
  meetingDetails = dummy.meetingDetails,
  companyLogo = dummy.companyLogo,
}: EmailType['react_email_placeholders']) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      <Text className="text-[12px] my-0  text-text-sm text-neutral-12">
        Current Schedule{meetingDetails.length > 1 && 's'} :
      </Text>
      {meetingDetails.map((meetingDetail, i) => (
        <Session key={i} meetingDetail={meetingDetail} />
      ))}
    </EmailContainer>
  );
};

export default CandidateRescheduleRequest;
