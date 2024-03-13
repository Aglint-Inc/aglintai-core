import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { PublicJobsType } from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { initialState, initilizeIntPlan } from './store';
import { InterviewModuleDbType, InterviewSession } from './types';
import {
  API_FAIL_MSG,
  supabaseWrap
} from '../JobsDashboard/JobPostCreateUpdate/utils';
import { fetchInterviewModule } from '../Scheduling/Modules/utils';

const JobInterviewPlanHoc = ({ children }) => {
  const router = useRouter();
  const { recruiter, members } = useAuthDetails();
  const initialize = async () => {
    try {
      const allIntModules: InterviewSession[] = [];
      const fetchedDbModules = await fetchInterviewModule(recruiter.id);
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
          shadowIntervs: []
        };

        intMod.training_ints = intModule.relations
          .filter((reln) => reln.training_status === 'training')
          .map((reln) => {
            const member = members.find((m) => m.user_id === reln.user_id);
            return {
              interv_id: member.user_id,
              name: getFullName(member.first_name, member.last_name),
              profile_img: member.profile_image,
              email: member.email
            };
          });
        intMod.allIntervs = intModule.relations.map((reln) => {
          const member = members.find((m) => m.user_id === reln.user_id);
          return {
            profile_image: member.profile_image,
            interv_id: member.user_id,
            name: [member.first_name, member.last_name].join(' ')
          };
        });
        allIntModules.push(intMod);
      }
      const [rec] = supabaseWrap(
        await supabase.from('public_jobs').select().eq('id', router.query.id)
      ) as PublicJobsType[];

      let jobModules = ((rec.interview_plan as any)?.plan ??
        []) as InterviewModuleDbType[];
      let clModules: InterviewSession[] = [];
      for (let dbModule of jobModules) {
        let intModule = allIntModules.find(
          (i) => i.module_id === dbModule.module_id
        );
        let clModule: InterviewSession = {
          module_name: intModule?.module_name ?? '', //break
          duration: dbModule.duration,
          isBreak: dbModule.isBreak,
          meetingIntervCnt: dbModule.meetingIntervCnt,
          module_id: dbModule.module_id,
          selectedIntervs: dbModule.selectedIntervs.map((i) => {
            let member = members.find((m) => m.user_id === i.interv_id);
            return {
              interv_id: i.interv_id,
              name: [member.first_name, member.last_name]
                .filter(Boolean)
                .join(' '),
              profile_image: member.profile_image
            };
          }),
          allIntervs: intModule?.allIntervs ?? [], //break
          session_name: dbModule?.session_name ?? '',
          training_ints: [],
          revShadowIntervs: dbModule.revShadowInterv.map((i) => {
            let member = members.find((m) => m.user_id === i.interv_id);
            return {
              interv_id: i.interv_id,
              name: [member.first_name, member.last_name]
                .filter(Boolean)
                .join(' '),
              profile_image: member.profile_image,
              email: member.email,
              profile_img: member.profile_image
            };
          }),
          shadowIntervs: dbModule.shadowIntervs.map((i) => {
            let member = members.find((m) => m.user_id === i.interv_id);
            return {
              interv_id: i.interv_id,
              name: [member.first_name, member.last_name]
                .filter(Boolean)
                .join(' '),
              profile_image: member.profile_image,
              email: member.email,
              profile_img: member.profile_image
            };
          })
        };
        const l = fetchedDbModules.find((mod) => mod.id === dbModule.module_id);
        clModule.training_ints = l.relations
          .filter((reln) => reln.training_status === 'training')
          .map((reln) => {
            const member = members.find((m) => m.user_id === reln.user_id);
            return {
              interv_id: member.user_id,
              name: getFullName(member.first_name, member.last_name),
              profile_img: member.profile_image,
              email: member.email
            };
          });
        clModules.push(clModule);
      }

      initilizeIntPlan({
        allModules: allIntModules,
        modules: clModules,
        isloading: false,
        syncStatus: '',
        jobId: router.query.id as string,
        jobStatus: rec.status,
        jobTitle: rec.job_title
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
        ...initialState
      });
    };
  }, [router.query]);

  return <>{children}</>;
};

export default JobInterviewPlanHoc;
