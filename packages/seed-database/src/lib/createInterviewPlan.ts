import { supabaseWrap } from '@aglint/shared-utils';
import { SeedJobType } from '../data/jobs';
import { getSupabaseServer } from '../supabaseAdmin';
import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';

export const createInterviewPlan = async ({
  job_details,
  job_plan,
  int_modules,
  int_modules_relations,
  team,
}: {
  job_details: DatabaseTable['public_jobs'];
  job_plan: SeedJobType['int_stages'];
  int_modules: DatabaseTable['interview_module'][];
  int_modules_relations: DatabaseTable['interview_module_relation'][];
  team: DatabaseTable['recruiter_user'][];
}) => {
  const supabaseAdmin = getSupabaseServer();
  const stages = job_plan.map(async (stage, index) => {
    const plan = supabaseWrap(
      await supabaseAdmin
        .from('interview_plan')
        .insert({
          job_id: job_details.id,
          recruiter_id: job_details.recruiter_id,
          name: stage.stage_name,
          plan_order: index,
          application_id: null,
        })
        .select()
        .single()
    );
    const int_sessions = stage.sessions.map(async (session, index) => {
      let int_module: DatabaseTable['interview_module'] | null = null;
      if (session.session_type !== 'debrief') {
        int_module =
          int_modules.find((int_module) => int_module.name === session.name) ??
          null;
        if (!int_module) {
          throw new Error(session.name + ' not found in interview modules');
        }
      }

      const int_sesn: DatabaseTableInsert['interview_session'] = {
        interview_plan_id: plan.id,
        session_type: 'individual',
        break_duration: session.break_duration,
        location: '',
        schedule_type: session.schedule_type,
        interviewer_cnt: session.interviewer_cnt,
        recruiter_id: job_details.recruiter_id,
        session_duration: session.session_duration,
        name: session.name,
        module_id: int_module?.id ?? null,
        session_order: index,
      };
      const session_details = supabaseWrap(
        await supabaseAdmin
          .from('interview_session')
          .insert(int_sesn)
          .select()
          .single()
      );
      let session_relns: DatabaseTableInsert['interview_session_relation'][] =
        [];
      let session_relns_details: DatabaseTable['interview_session_relation'][] =
        [];

      if (session.session_type !== 'debrief') {
        const int_reln = int_modules_relations
          .filter((int_reln) => int_reln.module_id === int_module?.id)
          .slice(0, session.interviewer_cnt);
        session_relns = int_reln.map((reln) => ({
          interview_module_relation_id:
            session.session_type === 'debrief' ? null : reln.id,
          user_id: session.session_type === 'debrief' ? reln.user_id : null,
          session_id: session_details.id,
          training_type:
            reln.training_status === 'training' ? 'shadow' : 'qualified',
          interviewer_type:
            reln.training_status === 'training' ? 'training' : 'qualified',
        }));
      } else {
        session_relns = team.slice(0, session.interviewer_cnt).map((user) => ({
          interview_module_relation_id: null,
          user_id: user.user_id,
          session_id: session_details.id,
        }));
      }
      if (session_relns.length === 0) {
        session_relns_details = [];
      } else {
        session_relns_details = supabaseWrap(
          await supabaseAdmin
            .from('interview_session_relation')
            .insert(session_relns)
            .select()
        );
      }

      return { session_details, session_relns_details };
    });
    const stages_details = await Promise.all(int_sessions);
    console.log(`Stage ${stage.stage_name} created`);
    return { stages_details };
  });

  const stages_details = await Promise.all(stages);
  console.log('Interview plan created');
  return { stages_details };
};
