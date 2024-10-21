import { type DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';
import { emailTemplateCopy } from '@/types/companyEmailTypes';

type EmailTemplate = DatabaseTable['company_email_template'] & {
  type: keyof typeof emailTemplateCopy;
};
const query = async ({ ctx }: PrivateProcedure) => {
  const db = createPrivateClient();
  const templates = supabaseWrap(
    await db
      .from('company_email_template')
      .select()
      .eq('recruiter_id', ctx.recruiter_id),
  );
  return templates.filter(
    (template) => template.type in emailTemplateCopy,
  ) as EmailTemplate[];
};

export const read = privateProcedure.query(query);

export type Read = ProcedureDefinition<typeof read>;
