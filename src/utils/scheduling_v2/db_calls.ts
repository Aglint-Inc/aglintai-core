import {
  InterviewModuleApiType,
  InterviewModuleDbType,
} from '@/src/components/JobInterviewPlan/types';
import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import {
  InterviewModuleRelationType,
  InterviewModuleType,
  RecruiterUserType,
} from '@/src/types/data.types';

import { CompServiceKeyCred, IntervMeta } from './types';
import { decrypt } from './utils';
import { getFullName } from '../jsonResume';
import { supabaseAdmin } from '../supabase/supabaseAdmin';

export const fetchAvailApiDetails = async ({ job_id, recruiter_id }) => {
  const [rec] = supabaseWrap(
    await supabaseAdmin.rpc('find_avail_api_details_updated_2', {
      job_id,
      recruiter_id,
    }),
  );
  const all_ints = [
    ...(rec.shadow_ints?.shadow_ints ?? []),
    ...(rec.rshadow_ints?.rshadow_ints ?? []),
    ...(rec.interviewer.interviewer ?? []),
  ] as RecruiterUserType[];

  const filtered_int_plans: InterviewModuleDbType[] = (
    rec.interview_plan.plan as InterviewModuleDbType[]
  ).map((mod) => {
    const selectedIntervs = mod.selectedIntervs.filter((int) =>
      all_ints.find((aint) => aint.user_id === int.interv_id),
    );
    const shadowInterv = mod.shadowIntervs.filter((int) =>
      all_ints.find((aint) => aint.user_id === int.interv_id),
    );
    const revShadowInterv = mod.revShadowInterv.filter((int) =>
      all_ints.find((aint) => aint.user_id === int.interv_id),
    );
    return {
      ...mod,
      meetingIntervCnt:
        mod.meetingIntervCnt > selectedIntervs.length
          ? selectedIntervs.length
          : mod.meetingIntervCnt,
      selectedIntervs,
      shadowInterv,
      revShadowInterv,
    };
  });

  const details = {
    interview_plan: filtered_int_plans,
    service_json: JSON.parse(
      decrypt(rec.service_json.service_json, process.env.ENCRYPTION_KEY),
    ) as CompServiceKeyCred,
    interviewers: rec.interviewer.interviewer as RecruiterUserType[],
    shadowIntervs: (rec.shadow_ints?.shadow_ints ?? []) as RecruiterUserType[],
    rShadowIntervs: (rec.rshadow_ints?.rshadow_ints ??
      []) as RecruiterUserType[],
    interview_modules: rec.interview_modules
      .interview_modules as InterviewModuleType[],
    int_mod_relns: (rec.int_mod_relns?.int_mod_relns ??
      []) as InterviewModuleRelationType[],
  };

  const interview_plan_api: InterviewModuleApiType[] =
    details.interview_plan.map((m) => {
      return {
        session_name: m.session_name,
        duration: m.duration,
        isBreak: m.isBreak,
        meetingIntervCnt: m.meetingIntervCnt,
        module_id: m.module_id,
        module_name: !m.isBreak
          ? details.interview_modules.find((m2) => m2.id === m.module_id)?.name
          : '',
        selectedIntervs: m.selectedIntervs.map((s) => {
          const int = details.interviewers.find(
            (i) => i.user_id === s.interv_id,
          );
          return {
            interv_id: int.user_id,
            email: int.email,
            profile_img: int?.profile_image ?? '',
            name: getFullName(int.first_name, int.last_name),
            pause_json: details.int_mod_relns.find(
              (i) => i.module_id === m.module_id && i.user_id === int.user_id,
            )?.pause_json,
          };
        }),
        revShadowIntervs: m.revShadowInterv.map((s) => {
          const int = details.rShadowIntervs.find(
            (i) => i.user_id === s.interv_id,
          );
          return {
            interv_id: int.user_id,
            email: int.email,
            profile_img: int?.profile_image ?? '',
            name: getFullName(int.first_name, int.last_name),
            pause_json: details.int_mod_relns.find(
              (i) => i.module_id === m.module_id && i.user_id === int.user_id,
            )?.pause_json,
          };
        }),
        shadowIntervs: m.shadowIntervs.map((s) => {
          const int = details.shadowIntervs.find(
            (i) => i.user_id === s.interv_id,
          );
          return {
            interv_id: int.user_id,
            email: int.email,
            profile_img: int?.profile_image ?? '',
            name: getFullName(int.first_name, int.last_name),
            pause_json: details.int_mod_relns.find(
              (i) => i.module_id === m.module_id && i.user_id === int.user_id,
            )?.pause_json,
          };
        }),
        meeting_type: m.meeting_type ?? {
          link: '',
          provider_label: 'Google Meet',
          value: 'google_meet',
        },
      };
    });

  const sel_int_info: IntervMeta[] = details.interviewers.map((int) => ({
    email: int.email,
    interviewer_id: int.user_id,
    name: getFullName(int.first_name, int.last_name),
    profile_img: int.profile_image,
    shedule_settings: int.scheduling_settings as any,
    tokens: int.schedule_auth as any,
  }));
  const shadow_ints_info = details.shadowIntervs.map((int) => ({
    email: int.email,
    interviewer_id: int.user_id,
    name: getFullName(int.first_name, int.last_name),
    profile_img: int.profile_image,
    shedule_settings: int.scheduling_settings as any,
    tokens: int.schedule_auth as any,
  }));

  const rshadow_ints_info = details.rShadowIntervs.map((int) => ({
    email: int.email,
    interviewer_id: int.user_id,
    name: getFullName(int.first_name, int.last_name),
    profile_img: int.profile_image,
    shedule_settings: int.scheduling_settings as any,
    tokens: int.schedule_auth as any,
  }));

  const getUniqInts = getUniqueInts([
    ...sel_int_info,
    ...shadow_ints_info,
    ...rshadow_ints_info,
  ]);

  return {
    company_cred: details.service_json,
    interviewers_info: getUniqInts,
    interview_plan_api,
  };
};

const getUniqueInts = (ints: IntervMeta[]) => {
  let mp = new Map();

  for (let int of ints) {
    if (!mp.get(int.interviewer_id)) mp.set(int.interviewer_id, int);
  }

  return [...mp.values()] as IntervMeta[];
};
