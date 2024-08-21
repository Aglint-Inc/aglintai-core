import React from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalCta } from '@/devlink3/GlobalCta';

import { useSelfSchedulingFlowStore } from './store';

function SelfScheduleSuccess() {
  const [isCopied, setIsCopied] = React.useState(false);

  const { resSendToCandidate } = useSelfSchedulingFlowStore((state) => ({
    resSendToCandidate: state.resSendToCandidate,
  }));

  const handleCopyLink = async () => {
    setIsCopied(true);
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${resSendToCandidate.schedule_id}?filter_id=${resSendToCandidate.filter_id}&task_id=${resSendToCandidate.task_id}`,
    );
    await new Promise((resolve) => setTimeout(resolve, 4000));
  };

  return (
    <GlobalCta
      iconName={'mark_email_read'}
      color={'success'}
      textTitle={'Self scheduling link sent successfully'}
      textDescription={
        'The candidate recieved an email containing a link to select from the provided options. The interview will be confirmed once the candidate makes a selection.'
      }
      slotButton={
        <ButtonSoft
          textButton={isCopied ? 'Copied' : 'Copy Link'}
          color={'neutral'}
          size={1}
          onClickButton={{
            onClick: handleCopyLink,
          }}
        />
      }
    />
  );
}

export default SelfScheduleSuccess;
