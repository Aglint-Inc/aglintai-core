import { ScoreJson } from '@/src/context/JobApplicationsContext/types';
import {
  CandidateType,
  InterviewMeetingTypeDb,
  InterviewModuleRelationType,
  InterviewModuleType,
  InterviewScheduleTypeDB,
  InterviewSessionRelationTypeDB,
  InterviewSessionTypeDB,
  JobApplcationDB,
  RecruiterUserType,
} from '@/src/types/data.types';
import { schedulingSettingType } from '@/src/types/scheduleTypes/scheduleSetting';
import { PauseJson } from '@/src/types/scheduleTypes/types';
import { Database } from '@/src/types/schema';

import { ApplicationList } from '../AllSchedules/store';

export type SchedulingSlice = {
  isCreateDialogOpen: boolean;
  isDeleteMemberDialogOpen: boolean;
  isDeleteModuleDialogOpen: boolean;
  isPauseDialogOpen: boolean;
  isAddMemberDialogOpen: boolean;
  isResumeDialogOpen: boolean;
  isModuleSettingsDialogOpen: boolean;
  isArchiveDialogOpen: boolean;
  isProgressDialaogOpen: boolean;
  selectedUsers: MemberType[];
  selUser: InterviewModuleRelationType | null;
  pause_json: PauseJson | null;
  trainingStatus: StatusTraining;
  isMovedToQualifiedDialogOpen: boolean;
};

export type ModuleType = Omit<InterviewModuleType, 'settings'> & {
  relations: (InterviewModuleRelationType & {
    recruiter_user: {
      user_id: string;
      first_name: string;
      last_name: string;
      email: string;
      profile_image: string;
      scheduling_settings: schedulingSettingType;
    };
  })[];
  settings: {
    require_training: boolean;
    noShadow: number;
    noReverseShadow: number;
    reqruire_approval: boolean;
    approve_users: string[];
  };
};

export interface TimeSlotsData {
  activeDuration: number;
  availabletimeSlots: number[];
}

export type StatusTraining = Database['public']['Enums']['status_training'];

export type ScheduleType = {
  applications: JobApplcationDB & {
    score_json: ScoreJson;
  };
  file: ApplicationList['file'];
  candidates: CandidateType;
  schedule: InterviewScheduleTypeDB;
  job: {
    id: string;
    created_at: string;
    job_title: string;
    description: string;
    parameter_weights: {
      education: number;
      experience: number;
      skills: number;
    };
    recruiter_id: string;
    jd_json: JSON;
    location: string;
  };
};
export type ModuleDashboard = {
  interview_modules: InterviewModuleType;
  users: MemberType[];
  upcoming_meeting_count: number;
  completed_meeting_count: number;
};

export type MemberType = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  position: string;
  schedule_auth: JSON | null;
  role: RecruiterUserType['role'];
};

export type TransformSchedule = ScheduleType & {
  interview_meeting: InterviewMeetingTypeDb;
  interview_session: InterviewSessionTypeDB;
  interview_module: InterviewModuleType;
  users: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
    position: string;
    interviewer_type: InterviewSessionRelationTypeDB['interviewer_type'];
    training_type: InterviewSessionRelationTypeDB['training_type'];
  }[];
  coordinator: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
    position: string;
  };
};
