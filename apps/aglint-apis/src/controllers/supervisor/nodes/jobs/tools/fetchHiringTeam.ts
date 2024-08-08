import {CallBack, fetchJobHiringTeam, getFullName} from '@aglint/shared-utils';
import {DynamicStructuredTool} from 'langchain/tools';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import z from 'zod';

export const fetchHiringTeamTool = ({
  job_id,
  callback,
  recruiter_id,
}: {
  job_id: string;
  recruiter_id: string;
  callback: (x: CallBack<'fetch_hiring_team'>) => void;
}) => {
  return new DynamicStructuredTool({
    name: 'fetch_hiring_team',
    description: 'Fetch hiring team for a user',
    schema: z.object({
      title: z.string(),
    }),
    func: async ({title}) => {
      if (!title && !job_id) {
        return `No job title or job id provided`;
      }

      const hrteam = await fetchJobHiringTeam({
        supabase: supabaseAdmin,
        job_id,
        job_title: title,
        recruiter_id,
      });

      if (!hrteam) {
        return `Unable to fetch hiring team for job ${title}`;
      }
      callback({
        function_name: 'fetch_hiring_team',
        payload: hrteam,
        called_at: new Date().toISOString(),
      });

      const team = {
        recruiter: {
          name: getFullName(hrteam.rec?.first_name, hrteam.rec?.last_name),
          position: hrteam.rec?.position,
        },
        hiring_manager: {
          name: getFullName(
            hrteam.hir_man?.first_name,
            hrteam.hir_man?.last_name
          ),
          position: hrteam.hir_man?.position,
        },
        ...(hrteam.recruiting_coordinator && {
          recruiting_coordinator: {
            name: getFullName(
              hrteam.recruiting_coordinator?.first_name,
              hrteam.recruiting_coordinator?.last_name
            ),
            position: hrteam.recruiting_coordinator?.position,
          },
        }),
      };

      return JSON.stringify(team);
    },
  });
};
