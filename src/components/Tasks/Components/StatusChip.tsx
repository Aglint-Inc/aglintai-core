import { Stack } from '@mui/material';

import { TaskStatus } from '@/devlink3';
import { CustomDatabase } from '@/src/types/customSchema';

function StatusChip({
  status,
}: {
  status: CustomDatabase['public']['Enums']['task_status'];
}) {
  return (
    <Stack direction={'column'}>
      {[
        {
          id: 'not_started',
          backgroundColor: '#e9ebed',
          label: 'Not Started',
          color: '#49545c',
        },
        {
          id: 'in_progress',
          backgroundColor: '#CEE2F2',
          label: 'In Progress',
          color: '#337FBD',
        },
        {
          id: 'completed',
          backgroundColor: '#D1E8DF',
          label: 'Completed',
          color: '#228F67',
        },
        {
          id: 'closed',
          backgroundColor: '#f5d5d8',
          label: 'Closed',
          color: '#CC3340',
        },
      ].map(
        (
          {
            backgroundColor,
            id,
            label,
            color,
          }: {
            backgroundColor: string;
            id: CustomDatabase['public']['Enums']['task_status'];
            label: string;
            color: string;
          },
          i,
        ) => {
          if (id === status)
            return (
              <TaskStatus
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
