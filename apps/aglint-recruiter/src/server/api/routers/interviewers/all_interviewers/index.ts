import { getFullName } from '@aglint/shared-utils';
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

export const interviewerSchema = z.object({ recruiter_id: z.string().uuid() });
const query = async ({
  input: { recruiter_id },
}: PrivateProcedure<typeof interviewerSchema>) => {
  const db = createPrivateClient();
  const data = (
    await db
      .from('all_interviewers')
      .select(
        'user_id,profile_image,first_name,last_name,departments(id,name),office_locations(id,city,region,country),scheduling_settings->timeZone->tzCode,qualified_module_names,training_module_names,completed_meeting_count,recruiter_relation!public_recruiter_relation_user_id_fkey(roles(name)),interview_module_relation(training_status,interview_module(id,name))',
      )
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data;

  const stuData = (data || []).map((d) => ({
    user_id: d.user_id,
    name: getFullName(d.first_name, d.last_name),
    role: d.recruiter_relation?.[0]?.roles?.name,
    completed_count: d.completed_meeting_count ?? 0,
    avatar: d.profile_image,
    department: d.departments,
    time_zone: d.tzCode as string,
    qualified_types: d.interview_module_relation
      ?.filter((module) => module?.training_status === 'qualified')
      ?.map((module) => module?.interview_module),
    training_types: d.interview_module_relation
      ?.filter((module) => module?.training_status === 'training')
      ?.map((module) => module?.interview_module),
    location: d.office_locations,
  }));

  return stuData;
};

export const getAllInterviewers = privateProcedure
  .input(interviewerSchema)
  .query(query);

export type GetAllInterviewers = ProcedureDefinition<typeof getAllInterviewers>;
