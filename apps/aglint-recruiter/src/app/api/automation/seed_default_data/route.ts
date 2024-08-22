import { DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { NextResponse } from 'next/server';

import { seed_email_templates } from '@/src/utils/seedCompanyData/seed_email_templates';
import { seed_workflow_actions } from '@/src/utils/seedCompanyData/seed_workflow';
import { getSupabaseServer } from '@/src/utils/supabase/supabaseAdmin';

export async function POST(req) {
  try {
    const { recruiter_id, type } = (await req.json()) as {
      recruiter_id: string;
      type: 'email_template' | 'workflow';
    };

    if (!recruiter_id) throw new Error('recruiter_id missing!!');
    if (!type) throw new Error('type missing!!');
    // // start here

    switch (type) {
      case 'email_template':
        await removeAllTemps(recruiter_id);
        await seedCompTemplate(recruiter_id);
        break;
      case 'workflow':
        await removeAllWorkflow(recruiter_id);
        await seedWorkFlow(recruiter_id);
        break;
      default:
        throw new Error('invalid type');
    }
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

const removeAllTemps = async (recruiter_id: string) => {
  const supabaseAdmin = getSupabaseServer();
  supabaseWrap(
    await supabaseAdmin
      .from('company_email_template')
      .delete()
      .eq('recruiter_id', recruiter_id)
      .not('id', 'is', null),
  );
};
const removeAllWorkflow = async (recruiter_id: string) => {
  const supabaseAdmin = getSupabaseServer();
  supabaseWrap(
    await supabaseAdmin
      .from('workflow')
      .delete()
      .not('id', 'is', null)
      .eq('recruiter_id', recruiter_id),
  );
};

const seedCompTemplate = async (recruiter_id) => {
  const supabaseAdmin = getSupabaseServer();
  supabaseWrap(
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
};
const getAlltemps = async (recruiter_id) => {
  const supabaseAdmin = getSupabaseServer();
  const allTemplates = supabaseWrap(
    await supabaseAdmin
      .from('company_email_template')
      .select()
      .eq('recruiter_id', recruiter_id),
  );
  return allTemplates;
};

const seedWorkFlow = async (recruiter_id: string) => {
  const company_email_template: Awaited<
    DatabaseTable['company_email_template'][]
  > = await getAlltemps(recruiter_id);
  const supabaseAdmin = getSupabaseServer();
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
          is_paused: false,
          workflow_type: work_flow_act.workflow.workflow_type,
        })
        .select(),
    );
    supabaseWrap(
      await supabaseAdmin.from('workflow_action').insert(
        //@ts-ignore  Fix this
        work_flow_act.actions.map((action) => {
          const temp = company_email_template.find(
            (temp) => temp.type === action.target_api,
          );
          return {
            payload: {
              body: temp ? temp.body : undefined,
              subject: temp ? temp.subject : undefined,
              ...(action?.payload ?? {}),
            },
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
