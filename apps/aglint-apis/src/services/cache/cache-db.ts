import {CandidateInfoType} from '../../types/app_types/scheduleAgentTypes';
import {TwilioCallDetails} from '../../types/twilio.types';
import {Redis_KV, redisClient} from './redis-cache';

type CandidateInfoMap = Map<string, CandidateInfoType>;

const candidates_cache: CandidateInfoMap = new Map();
// const caller_cache: Map<string, TwilioCallDetails> = new Map();

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

export const addCallerToCache = async (
  call_id: string,
  call_info: TwilioCallDetails
) => {
  await redisClient.hset(
    Redis_KV.CALLER_CACHE,
    call_id,
    JSON.stringify(call_info)
  );
};
export const getCallerFromCache = async (call_id: string) => {
  const data = await redisClient.hget(Redis_KV.CALLER_CACHE, call_id);
  if (!data) return null;
  return JSON.parse(data) as TwilioCallDetails;
};

export const removeCallerInfoCache = async (call_id: string) => {
  return await redisClient.hdel(Redis_KV.CALLER_CACHE, call_id);
};
