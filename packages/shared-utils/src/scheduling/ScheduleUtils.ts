import {
  InterviewSessionTypeDB,
  TimeDurationDayjsType,
  TimeDurationType,
} from '@aglint/shared-types';
import { dayjsLocal } from './dayjsLocal';

export class ScheduleUtils {
  static convertDateFormatToDayjs = (
    user_date: string,
    user_tz: string,
    is_start_day = true
  ) => {
    const [day, month, year] = user_date.split('/');
    if (!day || !month || !year) {
      throw new Error(`Date should in the format DD/MM/YYYY`);
    }
    let user_dayjs = dayjsLocal.tz(`${year}-${month}-${day} 12:00`, user_tz);
    if (is_start_day) {
      user_dayjs = user_dayjs.startOf('day');
    } else {
      user_dayjs = user_dayjs.endOf('day');
    }
    return user_dayjs;
  };
  static setTimeInDay = (
    current_day: string,
    time: string, // scheduling settign time eg .. '09:00'
    timeZone: string
  ) => {
    const [hours, minutes] = time.split(':');
    let userTime = dayjsLocal(current_day).tz(timeZone);
    userTime = userTime.set('hour', Number(hours));
    userTime = userTime.set('minutes', Number(minutes));

    return userTime;
  };
  static getNearestCurrTime = (tz: string) => {
    let curr_world_time = dayjsLocal().tz(tz);
    curr_world_time = curr_world_time
      .add(2, 'hour')
      .set('minutes', 0)
      .set('seconds', 0);
    return curr_world_time;
  };
  static convertTimedurationJsToStr = (
    t: TimeDurationDayjsType
  ): TimeDurationType => {
    return {
      startTime: t.startTime.format(),
      endTime: t.endTime.format(),
    };
  };
  static getSessionRounds(
    db_int_sessions: Pick<
      InterviewSessionTypeDB,
      'session_order' | 'break_duration'
    >[]
  ) {
    let sorted_sessions = db_int_sessions.sort(
      (s1, s2) => s1.session_order - s2.session_order
    );
    let session_rounds: Pick<
      InterviewSessionTypeDB,
      'session_order' | 'break_duration'
    >[][] = [[]];
    let curr_round = 0;
    for (let sess of sorted_sessions) {
      // eslint-disable-next-line security/detect-object-injection
      session_rounds[curr_round].push({ ...sess });
      if (sess.break_duration >= 1440) {
        session_rounds.push([]);
        curr_round++;
      }
    }

    session_rounds = session_rounds.filter((s) => s.length > 0);
    return session_rounds;
  }
}
