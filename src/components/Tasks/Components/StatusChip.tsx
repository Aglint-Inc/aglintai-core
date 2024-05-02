import { Stack } from '@mui/material';

import { TaskStatus } from '@/devlink3';
import { palette } from '@/src/context/Theme/Theme';
import { CustomDatabase } from '@/src/types/customSchema';

function StatusChip({
  status,
  arrowDown = false,
}: {
  status: CustomDatabase['public']['Enums']['task_status'];
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
            id: CustomDatabase['public']['Enums']['task_status'];
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
    id: 'not_started' as CustomDatabase['public']['Enums']['task_status'],
    backgroundColor: '#e9ebed',
    label: 'Not Started',
    color: '#49545c',
  },
  {
    id: 'scheduled' as CustomDatabase['public']['Enums']['task_status'],
    backgroundColor: palette.yellow[400] + '55',
    label: 'Scheduled',
    color: palette.yellow[700],
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
    label: 'Completed',
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
  {
    id: 'failed' as CustomDatabase['public']['Enums']['task_status'],
    backgroundColor: '#f5d5d8' + 'aa',
    label: 'Failed',
    color: '#CC3340',
  },
];
