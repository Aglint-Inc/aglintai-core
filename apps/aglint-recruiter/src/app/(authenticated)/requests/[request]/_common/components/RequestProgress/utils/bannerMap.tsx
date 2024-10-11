import ChooseScheduleFlow from '../ScheduleProgress/ScheduleProgressNode/WorkflowBanners/ChooseScheduleFlow';

export type WorkflowBanner =
  | 'CHOOSE_SCHEDULE_FLOW'
  | 'SELFSCHEDULE_REMINDER'
  | 'AVAILABILITYREMINDER';

export const bannerMap: Record<WorkflowBanner, (param: any) => JSX.Element> = {
  CHOOSE_SCHEDULE_FLOW: ChooseScheduleFlow,
};
