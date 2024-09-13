import { type TargetApiPayloadType } from '@aglint/shared-types';
import { Alert, AlertDescription } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { EmailPreviewOnScheduling } from '@devlink3/EmailPreviewOnScheduling';
import { AlertCircle, Loader2, RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

import axios from '@/client/axios';
import { ShowCode } from '@/components/Common/ShowCode';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import toast from '@/utils/toast';

function EmailPreview({
  setRequestSteps,
  onSubmit,
  loading,
  application_id,
}: {
  requestAvailabilityId: string;
  // eslint-disable-next-line no-unused-vars
  setRequestSteps: (value: 'finding_slots' | 'preview' | 'success') => void;
  onSubmit: () => void;
  loading: boolean;
  application_id: string;
}) {
  const { recruiterUser } = useAuthDetails();
  const [emailData, setEmailData] = useState<{ html: string; subject: string }>(
    null,
  );
  const [fetching, setFetching] = useState(false);
  const payload: TargetApiPayloadType<'sendAvailabilityRequest_email_applicant'> =
    {
      preview_details: {
        application_id,
      },
      organizer_user_id: recruiterUser.user_id,
    };

  function getEmail() {
    setFetching(true);
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
  useEffect(() => {
    if (!emailData) {
      getEmail();
    }
  }, []);

  return (
    <EmailPreviewOnScheduling
      textEmailPreview={
        <div className='flex flex-col space-y-1'>
          <p>
            This email will be sent to the candidate. To edit the content, go to
            the template section, make edits, then click refresh.
            <br />
            {`Click "Request Availability" to send.`}
          </p>
        </div>
      }
      slotButton={
        <>
          <Button
            variant='outline'
            onClick={() => {
              setRequestSteps('finding_slots');
            }}
          >
            Back
          </Button>
          <Button disabled={loading} onClick={onSubmit}>
            {loading ? (
              <>
                <RefreshCcw className='mr-2 h-4 w-4 animate-spin' />
                Loading...
              </>
            ) : (
              'Request Availability'
            )}
          </Button>
        </>
      }
      slotEmailPreview={
        <ShowCode>
          <ShowCode.When isTrue={fetching}>
            <div className='h-[80vh] w-[538px] flex items-center justify-center'>
              <Loader2 className='w-8 h-8 animate-spin' />
            </div>
          </ShowCode.When>
          <ShowCode.Else>
            <div className='flex flex-row justify-between items-center w-full px-5 gap-8'>
              <div>
                <Alert>
                  <AlertCircle className='h-4 w-4' />
                  <AlertDescription>
                    This is a preview only. All actions in this email are
                    disabled.
                  </AlertDescription>
                </Alert>
              </div>
              <div className='flex flex-row space-x-1 justify-start min-w-[152px]'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    window.open(
                      `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling?tab=settings&subtab=emailTemplate&email=sendAvailabilityRequest_email_applicant&template_tab=email`,
                    );
                  }}
                >
                  Edit Email Template
                </Button>
                <Button variant='outline' size='sm' onClick={getEmail}>
                  <RefreshCcw className='h-4 w-4' />
                </Button>
              </div>
            </div>
            <iframe
              className='w-[600px] h-[720px]'
              srcDoc={emailData?.html}
              title='Preview Email'
            />
          </ShowCode.Else>
        </ShowCode>
      }
    />
  );
}

export default EmailPreview;
