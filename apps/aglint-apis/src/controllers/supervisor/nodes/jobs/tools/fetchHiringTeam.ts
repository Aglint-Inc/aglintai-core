import {CallBack} from '@aglint/shared-types';
import {fetchJobHiringTeam, getFullName} from '@aglint/shared-utils';
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
        return 'No job title or job id provided';
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
        links: [
          {
            replace: hrteam.job_title,
            with: `/jobs/${hrteam.id}`,
          },
        ],
      });

      const team = [
        {
          role: 'Recruiter',
          name: getFullName(hrteam.rec?.first_name, hrteam.rec?.last_name),
        },
        {
          role: 'Hiring Manager',
          name: getFullName(
            hrteam.hir_man?.first_name,
            hrteam.hir_man?.last_name
          ),
        },
        ...(hrteam.recruiting_coordinator
          ? [
              {
                role: 'Recruiting Coordinator',
                name: getFullName(
                  hrteam.recruiting_coordinator?.first_name,
                  hrteam.recruiting_coordinator?.last_name
                ),
              },
            ]
          : []),
      ];

      return JSON.stringify({
        job_title: hrteam.job_title,
        hiring_team: team,
      });
    },
  });
};
