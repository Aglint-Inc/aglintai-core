import {CandidateInfoType} from '../../types/app_types/scheduleAgentTypes';
import {TwilioCallDetails} from '../../types/twilio.types';

type CandidateInfoMap = Map<string, CandidateInfoType>;

const candidates_cache: CandidateInfoMap = new Map();
const caller_cache: Map<string, TwilioCallDetails> = new Map();

export const addCandInfoToCache = (
  cand_phone: string,
  cand_info: CandidateInfoType
) => {
  candidates_cache.set(cand_phone, cand_info);
};

export const getCachedCandidateInfo = (cand_phone: string) => {
  const cand_info = candidates_cache.get(cand_phone);
  return cand_info;
};

export const updateCandidateInfo = (cand_info: CandidateInfoType) => {
  candidates_cache.set(cand_info.req_payload.to_phone_no, cand_info);
};

export const removeCandInfoCache = (cand_phone: string) => {
  return candidates_cache.delete(cand_phone);
};

export const addCallerToCache = (
  call_id: string,
  call_info: TwilioCallDetails
) => {
  caller_cache.set(call_id, call_info);
};

export const getCallerFromCache = (call_id: string) => {
  return caller_cache.get(call_id);
};

export const removeCallerInfoCache = (call_id: string) => {
  return caller_cache.delete(call_id);
};
