
import { TaskStatus } from '@/devlink3';
import { CustomDatabase } from '@/src/types/customSchema';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { ShowCode } from '../../Common/ShowCode';

function StatusChip({
  status,
}: {
  status: CustomDatabase['public']['Enums']['task_status'];
}) {
  return (
    <ShowCode>
      <ShowCode.When isTrue={status === 'not_started'}>
        <TaskStatus
          bgColorProps={{
            style: {
              backgroundColor: '#FFF7ED',
              color: '#000000',
              fontWeight: 400,
            },
          }}
          textStatus={capitalizeAll(status.split('_').join(' '))}
        />
      </ShowCode.When>
      <ShowCode.When isTrue={status === 'completed'}>
        <TaskStatus
          bgColorProps={{
            style: {
              backgroundColor: '#D1E8DF',
              color: '#000000',
              fontWeight: 400,
            },
          }}
          textStatus={capitalizeAll(status)}
        />
      </ShowCode.When>
      <ShowCode.When isTrue={status === 'in_progress'}>
        <TaskStatus
          bgColorProps={{
            style: {
              backgroundColor: '#CEE2F2',
              color: '#000000',
              fontWeight: 400,
            },
          }}
          textStatus={capitalizeAll(status.split('_').join(' '))}
        />
      </ShowCode.When>
      <ShowCode.When isTrue={status === 'closed'}>
        <TaskStatus
          bgColorProps={{
            style: {
              backgroundColor: '#E9EBED',
              color: '#000000',
              fontWeight: 400,
            },
          }}
          textStatus={capitalizeAll(status)}
        />
      </ShowCode.When>
    </ShowCode>
  );
}

export default StatusChip;
