import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { api } from '@/trpc/client';

export const useAllInterviewers = () => {
  const { recruiter_id } = useAuthDetails();
  return api.interviewers.get_all_interviewers.useQuery({ recruiter_id });
};

// import { getFullName } from '@aglint/shared-utils';
// import { useQuery } from '@tanstack/react-query';

// import { useAuthDetails } from '@/context/AuthContext/AuthContext';
// import { supabase } from '@/utils/supabase/client';

// export type AllInterviewerType = Awaited<
//   ReturnType<typeof fetchAllInterviewer>
// >;

// export function useAllInterviewer() {
//   const {
//     recruiter: { id: recruiter_id },
//   } = useAuthDetails();

//   return useQuery({
//     queryKey: ['Interviewer_management'],
//     queryFn: () => fetchAllInterviewer(recruiter_id),
//     enabled: Boolean(recruiter_id),
//   });
// }

// const fetchAllInterviewer = async (recruiter_id: string) => {
//   const { data } = await supabase
//     .from('all_interviewers')
//     .select(
//       'user_id,profile_image,first_name,last_name,departments(id,name),office_locations(id,city,region,country),scheduling_settings->timeZone->tzCode,qualified_module_names,training_module_names,completed_meeting_count,recruiter_relation!public_recruiter_relation_user_id_fkey(roles(name)),interview_module_relation(training_status,interview_module(id,name))',
//     )
//     .eq('recruiter_id', recruiter_id);

//   const stuData = data.map((d) => ({
//     user_id: d.user_id,
//     name: getFullName(d.first_name, d.last_name),
//     role: d.recruiter_relation?.[0]?.roles?.name,
//     completed_count: d.completed_meeting_count,
//     avatar: d.profile_image,
//     department: d.departments,
//     time_zone: d.tzCode,
//     qualified_types: d.interview_module_relation
//       ?.filter((module) => module?.training_status === 'qualified')
//       ?.map((module) => module?.interview_module),
//     training_types: d.interview_module_relation
//       ?.filter((module) => module?.training_status === 'training')
//       ?.map((module) => module?.interview_module),
//     location: d.office_locations,
//   }));
//   return stuData;
// };
