import {CallBack} from '@aglint/shared-types';
import {fetchInterviewTypeUsers} from '@aglint/shared-utils';
import {DynamicStructuredTool} from 'langchain/tools';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import z from 'zod';

export const fetchInterviewTypesRelationsTool = ({
  recruiter_id,
  callback,
}: {
  recruiter_id: string;
  callback: (x: CallBack<'fetch_interview_types_users'>) => void;
}) => {
  return new DynamicStructuredTool({
    name: 'fetch_interview_types_users',
    description:
      'Fetch all users or interviewers inside an interview type . Given name of interview type',
    schema: z.object({
      name: z.string(),
    }),
    func: async ({name}) => {
      if (!name) {
        return 'Please provide a name';
      }

      const rel = await fetchInterviewTypeUsers({
        supabase: supabaseAdmin,
        name,
        recruiter_id,
      });

      if (rel.length === 0) {
        return 'No relations found';
      }

      callback({
        function_name: 'fetch_interview_types_users',
        payload: rel,
        called_at: new Date().toISOString(),
        links: [
          {
            replace: rel[0].module_name,
            with: `${process.env.CLIENT_APP_URL}/scheduling/interview-types/${rel[0].module_id}`,
          },
        ],
      });

      const relations = rel.map(s => {
        return {
          name: s.first_name,
        };
      });
      return JSON.stringify({
        interview_type: rel[0].module_name,
        relations,
      });
    },
  });
};
