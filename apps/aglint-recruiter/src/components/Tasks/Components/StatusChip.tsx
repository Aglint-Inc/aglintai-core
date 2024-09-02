import { type DB } from '@aglint/shared-types';
import { Stack } from '@mui/material';

import { TaskStatus } from '@/devlink3/TaskStatus';

function StatusChip({
  status,
  arrowDown = false,
}: {
  status: DB['public']['Enums']['task_status'];
  arrowDown?: boolean;
}) {
  return (
    <Stack direction={'column'}>
      {statusList.map(
        (
          {
            backgroundColor,
            id,
            label,
            color,
          }: {
            backgroundColor: string;
            id: DB['public']['Enums']['task_status'];
            label: string;
            color: string;
          },
          i,
        ) => {
          if (id === status)
            return (
              <TaskStatus
                isDropIconVisible={arrowDown}
                bgColorProps={{
                  style: {
                    backgroundColor,
                    color,
                    fontWeight: 400,
                  },
                }}
                key={i}
                textStatus={label}
              />
            );
        },
      )}
    </Stack>
  );
}

export default StatusChip;

export const statusList = [
  {
    id: 'not_started' as DB['public']['Enums']['task_status'],
    backgroundColor: 'var(--neutral-a3)',
    label: 'Not Started',
    color: 'var(--neutral-a11)',
  },
  {
    id: 'scheduled' as DB['public']['Enums']['task_status'],
    backgroundColor: 'var(--warning-a3)',
    label: 'Scheduled',
    color: 'var(--warning-a11)',
  },

  {
    id: 'in_progress' as DB['public']['Enums']['task_status'],
    backgroundColor: 'var(--info-a3)',
    label: 'In Progress',
    color: 'var(--info-a11)',
  },
  {
    id: 'completed' as DB['public']['Enums']['task_status'],
    backgroundColor: 'var(--success-a3)',
    label: 'Completed',
    color: 'var(--success-a11)',
  },
  {
    id: 'cancelled' as DB['public']['Enums']['task_status'],
    backgroundColor: 'var(--error-a3)',
    label: 'Cancelled',
    color: 'var(--error-a11)',
  },
  {
    id: 'closed' as DB['public']['Enums']['task_status'],
    backgroundColor: 'var(--error-a3)',
    label: 'Closed',
    color: 'var(--error-a11)',
  },
  {
    id: 'failed' as DB['public']['Enums']['task_status'],
    backgroundColor: 'var(--error-a3)',
    label: 'Failed',
    color: 'var(--error-a11)',
  },
];
