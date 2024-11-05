import { companyEmailTemplateUpdateSchema } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { z } from 'zod';

import { privateProcedure, type ProcedureDefinition } from '@/server/api/trpc';

const schema = z.object({
  template_id: z.string(),
  updated_template: companyEmailTemplateUpdateSchema,
});
export const update = privateProcedure
  .input(schema)
  .mutation(async ({ ctx, input }) => {
    const db = ctx.db;
    const template = supabaseWrap(
      await db
        .from('company_email_template')
        .update(input.updated_template)
        .eq('id', input.template_id)
        .eq('recruiter_id', ctx.recruiter_id)
        .single(),
    );
    return template;
  });

export type Update = ProcedureDefinition<typeof update>;
