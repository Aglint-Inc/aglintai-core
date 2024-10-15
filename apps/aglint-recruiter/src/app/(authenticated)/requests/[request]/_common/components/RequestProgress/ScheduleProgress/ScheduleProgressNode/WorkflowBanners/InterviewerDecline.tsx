import { Button } from '@components/ui/button';
import { useRequestProgressProvider } from '@request/components/RequestProgress/progressCtx';
import React from 'react';

import SuggestionCard from '../../SuggestionCard';

const InterviewerDecline = () => {
  const { setTriggerDetails, setShowEditDialog } = useRequestProgressProvider();
  return (
    <SuggestionCard
      heading='Suggestion'
      description='Automate replacing Interviewers'
      buttonSlot={
        <Button
          variant='outline'
          size='sm'
          onClick={() => {
            setTriggerDetails({
              interval: 0,
              trigger: 'onRequestInterviewerDecline',
            });
            setShowEditDialog(true);
          }}
        >
          Add Automation
        </Button>
      }
    />
  );
};

export default InterviewerDecline;
