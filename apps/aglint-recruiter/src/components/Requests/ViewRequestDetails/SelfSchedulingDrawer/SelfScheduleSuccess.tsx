import React from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalCta } from '@/devlink3/GlobalCta';

import { useMeetingList } from '../hooks';
import { useSelfSchedulingFlowStore } from './store';

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
