import { EmailTemplateAPi } from '@aglint/shared-types';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { EmailPreviewOnScheduling } from '@/devlink3/EmailPreviewOnScheduling';
import { ShowCode } from '@/src/components/Common/ShowCode';
import DynamicLoader from '@/src/components/Scheduling/Interviewers/DynamicLoader';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';

import { useSchedulingApplicationStore } from '../../../store';

function EmailPreview({
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
  const { selectedApplication } = useSchedulingApplicationStore();
  const { recruiterUser } = useAuthDetails();
  const [emailData, setEmailData] = useState<{ html: string; subject: string }>(
    null,
  );
  const [fetching, setFetching] = useState(true);
  const payload: EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>['api_payload'] =
    {
      preview_details: {
        application_id: selectedApplication.id,
      },
      organizer_user_id: recruiterUser.user_id,
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
      slotButton={
        <>
          <ButtonSoft
            color={'neutral'}
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
        <ShowCode>
          <ShowCode.When isTrue={fetching}>
            <DynamicLoader height='50vh' />
          </ShowCode.When>
          <ShowCode.Else>
            <iframe
              width={'600px'}
              height={'720px'}
              color='white'
              srcDoc={emailData?.html}
              title='Previw Email'
            />
          </ShowCode.Else>
        </ShowCode>
      }
    />
  );
}

export default EmailPreview;
