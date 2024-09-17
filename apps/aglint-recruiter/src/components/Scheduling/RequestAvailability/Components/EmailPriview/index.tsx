import { type TargetApiPayloadType } from '@aglint/shared-types';
import { Alert, AlertDescription } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { AlertCircle, Loader2, RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { mailSender } from '@/utils/mailSender';
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
    mailSender({
      target_api: 'sendAvailabilityRequest_email_applicant',
      payload,
    })
      .then((data) => {
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
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-col space-y-1'>
        <p className='text-sm text-gray-600'>
          This email will be sent to the candidate. To edit the content, go to
          the template section, make edits, then click refresh.
          <br />
          {`Click "Request Availability" to send.`}
        </p>
      </div>

      <div className='flex space-x-2'>
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
            <div className='flex items-center'>
              <RefreshCcw className='mr-2 h-4 w-4 animate-spin' />
              Loading...
            </div>
          ) : (
            'Request Availability'
          )}
        </Button>
      </div>

      <div className='w-full'>
        {fetching ? (
          <div className='h-[80vh] w-full flex items-center justify-center'>
            <Loader2 className='w-8 h-8 animate-spin' />
          </div>
        ) : (
          <div className='flex flex-col space-y-4'>
            <div className='flex justify-between items-center w-full px-5'>
              <Alert className='flex-grow mr-8'>
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>
                  This is a preview only. All actions in this email are
                  disabled.
                </AlertDescription>
              </Alert>
              <div className='flex space-x-1'>
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
              className='w-full h-[720px] border border-gray-200 rounded'
              srcDoc={emailData?.html}
              title='Preview Email'
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailPreview;
