import { type DatabaseTable } from '@aglint/shared-types';
import { DAYJS_FORMATS, dayjsLocal, supabaseWrap } from '@aglint/shared-utils';

import axios from 'axios';
import { useState } from 'react';

import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';
import { Button } from '@components/ui/button';
import { CheckIcon } from 'lucide-react';

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
    <div className='flex flex-col gap-4'>
      <div className='flex items-center text-gray-500'>
        <CheckIcon className='w-4 h-4 mr-2' />
        <span className='text-sm'>{copy}</span>
      </div>
      {!isTimePast && (
        <div className='flex gap-2'>
          <Button variant='outline' size='sm'>
            Edit Email
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Send now'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FirstFollowUp;
