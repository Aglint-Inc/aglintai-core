import AvailbilityReminder from '../ScheduleProgress/ScheduleProgressNode/WorkflowBanners/AvailbilityReminder';
import ChooseScheduleFlow from '../ScheduleProgress/ScheduleProgressNode/WorkflowBanners/ChooseScheduleFlow';
import SelfSchedulReminder from '../ScheduleProgress/ScheduleProgressNode/WorkflowBanners/SelfSchedulReminder';
import SlackConfirmation from '../ScheduleProgress/ScheduleProgressNode/WorkflowBanners/SlackConfirmation';

export type WorkflowBanner =
  | 'CHOOSE_SCHEDULE_FLOW'
  | 'SELFSCHEDULE_REMINDER'
  | 'AVAILABILITY_REMINDER'
  | 'SLACK_CONFIRMATION';

export const bannerMap: Record<WorkflowBanner, (_param: any) => JSX.Element> = {
  CHOOSE_SCHEDULE_FLOW: ChooseScheduleFlow,
  SELFSCHEDULE_REMINDER: SelfSchedulReminder,
  AVAILABILITY_REMINDER: AvailbilityReminder,
  SLACK_CONFIRMATION: SlackConfirmation,
};
