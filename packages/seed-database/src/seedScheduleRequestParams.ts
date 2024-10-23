import { dayjsLocal } from '@aglint/shared-utils';

export const seedScheduleRequestParams = {
  count_prev_month: 2,
  past_request_percentage: 1,
} as const;

export const getRequestScheduleDateRange = (
  curr_req_cnt: number,
  total_req_cnt: number
) => {
  if (
    curr_req_cnt <
    total_req_cnt * seedScheduleRequestParams.past_request_percentage
  ) {
    const randomDaysInPast = Math.floor(Math.random() * 4) + 1;
    const end_date = 7 * randomDaysInPast;
    const start_date = end_date - 7;
    return {
      start_date: dayjsLocal()
        .subtract(seedScheduleRequestParams.count_prev_month, 'month')
        .set('day', start_date)
        .startOf('day')
        .format(),
      end_date: dayjsLocal()
        .subtract(seedScheduleRequestParams.count_prev_month, 'month')
        .set('day', end_date)
        .startOf('day')
        .format(),
    };
  }
  return {
    start_date: dayjsLocal().startOf('day').format(),
    end_date: dayjsLocal().add(7, 'day').startOf('day').format(),
  };
};
