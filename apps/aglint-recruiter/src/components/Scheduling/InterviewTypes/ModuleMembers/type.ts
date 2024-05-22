export type PauseType =
  | 'isManual'
  | 'twoWeek'
  | 'oneMonth'
  | 'threeMonth'
  | 'custom';

export type TabsModuleMembers = {
  name: string;
  queryParams: 'members' | 'schedules' | 'instructions' | 'training';
};
