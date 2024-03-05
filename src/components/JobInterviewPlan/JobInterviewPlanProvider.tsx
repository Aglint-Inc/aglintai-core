import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { PublicJobsType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { initialState, initilizeIntPlan, InterviewModule } from './store';
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
      const allIntModules: InterviewModule[] = [];
      const d = await fetchInterviewModule(recruiter.id);
      for (let intModule of d) {
        const intMod: InterviewModule = {
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

      let jobModules = (rec.interview_plan as any)?.plan ?? [];
      initilizeIntPlan({
        allModules: allIntModules,
        modules: jobModules,
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
