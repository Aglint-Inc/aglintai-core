import { EmailTemplateAPi } from '@aglint/shared-types';
import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { EmailPreviewOnScheduling } from '@/devlink3/EmailPreviewOnScheduling';
import Loader from '@/src/components/Common/Loader';
import { ShowCode } from '@/src/components/Common/ShowCode';
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
  const [fetching, setFetching] = useState(false);
  const payload: EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>['api_payload'] =
    {
      preview_details: {
        application_id: selectedApplication.id,
      },
      organizer_user_id: recruiterUser.user_id,
    };

  function getEmail() {
    setFetching(true);
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
  useEffect(() => {
    if (!emailData) {
      getEmail();
    }
  }, []);

  return (
    <EmailPreviewOnScheduling
      textEmailPreview={
        <Stack spacing={1} direction={'column'}>
          <Typography>
            To proceed with requesting the candidate’s availability, please
            click on the button below. Upon doing so, an email containing the
            following message will be sent to the candidate:
          </Typography>
          <Stack direction={'row'} spacing={1} justifyItems={'start'}>
            <ButtonSoft
              size={1}
              textButton={'Edit Email Template'}
              color={'neutral'}
              onClickButton={{
                onClick: () => {
                  window.open(
                    `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling?tab=settings&subtab=emailTemplate&email=sendAvailabilityRequest_email_applicant&template_tab=email`,
                  );
                },
              }}
            />
            <IconButtonSoft
              size={1}
              color={'neutral'}
              iconName={'refresh'}
              onClickButton={{
                onClick: getEmail,
              }}
            />
          </Stack>
        </Stack>
      }
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
            <Stack height={'80vh'} width={'538px'}>
              <Loader />
            </Stack>
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
