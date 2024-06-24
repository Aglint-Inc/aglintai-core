import {Dayjs} from 'dayjs';
import {InterviewSlotsRespAPI} from './schedule_agent.types';
import {
  getCachedCandidateInfo,
  updateCandidateInfo,
} from '../../services/cache/cache-db';
import {
  CandidateInfoType,
  ScheduleTool,
} from '../../types/app_types/scheduleAgentTypes';
import {dayjsLocal} from '../dayjsLocal/dayjsLocal';

export const findCurrDayPlan = (
  all_slots: CandidateInfoType['all_slots'],
  slot_date: Dayjs,
  cand_tz: string
) => {
  const filterByDate = (curr_day: Dayjs) => {
    const curr_day_plan = all_slots
      .filter(day_slot => day_slot.length > 0)
      .find(day_slot => {
        const single_day_slots = day_slot[0];
        const first_slot = single_day_slots[0];
        const last_slot = single_day_slots[single_day_slots.length - 1];
        const first_slot_time = dayjsLocal(
          first_slot.sessions[0].start_time
        ).tz(cand_tz);
        const last_slot_time = dayjsLocal(last_slot.sessions[0].start_time).tz(
          cand_tz
        );
        return (
          first_slot_time.isSame(curr_day, 'date') ||
          last_slot_time.isSame(curr_day, 'date')
        );
      });
    return curr_day_plan;
  };
  const filterPlan = (curr_date: Dayjs) => {
    const plan = filterByDate(curr_date);
    if (!plan) return [];
    //considering only single day plan
    const [curr_day_slots] = plan;
    return curr_day_slots.filter(curr_slot => {
      const slot_time = dayjsLocal(curr_slot.sessions[0].start_time).tz(
        cand_tz
      );
      return slot_time.isSame(slot_date, 'date');
    });
  };

  const filtered_day_slots = [
    ...filterPlan(slot_date),
    ...filterPlan(slot_date.add(1, 'day')),
    ...filterPlan(slot_date.subtract(1, 'day')),
  ];

  return filtered_day_slots;
};

export const filterPlansByTiming = ({
  slots,
  time_zone,
  hours_range,
}: {
  time_zone: string;
  slots: InterviewSlotsRespAPI;
  hours_range: {start_hour: number; end_hour: number};
}) => {
  if (slots.length === 0) {
    return [];
  }
  const first_day = slots[0];
  const filtered_time_slots = first_day.filter((time_slot: any) => {
    const start_time = dayjsLocal(time_slot.sessions[0].start_time).tz(
      time_zone
    );
    const start_hour = Number(start_time.format('H'));
    return (
      start_hour >= hours_range.start_hour && start_hour <= hours_range.end_hour
    );
  });

  return filtered_time_slots;
};

export const convertDateFormatToDayjs = (
  user_date: string,
  user_tz: string,
  is_start_day = true
) => {
  const [day, month, year] = user_date.split('/');
  if (!day || !month || !year) {
    throw new Error('Date should in the format DD/MM/YYYY');
  }
  let user_dayjs = dayjsLocal.tz(`${year}-${month}-${day} 12:00`, user_tz);
  if (is_start_day) {
    user_dayjs = user_dayjs.startOf('day');
  } else {
    user_dayjs = user_dayjs.endOf('day');
  }
  return user_dayjs;
};

// agent tools
export const addToolInvocToCandCache = async (
  phone_no: string,
  tool: ScheduleTool
) => {
  const cand_info = await getCachedCandidateInfo(phone_no);
  const upd_cand_info = {...cand_info};
  upd_cand_info.tool_invocations.push(tool);
  await updateCandidateInfo(upd_cand_info);
};
export const removeToolInvocFromCandCache = async (
  phone_no: string,
  tool: ScheduleTool
) => {
  const cand_info = await getCachedCandidateInfo(phone_no);
  const upd_cand_info = {...cand_info};
  upd_cand_info.tool_invocations = upd_cand_info.tool_invocations.filter(
    t => t !== tool
  );
  await updateCandidateInfo(upd_cand_info);
};
