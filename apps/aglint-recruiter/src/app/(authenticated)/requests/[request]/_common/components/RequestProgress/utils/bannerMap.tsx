import AvailabilityRecieved from '../ScheduleProgress/ScheduleProgressNode/WorkflowBanners/AvailabilityRecieved';
import AvailbilityReminder from '../ScheduleProgress/ScheduleProgressNode/WorkflowBanners/AvailbilityReminder';
import ChooseScheduleFlow from '../ScheduleProgress/ScheduleProgressNode/WorkflowBanners/ChooseScheduleFlow';
import InterviewerDecline from '../ScheduleProgress/ScheduleProgressNode/WorkflowBanners/InterviewerDecline';
import SelfSchedulReminder from '../ScheduleProgress/ScheduleProgressNode/WorkflowBanners/SelfSchedulReminder';
import SlackConfirmation from '../ScheduleProgress/ScheduleProgressNode/WorkflowBanners/SlackConfirmation';

export type WorkflowBanner =
  | 'CHOOSE_SCHEDULE_FLOW'
  | 'SELFSCHEDULE_REMINDER'
  | 'AVAILABILITY_REMINDER'
  | 'SLACK_CONFIRMATION'
  | 'AVAILABILITY_RECIEVED'
  | 'INTERVIEWER_DECLINE';

export const bannerMap: Record<WorkflowBanner, (_param: any) => JSX.Element> = {
  CHOOSE_SCHEDULE_FLOW: ChooseScheduleFlow,
  SELFSCHEDULE_REMINDER: SelfSchedulReminder,
  AVAILABILITY_REMINDER: AvailbilityReminder,
  SLACK_CONFIRMATION: SlackConfirmation,
  AVAILABILITY_RECIEVED: AvailabilityRecieved,
  INTERVIEWER_DECLINE: InterviewerDecline,
};
