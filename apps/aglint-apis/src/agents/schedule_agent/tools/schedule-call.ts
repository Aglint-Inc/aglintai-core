import {z} from 'zod';
import {LoggerType} from '../../../utils/scheduling_utils/getCandidateLogger';
import {createOpenAiTool} from './utils';
import {dayjsLocal} from '../../../utils/dayjsLocal/dayjsLocal';
import {fromError} from 'zod-validation-error';
import {scheduleCallUtil} from '../../../utils/scheduleCall';
import {getCachedCandidateInfo} from '../../../services/cache/cache-db';
import {appLogger} from '../../../services/logger';
import {agent_activities} from '../../../copies/agents_activity';

export const scheduleTheCall = () => {
  const schema = z.object({
    schedule_call_time: z
      .object({
        time: z
          .object({
            hour: z
              .number()
              .describe('Hour in 24 format')
              .default(dayjsLocal().get('hour')),
            minutes: z.number().default(dayjsLocal().get('hour')),
          })
          .required(),
      })
      .describe("candidate's requested schedule time."),
  });
  const tool_def = createOpenAiTool({
    name: 'schedule-call',
    description: "reschedule the call to candidate's requested time",
    schema: schema,
  });

  const func = async ({
    cand_phone,
    candLogger,
    args,
  }: {
    cand_phone: string;
    args: z.infer<typeof schema>;
    candLogger: LoggerType;
  }) => {
    const condidate_info = await getCachedCandidateInfo(cand_phone);

    let parsedData = null;
    try {
      parsedData = schema.parse(args);
    } catch (error) {
      return fromError(error).toString();
    }
    const {time} = parsedData.schedule_call_time;

    let timezone = condidate_info.candidate_tz.tz_code;
    if (!timezone) {
      timezone = 'America/Los_Angeles';
    }
    let scheduled_datejs = dayjsLocal().tz(timezone);
    scheduled_datejs = scheduled_datejs
      .set('hours', time.hour)
      .set('minutes', time.minutes);
    try {
      candLogger(
        agent_activities.phone_agent.tools['schedule-call'].req_scheduled_call,
        {
          '{candidate}': '',
          '{time_format}': scheduled_datejs.format(),
        }
      );
      await scheduleCallUtil(
        condidate_info.req_payload.task_id,
        scheduled_datejs.format()
      );

      const current_date = dayjsLocal().tz(timezone);

      candLogger(
        agent_activities.phone_agent.tools['schedule-call']
          .call_schedule_sucess,
        {
          '{time_format}': scheduled_datejs.format(),
        }
      );

      if (current_date.isSame(scheduled_datejs, 'date')) {
        return `call scheduled ${scheduled_datejs.fromNow()}`;
      }
      return `scheduled call at ${scheduled_datejs.format()}`;
    } catch (error: any) {
      appLogger.error('failed to schedule the call', {
        error: error.message,
      });
      candLogger(
        agent_activities.phone_agent.tools['schedule-call'].failed_to_schedule,
        {
          '{time_format}': scheduled_datejs.format(),
          '{err_msg}': error.message,
        }
      );
      return 'failed to schedule the call';
    }
  };
  return {
    tool_def,
    func,
  };
};
