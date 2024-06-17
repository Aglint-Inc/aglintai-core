import {DynamicStructuredTool} from 'langchain/tools';
import {z} from 'zod';

import {EmailAgentPayload} from '../../../types/email_agent/apiPayload.types';
import {LoggerType} from '../../../utils/scheduling_utils/getCandidateLogger';
import {convertDateFormatToDayjs} from '../../../utils/scheduling_utils/tool_utils';
import {dayjsLocal} from '../../../utils/dayjsLocal/dayjsLocal';
import {isCurrDayHoliday} from '../../../utils/scheduling_utils/fetchCandDetails';
import {findAvailableSlots} from './utils';
import {findInterviewSlotOnThatDay} from '../../schedule_agent/tools/utils';
import {googleTimeZone} from '../../../utils/googleTimeZone';
import {appLogger} from '../../../services/logger';
import {agent_activities} from '../../../copies/agents_activity';
import {APIFindInterviewSlot} from '@aglint/shared-types';

export const findSlots = (
  cand_info: EmailAgentPayload['payload'],
  candLogger: LoggerType
) => {
  return new DynamicStructuredTool({
    name: 'find-interview-slots',
    description: 'finds available interview slots on a particular day.',
    schema: z.object({
      date: z.object({
        month: z.number().describe('month in 1 indexed integer format.'),
        day: z.number().describe('date in a month eg. 12.'),
      }),
      time_zone: z
        .string()
        .describe(
          'candidate specified location timezone or organizer timezone'
        ),
    }),
    func: async ({date, time_zone}) => {
      if (!date) {
        return 'date field required';
      }
      if (!time_zone) {
        return 'time zone field required';
      }
      if (!googleTimeZone[time_zone]) {
        return `invalid time zone format ${time_zone}`;
      }

      const slot_date = convertDateFormatToDayjs(
        `${String(date.day)}/${String(date.month).padStart(2, '0')}/${dayjsLocal().get('year')}`,
        time_zone
      );
      candLogger(
        agent_activities.email_agent.tools['find-interview-slots']
          .req_slot_on_date,
        {
          '{date_format}': slot_date.toISOString(),
          '{candidate}': '',
        }
      );
      if (isCurrDayHoliday(cand_info.comp_scheduling_setting, slot_date)) {
        return 'this day is holiday';
      }
      try {
        const find_slot_payload: APIFindInterviewSlot = {
          session_ids: cand_info.interview_sessions.map(s => s.id),
          schedule_date: slot_date.format('DD/MM/YYYY'),
          recruiter_id: cand_info.company_id,
          candidate_tz: time_zone,
        };

        const current_plan = await findAvailableSlots(find_slot_payload);
        if (current_plan.length === 0) {
          return 'All Slots booked on that day try try diffrent day';
        }

        const [first_day] = current_plan;

        return findInterviewSlotOnThatDay(first_day, time_zone);
      } catch (error: any) {
        appLogger.error('Failed to find the interview slots ', {
          error: error.message,
          task_id: cand_info.task_id,
          time_zone,
          slot_date: slot_date.toISOString(),
        });
        candLogger(
          agent_activities.email_agent.tools['find-interview-slots']
            .failed_to_fetch_slots,
          {
            '{date_format}': slot_date.toISOString(),
            '{err_msg}': error.message,
          }
        );

        return 'Error finding slots';
      }
    },
  });
};
