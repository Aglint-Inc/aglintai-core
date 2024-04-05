import { capitalize } from 'lodash';
import React from 'react';

import { TaskStatus } from '@/devlink3';
import { CustomDatabase } from '@/src/types/customSchema';

import { ShowCode } from '../../Common/ShowCode';

function StatusChip({
  status,
}: {
  status: CustomDatabase['public']['Enums']['sub_task_status'];
}) {
  return (
    <ShowCode>
      <ShowCode.When isTrue={status === 'pending'}>
        <TaskStatus
          bgColorProps={{
            style: { backgroundColor: '#FFF7ED' },
          }}
          textStatus={capitalize(status)}
        />
      </ShowCode.When>
      <ShowCode.When isTrue={status === 'completed'}>
        <TaskStatus
          bgColorProps={{
            style: { backgroundColor: '#D1E8DF' },
          }}
          textStatus={capitalize(status)}
        />
      </ShowCode.When>
      <ShowCode.When isTrue={status === 'in_progress'}>
        <TaskStatus
          bgColorProps={{
            style: { backgroundColor: '#CEE2F2' },
          }}
          textStatus={capitalize(status)}
        />
      </ShowCode.When>
      <ShowCode.When isTrue={status === 'closed'}>
        <TaskStatus
          bgColorProps={{
            style: { backgroundColor: '#E9EBED' },
          }}
          textStatus={capitalize(status)}
        />
      </ShowCode.When>
    </ShowCode>
  );
}

export default StatusChip;
