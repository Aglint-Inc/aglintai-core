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
}
