import { DatabaseView } from '@aglint/shared-types';
import { Stack } from '@mui/material';

import { GlobalBadge } from '@/devlink/GlobalBadge';
import { ShowCode } from '@/src/components/Common/ShowCode';

import { getIndicator, getIndicatorMessage, indicatorType } from './utils';

function TaskStatusTag({ task }: { task: DatabaseView['tasks_view'] }) {
  const progress_type = task?.last_progress?.progress_type;
  const created_at = task.last_progress.created_at;

  return (
    <Stack direction={'row'} spacing={1}>
      <GetTaskStatusBadge
        indicator={getIndicator({ task, progress_type, created_at })}
      />
    </Stack>
  );
}

export default TaskStatusTag;

function GetTaskStatusBadge({ indicator }: { indicator: indicatorType }) {
  return (
    <>
      <ShowCode>
        <ShowCode.When
          isTrue={
            // info
            indicator === 'READY_TO_SCHEDULE' || indicator === 'BOOKED'
          }
        >
          <GlobalBadge
            color={'info'}
            iconName={'info'}
            showIcon={true}
            textBadge={getIndicatorMessage(indicator)}
          />
        </ShowCode.When>
        <ShowCode.When
          isTrue={
            // warning
            indicator === 'AWAITING_RESPONSE' || indicator === 'NO_RESPONSE'
          }
        >
          <GlobalBadge
            color={'warning'}
            iconName={'warning'}
            showIcon={true}
            textBadge={getIndicatorMessage(indicator)}
          />
        </ShowCode.When>
        <ShowCode.When
          isTrue={
            // important
            indicator === 'READY_TO_SCHEDULE'
          }
        >
          <GlobalBadge
            color={'pink'}
            iconName={'priority_high'}
            showIcon={true}
            textBadge={getIndicatorMessage(indicator)}
          />
        </ShowCode.When>
        <ShowCode.When
          isTrue={
            // error
            indicator === 'ACTION_NEEDED'
          }
        >
          <GlobalBadge
            color={'error'}
            iconName={'error'}
            showIcon={true}
            textBadge={getIndicatorMessage(indicator)}
          />
        </ShowCode.When>
        <ShowCode.Else>
          <GlobalBadge
            color={'info'}
            iconName={'info'}
            showIcon={true}
            textBadge={getIndicatorMessage(indicator)}
          />
        </ShowCode.Else>
      </ShowCode>
    </>
  );
}
