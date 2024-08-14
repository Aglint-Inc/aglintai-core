import { DatabaseTableInsert, DB } from '@aglint/shared-types';
import { SupabaseClient } from '@supabase/supabase-js';

import { getGreenhouseKey } from '../../utils';

export async function syncGreenhouseJobPlan(
  supabase: SupabaseClient<DB>,
  prop: {
    recruiter_id: string;
    ats_job_id: number;
    public_job_id: string;
  },
  key?: string,
) {
  key = key || (await getGreenhouseKey(supabase, prop.recruiter_id));
  const plans = await getGreenhouseJobPlan(prop.ats_job_id, key);
  return saveInterviewPlans(supabase, plans, prop.public_job_id);
}

// eslint-disable-next-line no-unused-vars
async function getGreenhouseJobPlan(job_id: number, key: string) {
  // const res = await axios.get<GreenhouseJobStagesAPI>(
  //   `https://harvest.greenhouse.io/v1/jobs/${job_id}/stages`,
  //   {
  //     auth: {
  //       username: key,
  //       password: '',
  //     },
  //   },
  // );

  // if (res.status === 200) {
  //   return res.data;
  // }
  // // @ts-ignore
  // throw new Error(res.data?.message || 'Greenhouse API Failed!');
  const data = dummyData;
  return data
    .map((item) => {
      item.interviews = item.interviews.filter(
        (interview) => interview.schedulable,
      );
      return item;
    })
    .filter((item) => item.interviews.length) as GreenhouseJobStagesAPI;
}

export type getGreenhouseJobPlanType = typeof getGreenhouseJobPlan;

async function saveInterviewPlans(
  supabase: SupabaseClient<DB>,
  data: GreenhouseJobStagesAPI,
  job_id: string,
) {
  const temp_plans: DatabaseTableInsert['interview_plan'][] = data.map(
    (item, index) => {
      return {
        name: item.name,
        job_id: job_id,
        order: index + 1,
      };
    },
  );
  const plans = (
    await supabase
      .from('interview_plan')
      .insert(temp_plans)
      .select('id, plan_order')
      .throwOnError()
  ).data;
  const temp_sessions: DatabaseTableInsert['interview_session'][] = plans
    .map((plan) => {
      return data[plan.plan_order - 1]?.interviews.map((session, index) => {
        return {
          name: session.name,
          interview_plan_id: plan.id,
          session_duration: session.estimated_minutes,
          session_order: index,
          session_type: 'panel',
        } as DatabaseTableInsert['interview_session'];
      });
    })
    .flat();
  await supabase.from('interview_session').insert(temp_sessions).throwOnError();
  return true;
}

export type GreenhouseJobStagesAPI = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  job_id: number;
  priority: number;
  interviews: Interview[];
}[];

export type Interview = {
  id: number;
  name: string;
  schedulable: boolean;
  estimated_minutes?: number;
  default_interviewer_users?: DefaultInterviewerUser[];
  interview_kit: InterviewKit;
  created_at?: string;
  updated_at?: string;
  job_id?: number;
};

export type DefaultInterviewerUser = {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  employee_id: string;
};

export type InterviewKit = {
  id: number;
  content: null | string;
  questions: Question[];
};

export type Question = {
  id: number;
  question: string;
};

const dummyData: GreenhouseJobStagesAPI = [
  {
    id: 72200,
    name: 'Face to Face',
    created_at: '2015-11-22T05:31:37.263Z',
    updated_at: '2015-11-22T05:31:37.263Z',
    job_id: 146218,
    priority: 0,
    interviews: [
      {
        id: 6001,
        name: 'Cultural Fit Interview',
        schedulable: true,
        estimated_minutes: 30,
        default_interviewer_users: [
          {
            id: 821,
            first_name: 'Robert',
            last_name: 'Robertson',
            name: 'Robert Robertson',
            employee_id: '100377',
          },
        ],
        interview_kit: {
          id: 9128,
          content:
            '<h5>Purpose</h5><span>Determine whether or not the candidate would be a strong fit.</span>',
          questions: [
            {
              id: 11052,
              question: 'Is this person really a good fit?',
            },
          ],
        },
      },
      {
        id: 6002,
        name: 'Executive Interview',
        schedulable: true,
        created_at: '2015-11-22T05:31:37.263Z',
        updated_at: '2015-11-22T05:31:37.263Z',
        job_id: 146219,
        estimated_minutes: 60,
        default_interviewer_users: [
          {
            id: 4080,
            first_name: 'Kate',
            last_name: 'Austen',
            name: 'Kate Austen',
            employee_id: '12345',
          },
        ],
        interview_kit: {
          id: 9129,
          content:
            '<h5>Purpose</h5><span>See if they can work with the boss.</span>',
          questions: [
            {
              id: 11053,
              question: "What's their favorite color?",
            },
            {
              id: 11054,
              question: 'Do they really want to work here?',
            },
          ],
        },
      },
    ],
  },
  {
    id: 72199,
    name: 'Offer',
    created_at: '2015-11-22T05:31:37.263Z',
    updated_at: '2015-11-22T05:31:37.263Z',
    job_id: 146220,
    priority: 1,
    interviews: [],
  },
  {
    id: 72194,
    name: 'Application Review',
    created_at: '2015-11-22T05:31:37.263Z',
    updated_at: '2015-11-22T05:31:37.263Z',
    job_id: 146221,
    priority: 2,
    interviews: [
      {
        id: 8004,
        name: 'Application Review',
        schedulable: false,
        interview_kit: {
          id: 9130,
          content: null,
          questions: [],
        },
      },
    ],
  },
];
