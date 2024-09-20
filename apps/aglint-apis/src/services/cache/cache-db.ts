import {CandidateInfoType} from '../../types/app_types/scheduleAgentTypes';
import {TwilioCallDetails} from '../../types/twilio.types';
import {Redis_KV, redisClient} from './redis-cache';

// const candidates_cache: CandidateInfoMap = new Map();

export const addCandInfoToCache = async (
  cand_phone: string,
  cand_info: CandidateInfoType
) => {
  await redisClient.hset(
    Redis_KV.CAND_INFO,
    cand_phone,
    JSON.stringify(cand_info)
  );
};

export const getCachedCandidateInfo = async (cand_phone: string) => {
  const data = await redisClient.hget(Redis_KV.CAND_INFO, cand_phone);
  if (!data) throw new Error('Error candidate cache get');
  return JSON.parse(data) as CandidateInfoType;
};

export const updateCandidateInfo = async (cand_info: CandidateInfoType) => {
  await redisClient.hset(
    Redis_KV.CAND_INFO,
    cand_info.req_payload.to_phone_no,
    JSON.stringify(cand_info)
  );
};

export const removeCandInfoCache = async (cand_phone: string) => {
  await redisClient.hdel(Redis_KV.CAND_INFO, cand_phone);
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
  if (!data) throw new Error('Error caller cache get');
  return JSON.parse(data) as TwilioCallDetails;
};

export const removeCallerInfoCache = async (call_id: string) => {
  return await redisClient.hdel(Redis_KV.CALLER_CACHE, call_id);
};
