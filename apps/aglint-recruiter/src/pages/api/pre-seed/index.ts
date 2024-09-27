import {
  type CustomAgentInstructionPayload,
  type DatabaseTable,
} from '@aglint/shared-types';
import {
  defaultRolePermissionRelation,
  defaultRoles,
  supabaseWrap,
} from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { seed_email_templates } from '@/utils/seedCompanyData/seed_email_templates';
import { modified_seed_workflow_actions } from '@/utils/seedCompanyData/seed_workflow';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { record } = req.body as { record: DatabaseTable['recruiter'] };
    const recruiter_id = record.id;
    if (!recruiter_id) throw new Error('recruiter_id missing!!');
    // start here
    // eslint-disable-next-line no-unused-vars
    await removeAllTemps(recruiter_id);
    const comp_templates = await seedCompTemplate(recruiter_id);
    await seedWorkFlow(recruiter_id, comp_templates); //NOTE: don't change order
    await Promise.allSettled([
      seedRolesAndPermissions(recruiter_id),
      seedPreferencesAndIntegrations(recruiter_id),
    ]);
    // end here
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

// eslint-disable-next-line no-unused-vars
async function seedRolesAndPermissions(rec_id: string) {
  const tempRoles = await createRoles(rec_id);
  const tempPermissions = await getPermissions();
  const tempRolePermissions: {
    permission_id: number;
    recruiter_id: string;
    role_id: string;
  }[] = [];

  tempRoles.forEach((role) => {
    defaultRolePermissionRelation[role.name].forEach((permission) => {
      const permission_id = tempPermissions[String(permission)];
      if (permission_id) {
        tempRolePermissions.push({
          role_id: role.id,
          permission_id: Number(permission_id),
          recruiter_id: rec_id,
        });
      }
    });
  });
  await createRolePermissions(tempRolePermissions);
  return true;
}
async function createRoles(rec_id: string) {
  const supabaseAdmin = getSupabaseServer();

  return supabaseAdmin
    .from('roles')
    .insert(
      defaultRoles.map((item) => ({
        name: item.name,
        recruiter_id: rec_id,
        description: item.description,
      })),
    )
    .select('id,name')
    .throwOnError()
    .then(({ data }) => data);
}
async function getPermissions() {
  const supabaseAdmin = getSupabaseServer();

  const temp_p = (
    await supabaseAdmin.from('permissions').select('id,name').throwOnError()
  ).data;
  return temp_p.reduce(
    (acc, crr) => {
      acc[crr.name] = crr.id;
      return acc;
    },
    {} as { [permission: string]: number },
  );
}
async function createRolePermissions(
  data: { permission_id: number; recruiter_id: string; role_id: string }[],
) {
  const supabaseAdmin = getSupabaseServer();

  return supabaseAdmin
    .from('role_permissions')
    .insert(data)
    .throwOnError()
    .then();
}

const removeAllTemps = async (recruiter_id: string) => {
  const supabaseAdmin = getSupabaseServer();

  supabaseWrap(
    await supabaseAdmin
      .from('workflow')
      .delete()
      .not('id', 'is', null)
      .eq('recruiter_id', recruiter_id),
  );
  supabaseWrap(
    await supabaseAdmin
      .from('company_email_template')
      .delete()
      .eq('recruiter_id', recruiter_id)
      .not('id', 'is', null),
  );
};

const seedCompTemplate = async (recruiter_id) => {
  const supabaseAdmin = getSupabaseServer();

  const all_templates = supabaseWrap(
    await supabaseAdmin
      .from('company_email_template')
      .insert(
        seed_email_templates.map((t) => ({
          ...t,
          recruiter_id: recruiter_id,
        })),
      )
      .select(),
  );
  return all_templates;
};

const seedWorkFlow = async (
  recruiter_id: string,
  company_email_template: DatabaseTable['company_email_template'][],
) => {
  const supabaseAdmin = getSupabaseServer();

  const promies = modified_seed_workflow_actions.map(async (work_flow_act) => {
    const [workflow] = supabaseWrap(
      await supabaseAdmin
        .from('workflow')
        .insert({
          phase: work_flow_act.workflow.phase,
          trigger: work_flow_act.workflow.trigger,
          auto_connect: work_flow_act.workflow.auto_connect,
          description: work_flow_act.workflow.description,
          interval: work_flow_act.workflow.interval,
          title: work_flow_act.workflow.title,
          recruiter_id,
          is_active: true,
          workflow_type: work_flow_act.workflow.workflow_type,
        })
        .select(),
    );
    supabaseWrap(
      await supabaseAdmin.from('workflow_action').insert(
        work_flow_act.actions.map((action) => {
          const temp = company_email_template.find(
            (temp) => temp.type === action.target_api,
          );
          let payload = null;
          if (action.action_type === 'email') {
            payload = {
              email: {
                body: temp ? temp.body : undefined,
                subject: temp ? temp.subject : undefined,
              },
            };
          } else if (action.action_type === 'agent_instruction') {
            const ag_payload = action.payload as CustomAgentInstructionPayload;
            payload = {
              agent: {
                instruction: ag_payload.agent.instruction,
              },
            };
          } else if (action.action_type === 'slack') {
            payload = {
              slack: null,
            };
          } else if (action.action_type === 'end_point') {
            payload = {
              end_point: null,
            };
          }
          return {
            payload,
            order: action.order,
            workflow_id: workflow.id,
            target_api: action.target_api,
            action_type: action.action_type,
          };
        }) as any, // TODO: fix
      ),
    );
    //
  });

  await Promise.all(promies);
};

async function seedPreferencesAndIntegrations(rec_id: string) {
  const supabaseAdmin = getSupabaseServer();

  await supabaseAdmin
    .from('recruiter_preferences')
    .insert([{ recruiter_id: rec_id, scoring: false }])
    .throwOnError();

  await supabaseAdmin
    .from('integrations')
    .insert([{ recruiter_id: rec_id }])
    .throwOnError();
}
