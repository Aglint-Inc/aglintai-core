import { Button } from '@components/ui/button';
import { Loader2, Send } from 'lucide-react';

import { SlackIcon } from '../../../RequestCard/Components/SlackIcon';
import ScheduleProgressTracker from '../../ScheduleProgressTracker';
import { workflowCopy } from '../../utils/copy';
import { type EventProgressItem } from '../types';
import { getWorkflowText } from '../utils';

function RequestEvent({
  eventType,
  api,
  requestProgress,
  isManualFlow,
  handleClick,
}: EventProgressItem) {
  const workflow = workflowCopy[eventType];
  return (
    <ScheduleProgressTracker
      slotAiText={null} // Placeholder for AI instructions if needed
      isAiTextVisible={false}
      slotLoader={
        requestProgress?.status === 'in_progress' ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : null
      }
      slotLeftIcon={
        api === 'onRequestCancel_slack_interviewersOrganizer' ? (
          <SlackIcon />
        ) : (
          ''
        )
      }
      slotRightIcon={''}
      status={requestProgress?.status ?? null}
      textProgress={getWorkflowText({
        workflow,
        status: requestProgress?.status,
      })}
      slotButton={
        isManualFlow &&
        requestProgress?.status !== 'completed' && (
          <Button onClick={handleClick} size='sm'>
            {api === 'onRequestCancel_agent_cancelEvents' ? (
              'Cancel'
            ) : api === 'onRequestCancel_slack_interviewersOrganizer' ? (
              <>
                <Send className='mr-2 h-4 w-4' />
                Send slack
              </>
            ) : (
              ''
            )}
          </Button>
        )
      }
    />
  );
}

export default RequestEvent;
