import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import { getRandomNumInRange, supabaseWrap } from '@aglint/shared-utils';
import { getSupabaseServer } from '../supabaseAdmin';
import { interview_modules } from '../data/interview_module';

export const addInterviewTypes = async ({
  admin,
  company_detail,
  departments,
  companyTeam,
}: {
  company_detail: DatabaseTable['recruiter'];
  admin: DatabaseTable['recruiter_user'];
  departments: DatabaseTable['departments'][];
  companyTeam: DatabaseTable['recruiter_user'][];
}) => {
  const supabaseAdmin = getSupabaseServer();

  const modules: DatabaseTableInsert['interview_module'][] =
    interview_modules.map((mod) => ({
      ...mod,
      created_by: admin.user_id,
      recruiter_id: company_detail.id,
      department_id: departments[0].id,
    }));
  const int_modules = supabaseWrap(
    await supabaseAdmin.from('interview_module').insert(modules).select()
  );

  const reln_promises = int_modules.map(async (mod) => {
    let trainee_reln: DatabaseTableInsert['interview_module_relation'][] = [];
    let qualified_reln: DatabaseTableInsert['interview_module_relation'][] =
      companyTeam.map((qualified) => ({
        module_id: mod.id,
        user_id: qualified.user_id,
        is_archived: false,
        number_of_shadow: 0,
        number_of_reverse_shadow: 0,
        training_status: 'qualified',
        training_approver: admin.user_id,
      }));

    if (mod.settings && mod.settings.require_training) {
      for (let i = 0; i < 2; ++i) {
        const trainee =
          qualified_reln[getRandomNumInRange(0, qualified_reln.length - 1)];
        trainee_reln.push({
          module_id: mod.id,
          user_id: trainee.user_id,
          is_archived: false,
          number_of_shadow: 0,
          number_of_reverse_shadow: 0,
          training_status: 'training',
          training_approver: admin.user_id,
        });
      }
      qualified_reln = qualified_reln.filter(
        (q) => !trainee_reln.find((t) => t.user_id === q.user_id)
      );
    }

    const all_int_relns: DatabaseTableInsert['interview_module_relation'][] = [
      ...trainee_reln,
      ...qualified_reln,
    ];

    return supabaseWrap(
      await supabaseAdmin
        .from('interview_module_relation')
        .insert(all_int_relns)
        .select()
    );
  });

  const reln_details = await Promise.all(reln_promises);

  console.log('All interview types added');
  return {
    int_modules,
    int_modules_relations: reln_details.flat(),
  };
};
