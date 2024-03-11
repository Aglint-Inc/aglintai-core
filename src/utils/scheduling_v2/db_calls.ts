import {
  InterviewModuleApiType,
  InterviewModuleDbType
} from '@/src/components/JobInterviewPlan/types';
import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { InterviewModuleType, RecruiterUserType } from '@/src/types/data.types';

import { CompServiceKeyCred, IntervMeta } from './types';
import { decrypt } from './utils';
import { getFullName } from '../jsonResume';
import { supabaseAdmin } from '../supabase/supabaseAdmin';

export const fetchAvailApiDetails = async ({ job_id, recruiter_id }) => {
  const [rec] = supabaseWrap(
    await supabaseAdmin.rpc('find_avail_api_details', {
      job_id,
      recruiter_id
    })
  );

  const details = {
    interview_plan: rec.interview_plan.plan as InterviewModuleDbType[],
    service_json: JSON.parse(
      decrypt(rec.service_json.service_json, process.env.ENCRYPTION_KEY)
    ) as CompServiceKeyCred,
    interviewers: rec.interviewer.interviewer as RecruiterUserType[],
    interview_modules: rec.interview_modules
      .interview_modules as InterviewModuleType[]
  };

  const interview_plan_api: InterviewModuleApiType[] =
    details.interview_plan.map((m) => {
      return {
        duration: m.duration,
        isBreak: m.isBreak,
        meetingIntervCnt: m.meetingIntervCnt,
        module_id: m.module_id,
        module_name: !m.isBreak
          ? details.interview_modules.find((m2) => m2.id === m.module_id)?.name
          : '',
        selectedIntervs: m.selectedIntervs.map((s) => {
          const int = details.interviewers.find(
            (i) => i.user_id === s.interv_id
          );
          return {
            interv_id: int.user_id,
            email: int.email,
            profile_img: int?.profile_image ?? '',
            name: getFullName(int.first_name, int.last_name)
          };
        })
      };
    });

  const interviewers_info: IntervMeta[] = details.interviewers.map((int) => ({
    email: int.email,
    interviewer_id: int.user_id,
    name: getFullName(int.first_name, int.last_name),
    profile_img: int.profile_image,
    shedule_settings: int.scheduling_settings as any,
    tokens: int.schedule_auth as any
  }));
  return {
    company_cred: details.service_json,
    interviewers_info,
    interview_plan_api
  };
};
