/* eslint-disable security/detect-object-injection */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { dayjsLocal } from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { GoogleCalender } from '@/services/GoogleCalender/google-calender';
import {
  type MeetingLimitsConfig,
  MeetingTypeEnum,
} from '@/utils/seed_calender/types';
import { seedCalendersUtil } from '@/utils/seed_calender/util';
// Define an enumeration for meeting types

const cal_start_date = dayjsLocal('2024/10/01').startOf('day').format();
const cal_end_date = dayjsLocal('2024/11/30').startOf('day').format();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { company_id } = req.body;
    const { deleteAllMeetings, fetchDetails, fillEventsForTheDay } =
      seedCalendersUtil(cal_start_date, cal_end_date);
    const {
      company_cred_hash_str,
      uniq_inters,
      interview_type_details,
      companyScheduleSettings,
    } = await fetchDetails(company_id);

    console.log('uniq_inters', uniq_inters.length);
    for (const inter of uniq_inters) {
      const interviewer_info = interview_type_details.find(
        (i) => i.user_id === inter,
      )?.recruiter_user;
      if (!interviewer_info) continue;
      if (
        interviewer_info.email !== 'dileep@aglinthq.com' &&
        interviewer_info.email !== 'chandra@aglinthq.com'
      )
        continue;
      const int_meeting_cnt: MeetingLimitsConfig = {
        [MeetingTypeEnum.OtherMeetings]: {
          occ_cnt: 0,
        },
        [MeetingTypeEnum.Interview]: {
          occ_cnt: 0,
        },
        [MeetingTypeEnum.OOO]: {
          occ_cnt: 0,
        },
        [MeetingTypeEnum.FreeTime]: {
          occ_cnt: 0,
        },
        [MeetingTypeEnum.SoftConflicts]: {
          occ_cnt: 0,
        },
        [MeetingTypeEnum.RecruiterBlock]: {
          occ_cnt: 0,
        },
        [MeetingTypeEnum.NOMeeting]: {
          occ_cnt: 0,
        },
      };
      const recruiter_auth = {
        user_id: interviewer_info.user_id,
        email: interviewer_info.email,
        schedule_auth: interviewer_info.schedule_auth,
      };
      const int_schd_sett = interviewer_info.scheduling_settings;
      const google_cal = new GoogleCalender(
        company_cred_hash_str,
        recruiter_auth,
      );
      await google_cal.authorizeUser();

      console.log(interviewer_info.email);
      console.log('deleting started');
      await deleteAllMeetings(google_cal);
      console.log('deleting completed');

      let cal_day = dayjsLocal(cal_start_date)
        .tz(int_schd_sett.timeZone.tzCode)
        .startOf('day');
      while (cal_day.isSameOrBefore(cal_end_date, 'day')) {
        cal_day = cal_day.add(1, 'day');
        await fillEventsForTheDay(
          cal_day.format(),
          google_cal,
          int_schd_sett,
          int_meeting_cnt,
          companyScheduleSettings,
        );
        console.log(cal_day.format());
      }
      console.log(int_meeting_cnt);
    }

    return res.status(200).send('ok');
  } catch (error: any) {
    console.log('error', error);
    res.status(400).send(error.message);
  }
};

export default handler;
