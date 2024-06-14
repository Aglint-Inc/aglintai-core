import {z} from 'zod';
import {dayjsLocal} from '../../../utils/dayjsLocal/dayjsLocal';
import {isCurrDayHoliday} from '../../../utils/scheduling_utils/fetchCandDetails';
import {LoggerType} from '../../../utils/scheduling_utils/getCandidateLogger';
import {
  convertDateFormatToDayjs,
  findCurrDayPlan,
} from '../../../utils/scheduling_utils/tool_utils';
import {createOpenAiTool, findInterviewSlotOnThatDay} from './utils';
import {fromError} from 'zod-validation-error';
import {getCachedCandidateInfo} from '../../../services/cache/cache-db';
import {agent_activities} from '../../../copies/agents_activity';
import {appLogger} from '../../../services/logger';

export const findInterviewSlots = () => {
  const schema = z.object({
    date: z.object({
      month: z.number().describe('month in 1 indexed integer format.'),
      day: z.number().describe('date in a month eg. 12.'),
    }),
    time_zone: z.string().describe("Candidate's time zone eg. Asia/colombo"),
  });
  const tool_def = createOpenAiTool({
    name: 'find-interview-slots',
    description: 'finds available interview slots on a particular day.',
    schema: schema,
  });

  const func = async (
    args: z.infer<typeof schema>,
    cand_phone: string,
    candLogger: LoggerType
  ) => {
    try {
      let parsedData = null;
      try {
        parsedData = schema.parse(args);
      } catch (error) {
        return fromError(error).toString();
      }
      const {date} = parsedData;
      const cand_info = await getCachedCandidateInfo(cand_phone);
      const cand_time_zone = cand_info.candidate_tz.tz_code;
      const slot_date = convertDateFormatToDayjs(
        `${String(date.day)}/${String(date.month).padStart(2, '0')}/${dayjsLocal().get('year')}`,
        cand_time_zone
      );
      candLogger(
        agent_activities.phone_agent.tools['find-interview-slots']
          .req_slot_on_date,
        {
          '{date_format}': slot_date.toISOString(),
        }
      );

      if (isCurrDayHoliday(cand_info.comp_scheduling_setting, slot_date)) {
        return 'this day is holiday';
      }

      const req_day_slots = findCurrDayPlan(
        cand_info.all_slots,
        slot_date,
        cand_info.candidate_tz.tz_code
      );

      if (req_day_slots.length === 0) {
        return 'All Slots booked on that day try diffrent day';
      }
      return findInterviewSlotOnThatDay(req_day_slots, cand_time_zone);
    } catch (err: any) {
      appLogger.info(err.message, err);
      candLogger('Some thing went wrong while fetch slots', {});
      return 'Some thing went wrong';
    }
  };

  return {
    tool_def,
    func,
    schema,
  };
};
