import { Button } from '@components/ui/button';
import { useRequestProgressProvider } from '@request/components/RequestProgress/progressCtx';
import React from 'react';

import SuggestionCard from '../../SuggestionCard';

const SelfSchedulReminder = () => {
  const { setTriggerDetails, setShowEditDialog } = useRequestProgressProvider();
  return (
    <div>
      <SuggestionCard
        heading='Add automation'
        description={
          'Self-schedule reminders will be sent to the applicant to remind them to schedule their interview.'
        }
        buttonSlot={
          <>
            <Button
              variant='outline'
              size='sm'
              onClick={() => {
                setTriggerDetails({
                  trigger: 'selfScheduleReminder',
                  interval: 24 * 60,
                });
                setShowEditDialog(true);
              }}
            >
              Schedule Reminder
            </Button>
          </>
        }
      />
    </div>
  );
};

export default SelfSchedulReminder;
