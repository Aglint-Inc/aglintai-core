import {
  SupabaseType,
  type CustomAgentInstructionPayload,
  type DatabaseTable,
} from '@aglint/shared-types';

import { modified_seed_workflow_actions } from './seed_workflow';
import { seed_email_templates } from './seed_email_templates';
import { supabaseWrap } from '../supabaseWrap';
import {
  defaultRolePermissionRelation,
  defaultRoles,
} from '../constants/RolesAndPermissions';

export const preSeedCompanyDetails = async (
  recruiter_id: string,
  supabaseAdmin: SupabaseType
) => {
  await removeAllTemps(recruiter_id, supabaseAdmin);
  const comp_templates = await seedCompTemplate(recruiter_id, supabaseAdmin);
  await seedWorkFlow(recruiter_id, comp_templates, supabaseAdmin); //NOTE: don't change order
  await Promise.allSettled([
    seedRolesAndPermissions(recruiter_id, supabaseAdmin),
    seedPreferencesAndIntegrations(recruiter_id, supabaseAdmin),
  ]);
};

// eslint-disable-next-line no-unused-vars
async function seedRolesAndPermissions(
  rec_id: string,
  supabaseAdmin: SupabaseType
) {
  const tempRoles = (await createRoles(rec_id, supabaseAdmin)) || [];
  const tempPermissions = (await getPermissions(supabaseAdmin)) || [];
  const tempRolePermissions: {
    permission_id: number;
    recruiter_id: string;
    role_id: string;
  }[] = [];

  tempRoles.forEach((role) => {
    defaultRolePermissionRelation[
      role.name as keyof typeof defaultRolePermissionRelation
    ].forEach((permission) => {
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
  await createRolePermissions(tempRolePermissions, supabaseAdmin);
  return true;
}
async function createRoles(rec_id: string, supabaseAdmin: SupabaseType) {
  return supabaseAdmin
    .from('roles')
    .insert(
      defaultRoles.map((item) => ({
        name: item.name,
        recruiter_id: rec_id,
        description: item.description,
      }))
    )
    .select('id,name')
    .throwOnError()
    .then(({ data }) => data);
}
async function getPermissions(supabaseAdmin: SupabaseType) {
  const temp_p =
    (await supabaseAdmin.from('permissions').select('id,name').throwOnError())
      .data || [];
  return temp_p.reduce(
    (acc, crr) => {
      acc[crr.name] = crr.id;
      return acc;
    },
    {} as { [permission: string]: number }
  );
}
async function createRolePermissions(
  data: { permission_id: number; recruiter_id: string; role_id: string }[],
  supabaseAdmin: SupabaseType
) {
  return supabaseAdmin
    .from('role_permissions')
    .insert(data)
    .throwOnError()
    .then();
}

const removeAllTemps = async (
  recruiter_id: string,
  supabaseAdmin: SupabaseType
) => {
  supabaseWrap(
    await supabaseAdmin
      .from('workflow')
      .delete()
      .not('id', 'is', null)
      .eq('recruiter_id', recruiter_id)
  );
  supabaseWrap(
    await supabaseAdmin
      .from('company_email_template')
      .delete()
      .eq('recruiter_id', recruiter_id)
      .not('id', 'is', null)
  );
};

const seedCompTemplate = async (
  recruiter_id: string,
  supabaseAdmin: SupabaseType
) => {
  const all_templates = supabaseWrap(
    await supabaseAdmin
      .from('company_email_template')
      .insert(
        seed_email_templates.map((t) => ({
          ...t,
          recruiter_id: recruiter_id,
        }))
      )
      .select()
  );
  return all_templates;
};

const seedWorkFlow = async (
  recruiter_id: string,
  company_email_template: DatabaseTable['company_email_template'][],
  supabaseAdmin: SupabaseType
) => {
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
          is_active: false,
          workflow_type: 'company',
        })
        .select()
    );
    supabaseWrap(
      await supabaseAdmin.from('workflow_action').insert(
        work_flow_act.actions.map((action) => {
          const temp = company_email_template.find(
            (temp) => temp.type === action.target_api
          );
          let payload: any = null;
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
        }) as any // TODO: fix
      )
    );
    //
  });

  await Promise.all(promies);
};

async function seedPreferencesAndIntegrations(
  rec_id: string,

  supabaseAdmin: SupabaseType
) {
  await supabaseAdmin
    .from('recruiter_preferences')
    .insert([{ recruiter_id: rec_id, scoring: false }])
    .throwOnError();

  await supabaseAdmin
    .from('integrations')
    .insert([{ recruiter_id: rec_id }])
    .throwOnError();
}
