import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { useMeetingList } from '@requests/hooks';
import { CheckCircle2 } from 'lucide-react';
import React from 'react';

import { UIButton } from '@/components/Common/UIButton';

import { useSelfSchedulingFlowStore } from '../store/store';

function SelfScheduleSuccess() {
  const [isCopied, setIsCopied] = React.useState(false);
  const { data } = useMeetingList();
  const allSessions = data;

  const application_id = allSessions[0]?.interview_meeting.application_id;

  const { resSendToCandidate } = useSelfSchedulingFlowStore((state) => ({
    resSendToCandidate: state.resSendToCandidate,
  }));

  const handleCopyLink = async () => {
    setIsCopied(true);
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${application_id}?filter_id=${resSendToCandidate.filter_id}`,
    );
    await new Promise((resolve) => setTimeout(resolve, 4000));
  };

  return (
    <div className='flex w-full flex-row items-center justify-center'>
      <Alert variant='success'>
        <CheckCircle2 className='h-4 w-4' />
        <AlertTitle>Self scheduling link sent successfully</AlertTitle>
        <AlertDescription>
          The candidate received an email containing a link to select from the
          provided options. The interview will be confirmed once the candidate
          makes a selection.
        </AlertDescription>
        <UIButton
          variant='outline'
          size='sm'
          className='mt-3'
          onClick={() => handleCopyLink()}
        >
          {isCopied ? 'Copied' : 'Copy Link'}
        </UIButton>
      </Alert>
    </div>
  );
}

export default SelfScheduleSuccess;
