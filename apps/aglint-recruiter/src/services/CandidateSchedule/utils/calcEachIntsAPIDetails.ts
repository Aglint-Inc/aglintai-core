import { type APIOptions, type InterDetailsType } from '@aglint/shared-types';

import { type ScheduleApiDetails } from '../types';
import { findInterviewerWorkHrFreeTime } from './findWorkTimeForTheDay';

// private util functions
/**
 * @param ints_details
 * @param start_date
 * @param end_date
 * @param current_int_slot
 * @returns returns array of free time chunks for each interviewer for every given date bw the daterange
 */
//
export const calcEachIntsAPIDetails = (
  ints_details: InterDetailsType[],
  api_options: APIOptions,
  api_details: ScheduleApiDetails,
) => {
  const updated_intervs_details = ints_details.map((interv) => {
    let upd_interv: InterDetailsType = { ...interv };
    upd_interv = findInterviewerWorkHrFreeTime(
      upd_interv,
      api_details,
      api_options,
    );
    upd_interv = { ...upd_interv };
    return upd_interv;
  });

  return updated_intervs_details;
};
