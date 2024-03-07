import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { PublicJobsType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { initialState, initilizeIntPlan } from './store';
import { InterviewModuleCType, InterviewModuleDbType } from './types';
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
      const allIntModules: InterviewModuleCType[] = [];
      const d = await fetchInterviewModule(recruiter.id);
      for (let intModule of d) {
        const intMod: InterviewModuleCType = {
          module_id: intModule.id,
          duration: 30,
          meetingIntervCnt: 1,
          name: intModule.name,
          selectedIntervs: [],
          allIntervs: [],
          isBreak: false
        };
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
      let clModules: InterviewModuleCType[] = [];

      for (let dbModule of jobModules) {
        let intModule = allIntModules.find(
          (i) => i.module_id === dbModule.module_id
        );
        let clModule: InterviewModuleCType = {
          name: intModule?.name ?? '', //break
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
          allIntervs: intModule?.allIntervs ?? [] //break
        };
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
