import { InterviewModuleType, RecruiterUserType } from '@aglint/shared-types';

import { ModuleType } from '@/src/components/Scheduling/Modules/types';

import { ScheduleListType } from '../Common/ModuleSchedules/hooks';

export interface InterviewerDetailsType {
  modules: {
    id: string;
    module_id: string;
    pause_json: {
      start_date: string;
      end_date: string;
      isManual: boolean;
      z;
    };
    training_status: 'qualified' | 'training';
    user_id: string;
    interview_module: InterviewModuleType & {
      settings: ModuleType['settings'];
    };
  }[];
  interviewer: RecruiterUserType;
}

export type DetailsWithCount = Omit<InterviewerDetailsType, 'modules'> & {
  modules: (InterviewerDetailsType['modules'][number] & {
    cancelledCount: number;
    completedCount: number;
    confirmedCount: number;
    moduleMeetings: ScheduleListType;
  })[];
};

export type PauseDialog = {
  isOpen: boolean;
  isAll: boolean;
  training_status?: 'qualified' | 'training';
  panel_id?: string | null;
  type:
    | 'pause'
    | 'resume'
    | 'remove'
    | 'addQualifiedModule'
    | 'addTrainingModule';
  isLoading?: boolean;
  end_time?: string;
};
