import { queryOptions } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { appKey } from '..';

export const emailTemplateQueries = {
  emailTemplates: (recruiter_id: string) =>
    queryOptions({
      enabled: !!recruiter_id,
      gcTime: recruiter_id ? 5 * 60_000 : 0,
      queryKey: [appKey, 'email-templates', { recruiter_id }],
      queryFn: async () =>
        (
          await supabase
            .from('company_email_template')
            .select('*')
            .eq('recruiter_id', recruiter_id)
            .throwOnError()
        ).data,
    }),
};
