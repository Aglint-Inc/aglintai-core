import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { InterviewModuleType, InterviewSession } from '@/src/types/data.types';

import { decrypt_string } from '../integrations/crypt-funcs';
import { CompServiceKeyCred } from '../scheduling_v2/types';
import { supabaseAdmin } from '../supabase/supabaseAdmin';
import { InterviewSessionApiType, SessionInterviewerType } from './types';

export const find_api_details = async (
  session_ids: string[],
  company_id: string,
) => {
  const r = supabaseWrap(
    await supabaseAdmin.rpc('get_interview_session_data', {
      sess_ids: session_ids,
      company_id,
    }),
  );

  if (r.length === 0) throw new Error('Invalid plan_id');
  let company_cred: CompServiceKeyCred = null;
  if (r[0].service_cred) {
    company_cred = JSON.parse(decrypt_string(r[0].service_cred));
  }
  const interview_sessions = r[0].interview_sessions as InterviewSession[];
  let inter_data = r[0].interviewers as unknown as SessionInterviewerType[][];
  let int_modules_data = r[0]
    .interview_modules as unknown as InterviewModuleType[][];

  let interviewers: SessionInterviewerType[] = inter_data
    .filter(Boolean)
    .reduce((tot, curr) => {
      return [...tot, ...curr];
    }, []);
  const int_modules: InterviewModuleType[] = int_modules_data
    .filter(Boolean)
    .reduce((tot, curr) => {
      return [...tot, ...curr];
    });
  const ses_with_ints: InterviewSessionApiType[] = interview_sessions
    .map((s) => {
      let session: InterviewSessionApiType = {
        ...s,
        duration: s.session_duration,
        schedule_type: s.schedule_type,
        session_type: s.session_type,
        session_id: s.id,
        session_name: s.name,
        break_duration: s.break_duration,
        module_id: s.module_id,
        module_name: int_modules.find((m) => m.id === s.module_id)?.name,
        interviewer_cnt: s.interviewer_cnt,
        session_order: s.session_order,
        selectedIntervs: interviewers.filter(
          (i) => i.session_id === s.id && i.training_type === 'qualified',
        ),
        shadowIntervs: interviewers.filter(
          (i) => i.session_id === s.id && i.training_type === 'shadow',
        ),
        revShadowIntervs: interviewers.filter(
          (i) => i.session_id === s.id && i.training_type === 'reverse_shadow',
        ),
      };
      return session;
    })
    .sort((s1, s2) => s1.session_order - s2.session_order);
  return {
    company_cred,
    ses_with_ints,
    all_inters: getUniqueInts(interviewers),
  };
};

const getUniqueInts = (ints: SessionInterviewerType[]) => {
  let mp = new Map();

  for (let int of ints) {
    if (!mp.get(int.user_id)) mp.set(int.user_id, int);
  }

  return [...mp.values()] as SessionInterviewerType[];
};
