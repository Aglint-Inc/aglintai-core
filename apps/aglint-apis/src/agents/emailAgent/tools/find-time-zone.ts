import {DynamicStructuredTool} from 'langchain/tools';
import {z} from 'zod';
import {EmailAgentPayload} from '../../../types/email_agent/apiPayload.types';
import {supabaseAdmin} from '../../../services/supabase/SupabaseAdmin';
import {
  geoCodeLocation,
  getTimeZoneOfGeo,
} from '../../../utils/scheduling_utils/time_zone';
import {appLogger} from '../../../services/logger';
import {LoggerType} from '../../../utils/scheduling_utils/getCandidateLogger';
import {agent_activities} from '../../../copies/agents_activity';
import {supabaseWrap} from '@aglint/shared-utils';

export const findTimeZone = (
  {candidate_id}: EmailAgentPayload['payload'],
  candLogger: LoggerType
) => {
  return new DynamicStructuredTool({
    name: 'find-time-zone',
    description: 'finds the time zone of given city or state',
    schema: z.object({
      location: z.string().describe('state or city'),
    }),
    func: async ({location}) => {
      if (!location) {
        return 'either city or state name is required';
      }
      try {
        const geo = await geoCodeLocation(location);
        const time_zone = await getTimeZoneOfGeo({
          lang: geo.lang,
          lat: geo.lat,
        });
        await supabaseWrap(
          await supabaseAdmin
            .from('candidates')
            .update({
              timezone: time_zone,
            })
            .eq('id', candidate_id)
        );
        return time_zone;
      } catch (error: any) {
        candLogger(
          agent_activities.email_agent.tools['find-time-zone']
            .failed_to_find_time_zone,
          {
            '{location}': location,
            '{err_msg}': error.message,
          }
        );
        appLogger.error('Failed to find to the time zone', {
          error: error.message,
          location: location,
        });
        return 'Failed to find to the time zone';
      }
    },
  });
};
