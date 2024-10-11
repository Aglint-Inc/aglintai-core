import { Button } from '@components/ui/button';
import { useRequestProgressProvider } from '@request/components/RequestProgress/progressCtx';
import React from 'react';

import SuggestionCard from '../../SuggestionCard';

const AvailbilityReminder = () => {
  const { setTriggerDetails, setShowEditDialog } = useRequestProgressProvider();

  return (
    <SuggestionCard
      heading='Suggestion'
      description='Add Reminders to candidate for follow up.'
      buttonSlot={
        <Button
          variant='outline'
          size='sm'
          onClick={() => {
            setTriggerDetails({
              trigger: 'sendAvailReqReminder',
              interval: 24 * 60,
            });
            setShowEditDialog(true);
          }}
        >
          Schedule Reminder
        </Button>
      }
    />
  );
};

export default AvailbilityReminder;
