import { type DB } from '@aglint/shared-types';
import {
  Calendar,
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
      return (
        <div className='text-yellow-500'>
          <WaitingIcon />
        </div>
      );
    case 'confirmed':
      return (
        <div className='text-blue-500'>
          <ConfirmedIcon />
        </div>
      );
    case 'completed':
      return (
        <div className='text-green-500'>
          <CompletedIcon />
        </div>
      );
    case 'cancelled':
      return (
        <div className='text-red-500'>
          <CancelledIcon />
        </div>
      );
    default:
      return (
        <div className='text-muted-foreground'>
          <NotScheduledIcon />
        </div>
      );
  }
};
ProgressIcon.displayName = 'ProgressIcon';

export const SessionIcon = ({
  session_type,
}: Pick<ScheduleProgressPillProps, 'session_type'>) => {
  switch (session_type) {
    case 'debrief':
      return <DebriefSessionIcon />;
    case 'individual':
      return <IndividualSessionIcon />;
    case 'panel':
      return <PanelSessionIcon />;
  }
};
SessionIcon.displayName = 'SessionIcon';

const CompletedIcon = () => {
  return <CheckCircle size={6} />;
};

const WaitingIcon = () => {
  return <CalendarClock size={6} />;
};

const ConfirmedIcon = () => {
  return <Calendar size={6} />;
};

const CancelledIcon = () => {
  return <XCircle size={6} />;
};

const NotScheduledIcon = () => {
  return <Hourglass size={6} />;
};

const IndividualSessionIcon = () => {
  return <User size={6} />;
};

const PanelSessionIcon = () => {
  return <Users size={6} />;
};

const DebriefSessionIcon = () => {
  return <FileText size={6} />;
};
