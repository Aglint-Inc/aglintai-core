import * as React from 'react';
import { companyLogoDummy } from '../utils/assets/common';
import { EmailContainer } from '../components/template/Container';
import type { ReactTempPayload } from '../types/app.types';

// export dummy
export const dummy: ReactTempPayload<'interviewerResumed_email_admin'> = {
  subject: '',
  emailBody: `<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="adminName">{{adminName}}</span> ,</p><p style="text-align: start">This is to inform you that the following interviewer has been automatically resumed from pause status.</p><p style="text-align: start"><strong>Interviewer Details:</strong></p><ul><li><p>Name: <span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span></p></li><li><p>Email: <span class="temp-variable" data-type="temp-variable" data-id="interviewerEmail">{{interviewerEmail}}</span></p></li><li><p>Department: <span class="temp-variable" data-type="temp-variable" data-id="interviewerDepartment">{{interviewerDepartment}}</span></p></li><li><p>Location: <span class="temp-variable" data-type="temp-variable" data-id="interviewerLocation">{{interviewerLocation}}</span></p></li></ul><p style="text-align: start"><strong>Impact:</strong><br>The interviewer will now be considered for new interviews scheduled with bellow Interview Types. Existing interviews were not affected.</p><p style="text-align: start"><strong>Interview Types</strong></p>{{interviewTypes}}<p style="text-align: start">If you wish to extend the pause period, please use the link below to update the interviewer's status: here</p><p style="text-align: start">Thank you,<br>Aglint AI</p>`,
  companyLogo: companyLogoDummy,
};

export const getSubject = (companyName: any) => `${companyName}`;

export const InterviewResentRemainder = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
}: ReactTempPayload<'interviewerResumed_email_admin'>) => {
  return <EmailContainer companyLogo={companyLogo} emailBody={emailBody} />;
};
export default InterviewResentRemainder;
