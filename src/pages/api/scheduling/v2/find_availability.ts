/* eslint-disable no-console */
import dayjs from 'dayjs';

import {
  InterviewModuleApiType,
  InterviewModuleDbType
} from '@/src/components/JobInterviewPlan/types';
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import {
  fetch_company_cred,
  fetchInterviersSheduleSetting,
  fetchModuleName
} from '@/src/utils/scheduling_v2/db_calls';
import { findEachInterviewerFreeTimes } from '@/src/utils/scheduling_v2/func_1';
import { findPlanCombinations } from '@/src/utils/scheduling_v2/func_4';
import { getSelectedInterviewers } from '@/src/utils/scheduling_v2/utils';

import { supabaseAdmin } from '../../phone-screening/get-application-info';

type BodyParams = {
  job_id: string;
  company_id: string;
  start_date: string;
  end_date: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { job_id, company_id, start_date, end_date } = req.body as BodyParams;

    start_date = dayjs(start_date).toISOString();
    end_date = dayjs(end_date).toISOString();
    // db fetches can be optimised for time later
    const [rec] = supabaseWrap(
      await supabaseAdmin
        .from('public_jobs')
        .select('interview_plan')
        .eq('id', job_id)
    );
    let interview_plan: InterviewModuleDbType[] =
      rec.interview_plan?.plan ?? ([] as any);

    let [company_cred, interviewers_info, interview_plan_api] =
      await Promise.all([
        (async () => {
          const company_cred = await fetch_company_cred(company_id); // 2
          return company_cred;
        })(),
        (async () => {
          const interviewers_info = await fetchInterviersSheduleSetting(
            getSelectedInterviewers(interview_plan)
          );
          return interviewers_info;
        })(),
        (async () => {
          const modules_meta = await fetchModuleName(
            interview_plan.filter((i) => !i.isBreak).map((i) => i.module_id)
          );
          const interview_plan_api: InterviewModuleApiType[] =
            interview_plan.map((m) => {
              return {
                duration: m.duration,
                isBreak: m.isBreak,
                meetingIntervCnt: m.meetingIntervCnt,
                module_id: m.module_id,
                selectedIntervs: [],
                module_name: !m.isBreak
                  ? modules_meta.find((m2) => m2.module_id === m.module_id)
                      ?.name
                  : ''
              };
            });
          return interview_plan_api;
        })()
      ]);

    interview_plan_api = interview_plan_api.map((m) => {
      return {
        ...m,
        selectedIntervs: m.selectedIntervs.map((s) => {
          const int = interviewers_info.find(
            (i) => i.interviewer_id === s.interv_id
          );
          return {
            interv_id: int.interviewer_id,
            email: int.email,
            profile_img: int?.profile_img ?? '',
            name: int.name
          };
        })
      };
    });

    const inters_with_free_time_ranges = await findEachInterviewerFreeTimes(
      company_cred,
      interviewers_info,
      start_date,
      end_date
    );

    const combs = findPlanCombinations(
      interview_plan_api,
      inters_with_free_time_ranges
    );

    res.status(200).json(combs);
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error.message);
  }
};

export default handler;

// given n persons with there availability time_ranges in the format {startTime:string, endTime:string}[] for each person find the commn  time range which all n person are available on that
//
