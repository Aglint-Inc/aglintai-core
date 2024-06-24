import axios from 'axios';
import {z} from 'zod';
import {dayjsLocal} from '../../../utils/dayjsLocal/dayjsLocal';
import {LoggerType} from '../../../utils/scheduling_utils/getCandidateLogger';
import {
  convertDateFormatToDayjs,
  findCurrDayPlan,
} from '../../../utils/scheduling_utils/tool_utils';
import {createOpenAiTool} from './utils';

import {envConfig} from '../../../config';
import {fromError} from 'zod-validation-error';
import {
  getCachedCandidateInfo,
  updateCandidateInfo,
} from '../../../services/cache/cache-db';
import {agent_activities} from '../../../copies/agents_activity';
import {APICandidateConfirmSlotNoConflict} from '@aglint/shared-types';

export const scheduleInterviewSlot = () => {
  const schema = z.object({
    booking_date: z.object({
      month: z.number().describe('month in 1 indexed integer format .'),
      day: z.number().describe('date in the month eg. 12.'),
    }),
    confirmed_slot_time: z
      .object({
        hour: z
          .number()
          .describe('confirmed slot hour (24 hour format) in the day.'),
        minutes: z.number().describe('Confirmed slot minutes'),
      })
      .describe('Confirmed slot time'),
  });

  const tool_def = createOpenAiTool({
    name: 'schedule-interterview',
    description: 'schedules interview/s on a particular date and time.',
    schema: schema,
  });

  const func = async (
    args: z.infer<typeof schema>,
    cand_phone: string,
    candLogger: LoggerType
  ) => {
    const cand_info = await getCachedCandidateInfo(cand_phone);

    if (cand_info.schedule_status === 'confirmed') {
      return `interview already scheduled at ${cand_info.cand_selected_slot}`;
    }

    let parsedData = null;
    try {
      parsedData = schema.parse(args);
    } catch (error) {
      return fromError(error).toString();
    }

    const {booking_date, confirmed_slot_time} = parsedData;

    const bookSlot = async () => {
      const cand_time_zone = cand_info.candidate_tz.tz_code;

      const slot_date = convertDateFormatToDayjs(
        `${booking_date.day}/${String(booking_date.month).padStart(2, '0')}/${dayjsLocal().get('year')}`,
        cand_time_zone
      );

      const req_slot_time = slot_date
        .set('hour', confirmed_slot_time.hour)
        .set('minutes', confirmed_slot_time.minutes);

      try {
        candLogger(
          agent_activities.phone_agent.tools['schedule-interview-slot']
            .req_slot_on_time,
          {
            '{candidate}': '',
            '{time_format}': req_slot_time.toISOString(),
          }
        );

        cand_info.candidate_tz.tz_code;
        const req_day_slots = findCurrDayPlan(
          cand_info.all_slots,
          slot_date,
          cand_info.candidate_tz.tz_code
        );

        if (req_day_slots.length === 0) {
          await candLogger(
            agent_activities.phone_agent.tools['schedule-interview-slot']
              .no_slots_found,
            {
              '{date_format}': req_slot_time.toISOString(),
            }
          );
          return 'All Slots booked on that day.';
        }
        const curr_time_slots = req_day_slots.filter(curr_day_slot => {
          return dayjsLocal(curr_day_slot.sessions[0].start_time)
            .tz(cand_time_zone)
            .isSame(req_slot_time, 'minutes');
        });
        if (curr_time_slots.length === 0) {
          await candLogger(
            agent_activities.phone_agent.tools['schedule-interview-slot']
              .no_slots_found,
            {
              '{time_format}': req_slot_time.toISOString(),
            }
          );
          return "Didn't find any slot on that time";
        }

        const payload: APICandidateConfirmSlotNoConflict = {
          cand_tz: cand_info.candidate_tz.tz_code,
          selected_slot: {
            slot_start_time: req_slot_time.format(),
          },
          filter_id: cand_info.req_payload.filter_json_id,
          agent_type: 'phone_agent',
          task_id: cand_info.req_payload.task_id,
        };

        await axios.post(
          `${envConfig.CLIENT_APP_URL}/api/scheduling/v1/booking/confirm-slot-no-conflicts`,
          payload
        );
        cand_info.cand_selected_slot = req_slot_time.format();
        updateCandidateInfo(cand_info);
        return `Booking scheduled at ${req_slot_time.toISOString()}`;
      } catch (error: any) {
        await candLogger(
          agent_activities.phone_agent.tools['schedule-interview-slot']
            .failed_to_schedule,
          {
            '{time_format}': '',
            '{err_msg}': error.message,
          }
        );

        return 'Booking failed';
      }
    };

    const resp = await bookSlot();
    return resp;
  };

  return {
    tool_def,
    func,
    schema,
  };
};
