import { Stack } from '@mui/material';

import { TaskStatus } from '@/devlink3';
import { palette } from '@/src/context/Theme/Theme';
import { CustomDatabase } from '@/src/types/customSchema';

function StatusChip({
  status,
}: {
  status: CustomDatabase['public']['Enums']['task_status'];
}) {
  return (
    <Stack direction={'column'}>
      {colorsData.map(
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

export const colorsData = [
  {
    id: 'scheduled' as CustomDatabase['public']['Enums']['task_status'],
    backgroundColor: palette.yellow[400] + '55',
    label: 'Scheduled',
    color: palette.yellow[700],
  },
  {
    id: 'not_started' as CustomDatabase['public']['Enums']['task_status'],
    backgroundColor: '#e9ebed',
    label: 'Not Started',
    color: '#49545c',
  },
  {
    id: 'in_progress' as CustomDatabase['public']['Enums']['task_status'],
    backgroundColor: '#CEE2F2',
    label: 'In Progress',
    color: '#337FBD',
  },
  {
    id: 'completed' as CustomDatabase['public']['Enums']['task_status'],
    backgroundColor: '#D1E8DF',
    label: 'completed',
    color: '#228F67',
  },
  {
    id: 'cancelled' as CustomDatabase['public']['Enums']['task_status'],
    backgroundColor: '#f5d5d8',
    label: 'Cancelled',
    color: '#CC3340',
  },
  {
    id: 'closed' as CustomDatabase['public']['Enums']['task_status'],
    backgroundColor: palette.grey[500] + 'aa',
    label: 'Closed',
    color: '#000',
  },
];
