import { DatabaseTable } from '@aglint/shared-types';
import {
  defaultRolePermissionRelation,
  defaultRoles,
  supabaseWrap,
} from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';

import { seed_email_templates } from '@/src/utils/seedCompanyData/seed_email_templates';
import { seed_workflow_actions } from '@/src/utils/seedCompanyData/seed_workflow';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { record } = req.body as { record: DatabaseTable['recruiter'] };
    const recruiter_id = record.id;
    if (!recruiter_id) throw new Error('recruiter_id missing!!');
    // await seedRolesAndPermissions(recruiter_id); /// seed roles err
    await removeAllTemps(recruiter_id);
    const comp_templates = await seedCompTemplate(recruiter_id);
    await seedWorkFlow(recruiter_id, comp_templates);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
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
  const temp_p = (
    await supabaseAdmin.from('permissions').select('id,name').throwOnError()
  ).data;
  //   const temp_p_set = new Set(...temp_p);
  //   const missing_permissions: { name: string; description: string }[] = [];
  //   for (let item of defaultPermissions) {
  //     if (!temp_p_set.has(item.name)) {
  //       missing_permissions.push(item);
  //     }
  //   }
  //   let missing: string[] = [];
  //   if (missing_permissions.length) {
  //     missing = (
  //       await supabase
  //         .from('roles')
  //         .insert(
  //           defaultPermissions.map((item) => ({
  //             name: item.name,
  //             description: item.description,
  //           })),
  //         )
  //         .select('name')
  //         .throwOnError()
  //     ).data.map((item) => item.name);
  //   }
  //   return [...temp_p, ...missing];
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
  return supabaseAdmin
    .from('role_permissions')
    .insert(data)
    .throwOnError()
    .then();
}

const removeAllTemps = async (recruiter_id: string) => {
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
  const promies = seed_workflow_actions.map(async (work_flow_act) => {
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
        })
        .select(),
    );
    supabaseWrap(
      await supabaseAdmin.from('workflow_action').insert(
        work_flow_act.actions.map((action) => {
          const temp = company_email_template.find(
            (temp) => temp.type === action.template_type,
          );
          if (!temp) {
            throw new Error(`${temp.type} not found`);
          }
          return {
            order: action.order,
            workflow_id: workflow.id,
            email_template_id: temp.id,
          };
        }),
      ),
    );
    //
  });

  await Promise.all(promies);
};
