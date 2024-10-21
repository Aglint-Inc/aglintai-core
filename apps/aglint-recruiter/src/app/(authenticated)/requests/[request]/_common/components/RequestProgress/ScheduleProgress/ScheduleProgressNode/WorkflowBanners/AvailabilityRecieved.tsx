import { Button } from '@components/ui/button';
import { useRequestProgressProvider } from '@request/components/RequestProgress/progressCtx';
import React from 'react';

import SuggestionCard from '../../SuggestionCard';

const AvailabilityRecieved = () => {
  const { setTriggerDetails, setShowEditDialog } = useRequestProgressProvider();
  return (
    <SuggestionCard
      heading='Suggestion'
      description='Automate booking when availability is received'
      buttonSlot={
        <Button
          variant='outline'
          size='sm'
          onClick={() => {
            setTriggerDetails({
              interval: 0,
              trigger: 'onReceivingAvailReq',
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

export default AvailabilityRecieved;
