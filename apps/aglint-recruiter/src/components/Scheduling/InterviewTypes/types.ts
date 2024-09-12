import {
  type DatabaseView,
  type DB,
  type InterviewModuleRelationType,
  type InterviewModuleType,
  type PauseJson,
} from '@aglint/shared-types';

import { type fetchInterviewModuleByIdApi } from '@/pages/api/scheduling/fetch_interview_module_by_id';
import { type CompanyMembersAPI } from '@/pages/api/scheduling/fetchUserDetails';

import { type MemberTypeAutoComplete } from '../Common/MembersTextField';
import { type fetchInterviewModules } from './queries/utils';

export type SchedulingSlice = {
  isCreateDialogOpen: boolean;
  isSettingDialogOpen: boolean;
  isDeleteMemberDialogOpen: boolean;
  isDeleteModuleDialogOpen: boolean;
  isPauseDialogOpen: boolean;
  isAddMemberDialogOpen: boolean;
  isResumeDialogOpen: boolean;
  isModuleSettingsDialogOpen: boolean;
  isArchiveDialogOpen: boolean;
  isProgressDialaogOpen: boolean;
  selectedUsers: MemberTypeAutoComplete[];
  selUser:
    | ReturnType<typeof fetchInterviewModuleByIdApi>[0]['relations'][0]
    | null;
  pause_json: PauseJson | null;
  trainingStatus: StatusTraining;
  isMovedToQualifiedDialogOpen: boolean;
  initalOpen: StatusTraining | null;
};

export interface TimeSlotsData {
  activeDuration: number;
  availabletimeSlots: number[];
}

export type StatusTraining = DB['public']['Enums']['status_training'];

export type ModuleDashboard = Awaited<ReturnType<typeof fetchInterviewModules>>;

export type MemberType = CompanyMembersAPI[number];
