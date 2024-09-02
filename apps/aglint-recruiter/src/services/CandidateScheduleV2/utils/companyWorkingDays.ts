import { type holidayType, type schedulingSettingType } from '@aglint/shared-types';
import { ScheduleUtils } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

// return working day count between two dates
export const getCompanyDaysCnt = (
  comp_schedule_setting: schedulingSettingType,
  start_date_str: string, //DD/MM/YYYY
  end_date_str: string, //DD/MM/YYYY,
  count_holiday = false,
  count_day_off = false,
) => {
  const end_date = ScheduleUtils.convertDateFormatToDayjs(
    end_date_str,
    comp_schedule_setting.timeZone.tzCode,
    false,
  );
  let curr_date = ScheduleUtils.convertDateFormatToDayjs(
    start_date_str,
    comp_schedule_setting.timeZone.tzCode,
    true,
  );
  const acual_curr_date = dayjsLocal()
    .tz(comp_schedule_setting.timeZone.tzCode)
    .startOf('day');
  if (acual_curr_date.isSame(curr_date, 'date')) {
    curr_date = curr_date.add(1, 'day');
  }

  let cnt_working_day = 0;

  while (curr_date.isSameOrBefore(end_date)) {
    let add_curr_day = false;
    const is_holiday = comp_schedule_setting.totalDaysOff.find(
      (holiday: holidayType) =>
        curr_date.isSame(
          dayjsLocal(holiday.date, 'DD MMM YYYY').tz(
            comp_schedule_setting.timeZone.tzCode,
          ),
          'date',
        ),
    );

    const workDay = comp_schedule_setting.workingHours.find(
      (day) => curr_date.format('dddd').toLowerCase() === day.day,
    );
    if (
      (workDay.isWorkDay && !is_holiday) ||
      (!workDay.isWorkDay && count_day_off) ||
      (is_holiday && count_holiday)
    ) {
      add_curr_day = true;
    }
    if (add_curr_day) {
      cnt_working_day += 1;
    }
    curr_date = curr_date.add(1, 'day');
  }

  return cnt_working_day;
};
