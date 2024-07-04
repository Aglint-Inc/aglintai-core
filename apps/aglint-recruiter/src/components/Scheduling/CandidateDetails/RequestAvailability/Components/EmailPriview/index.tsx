import { ButtonSoft, ButtonSolid } from '@/devlink';
import { EmailPreviewOnScheduling } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';
import { EmailTemplateAPi } from '@aglint/shared-types';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

function EmailPreview({
  requestAvailabilityId,
  setRequestSteps,
  onSubmit,
  loading,
}: {
  requestAvailabilityId: string;
  setRequestSteps: Dispatch<
    SetStateAction<'finding_slots' | 'preview' | 'success'>
  >;
  onSubmit: () => void;
  loading: boolean;
}) {
  const { recruiterUser } = useAuthDetails();
  const [emailData, setEmailData] = useState<{ html: string; subject: string }>(
    null,
  );
  const payload: EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>['api_payload'] =
    {
      avail_req_id: requestAvailabilityId,
      recruiter_user_id: recruiterUser.user_id,
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
          console.log(data);
        })
        .catch((error) => {
          toast.error('Fail to fetch email preview');
        });
    }
  }, []);
  return (
    <EmailPreviewOnScheduling
      slotButton={
        <>
          <ButtonSoft
            size={2}
            onClickButton={{
              onClick: () => {
                setRequestSteps('finding_slots');
              },
            }}
            textButton={'Back'}
          />
          <ButtonSolid
            size={2}
            isLoading={loading}
            textButton={'Request Availability'}
            onClickButton={{
              onClick: onSubmit,
            }}
          />
        </>
      }
      slotEmailPreview={
        <>
          <iframe
            width={'600px'}
            height={'620px'}
            color='white'
            srcDoc={emailData?.html}
            title='Previw Email'
          />
        </>
      }
    />
  );
}

export default EmailPreview;
