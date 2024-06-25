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

export function GetTaskStatusBadge({
  indicator,
}: {
  indicator: indicatorType;
}) {
  return (
    <>
      <ShowCode>
        <ShowCode.When
          isTrue={
            // info
            indicator === 'READY_TO_SCHEDULE'
          }
        >
          <GlobalBadge
            color={'purple'}
            showIcon={false}
            textBadge={getIndicatorMessage(indicator)}
          />
        </ShowCode.When>

        <ShowCode.When isTrue={indicator === 'BOOKED'}>
          <GlobalBadge
            color={'success'}
            showIcon={false}
            textBadge={getIndicatorMessage(indicator)}
          />
        </ShowCode.When>

        <ShowCode.When
          isTrue={
            // warning
            indicator === 'AWAITING_RESPONSE'
          }
        >
          <GlobalBadge
            color={'blue'}
            showIcon={false}
            textBadge={getIndicatorMessage(indicator)}
          />
        </ShowCode.When>

        <ShowCode.When isTrue={indicator === 'NO_RESPONSE'}>
          <GlobalBadge
            color={'warning'}
            showIcon={false}
            textBadge={getIndicatorMessage(indicator)}
          />
        </ShowCode.When>

        <ShowCode.When isTrue={indicator === 'ACTION_NEEDED'}>
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
            showIcon={false}
            textBadge={getIndicatorMessage(indicator)}
          />
        </ShowCode.Else>
      </ShowCode>
    </>
  );
}
