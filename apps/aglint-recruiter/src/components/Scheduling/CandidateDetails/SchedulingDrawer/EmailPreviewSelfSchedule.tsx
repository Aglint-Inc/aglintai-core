/* eslint-disable no-unused-vars */
import { EmailTemplateAPi } from '@aglint/shared-types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { EmailPreviewOnScheduling } from '@/devlink3/EmailPreviewOnScheduling';
import toast from '@/src/utils/toast';
import { useSchedulingApplicationStore } from '../store';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

function EmailPreviewSelfSchedule() {
  const [emailData, setEmailData] = useState<{ html: string; subject: string }>(
    null,
  );
  const { recruiterUser } = useAuthDetails();
  const [fetching, setFetching] = useState(true);

  const { selectedApplication } = useSchedulingApplicationStore((state) => ({
    selectedApplication: state.selectedApplication,
  }));

  const payload: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['api_payload'] =
    {
      application_id: selectedApplication.id,
      organizer_id: recruiterUser.user_id,
    };
  useEffect(() => {
    if (!emailData) {
      axios
        .post('/api/emails/sendSelfScheduleRequest_email_applicant', {
          meta: { ...payload },
        })
        .then(({ data }) => {
          setEmailData(data);
          setFetching(false);
        })
        .catch(() => {
          toast.error('Fail to fetch email preview');
          setFetching(false);
        });
    }
  }, []);
  return (
    <EmailPreviewOnScheduling
      slotEmailPreview={
        <iframe
          width={'600px'}
          height={'620px'}
          color='white'
          srcDoc={emailData?.html}
          title='Previw Email'
        />
      }
    />
  );
}

export default EmailPreviewSelfSchedule;
