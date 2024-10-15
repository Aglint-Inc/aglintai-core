import { type ProgressNodeType } from '../types';
export const progressNodeCopy: Record<ProgressNodeType, string> = {
  SELECT_SCHEDULE: 'When scheduling request received',
  CAND_AVAIL_REC: 'When candidate submits availability',
  INTERVIEW_SCHEDULED: 'When interview is scheduled',
  INTERVIEWER_DECLINE: 'When Interviewer Declines',
};
