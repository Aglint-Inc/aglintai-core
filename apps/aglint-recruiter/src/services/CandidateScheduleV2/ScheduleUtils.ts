import { userTzDayjs } from './utils/userTzDayjs';

export class ScheduleUtils {
  static convertDateFormatToDayjs = (
    user_date,
    user_tz: string,
    is_start_day = true,
  ) => {
    const [day, month, year] = user_date.split('/');
    if (!day || !month || !year) {
      throw new Error(`Date should in the format DD/MM/YYYY`);
    }
    let user_dayjs = userTzDayjs.tz(`${year}-${month}-${day} 12:00`, user_tz);
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
    timeZone: string,
  ) => {
    const [hours, minutes] = time.split(':');
    let userTime = userTzDayjs(current_day).tz(timeZone);
    userTime = userTime.set('hour', Number(hours));
    userTime = userTime.set('minutes', Number(minutes));

    return userTime;
  };
  static getNearestCurrTime = (tz: string) => {
    let curr_world_time = userTzDayjs().tz(tz);
    curr_world_time = curr_world_time
      .add(2, 'hour')
      .set('minutes', 0)
      .set('seconds', 0);
    return curr_world_time;
  };
}
