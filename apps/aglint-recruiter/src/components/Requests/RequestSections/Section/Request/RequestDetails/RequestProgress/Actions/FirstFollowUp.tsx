import { type DatabaseTable } from '@aglint/shared-types';
import { DAYJS_FORMATS, dayjsLocal, supabaseWrap } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

const FirstFollowUp = (rowData: DatabaseTable['request_progress']) => {
  const [isLoading, setLoading] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(
    rowData.meta.scheduled_time,
  );

  const handleSubmit = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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
    <Stack gap={1}>
      <TextWithIcon
        iconName={'check'}
        textContent={copy}
        fontSize={1}
        color={'grey'}
      />
      <ShowCode.When isTrue={!isTimePast}>
        <Stack
          width={'100%'}
          direction={'row'}
          justifyContent={'start'}
          gap={1}
        >
          <ButtonSoft size={1} color={'accent'} textButton={'Edit Email'} />

          <ButtonSoft
            size={1}
            color={'accent'}
            onClickButton={{
              onClick: () => {
                handleSubmit();
              },
            }}
            textButton={isLoading ? <>loading...</> : <>Send now</>}
          />
        </Stack>
      </ShowCode.When>
    </Stack>
  );
};

export default FirstFollowUp;
