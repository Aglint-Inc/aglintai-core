import { z } from 'zod';

import { PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { DatabaseTable } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';

export const interviewPoolUsersSchema = z.object({
  module_id: z.string().uuid(),
});

const query = async ({
  ctx: { db },
  input: { module_id },
}: PrivateProcedure<typeof interviewPoolUsersSchema>) => {
  const { data: dataModule } = await db
    .from('interview_module')
    .select(
      '*,interview_module_approve_users(*),interview_module_relation(*,all_interviewers(user_id,first_name,last_name,scheduling_settings))',
    )
    .eq('id', module_id)
    .throwOnError()
    .single();

  const mod = {
    id: dataModule.id,
    name: dataModule.name,
    description: dataModule.description,
    created_at: dataModule.created_at,
    settings: dataModule.settings,
    department_id: dataModule.department_id,
    created_by: dataModule.created_by,
    duration_available: dataModule.duration_available,
    instructions: dataModule.instructions,
    is_archived: dataModule.is_archived,
    recruiter_id: dataModule.recruiter_id,
  };

  const response = {
    ...mod,
    relations: dataModule.interview_module_relation
      .map((rel) => ({
        ...rel,
        recruiter_user: rel.all_interviewers,
      }))
      .map((rel) => {
        const member = rel.recruiter_user;
        const userSettings = member.scheduling_settings;
        const textWeekInterview =
          userSettings.interviewLoad.dailyLimit.type === 'Hours'
            ? `${member.total_hours_this_week} / ${userSettings.interviewLoad.dailyLimit.value}  ${userSettings.interviewLoad.dailyLimit.type}`
            : `${member.total_interviews_this_week} / ${userSettings.interviewLoad.dailyLimit.value}  ${userSettings.interviewLoad.dailyLimit.type}`;

        const textTodayInterview =
          userSettings.interviewLoad.dailyLimit.type === 'Hours'
            ? `${member.total_hours_today}`
            : `${member.total_interviews_today}`;

        return {
          ...rel,
          textWeekInterview,
          textTodayInterview,
          full_name: getFullName(member.first_name, member.last_name),
        };
      }),
    settings: dataModule.settings
      ? {
          ...dataModule.settings,
          approve_users: dataModule.interview_module_approve_users.map(
            (appr) => appr.user_id,
          ),
        }
      : {
          require_training: false,
          noShadow: 0,
          noReverseShadow: 0,
          reqruire_approval: false,
          approve_users: [],
        },
  };

  return response;
};

export const interviewPoolUsers = privateProcedure
  .input(interviewPoolUsersSchema)
  .query(query);
