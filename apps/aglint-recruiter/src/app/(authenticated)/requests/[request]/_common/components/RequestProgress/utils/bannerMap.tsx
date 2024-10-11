import AvailbilityReminder from '../ScheduleProgress/ScheduleProgressNode/WorkflowBanners/AvailbilityReminder';
import ChooseScheduleFlow from '../ScheduleProgress/ScheduleProgressNode/WorkflowBanners/ChooseScheduleFlow';
import SelfSchedulReminder from '../ScheduleProgress/ScheduleProgressNode/WorkflowBanners/SelfSchedulReminder';

export type WorkflowBanner =
  | 'CHOOSE_SCHEDULE_FLOW'
  | 'SELFSCHEDULE_REMINDER'
  | 'AVAILABILITY_REMINDER';

export const bannerMap: Record<WorkflowBanner, (_param: any) => JSX.Element> = {
  CHOOSE_SCHEDULE_FLOW: ChooseScheduleFlow,
  SELFSCHEDULE_REMINDER: SelfSchedulReminder,
  AVAILABILITY_REMINDER: AvailbilityReminder,
};
