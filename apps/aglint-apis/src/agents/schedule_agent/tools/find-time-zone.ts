import {z} from 'zod';
import {LoggerType} from '../../../utils/scheduling_utils/getCandidateLogger';
import {createOpenAiTool} from './utils';
import {fromError} from 'zod-validation-error';
import {
  geoCodeLocation,
  getTimeZoneOfGeo,
} from '../../../utils/scheduling_utils/time_zone';
import {googleTimeZone} from '../../../utils/googleTimeZone';
import {
  getCachedCandidateInfo,
  updateCandidateInfo,
} from '../../../services/cache/cache-db';
import {supabaseAdmin} from '../../../services/supabase/SupabaseAdmin';
import {agent_activities} from '../../../copies/agents_activity';
export const findCandTimeZone = () => {
  const schema = z.object({
    location: z.string().describe('state or city'),
  });

  const tool_def = createOpenAiTool({
    name: 'find-time-zone',
    description: 'finds the time zone of given city or state',
    schema,
  });

  const func = async ({
    args,
    cand_phone,
    candLogger,
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
    const {location} = args;
    if (!location) {
      return 'either city or state name is required';
    }
    try {
      const geo = await geoCodeLocation(location);
      const time_zone = await getTimeZoneOfGeo({
        lang: geo.lang,
        lat: geo.lat,
      });
      supabaseAdmin
        .from('candidates')
        .update({
          timezone: time_zone,
        })
        .eq('id', condidate_info.candidate_id);

      const cand_info = {...condidate_info};
      cand_info.candidate_tz = {
        tz_code: time_zone,
        tz_label: googleTimeZone[time_zone].split(')')[1],
      };
      await updateCandidateInfo(cand_info);
      return `${googleTimeZone[time_zone].split(')')[1]} ${time_zone}`;
    } catch (error: any) {
      candLogger(
        agent_activities.phone_agent.tools['find-time-zone']
          .failed_to_find_time_zone,
        {
          '{location}': location,
          '{candidate}': '',
          '{err_msg}': error.message,
        }
      );
      return 'Please provide proper location';
    }
  };

  return {
    tool_def,
    func,
    schema,
  };
};
