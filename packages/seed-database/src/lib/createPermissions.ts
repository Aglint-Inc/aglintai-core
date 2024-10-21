import { supabaseWrap } from '@aglint/shared-utils';
import { getSupabaseServer } from '../supabaseAdmin';
import { db_permissions } from '../data/permissions';

export const createPermissions = async () => {
  const supabaseAdmin = getSupabaseServer();
  supabaseWrap(await supabaseAdmin.from('permissions').delete().neq('id', 0));
  supabaseWrap(await supabaseAdmin.from('permissions').insert(db_permissions));
  console.log('Permissions resetted');
};
