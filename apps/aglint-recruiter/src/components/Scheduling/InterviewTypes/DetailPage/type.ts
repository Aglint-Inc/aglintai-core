export type PauseType =
  | 'isManual'
  | 'twoWeek'
  | 'oneMonth'
  | 'threeMonth'
  | 'custom';

export type TabsModuleMembers = {
  name: string;
  queryParams: 'qualified' | 'schedules' | 'instructions' | 'training' |'aglintaitoken' | 'aglintaiinstruction';
};

export type ConnectedJob = {
  job_title: string;
  department: string;
  location: string;
  status: 'closed' | 'draft' | 'published';
  id: string;
};
