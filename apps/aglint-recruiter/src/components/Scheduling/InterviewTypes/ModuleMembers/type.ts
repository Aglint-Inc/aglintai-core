export type PauseType =
  | 'isManual'
  | 'twoWeek'
  | 'oneMonth'
  | 'threeMonth'
  | 'custom';

export type TabsModuleMembers = {
  name: string;
  queryParams: 'qualified_members' | 'schedules' | 'instructions' | 'training';
};
