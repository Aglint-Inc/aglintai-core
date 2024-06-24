import {envConfig} from '../../../config';
import axios from 'axios';
import dayjs from 'dayjs';
import {DynamicStructuredTool} from 'langchain/tools';
import {z} from 'zod';
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

import {EmailAgentPayload} from '../../../types/email_agent/apiPayload.types';
import {LoggerType} from '../../../utils/scheduling_utils/getCandidateLogger';
import {convertDateFormatToDayjs} from '../../../utils/scheduling_utils/tool_utils';
import {dayjsLocal} from '../../../utils/dayjsLocal/dayjsLocal';
import {appLogger} from '../../../services/logger';
import {agent_activities} from '../../../copies/agents_activity';
import {APICandidateConfirmSlotNoConflict} from '@aglint/shared-types';

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
      time_zone: z
        .string()
        .describe(
          'candidate specified location timezone or organizer timezone'
        ),
    }),
    func: async ({booking_date, confirmed_slot_time, time_zone}) => {
      const bookSlot = async () => {
        if (!time_zone) return 'time_zone field required';
        const slot_date = convertDateFormatToDayjs(
          `${booking_date.day}/${String(booking_date.month).padStart(2, '0')}/${dayjsLocal().get('year')}`,
          time_zone
        );
        const req_slot_time = slot_date
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

          const payload: APICandidateConfirmSlotNoConflict = {
            cand_tz: time_zone,
            filter_id: cand_info.filter_id,
            task_id: cand_info.task_id,
            agent_type: 'email_agent',
            selected_slot: {
              slot_start_time: req_slot_time.format(),
            },
          };

          await axios.post(
            `${envConfig.CLIENT_APP_URL}/api/scheduling/v1/booking/confirm-slot-no-conflicts`,
            payload
          );

          return `Booking scheduled at ${req_slot_time.toISOString()}`;
        } catch (error: any) {
          appLogger.error('Failed to schedule the interview slots ', {
            error: error.message,
            task_id: cand_info.task_id,
            time_zone,
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
          return 'Booking failed';
        }
      };
      return bookSlot();
    },
  });
};
