import { SupabaseType } from '@aglint/shared-types';
import { NextApiRequest, NextApiResponse } from 'next';

import { ModuleType } from '@/src/components/Scheduling/InterviewTypes/types';
import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type ApiResponseInterviewModuleById = {
  request: {
    module_id: string;
  };
  response: Awaited<ReturnType<typeof fetchInterviewModuleByIdApi>>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestHandler =
    apiRequestHandlerFactory<ApiResponseInterviewModuleById>(req, res);

  requestHandler(
    'POST',
    async ({ body }) => {
      if (req.method === 'POST') {
        const { module_id } = body;
        const res = await fetchInterviewModuleByIdApi(module_id, supabaseAdmin);
        return res;
      }
    },
    ['module_id'],
  );
}

export const fetchInterviewModuleByIdApi = async (
  module_id: string,
  supabase: SupabaseType,
) => {
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

  return response;
};
