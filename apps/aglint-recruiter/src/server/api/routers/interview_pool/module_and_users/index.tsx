import { type DatabaseTable } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

export const interviewPoolUsersSchema = z.object({
  module_id: z.string().uuid(),
});

const query = async ({
  input: { module_id },
}: PrivateProcedure<typeof interviewPoolUsersSchema>) => {
  const db = createPrivateClient();
  const { data: dataModule } = await db
    .from('interview_module')
    .select(
      '*,departments(*),interview_module_approve_users(*),interview_module_relation(*,all_interviewers!inner(user_id,first_name,last_name,scheduling_settings,total_hours_this_week,total_interviews_this_week,total_hours_today,total_interviews_today, profile_image,position,email))',
    )
    .eq('id', module_id)
    .throwOnError()
    .single();

  if (!dataModule) {
    return null;
  }

  const mod: DatabaseTable['interview_module'] = {
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

  const relations = dataModule.interview_module_relation.map((rel) => {
    const member = rel.all_interviewers;
    const userSettings = member.scheduling_settings;
    const textWeekInterview =
      userSettings.interviewLoad.dailyLimit.type === 'Hours'
        ? `${member.total_hours_this_week} / ${userSettings.interviewLoad.dailyLimit.value} ${userSettings.interviewLoad.dailyLimit.type}`
        : `${member.total_interviews_this_week} / ${userSettings.interviewLoad.dailyLimit.value} ${userSettings.interviewLoad.dailyLimit.type}`;

    const textTodayInterview =
      userSettings.interviewLoad.dailyLimit.type === 'Hours'
        ? `${member.total_hours_today}`
        : `${member.total_interviews_today}`;

    const week_load =
      userSettings.interviewLoad.dailyLimit.type === 'Hours'
        ? member.total_hours_this_week
          ? (member.total_hours_this_week /
              userSettings.interviewLoad.dailyLimit.value) *
            100
          : 0
        : member.total_interviews_this_week
          ? (member.total_interviews_this_week /
              userSettings.interviewLoad.dailyLimit.value) *
            100
          : 0;

    return {
      ...rel,
      recruiter_user: member,
      textWeekInterview,
      textTodayInterview,
      full_name: getFullName(member.first_name, member.last_name),
      week_load,
    };
  });

  const settings = dataModule.settings
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
      };

  return { ...mod, relations, settings, department: dataModule.departments };
};

export const interviewPoolUsers = privateProcedure
  .input(interviewPoolUsersSchema)
  .query(query);
