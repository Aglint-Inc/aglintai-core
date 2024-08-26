import { TextWithIcon } from '@/devlink2';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { supabase } from '@/src/utils/supabase/client';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
import toast from '@/src/utils/toast';
import { DatabaseTable } from '@aglint/shared-types';
import { DAYJS_FORMATS, dayjsLocal, supabaseWrap } from '@aglint/shared-utils';
import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const SelfScheduleFollowUp = (rowData: DatabaseTable['request_progress']) => {
  const [isLoading, setLoading] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(
    rowData.meta.scheduled_time,
  );
  const handleSubmit = async () => {
    try {
      await axios.post('/api/workflow-cron/execute', {
        action_id: rowData.meta.event_run_id,
      });
      supabaseWrap(
        await supabase
          .from('request_progress')
          .update({
            meta: {
              ...rowData.meta,
              scheduled_time: dayjsLocal().toISOString(),
            },
          })
          .eq('id', rowData.id),
      );
      setScheduledDate(dayjsLocal().toISOString());
    } catch (err) {
      toast.error('Failed to Execute');
    }
  };
  const isTimePast = dayjsLocal(scheduledDate).isBefore(
    dayjsLocal(),
    'seconds',
  );
  let copy = `Follow Up Scheduled at ${dayjsLocal(scheduledDate).format(DAYJS_FORMATS.DATE_TIME_FORMAT)}`;
  if (isTimePast) {
    copy = `Follow Up Sent at ${dayjsLocal(scheduledDate).format(DAYJS_FORMATS.DATE_TIME_FORMAT)}`;
  }
  return (
    <>
      <TextWithIcon textContent={copy} fontSize={1} color={'grey'} />

      <ShowCode.When isTrue={!isTimePast}>
        <span>
          <Button
            onClick={() => {
              //
            }}
          >
            Edit Email
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
            }}
          >
            {isLoading ? <>loading...</> : <>Send now</>}
          </Button>
        </span>
      </ShowCode.When>
    </>
  );
};

export default SelfScheduleFollowUp;
