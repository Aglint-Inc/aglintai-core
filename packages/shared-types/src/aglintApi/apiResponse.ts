import {
  ConflictReason,
  SessionInterviewerApiRespType,
} from '../scheduleTypes';

export type APIRespFindReplaceMentInts = {
  replacement_int: SessionInterviewerApiRespType;
  conflicts: ConflictReason[];
}[];
