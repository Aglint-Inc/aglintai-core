import {envConfig} from '../../../config';
import axios from 'axios';
import dayjs from 'dayjs';
import {DynamicStructuredTool} from 'langchain/tools';
import {z} from 'zod';
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

import {ConfirmApiBodyParams, FindSlots} from './types';
import {EmailAgentPayload} from '../../../types/email_agent/apiPayload.types';
import {LoggerType} from '../../../utils/scheduling_utils/getCandidateLogger';
import {convertDateFormatToDayjs} from '../../../utils/scheduling_utils/tool_utils';
import {dayjsLocal} from '../../../utils/dayjsLocal/dayjsLocal';
import {findAvailableSlots} from './utils';
import {appLogger} from '../../../services/logger';
import {agent_activities} from '../../../copies/agents_activity';

export const bookInterviewSlot = (
  cand_info: EmailAgentPayload['payload'],
  candLogger: LoggerType
) => {
  return new DynamicStructuredTool({
    name: 'book-interview-slot',
    description: 'books interview slot for the candidate',
    schema: z.object({
      booking_date: z.object({
        month: z.number().describe('month in 1 indexed integer format .'),
        day: z.number().describe('date in the month eg. 12.'),
      }),
      confirmed_slot_time: z
        .object({
          hour: z
            .number()
            .describe('confirmed slot hour (24 hour format) in the day.')
            .default(9),
          minutes: z.number().describe('Confirmed slot minutes').default(0),
        })
        .describe('Confirmed slot time'),
    }),
    func: async ({booking_date, confirmed_slot_time}) => {
      const bookSlot = async () => {
        const cand_time_zone = cand_info.candidate_time_zone;

        const slot_date = convertDateFormatToDayjs(
          `${booking_date.day}/${String(booking_date.month).padStart(2, '0')}/${dayjsLocal().get('year')}`,
          cand_time_zone
        );
        let req_slot_time = slot_date
          .set('hour', confirmed_slot_time.hour)
          .set('minutes', confirmed_slot_time.minutes);

        try {
          candLogger(
            agent_activities.email_agent.tools['book-interview-slot']
              .req_slot_on_time,
            {
              '{candidate}': '',
              '{time_format}': req_slot_time.toISOString(),
            },
            'email_agent'
          );
          const find_slot_payload: FindSlots = {
            session_ids: cand_info.interview_sessions.map(s => s.id),
            start_date: slot_date.format('DD/MM/YYYY'),
            recruiter_id: cand_info.company_id,
            user_tz: cand_info.candidate_time_zone,
          };
          const current_plan = await findAvailableSlots(find_slot_payload);
          //considering only single day plan
          const [first_day] = current_plan;

          const curr_time_slots = first_day.filter(curr_day_slot => {
            return dayjsLocal(curr_day_slot.sessions[0].start_time)
              .tz(cand_time_zone)
              .isSame(req_slot_time, 'minutes');
          });
          if (curr_time_slots.length === 0) {
            candLogger(
              agent_activities.email_agent.tools['book-interview-slot']
                .no_slots_found,
              {
                '{time_format}': slot_date.toISOString(),
              },
              'email_agent'
            );
            return "Didn't find any slot on that time";
          }

          const payload: ConfirmApiBodyParams = {
            candidate_email: cand_info.candidate_email,
            recruiter_id: cand_info.company_id,
            schedule_id: cand_info.schedule_id,
            candidate_plan: [curr_time_slots[0]],
            user_tz: cand_time_zone,
            agent_type: 'email',
            task_id: cand_info.task_id,
            candidate_id: cand_info.candidate_id,
            candidate_name: cand_info.candidate_name,
            filter_id: cand_info.filter_id,
          };

          await axios.post(
            `${envConfig.CLIENT_APP_URL}/api/scheduling/v1/confirm_interview_slot`,
            payload
          );

          return `Booking scheduled at ${req_slot_time.toISOString()}`;
        } catch (error: any) {
          appLogger.error(`Failed to schedule the interview slots `, {
            error: error.message,
            task_id: cand_info.task_id,
            cand_time_zone,
            slot_date: req_slot_time.toISOString(),
          });
          candLogger(
            agent_activities.email_agent.tools['book-interview-slot']
              .failed_to_schedule,
            {
              '{time_format}': req_slot_time.toISOString(),
              '{err_msg}': error.message,
            },
            'email_agent'
          );

          return `Booking failed`;
        }
      };
      return bookSlot();
    },
  });
};
