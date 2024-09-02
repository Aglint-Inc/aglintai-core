import { CircularProgress } from '@mui/material';

import { ButtonSolid } from '@/devlink2/ButtonSolid';
import { ScheduleProgress } from '@/devlink2/ScheduleProgress';

import { SlackIcon } from '../../../Components/SlackIcon';
import { workflowCopy } from '../../utils/copy';
import { EventProgressItem } from '../types';
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
    <ScheduleProgress
      slotAiText={null} // Placeholder for AI instructions if needed
      isAiTextVisible={false}
      slotLoader={
        requestProgress?.status === 'in_progress' ? (
          <CircularProgress size={20} />
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
          <ButtonSolid
            textButton={
              api === 'onRequestCancel_agent_cancelEvents'
                ? 'Cancel'
                : api === 'onRequestCancel_slack_interviewersOrganizer'
                  ? 'Send slack'
                  : ''
            }
            onClickButton={{
              onClick: handleClick,
            }}
            size={1}
          />
        )
      }
    />
  );
}

export default RequestEvent;
