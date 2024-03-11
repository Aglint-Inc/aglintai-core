import {
  InterviewModuleRelationType,
  InterviewModuleType,
  RecruiterUserType
} from '@/src/types/data.types';

export type SchedulingSlice = {
  interviewModules: ModuleType[];
  isCreateDialogOpen: boolean;
  isDeleteMemberDialogOpen: boolean;
  isDeleteModuleDialogOpen: boolean;
  isPauseDialogOpen: boolean;
  isAddMemberDialogOpen: boolean;
  isResumeDialogOpen: boolean;
  selectedUsers: RecruiterUserType[];
  moduleName: string;
  editModule: ModuleType;
  selUser: InterviewModuleRelationType | null;
  pause_json: PauseJson | null;
  searchText: string;
};

export const initialEditModule: ModuleType = {
  id: '',
  name: '',
  relations: [],
  duration_available: { activeDuration: 0, availabletimeSlots: [] },
  created_at: '',
  recruiter_id: ''
};

export const initialStateSchedulingStore: SchedulingSlice = {
  interviewModules: [],
  isCreateDialogOpen: null,
  isDeleteMemberDialogOpen: false,
  isDeleteModuleDialogOpen: false,
  isPauseDialogOpen: false,
  isAddMemberDialogOpen: false,
  isResumeDialogOpen: false,
  selectedUsers: [],
  moduleName: '',
  editModule: initialEditModule,
  selUser: null,
  pause_json: { isManual: true, start_date: '', end_date: '' },
  searchText: ''
};

export type ModuleType = Pick<
  InterviewModuleType,
  'id' | 'name' | 'created_at' | 'recruiter_id'
> & {
  relations: InterviewModuleRelationType[];
  duration_available: TimeSlotsData;
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
