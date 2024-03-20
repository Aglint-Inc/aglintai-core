import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { PublicJobsType, RecruiterUserType } from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { initialState, initilizeIntPlan } from './store';
import {
  InterviewModuleDbType,
  InterviewPlanState,
  InterviewSession,
  IntwerviewerPlanType,
} from './types';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../JobsDashboard/JobPostCreateUpdate/utils';
import { fetchInterviewModule } from '../Scheduling/Modules/utils';

const JobInterviewPlanHoc = ({ children }) => {
  const router = useRouter();
  const { recruiter } = useAuthDetails();

  const initialize = async () => {
    try {
      const [rec] = supabaseWrap(
        await supabase.from('public_jobs').select().eq('id', router.query.id),
      ) as PublicJobsType[];
      if (!rec) {
        toast.error('job doesnot exist');
        return router.back();
      }
      let jobModules = ((rec.interview_plan as any)?.plan ??
        []) as InterviewModuleDbType[];

      const fetchedDbModules = await fetchInterviewModule(recruiter.id);
      const allIntModules: InterviewSession[] = [];
      let coordinator_db = (rec.interview_plan as any)
        ?.coordinator as null | Pick<
        InterviewPlanState['interviewCordinator'],
        'interv_id'
      >;
      const allTeamMembers = await fetchAllMembers();

      for (let intModule of fetchedDbModules) {
        const intMod: InterviewSession = {
          module_id: intModule.id,
          duration: 30,
          meetingIntervCnt: 1,
          module_name: intModule.name,
          selectedIntervs: [],
          training_ints: [],
          allIntervs: [],
          isBreak: false,
          session_name: '',
          revShadowIntervs: [],
          shadowIntervs: [],
          meeting_type: {
            link: '/images/svg/google_meet.svg',
            provider_label: 'Google Meet',
            value: 'google_meet',
          },
        };

        intMod.training_ints = intModule.relations
          .filter((reln) => reln.training_status === 'training')
          .filter((r) => allTeamMembers.find((m) => m.interv_id === r.user_id))
          .map((reln) => {
            const member = allTeamMembers.find(
              (m) => m.interv_id === reln.user_id,
            );
            return {
              interv_id: member.interv_id,
              name: member.name,
              profile_image: member.profile_image,
              email: member.email,
              pause_json: null,
            };
          });
        intMod.allIntervs = intModule.relations
          .filter((reln) => reln.training_status === 'qualified')
          .filter((r) => allTeamMembers.find((m) => m.interv_id === r.user_id))
          .map((reln) => {
            const member = allTeamMembers.find(
              (m) => m.interv_id === reln.user_id,
            );
            return {
              profile_image: member.profile_image,
              interv_id: member.interv_id,
              name: member.name,
            };
          });
        allIntModules.push(intMod);
      }

      let clModules: InterviewSession[] = [];
      for (let dbModule of jobModules) {
        if (dbModule.isBreak) continue;
        let intModule = allIntModules.find(
          (i) => i.module_id === dbModule.module_id,
        );
        if (!intModule) continue;

        let clModule: InterviewSession = {
          module_name: intModule?.module_name ?? '', //break
          duration: dbModule.duration,
          isBreak: dbModule.isBreak,
          meetingIntervCnt: dbModule.meetingIntervCnt,
          module_id: dbModule.module_id,
          selectedIntervs: dbModule.selectedIntervs
            .filter((r) =>
              allTeamMembers.find((m) => m.interv_id === r.interv_id),
            )
            .map((i) => {
              let member = allTeamMembers.find(
                (m) => m.interv_id === i.interv_id,
              );
              return {
                interv_id: i.interv_id,
                name: member.name,
                profile_image: member.profile_image,
              };
            }),
          allIntervs: intModule?.allIntervs ?? [], //break
          session_name: dbModule?.session_name ?? '',
          training_ints: [],
          meeting_type: {
            link: '/images/svg/google_meet.svg',
            provider_label: 'Google Meet',
            value: 'google_meet',
          },
          revShadowIntervs: dbModule.revShadowInterv
            .filter((r) =>
              allTeamMembers.find((m) => m.interv_id === r.interv_id),
            )
            .map((i) => {
              let member = allTeamMembers.find(
                (m) => m.interv_id === i.interv_id,
              );
              return {
                interv_id: i.interv_id,
                name: member.name,
                profile_image: member.profile_image,
                email: member.email,
                profile_img: member.profile_image,
                pause_json: null,
              };
            }),
          shadowIntervs: dbModule.shadowIntervs
            .filter((r) =>
              allTeamMembers.find((m) => m.interv_id === r.interv_id),
            )
            .map((i) => {
              let member = allTeamMembers.find(
                (m) => m.interv_id === i.interv_id,
              );
              return {
                interv_id: i.interv_id,
                name: member.name,
                profile_image: member.profile_image,
                email: member.email,
                profile_img: member.profile_image,
                pause_json: null,
              };
            }),
        };
        const l = fetchedDbModules.find((mod) => mod.id === dbModule.module_id);
        clModule.training_ints = l.relations
          .filter((r) => allTeamMembers.find((m) => m.interv_id === r.user_id))
          .filter((reln) => reln.training_status === 'training')
          .map((reln) => {
            const member = allTeamMembers.find(
              (m) => m.interv_id === reln.user_id,
            );
            return {
              interv_id: member.interv_id,
              name: member.name,
              profile_image: member.profile_image,
              email: member.email,
              pause_json: null,
            };
          });
        clModules.push(clModule);
      }

      let coordinator: InterviewPlanState['interviewCordinator'] = null;
      if (coordinator_db) {
        let mem = allTeamMembers.find(
          (u) => u.interv_id === coordinator_db.interv_id,
        );
        if (mem) {
          coordinator = {
            interv_id: mem.interv_id,
            name: mem.name,
            profile_image: mem.profile_image,
          };
        }
      }
      initilizeIntPlan({
        allTeamMembers,
        allModules: allIntModules,
        modules: clModules,
        isloading: false,
        syncStatus: '',
        jobId: router.query.id as string,
        jobStatus: rec.status,
        jobTitle: rec.job_title,
        interviewCordinator: coordinator,
      });
    } catch (error) {
      toast.error(API_FAIL_MSG);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      initialize();
    }
    return () => {
      initilizeIntPlan({
        ...initialState,
      });
    };
  }, [router.query]);

  return <>{children}</>;
};

export default JobInterviewPlanHoc;

const fetchAllMembers = async () => {
  const recs = supabaseWrap(
    await supabase
      .from('recruiter_relation')
      .select(
        'recruiter_id,recruiter_user(user_id, email, profile_image,first_name,last_name))',
      ),
  ) as {
    recruiter_id: string;
    recruiter_user: Pick<
      RecruiterUserType,
      'email' | 'first_name' | 'last_name' | 'profile_image' | 'user_id'
    > | null;
  }[];
  const allMembers: (IntwerviewerPlanType & { email: string })[] = recs
    .filter((u) => u.recruiter_user)
    .map((r) => ({
      interv_id: r.recruiter_user.user_id,
      name: getFullName(
        r.recruiter_user.first_name,
        r.recruiter_user.last_name,
      ),
      profile_image: r.recruiter_user.profile_image,
      email: r.recruiter_user.email,
    }));
  return allMembers;
};
