import { TextWithIcon } from '@/devlink2';
import toast from '@/src/utils/toast';
import { DatabaseTable } from '@aglint/shared-types';
import { DAYJS_FORMATS, dayjsLocal } from '@aglint/shared-utils';
import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react';

const SelfScheduleFollowUp = (
  args: DatabaseTable['request_progress']['meta'],
) => {
  const handleSubmit = async () => {
    try {
      await axios.post('/api/workflow-cron/execute', {
        action_id: args.event_run_id,
      });
    } catch (err) {
      toast.error('Failed to Execute');
    }
  };
  return (
    <>
      <TextWithIcon
        textContent={`Folloup Scheduled at ${dayjsLocal(args.scheduled_time).format(DAYJS_FORMATS.DATE_TIME_FORMAT)}`}
        fontSize={1}
        color={'grey'}
      />
      <span>
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          send now
        </Button>
      </span>
    </>
  );
};

export default SelfScheduleFollowUp;
