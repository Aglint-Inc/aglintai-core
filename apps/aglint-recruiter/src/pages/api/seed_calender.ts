/* eslint-disable security/detect-object-injection */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';

import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { GoogleCalender } from '@/src/services/GoogleCalender/google-calender';
import {
  MeetingLimitsConfig,
  MeetingTypeEnum,
} from '@/src/utils/seed_calender/types';
import { seedCalendersUtil } from '@/src/utils/seed_calender/util';
// Define an enumeration for meeting types

const cal_start_date = userTzDayjs('2024/06/14').startOf('day').format();
const cal_end_date = userTzDayjs('2024/08/01').startOf('day').format();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { company_id } = req.body;
    const { deleteAllMeetings, fetchDetails, fillEventsForTheDay } =
      seedCalendersUtil(cal_start_date, cal_end_date);
    const { company_cred, uniq_inters, interview_type_details } =
      await fetchDetails(company_id);

    for (let inter of uniq_inters) {
      const interviewer_info = interview_type_details.find(
        (i) => i.user_id === inter,
      )?.recruiter_user;
      if (interviewer_info.email !== 'dileep@aglinthq.com') continue;
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
      const int_schd_sett = interviewer_info.scheduling_settings;
      const google_cal = new GoogleCalender({
        recruiter: {
          user_id: interviewer_info.user_id,
          email: interviewer_info.email,
          schedule_auth: interviewer_info.schedule_auth,
        },
        company_cred: company_cred,
      });
      await google_cal.authorizeUser();

      console.log(interviewer_info.email);
      console.log('deleting started');
      await deleteAllMeetings(google_cal);
      console.log('deleting completed');

      let cal_day = userTzDayjs(cal_start_date)
        .tz(int_schd_sett.timeZone.tzCode)
        .startOf('day');
      while (cal_day.isSameOrBefore(cal_end_date, 'day')) {
        cal_day = cal_day.add(1, 'day');
        await fillEventsForTheDay(
          cal_day.format(),
          google_cal,
          int_schd_sett,
          int_meeting_cnt,
        );
        console.log(cal_day.format());
      }
      console.log(int_meeting_cnt);
    }

    return res.status(200).send('ok');
  } catch (error) {
    console.log('error', error);
    res.status(400).send(error.message);
  }
};

export default handler;
