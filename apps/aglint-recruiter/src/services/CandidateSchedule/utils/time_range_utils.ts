import {
  type TimeDurationDayjsType,
  type TimeDurationType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { type Dayjs } from 'dayjs';

const precission = 'minutes';
/**
 * @param chunk1 time chunk
 * @param chunk2 time chunk
 * @returns is chunk1 overlapps left of chunk2
 */
export const isTimeChunksLeftOverlapped = (
  chunk1: TimeDurationDayjsType,
  chunk2: TimeDurationDayjsType,
) => {
  return (
    chunk1.startTime.isSameOrBefore(chunk2.startTime, precission) &&
    chunk1.endTime.isSameOrAfter(chunk2.startTime, precission)
  );
};

/**
 * @param chunk1 time chunk
 * @param chunk2 time chunk
 * @returns
 */
export const isTimeChunksRightOverlapped = (
  chunk1: TimeDurationDayjsType,
  chunk2: TimeDurationDayjsType,
) => {
  return (
    chunk1.startTime.isSameOrBefore(chunk2.endTime, precission) &&
    chunk1.endTime.isAfter(chunk2.endTime, precission)
  );
};

/**
 * @param chunk1 time chunk
 * @param chunk2 time chunk
 * @returns is chunk1 encloses chunk2
 */
export const isTimeChunksEnclosed = (
  chunk1: TimeDurationDayjsType,
  chunk2: TimeDurationDayjsType,
) => {
  return (
    chunk1.startTime.isSameOrBefore(chunk2.startTime, precission) &&
    chunk1.endTime.isSameOrAfter(chunk2.endTime, precission)
  );
};

/**
 * @param chunk1 time chunk
 * @param chunk2 time chunk
 * @returns is chunk1 is inside of  chunk2
 */
export const isTimeChunksUnEnclosed = (
  chunk1: TimeDurationDayjsType,
  chunk2: TimeDurationDayjsType,
) => {
  return (
    chunk1.startTime.isSameOrAfter(chunk2.startTime, precission) &&
    chunk1.endTime.isSameOrBefore(chunk2.endTime, precission)
  );
};

/**
 * @param chunk1 time chunk
 * @param chunk2 time chunk
 * @returns is chunk1 and chunk2 overlapp each other
 */
export const isTimeChunksOverLapps = (
  chunk1: TimeDurationDayjsType,
  chunk2: TimeDurationDayjsType,
) => {
  if (isTimeChunksSame(chunk1, chunk2)) {
    return true;
  }
  return !(
    chunk1.endTime.isSameOrBefore(chunk2.startTime, precission) ||
    chunk1.startTime.isSameOrAfter(chunk2.endTime, precission)
  );
};

/**
 * @param chunk1 time chunk
 * @param chunk2 time chunk
 * @returns is chunk1 and chunk 2 time are same
 */
export const isTimeChunksSame = (
  chunk1: TimeDurationDayjsType,
  chunk2: TimeDurationDayjsType,
) => {
  return (
    chunk1.startTime.isSame(chunk2.startTime, precission) &&
    chunk1.endTime.isSame(chunk2.endTime, precission)
  );
};

export const dayjsMax = (day1: Dayjs, day2: Dayjs) => {
  if (day1.isAfter(day2, precission)) {
    return day1;
  }
  return day2;
};

export const dayjsMin = (day1: Dayjs, day2: Dayjs) => {
  if (day1.isBefore(day2, precission)) {
    return day1;
  }
  return day2;
};

export const convertTimeDurStrToDayjsChunk = (
  chunk_str: TimeDurationType,
  tz?: string,
) => {
  let chunk: TimeDurationDayjsType;
  if (tz) {
    chunk = {
      startTime: dayjsLocal(chunk_str.startTime).tz(tz),
      endTime: dayjsLocal(chunk_str.endTime).tz(tz),
    };
  } else {
    chunk = {
      startTime: dayjsLocal(chunk_str.startTime),
      endTime: dayjsLocal(chunk_str.endTime),
    };
  }

  return chunk;
};

export const compareTimes = (
  isoString1: string,
  isoString2: string,
  tz: string,
) => {
  const time1 = dayjsLocal(isoString1).tz(tz);
  const time2 = dayjsLocal(isoString2).tz(tz);
  const hours1 = time1.hour();
  const minutes1 = time1.minute();

  const hours2 = time2.hour();
  const minutes2 = time2.minute();

  if (hours1 === hours2 && minutes1 === minutes2) {
    return 0; // Times are equal
  } else if (hours1 > hours2 || (hours1 === hours2 && minutes1 > minutes2)) {
    return 1; // First time is later
  } else {
    return -1; // Second time is later
  }
};
