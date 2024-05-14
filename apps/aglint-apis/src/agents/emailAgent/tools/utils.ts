import {envConfig} from '../../../config';
import axios from 'axios';
import {FindSlots, InterviewSlotsRespAPI} from './types';
import dayjs, {Dayjs} from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {SessionsCombType} from '../../../types/aglint_types/scheduleTypes/types';
dayjs.extend(utc);
dayjs.extend(timezone);

export const findAvailableSlots = async (payload: FindSlots) => {
  const {data} = await axios.post(
    `${envConfig.CLIENT_APP_URL}/api/scheduling/v1/find_interview_slots`,
    payload
  );

  return data as SessionsCombType[][];
};

export const convertAgentResponseToEmailTemplate = (agent_resp: string) => {
  let msg = agent_resp.split('\n').filter(s => s.length > 0);
  let msg_str = msg
    .map(s => {
      let line = ``;
      // start _msg
      // best regards
      // name
      // if (idx === 1 || idx == msg.length - 1 || idx == msg.length - 2) {
      //   line = `<b>${s}</b>`;
      // } else {
      //
      // }
      line = `<p>${s}</p>`;
      return line;
    })
    .join('');
  return msg_str;
};

export const filterPlansByTiming = ({
  slots,
  time_zone,
  timing,
}: {
  time_zone: string;
  slots: InterviewSlotsRespAPI;
  timing: 'morning' | 'afternoon' | 'evening';
}) => {
  if (slots.length === 0) {
    return [];
  }
  const first_day = slots[0];
  const filtered_time_slots = first_day.filter((time_slot: any) => {
    let start_time = dayjs(time_slot.sessions[0].start_time).tz(time_zone);
    const start_hour = Number(start_time.format('H'));
    if (timing === 'morning' && start_hour >= 8 && start_hour < 12) {
      return true;
    } else if (timing === 'afternoon' && start_hour >= 12 && start_hour < 18) {
      return true;
    } else if (timing === 'evening' && start_hour >= 18 && start_hour < 24) {
      return true;
    }
    return false;
  });

  return filtered_time_slots;
};

export const updateTimeZoneIfNeeded = ({}) => {
  //
};
