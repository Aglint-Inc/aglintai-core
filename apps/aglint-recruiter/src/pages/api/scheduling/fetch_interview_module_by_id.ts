import { DB, SupabaseType } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { ModuleType } from '@/src/components/Scheduling/InterviewTypes/types';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export type ApiResponseInterviewModuleById = Awaited<
  ReturnType<typeof fetchInterviewModuleByIdApi>
>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { module_id } = req.body;
    if (module_id) {
      const { data, error } = await fetchInterviewModuleByIdApi(
        module_id,
        supabase,
      );
      return res.send({
        data: data,
        error: error,
      } as ApiResponseInterviewModuleById);
    } else {
      return res.send({
        data: null,
        error: 'missing requierd fields',
      } as ApiResponseInterviewModuleById);
    }
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed!');
}

export const fetchInterviewModuleByIdApi = async (
  module_id: string,
  supabase: SupabaseType,
) => {
  try {
    const { data: dataModule } = await supabase
      .from('interview_module')
      .select('*')
      .eq('id', module_id)
      .throwOnError()
      .single();

    const { data: dataRel } = await supabase
      .from('interview_module_relation')
      .select('*,all_interviewers(*)')
      .eq('module_id', module_id)
      .throwOnError();

    const { data: modAppr } = await supabase
      .from('interview_module_approve_users')
      .select('*')
      .eq('module_id', module_id)
      .throwOnError();

    const response: ModuleType = {
      ...dataModule,
      relations: dataRel.map((rel) => ({
        ...rel,
        recruiter_user: rel.all_interviewers,
      })),
      settings: dataModule.settings
        ? {
            ...dataModule.settings,
            approve_users: modAppr.map((appr) => appr.user_id),
          }
        : {
            require_training: false,
            noShadow: 0,
            noReverseShadow: 0,
            reqruire_approval: false,
            approve_users: [],
          },
    };

    return {
      data: response,
      error: null,
    } as {
      data: ModuleType | null;
      error: string | null;
    };
  } catch (e) {
    return {
      data: null,
      error: e.message,
    };
  }
};
