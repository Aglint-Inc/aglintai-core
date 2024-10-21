import { type DB } from '@aglint/shared-types';
import { FileText, User, Users } from 'lucide-react';

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
