import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { schedulingSettingType } from '@/src/components/Scheduling/Settings/types';
import { InterviewModuleType, RecruiterUserType } from '@/src/types/data.types';

import { CompServiceKeyCred, IntervMeta } from './types';
import { decrypt } from './utils';
import { supabaseAdmin } from '../supabase/supabaseAdmin';

export const fetch_company_cred = async (company_id: string) => {
  const [rec] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter')
      .select('service_json')
      .eq('id', company_id)
  );
  const company_cred = decrypt(rec.service_json, process.env.ENCRYPTION_KEY);
  return JSON.parse(company_cred) as CompServiceKeyCred;
};

export const fetchInterviersSheduleSetting = async (
  interviewer_ids: string[]
) => {
  const recs = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select(
        'schedule_auth,email,user_id, scheduling_settings,first_name,last_name'
      )
      .in('user_id', interviewer_ids)
  ) as Pick<
    RecruiterUserType,
    | 'email'
    | 'user_id'
    | 'schedule_auth'
    | 'scheduling_settings'
    | 'first_name'
    | 'last_name'
    | 'profile_image'
  >[];

  let interviewers: IntervMeta[] = recs.map((r) => {
    return {
      name: [r.first_name, r.last_name].filter(Boolean).join(' '),
      profile_img: r.profile_image,
      email: r.email,
      interviewer_id: r.user_id,
      tokens: (r.schedule_auth as any) ?? null,
      shedule_settings: r.scheduling_settings as schedulingSettingType
    };
  });
  return interviewers;
};

export const fetchModuleName = async (ids: string[]) => {
  const modules = supabaseWrap(
    await supabaseAdmin.from('interview_module').select().in('id', ids)
  ) as InterviewModuleType[];

  return modules.map((m) => ({ module_id: m.id, name: m.name }));
};
