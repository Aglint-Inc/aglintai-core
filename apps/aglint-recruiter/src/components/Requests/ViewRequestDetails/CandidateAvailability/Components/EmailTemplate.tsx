import { type EmailTemplateAPi } from '@aglint/shared-types';
import { EmailTemplateHolder } from '@devlink2/EmailTemplateHolder';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import axios from '@/client/axios';
import Loader from '@/components/Common/Loader';
import { ShowCode } from '@/components/Common/ShowCode';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import toast from '@/utils/toast';

import { useCandidateAvailabilitySchedulingFlowStore } from '../store';

function EmailTemplate({ application_id }: { application_id?: string }) {
  const { recruiterUser } = useAuthDetails();
  const { reRequestAvailability, candidateAvailabilityIdForReRequest } =
    useCandidateAvailabilitySchedulingFlowStore();
  const [emailData, setEmailData] = useState<{ html: string; subject: string }>(
    null,
  );
  const [fetching, setFetching] = useState(false);
  const payload: EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>['api_payload'] =
    {
      preview_details: {
        application_id: application_id,
      },
      organizer_user_id: recruiterUser.user_id,
    };

  function getEmail() {
    setFetching(true);
    if (reRequestAvailability) {
      const payload1: EmailTemplateAPi<'availabilityReqResend_email_candidate'>['api_payload'] =
        {
          is_preview: true,
          avail_req_id: candidateAvailabilityIdForReRequest,
          recruiter_user_id: recruiterUser.user_id,
        };
      axios
        .post('/api/emails/availabilityReqResend_email_candidate', {
          ...payload1,
        })
        .then(({ data }) => {
          setEmailData(data);
          setFetching(false);
        })
        .catch(() => {
          toast.error('Fail to fetch email preview');
          setFetching(false);
        });
    } else {
      axios
        .post('/api/emails/sendAvailabilityRequest_email_applicant', {
          ...payload,
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
  }
  useEffect(() => {
    if (!emailData) {
      getEmail();
    }
  }, []);
  return (
    <>
      <EmailTemplateHolder
        onClickEditTemplate={{
          onClick: () => {
            window.open(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/company?tab=emailTemplate&email=sendAvailabilityRequest_email_applicant`,
            );
          },
        }}
        onClickReload={{
          onClick: getEmail,
        }}
        slotEmail={
          <ShowCode>
            <ShowCode.When isTrue={fetching}>
              <Stack height={'100vh'} width={'100%'}>
                <Loader />
              </Stack>
            </ShowCode.When>
            <ShowCode.Else>
              <Stack>
                <iframe
                  // width={'600px'}
                  height={'820px'}
                  color='white'
                  srcDoc={emailData?.html}
                  title='Preview Email'
                />
              </Stack>
            </ShowCode.Else>
          </ShowCode>
        }
      />
    </>
  );
}

export default EmailTemplate;
