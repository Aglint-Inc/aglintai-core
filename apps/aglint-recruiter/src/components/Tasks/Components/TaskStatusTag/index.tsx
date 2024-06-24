import { DatabaseView } from '@aglint/shared-types';
import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';
import { Stack } from '@mui/material';

import { GlobalBadge } from '@/devlink/GlobalBadge';
import { ShowCode } from '@/src/components/Common/ShowCode';
import dayjs from '@/src/utils/dayjs';

import {
  getIndicatorMessage,
  indicatorType,
} from '../../TaskBody/TaskRow/utils';

function TaskStatusTag({ task }: { task: DatabaseView['tasks_view'] }) {
  const progress_type = task?.last_progress?.progress_type;
  const last_progress = task?.last_progress;
  let toDayDateTime = dayjs();
  let dueDateTime = dayjs(last_progress.created_at);

  function getIndicator() {
    if (
      dueDateTime.isBefore(toDayDateTime.add(-2, 'day')) &&
      last_progress.created_by.id === EmailAgentId &&
      last_progress.progress_type === 'email_messages'
    ) {
      return 'NO_RESPONSE' as indicatorType;
    }

    if (
      task.trigger_count === 2 &&
      last_progress.created_by.id === PhoneAgentId &&
      last_progress.progress_type === 'call_disconnected'
    ) {
      return 'NO_RESPONSE' as indicatorType;
    }

    if (progress_type === 'send_email') {
      return 'MAIL_SENT' as indicatorType;
    }

    // progress_type
    if (progress_type === 'request_availability') {
      return 'REQUEST_AVAILABILITY' as indicatorType;
    }

    if (progress_type === 'self_schedule' || progress_type === 'schedule') {
      return 'SCHEDULE' as indicatorType;
    }

    if (progress_type === 'request_availability_list') {
      return 'REQUEST_SUBMITTED' as indicatorType;
    }

    if (
      progress_type === 'interview_schedule' ||
      progress_type === 'call_completed'
    ) {
      return 'BOOKED' as indicatorType;
    }

    if (
      progress_type === 'call_failed' ||
      progress_type === 'call_disconnected' ||
      progress_type === 'email_failed' ||
      task.status === 'failed'
    ) {
      return 'ACTION_NEEDED_AGENT_FAIL' as indicatorType;
    }
  }
  return (
    <Stack direction={'row'} spacing={1}>
      <GetTaskStatusBadge indicator={getIndicator()} />
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
            indicator === 'REQUEST_AVAILABILITY' ||
            indicator === 'SCHEDULE' ||
            indicator === 'MAIL_SENT' ||
            indicator === 'SCHEDULED' ||
            indicator === 'BOOKED' ||
            indicator === 'REQUEST_SUBMITTED'
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
            indicator === 'AWAITING_RESPONSE' ||
            indicator === 'NO_RESPONSE' ||
            indicator === 'SCHEDULE_WAITING_24H_48H' ||
            indicator === 'RESCHEDULE' ||
            indicator === 'SWITCH_INTERVIEWER'
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
            indicator === 'SWITCH_INTERVIEWER'
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
            indicator === 'ACTION_NEEDED_AGENT_FAIL'
          }
        >
          <GlobalBadge
            color={'error'}
            iconName={'error'}
            showIcon={true}
            textBadge={getIndicatorMessage(indicator)}
          />
        </ShowCode.When>
      </ShowCode>
    </>
  );
}
