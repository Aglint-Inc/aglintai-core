import { type DatabaseTable } from '@aglint/shared-types';
import { triggerToCategoryMap } from 'src/app/(authenticated)/jobs/[job]/(jobEdit)/workflows/_common/lib/constants';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const schema = z.object({
  job_id: z.string().uuid(),
  company_id: z.string().uuid(),
});
type QryReponse = {
  job_workflows: DatabaseTable['workflow'][];
  job_workflow_actions: DatabaseTable['workflow_action'][];
  company_email_templates: DatabaseTable['company_email_template'][];
};
const query = async ({ input }: PrivateProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const workflows = (
    await db
      .from('workflow_job_relation')
      .select('*, workflow!inner(*)')
      .eq('job_id', input.job_id)
      .throwOnError()
  ).data;
  const workflow_actions = (
    await db
      .from('workflow_action')
      .select('*')
      .in(
        'workflow_id',
        (workflows ?? [])
          .filter((j) => {
            return j.workflow.trigger in triggerToCategoryMap;
          })
          .map((workflow) => workflow.workflow_id),
      )
      .throwOnError()
  ).data;
  const company_email_templates = (
    await db
      .from('company_email_template')
      .select()
      .eq('recruiter_id', input.company_id)
      .throwOnError()
  ).data;
  const responseQryReponse: QryReponse = {
    job_workflows: (workflows ?? []).map((workflow) => workflow.workflow),
    job_workflow_actions: workflow_actions ?? [],
    company_email_templates: company_email_templates ?? [],
  };
  return responseQryReponse;
};

export const getJobWorkflows = privateProcedure.input(schema).query(query);
