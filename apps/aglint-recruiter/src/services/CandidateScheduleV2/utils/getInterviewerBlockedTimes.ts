import {
  type APIOptions,
  type MinCalEventDetailTypes,
  type schedulingSettingType,
  type TimeDurationDayjsType,
} from '@aglint/shared-types';

import { isTimeChunksEnclosed } from './time_range_utils';
import { userTzDayjs } from './userTzDayjs';

/**
 * @param comp_shedule_settings company schedule setting
 * @param int_events an interviewer events of particulr day
 * @param cand_tz candidate time zone
 * @returns return blocked time chunk in his canlender, each blocked time may overlapp
 */
export const getInterviewerBlockedTimes = (
  comp_shedule_settings: schedulingSettingType,
  int_events: MinCalEventDetailTypes[],
  cand_tz: string,
  api_options: APIOptions,
): TimeDurationDayjsType[] => {
  let free_time_keyWords: string[] = [];
  if (api_options.include_free_time) {
    free_time_keyWords = [
      ...free_time_keyWords,
      ...comp_shedule_settings.schedulingKeyWords.free,
    ];
  }
  if (api_options.use_recruiting_blocks) {
    free_time_keyWords = [
      ...free_time_keyWords,
      ...comp_shedule_settings.schedulingKeyWords.recruitingBlocks,
    ];
  }
  free_time_keyWords = free_time_keyWords.map((key_word: string) =>
    key_word.toLowerCase(),
  );

  const isEventFreeTime = (cal_event: MinCalEventDetailTypes) => {
    let is_event_free_time = false;
    free_time_keyWords.forEach((key_word: string) => {
      if (
        cal_event.summary &&
        cal_event.summary.toLocaleLowerCase().includes(key_word)
      ) {
        is_event_free_time = true;
      }
    });
    return is_event_free_time;
  };
  const free_time_events: MinCalEventDetailTypes[] = [];
  const busy_time_events: MinCalEventDetailTypes[] = [];

  int_events.forEach((cal_event) => {
    if (isEventFreeTime(cal_event)) {
      free_time_events.push(cal_event);
    } else {
      busy_time_events.push(cal_event);
    }
  });

  //filter any events that are inside of free events
  const blocked_times: TimeDurationDayjsType[] = busy_time_events
    .map((e) => ({
      startTime: userTzDayjs(e.start.dateTime).tz(cand_tz),
      endTime: userTzDayjs(e.end.dateTime).tz(cand_tz),
    }))
    .filter(
      (block) =>
        !free_time_events.some((free_block) => {
          return isTimeChunksEnclosed(
            {
              startTime: userTzDayjs(free_block.start.dateTime).tz(cand_tz),
              endTime: userTzDayjs(free_block.end.dateTime).tz(cand_tz),
            },
            block,
          );
        }),
    );

  return blocked_times;
};
