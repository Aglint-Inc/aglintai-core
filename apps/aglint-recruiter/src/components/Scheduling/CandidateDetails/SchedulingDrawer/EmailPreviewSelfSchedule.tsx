import { EmailTemplateAPi } from '@aglint/shared-types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { EmailPreviewOnScheduling } from '@/devlink3/EmailPreviewOnScheduling';
import toast from '@/src/utils/toast';

function EmailPreviewSelfSchedule() {
  const [emailData, setEmailData] = useState<{ html: string; subject: string }>(
    null,
  );
  const [fetching, setFetching] = useState(true);
  const payload: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['api_payload'] =
    {
      filter_json_id: 'self_schedule_request',
      organizer_id: '',
      is_preview: true,
    };
  useEffect(() => {
    if (!emailData) {
      axios
        .post('/api/emails/sendAvailabilityRequest_email_applicant', {
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
