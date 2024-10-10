import SelectScheduleNode from '../ScheduleProgress/ScheduleProgressNode/SelectScheduleNode';
import { ProgressNodeType } from '../types';

export const ProgressNodeMap: Record<
  ProgressNodeType,
  (param: any) => JSX.Element
> = {
  SELECT_SCHEDULE: SelectScheduleNode,
  CAND_AVAIL_REC: () => <div>CAND_AVAIL_REC</div>,
  INTERVIEW_SCHEDULED: () => <div>INTERVIEW_SCHEDULED</div>,
};
