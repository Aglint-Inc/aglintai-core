import { type DB } from '@aglint/shared-types';
import {
  CalendarClock,
  CheckCircle,
  FileText,
  Hourglass,
  User,
  Users,
  XCircle,
} from 'lucide-react';
import { memo } from 'react';

import { StatusBadge } from './StatusBadge';

type Enums = DB['public']['Enums'];

type ScheduleProgressPillProps = {
  session_name: string;
  session_duration: number;
  status: Enums['interview_schedule_status'];
  session_type: Enums['session_type'];
  schedule_type: Enums['interview_schedule_type'];
  position?: 'starting' | 'ending' | 'middle' | 'lone';
  date?: {
    start_time: string;
    end_time: string;
  };
};

const ScheduleStatus = memo(
  ({ status }: Pick<ScheduleProgressPillProps, 'status'>) => {
    return (
      <StatusBadge
        isCancelledVisible={status === 'cancelled'}
        isConfirmedVisible={status === 'confirmed'}
        isWaitingVisible={status === 'waiting'}
        isCompletedVisible={status === 'completed'}
        isNotScheduledVisible={status === 'not_scheduled'}
      />
    );
  },
);
ScheduleStatus.displayName = 'ScheduleStatus';

const ProgressIcon = ({
  status,
}: Pick<ScheduleProgressPillProps, 'status'>) => {
  switch (status) {
    case 'waiting':
      return <CalendarClock size={16} className='text-muted-foreground' />;
    case 'confirmed':
      return <CheckCircle size={16} className='text-muted-foreground' />;
    case 'completed':
      return <CheckCircle size={16} className='text-muted-foreground' />;
    case 'cancelled':
      return <XCircle size={16} className='text-muted-foreground' />;
    default:
      return <Hourglass size={16} className='text-muted-foreground' />;
  }
};
ProgressIcon.displayName = 'ProgressIcon';

export const SessionIcon = ({
  session_type,
}: Pick<ScheduleProgressPillProps, 'session_type'>) => {
  switch (session_type) {
    case 'debrief':
      return <FileText size={16} className='text-muted-foreground' />;
    case 'individual':
      return <User size={16} className='text-muted-foreground' />;
    case 'panel':
      return <Users size={16} className='text-muted-foreground' />;
  }
};
SessionIcon.displayName = 'SessionIcon';
