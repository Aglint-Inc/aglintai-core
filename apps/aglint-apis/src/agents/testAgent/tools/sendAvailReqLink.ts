import {APISendAvailabilityRequestLink} from '@aglint/shared-types';
import {supabaseWrap} from '@aglint/shared-utils';
import axios from 'axios';
import {DynamicStructuredTool} from 'langchain/tools';
import {envConfig} from 'src/config';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import {dayjsLocal} from 'src/utils/dayjsLocal/dayjsLocal';
import z from 'zod';

export const sendAvailReqLink = ({
  company_id,
  user_tz,
}: {
  company_id: string;
  user_tz: string;
}) => {
  return new DynamicStructuredTool({
    name: 'send-availability-request-link-to-candidate',
    description:
      'collects details necessary for sending the sending availability request link and sends the link to the candidate',
    schema: z.object({
      interview_sessions: z
        .string()
        .array()
        .describe('selected interview sessions to schedule'),
      candidate_info: z
        .object({
          candidate_name: z.string().describe("candidate's name"),
          job_role: z.string(),
        })
        .describe('candidate info as per system reponse'),
      date_range: z
        .object({
          start_date: z
            .string()
            .default(
              dayjsLocal().add(1, 'week').startOf('week').format('DD/MM/YYYY')
            )
            .describe('Request availability from this date in DD/MM/YYYY'),
          end_date: z
            .string()
            .default(
              dayjsLocal().add(1, 'week').endOf('week').format('DD/MM/YYYY')
            )
            .describe('Request availabilitytill this date in DD/MM/YYYY'),
        })
        .default({}),
      options: z
        .object({
          show_soft_conflicts_slots: z
            .boolean()
            .default(false)
            .describe(
              'whether to show slot preference on soft conflicted slots'
            ),
          show_out_of_office_slots: z
            .boolean()
            .default(false)
            .describe(
              'whether to show slot preference on Out Of Office conflicted slots'
            ),
        })
        .optional()
        .default({}),
    }),
    func: async func_params => {
      try {
        if (!func_params.date_range.start_date) {
          func_params.date_range.start_date = dayjsLocal()
            .add(1, 'week')
            .startOf('week')
            .format('DD/MM/YYYY');
          func_params.date_range.end_date = dayjsLocal()
            .add(1, 'week')
            .startOf('week')
            .format('DD/MM/YYYY');
        }
        const [matchedCandidate] = supabaseWrap(
          await supabaseAdmin
            .from('candidate_applications_view')
            .select()
            .eq('company_id', company_id)
            .textSearch(
              'full_text_search',
              func_params.candidate_info.candidate_name.split(' ').join('<->')
            ),
          false
        );

        const payload: APISendAvailabilityRequestLink = {
          application_id: matchedCandidate.application_id,
          company_id: company_id,
          job_id: matchedCandidate.job_id,
          start_date: func_params.date_range.start_date,
          end_date: func_params.date_range.end_date,
          session_details: func_params.interview_sessions.map(s => ({
            session_name: s,
          })),
        };
        const {data} = await axios.post(
          `${envConfig.CLIENT_APP_URL}/api/agent-scheduling/send-availability-request-link`,
          {
            ...payload,
          }
        );
        return `link sent sucessfully, ${data.avail_link}`;
      } catch (error: any) {
        console.error(error);
        return 'Failed to perform the action';
      }
    },
  });
};
