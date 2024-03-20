export type PopUpReasonTypes =
  | 'connect_ashby'
  | 'connect_greenhouse'
  | 'connect_lever'
  | 'disconnect_ashby'
  | 'disconnect_greenhouse'
  | 'disconnect_lever'
  | 'update_greenhouse'
  | 'update_ashby'
  | 'update_lever'
  | 'learn_how_greenhouse'
  | 'learn_how_ashby'
  | 'learn_how_lever';

export type SchedulingReasonTypes =
  | 'connect_google_workSpace'
  | 'disconnect_google_workSpace'
  | 'update_google_workspace';

export type ATSType = 'greenhouse' | 'ashby' | 'lever';
export type schedulingToolsType = 'google_workspace';
export type MessagingToolsType = 'slack' | 'teams';
