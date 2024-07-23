import {
  CandidateType,
  DatabaseTable,
  DatabaseView,
  DB,
  InterviewMeetingTypeDb,
  InterviewModuleRelationType,
  InterviewModuleType,
  InterviewSessionRelationTypeDB,
  InterviewSessionTypeDB,
  JobApplcationDB,
  PauseJson,
  RecruiterUserType,
} from '@aglint/shared-types';

import { ApplicationList } from '../Candidates/utils';

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
  selectedUsers: MemberType[];
  selUser: ModuleType['relations'][0] | null;
  pause_json: PauseJson | null;
  trainingStatus: StatusTraining;
  isMovedToQualifiedDialogOpen: boolean;
  initalOpen: StatusTraining | null;
};

export type ModuleType = Omit<InterviewModuleType, 'settings'> & {
  relations: (InterviewModuleRelationType & {
    recruiter_user: DatabaseView['all_interviewers'];
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

export type StatusTraining = DB['public']['Enums']['status_training'];

export type ScheduleType = {
  applications: JobApplcationDB & {
    score_json: DatabaseTable['applications']['score_json'];
  };
  file: ApplicationList['file'];
  candidates: CandidateType;
  schedule: DatabaseTable['interview_schedule'];
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
  canceled_meeting_count: number;
};

export type MemberType = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  position: string;
  schedule_auth?: JSON | null;
  role: RecruiterUserType['role'] | null;
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
