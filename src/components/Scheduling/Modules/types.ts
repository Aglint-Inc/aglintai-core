import {
  InterviewModuleRelationType,
  InterviewModuleType,
  RecruiterUserType
} from '@/src/types/data.types';
import { Database } from '@/src/types/schema';

export type SchedulingSlice = {
  interviewModules: ModuleType[];
  isCreateDialogOpen: boolean;
  isDeleteMemberDialogOpen: boolean;
  isDeleteModuleDialogOpen: boolean;
  isPauseDialogOpen: boolean;
  isAddMemberDialogOpen: boolean;
  isResumeDialogOpen: boolean;
  isModuleSettingsDialogOpen: boolean;
  selectedUsers: RecruiterUserType[];
  editModule: ModuleType;
  selUser: InterviewModuleRelationType | null;
  pause_json: PauseJson | null;
  searchText: string;
  trainingStatus: StatusTraining;
};

export const initialEditModule: ModuleType = {
  id: '',
  name: '',
  relations: [],
  duration_available: { activeDuration: 0, availabletimeSlots: [] },
  created_at: '',
  recruiter_id: '',
  settings: {
    require_training: false,
    noShadow: 2,
    noReverseShadow: 1,
    reqruire_approval: false,
    approve_users: []
  }
};

export const initialStateSchedulingStore: SchedulingSlice = {
  interviewModules: [],
  isCreateDialogOpen: null,
  isDeleteMemberDialogOpen: false,
  isDeleteModuleDialogOpen: false,
  isPauseDialogOpen: false,
  isAddMemberDialogOpen: false,
  isResumeDialogOpen: false,
  isModuleSettingsDialogOpen: false,
  selectedUsers: [],
  editModule: initialEditModule,
  selUser: null,
  pause_json: { isManual: true, start_date: '', end_date: '' },
  searchText: '',
  trainingStatus: 'qualified'
};

export type ModuleType = Omit<InterviewModuleType, 'settings'> & {
  relations: InterviewModuleRelationType[];
  duration_available: TimeSlotsData;
  settings: {
    require_training: boolean;
    noShadow: number;
    noReverseShadow: number;
    reqruire_approval: boolean;
    approve_users: string[];
  };
};

export type PauseJson = {
  start_date: string;
  end_date: string;
  isManual: boolean;
};

export interface TimeSlotsData {
  activeDuration: number;
  availabletimeSlots: number[];
}

export type StatusTraining = Database['public']['Enums']['status_training'];
